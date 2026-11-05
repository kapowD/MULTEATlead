import { Settings } from "lucide-react"
import type { FC } from "react"
import type { Product } from "../../../types/product"
import styles from "./ProductVisual.module.scss"

type ProductVisualProps = {
    product: Product
    alt?: string
    imageClassName?: string
    iconClassName?: string
}

export const ProductVisual: FC<ProductVisualProps> = ({
    product,
    alt,
    imageClassName,
    iconClassName,
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

    return <img src={product.image} alt={alt ?? product.name} className={imageClassName} />
}
