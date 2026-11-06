import { CheckCircle2, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import styles from "./CartAddedNotice.module.scss"

const DISPLAY_TIME = 6000
let lastNotice: string | number | undefined

type NoticeProps = { id: string | number; name: string; quantity: number }

function CartAddedNotice({ id, name, quantity }: NoticeProps) {
    const [remaining, setRemaining] = useState(DISPLAY_TIME)
    const isHovered = useRef(false)
    const hasFocus = useRef(false)

    useEffect(() => {
        let previous = performance.now()
        let left = DISPLAY_TIME
        const timer = window.setInterval(() => {
            const now = performance.now()
            if (!isHovered.current && !hasFocus.current && !document.hidden) {
                left = Math.max(0, left - (now - previous))
                setRemaining(left)
                if (left === 0) {
                    window.clearInterval(timer)
                    toast.dismiss(id)
                }
            }
            previous = now
        }, 100)
        return () => window.clearInterval(timer)
    }, [id])

    return (
        <div
            className={styles.notice}
            role="status"
            onMouseEnter={() => { isHovered.current = true }}
            onMouseLeave={() => { isHovered.current = false }}
            onFocus={() => { hasFocus.current = true }}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) hasFocus.current = false }}
        >
            <div className={styles.content}>
                <CheckCircle2 size={22} className={styles.icon} aria-hidden="true" />
                <div className={styles.body}>
                    <strong className={styles.title}>Добавлено в корзину</strong>
                    <p className={styles.product}>{name} · {quantity} шт.</p>
                    <div className={styles.actions}>
                        <Link to="/cart" onClick={() => toast.dismiss(id)} className={styles.cartLink}>Перейти в корзину</Link>
                        <button type="button" onClick={() => toast.dismiss(id)} className={styles.continue}>Продолжить покупки</button>
                    </div>
                </div>
                <button type="button" className={styles.close} onClick={() => toast.dismiss(id)} aria-label="Закрыть уведомление"><X size={18} /></button>
            </div>
            <div className={styles.progressTrack} aria-hidden="true"><div className={styles.progress} style={{ transform: `scaleX(${remaining / DISPLAY_TIME})` }} /></div>
        </div>
    )
}

export function showCartAdded(name: string, quantity: number) {
    if (lastNotice !== undefined) toast.dismiss(lastNotice)
    lastNotice = toast.custom((id) => <CartAddedNotice id={id} name={name} quantity={quantity} />, {
        duration: Infinity,
        position: window.matchMedia("(max-width: 600px)").matches ? "bottom-center" : "bottom-right",
    })
}
