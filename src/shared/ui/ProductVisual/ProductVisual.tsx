import { Settings } from "lucide-react"
import type { FC } from "react"

import { getProductImageSources, type ProductImageVariant } from "../../../catalog/productImages"
import type { Product } from "../../../types/product"
import styles from "./ProductVisual.module.scss"

type ProductVisualProps = {
    product: Product
    alt?: string
    imageClassName?: string
    iconClassName?: string
    variant?: ProductImageVariant
    loading?: "eager" | "lazy"
}

export const ProductVisual: FC<ProductVisualProps> = ({
    product,
    alt,
    imageClassName,
    iconClassName,
    variant,
    loading = "lazy",
}) => {
    if (product.constructorType === "chimney") {
        return (
            <div className={styles.iconWrap} role="img" aria-label={alt ?? `Настройка: ${product.name}`}>
                <Settings
                    className={`${styles.icon} ${iconClassName ?? ""}`}
                    aria-hidden="true"
                />
            </div>
        )
    }

    const imageSources = variant ? getProductImageSources(product.image, variant) : undefined
    const image = (
        <img
            src={imageSources?.jpegSrc ?? product.image}
            srcSet={imageSources?.jpegSrcSet}
            sizes={imageSources?.sizes}
            width={imageSources?.width}
            height={imageSources?.height}
            alt={alt ?? product.name}
            className={imageClassName}
            loading={loading}
            decoding="async"
        />
    )

    if (!imageSources) return image

    return (
        <picture className={styles.picture}>
            <source type="image/webp" srcSet={imageSources.webpSrcSet} sizes={imageSources.sizes} />
            {image}
        </picture>
    )
}
