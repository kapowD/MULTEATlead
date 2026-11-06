import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import sliderImageOne from "../../assets/images/slaid1.png"
import styles from "./Slider.module.scss"

const productImage = (...segments: string[]) =>
    `${import.meta.env.BASE_URL}images/products/${segments.map(encodeURIComponent).join("/")}`

const sliderImageTwo = productImage("Отопители", "NEXT 20P", "MULTEAT_NEXT 20P_kamera sgoranya v sbore.jpg")
const sliderImageThree = productImage("Отопители", "BUC40", "MULTEAT_BUC 40_ryad1.jpg")

const slides = [
    { image: sliderImageOne, title: "Проектирование и производство теплогенераторов, работающих на отработанном масле" },
    { image: sliderImageTwo, title: "Техподдержка всех выпущенных моделей" },
    { image: sliderImageThree, title: "Покупаем отработанное масло в Новосибирске" },
]

const Slider = () => {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const timer = window.setTimeout(() => setCurrent((value) => (value + 1) % slides.length), 5000)
        return () => window.clearTimeout(timer)
    }, [current, paused])

    return (
        <section className={styles.slider} aria-label="О компании MULTEAT" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
            {slides.map((slide, index) => (
                <div key={slide.title} className={styles.slide} aria-hidden={index !== current} style={{ backgroundImage: `url(${slide.image})`, transform: `translateX(${(index - current) * 100}%)` }}>
                    <div className={styles.slideContent}><h1>{slide.title}</h1></div>
                </div>
            ))}
            <button type="button" className={`${styles.arrow} ${styles.left}`} onClick={() => setCurrent((current + slides.length - 1) % slides.length)} aria-label="Предыдущий слайд"><ChevronLeft size={30} /></button>
            <button type="button" className={`${styles.arrow} ${styles.right}`} onClick={() => setCurrent((current + 1) % slides.length)} aria-label="Следующий слайд"><ChevronRight size={30} /></button>
            <div className={styles.dots} aria-label="Выбор слайда">
                {slides.map((slide, index) => <button type="button" key={slide.title} className={`${styles.dot} ${index === current ? styles.active : ""}`} onClick={() => setCurrent(index)} aria-label={`Слайд ${index + 1}: ${slide.title}`} aria-current={index === current ? "true" : undefined} />)}
            </div>
        </section>
    )
}
export default Slider
