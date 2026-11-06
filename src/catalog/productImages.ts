import productImageManifest from "./productImageManifest.json"

export type ProductImageVariant = "thumbnail" | "card" | "detail"

type ImageCandidate = {
    width: number
    height: number
    webp: string
    jpeg: string
}

type ProductImageManifest = Record<string, Record<string, ImageCandidate>>

export type ProductImageSources = {
    webpSrcSet: string
    jpegSrcSet: string
    jpegSrc: string
    sizes: string
    width: number
    height: number
}

const sourcePrefix = `${import.meta.env.BASE_URL}images/products/`
const imageManifest = productImageManifest as ProductImageManifest

const variantEdges: Record<ProductImageVariant, number[]> = {
    thumbnail: [160, 320],
    card: [320, 640],
    detail: [640, 1280],
}

const variantSizes: Record<ProductImageVariant, string> = {
    thumbnail: "80px",
    card: "(max-width: 480px) calc(100vw - 48px), (max-width: 768px) calc(50vw - 32px), (max-width: 1200px) 33vw, 25vw",
    detail: "(max-width: 768px) calc(100vw - 72px), 50vw",
}

export const getProductImageSources = (
    src: string,
    variant: ProductImageVariant
): ProductImageSources | undefined => {
    if (!src.startsWith(sourcePrefix)) return undefined

    const relativeSourcePath = src.slice(sourcePrefix.length).split(/[?#]/, 1)[0]
    const candidatesByEdge = imageManifest[`images/products/${relativeSourcePath}`]
    if (!candidatesByEdge) return undefined

    const candidatesByWidth = new Map<number, ImageCandidate>()
    for (const edge of variantEdges[variant]) {
        const candidate = candidatesByEdge[String(edge)]
        if (candidate && !candidatesByWidth.has(candidate.width)) {
            candidatesByWidth.set(candidate.width, candidate)
        }
    }

    const candidates = [...candidatesByWidth.values()].sort((left, right) => left.width - right.width)
    if (candidates.length === 0) return undefined

    const webpSrcSet = candidates
        .map((candidate) => `${import.meta.env.BASE_URL}${candidate.webp} ${candidate.width}w`)
        .join(", ")
    const jpegSrcSet = candidates
        .map((candidate) => `${import.meta.env.BASE_URL}${candidate.jpeg} ${candidate.width}w`)
        .join(", ")
    const largestCandidate = candidates[candidates.length - 1]

    return {
        webpSrcSet,
        jpegSrcSet,
        jpegSrc: `${import.meta.env.BASE_URL}${largestCandidate.jpeg}`,
        sizes: variantSizes[variant],
        width: candidates[0].width,
        height: candidates[0].height,
    }
}
