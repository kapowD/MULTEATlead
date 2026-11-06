import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import path from "node:path"
import sharp from "sharp"

const sourceRoot = path.resolve("public/images/products")
const outputRoot = path.resolve("public/images/product-optimized")
const manifestPath = path.resolve("src/catalog/productImageManifest.json")
const cachePath = path.resolve("node_modules/.cache/multeat-product-images.json")
const workspaceRoot = path.resolve(".")
const imageEdges = [160, 320, 640, 1280]

if (!outputRoot.startsWith(`${workspaceRoot}${path.sep}`)) {
    throw new Error(`Generated image directory is outside the workspace: ${outputRoot}`)
}

const toUrlPath = (filePath) =>
    filePath
        .split(path.sep)
        .map((segment) => encodeURIComponent(segment))
        .join("/")

const collectImages = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true })
    const images = []

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name)
        if (entry.isDirectory()) {
            images.push(...(await collectImages(entryPath)))
        } else if (/\.jpe?g$/i.test(entry.name)) {
            images.push(entryPath)
        }
    }

    return images
}

const images = await collectImages(sourceRoot)
if (images.length === 0) {
    throw new Error(`No JPEG product photos found in ${sourceRoot}`)
}
images.sort((left, right) => left.localeCompare(right))

const sourceHash = createHash("sha256")
sourceHash.update(`product-image-derivatives-v3:${imageEdges.join(",")}\0`)
let sourceBytes = 0
for (const imagePath of images) {
    const relativePath = path.relative(sourceRoot, imagePath)
    const contents = await readFile(imagePath)
    sourceHash.update(relativePath).update("\0").update(contents)
    sourceBytes += contents.length
}
const sourceFingerprint = sourceHash.digest("hex")

try {
    const cached = JSON.parse(await readFile(cachePath, "utf8"))
    if (cached.fingerprint === sourceFingerprint && cached.outputs.length === images.length * imageEdges.length * 2) {
        await Promise.all(cached.outputs.map((output) => access(path.resolve(workspaceRoot, output))))
        await access(manifestPath)
        console.log(`Product image variants are current (${images.length} source photos).`)
        process.exit(0)
    }
} catch {
    // Missing or stale generated assets are rebuilt below.
}

await rm(outputRoot, { recursive: true, force: true })

const manifest = {}
let outputBytes = 0
let generatedFiles = 0
const generatedPaths = []

for (const imagePath of images) {
    const relativePath = path.relative(sourceRoot, imagePath)
    const relativeStem = relativePath.slice(0, -path.extname(relativePath).length)

    const imageKey = `images/products/${toUrlPath(relativePath)}`
    manifest[imageKey] = {}

    for (const edge of imageEdges) {
        const outputStem = path.join(outputRoot, `${relativeStem}-${edge}`)
        const webpPath = `${outputStem}.webp`
        const jpegPath = `${outputStem}.jpg`
        await mkdir(path.dirname(outputStem), { recursive: true })

        const quality =
            edge <= 320 ? { webp: 78, jpeg: 80 } :
            edge <= 640 ? { webp: 80, jpeg: 83 } :
            { webp: 83, jpeg: 86 }

        const resize = sharp(imagePath)
            .rotate()
            .resize({
                width: edge,
                height: edge,
                fit: "inside",
                withoutEnlargement: true,
            })

        const [webp, jpeg] = await Promise.all([
            resize.clone().webp({ quality: quality.webp, effort: 5 }).toFile(webpPath),
            resize
                .clone()
                .jpeg({ quality: quality.jpeg, mozjpeg: true, progressive: true })
                .toFile(jpegPath),
        ])

        const encodedStem = toUrlPath(`${relativeStem}-${edge}`)
        manifest[imageKey][edge] = {
            width: webp.width,
            height: webp.height,
            webp: `images/product-optimized/${encodedStem}.webp`,
            jpeg: `images/product-optimized/${encodedStem}.jpg`,
        }

        outputBytes += webp.size + jpeg.size
        generatedFiles += 2
        generatedPaths.push(path.relative(workspaceRoot, webpPath), path.relative(workspaceRoot, jpegPath))
    }
}

const sortedManifest = Object.fromEntries(
    Object.entries(manifest).sort(([left], [right]) => left.localeCompare(right))
)

await writeFile(manifestPath, `${JSON.stringify(sortedManifest, null, 2)}\n`, "utf8")
await mkdir(path.dirname(cachePath), { recursive: true })
await writeFile(
    cachePath,
    JSON.stringify({ fingerprint: sourceFingerprint, outputs: generatedPaths }),
    "utf8"
)

console.log(
    `Generated ${generatedFiles} responsive images from ${images.length} photos: ` +
        `${(sourceBytes / 1024 / 1024).toFixed(2)} MB originals, ` +
        `${(outputBytes / 1024 / 1024).toFixed(2)} MB derivatives.`
)
