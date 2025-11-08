import { Helmet } from "react-helmet-async"

interface PageMetaProps {
    title: string
    description?: string
}

export function PageMeta({ title, description }: PageMetaProps) {
    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
        </Helmet>
    )
}
