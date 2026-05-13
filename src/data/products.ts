import MulteatCubImg from "../assets/images/Multeat_cub.png"
import MulteatCubImgBig from "../assets/images/slaid1.png"
import Mjtt20Manual from "../assets/documents/MZhTT-20/manual_MJTT (1).pdf"
import Mjtt20Boiler from "../assets/images/teplo/MZhTT-20/Multeat_teplo20_boiler.jpg"
import Mjtt20LukRevizii from "../assets/images/teplo/MZhTT-20/Multeat_teplo20_lukrevizii.jpg"
import Mjtt20Vrazbore from "../assets/images/teplo/MZhTT-20/Multeat_teplo20_vrazbore.jpg"
import Mjtt20Kronshtein from "../assets/images/teplo/MZhTT-20/Multeat_teplo_kronshteinkrepleniya.jpg"
import Mjtt20KronshteinShiber from "../assets/images/teplo/MZhTT-20/Multeat_teplo_kronshteinkrepleniyasshibernoizaslonkoi.jpg"
import Mjtt20RabotaShiber from "../assets/images/teplo/MZhTT-20/Multeat_teplo_rabotashibernayazaslonka.jpg"
import Mjtt20Shtucer from "../assets/images/teplo/MZhTT-20/Multeat_teplo_shtucer.jpg"
import Mjtt20Upakovka from "../assets/images/teplo/MZhTT-20/Multeat_teplo_upakovka.jpg"
import Mjtt20Vbitu from "../assets/images/teplo/MZhTT-20/Multeat_teplo_vbitu.jpg"
import Mjtt20Thumb from "../assets/images/teplo/MZhTT-20/tn_Multeat_teplo20.png"
import Vmu230Passport from "../assets/documents/VMU 230-16/PassportVMU230.pdf"
import Vmu230Main from "../assets/images/fans/VMU 230-16/Multeat_VMU230-16.png"
import Vmu230Photo1 from "../assets/images/fans/VMU 230-16/Multeat_VMU230-16_1.jpg"
import Vmu230Photo2 from "../assets/images/fans/VMU 230-16/Multeat_VMU230-16_2.jpg"
import Vmu230Photo3 from "../assets/images/fans/VMU 230-16/Multeat_VMU230-16_3.jpg"
import Vmu230Photo4 from "../assets/images/fans/VMU 230-16/Multeat_VMU230-16_4.jpg"
import Vmu230Photo5 from "../assets/images/fans/VMU 230-16/Multeat_VMU230-16_5.jpg"
import { Product } from "./types/product"

export const products: Product[] = [
    {
        id: 1,
        name: "MULTEAT CUB 40",
        category: "отопители",
        image: MulteatCubImg,
        images: [MulteatCubImg, MulteatCubImgBig, MulteatCubImg, MulteatCubImgBig, MulteatCubImg],
        inStock: true,
        warranty: "5 лет",
        price: 45000,
        description: "Придумай дескрипошон Боря",
        archiveUrl: "/archive",
        fullDescription: `Отопитель MULTEAT CUB 40 работает на любом отработанном масле, обеспечивая его бездымное сгорание. Он не потребляет электроэнергии и предназначен для отопления нежилых, взрывобезопасных помещений объёмом до 800 м3, таких как CТО, гаражи, склады, теплицы, бытовки, мобильные постройки.
Устройство оснащено системой аварийной остановки при нештатных ситуациях.
Отопитель быстро и эффективно создает комфортную атмосферу, легко устанавливается и обслуживается.
Плавная регулировка мощности во всём диапазоне.
Верхняя подвеска тарелки упрощает обслуживание и повышает стабильность работы.
Опора регулятора тяги надежно фиксирует выхлопную трубу.
Применение навесных и потолочных вентиляторов позволит выравнивать температуру даже при высоких потолках.`,
        specifications: {
            Топиво: "000кВт",
            "Тепловая мощность": "кВт/ч:",
            "Габаритные размеры": "222",
            Масса: "18 кг",
            Размеры: "450x350x200 мм",
            "Рабочая температура": "-40°C до +85°C",
        },
    },
    {
        id: 2,
        name: "MULTEAT ВМУ 230-16",
        category: "Вентиляторы",
        image: Vmu230Main,
        images: [Vmu230Main, Vmu230Photo1, Vmu230Photo2, Vmu230Photo3, Vmu230Photo4, Vmu230Photo5],
        imageDescriptions: [
            "Общий вид навесного вентилятора MULTEAT ВМУ 230-16.",
            "Вентилятор ВМУ 230-16, установленный на отопителе.",
            "Пример установки двух вентиляторов на отопителе.",
            "Вентилятор на отопителе, боковой вид.",
            "Задняя часть вентилятора и электродвигатель.",
            "Вентилятор ВМУ 230-16 в работе.",
        ],
        inStock: true,
        warranty: "5 лет",
        price: 6480,
        description: "Навесной вентилятор для всех моделей отопителей MULTEAT",
        archiveUrl: Vmu230Passport,
        fullDescription: `Навесной вентилятор на все модели отопителей MULTEAT.

Вентилятор предназначен для быстрого и равномерного прогрева воздуха в помещении. Он располагается непосредственно на отопителе и направленно подаёт разогретый воздух в помещение.`,
        specifications: {
            Назначение: "Навесной вентилятор на все модели отопителей MULTEAT",
            "Напряжение питания": "220/50 Гц",
            "Мощность двигателя": "16 Вт",
            Производительность: "450 м³/ч",
            "Габаритные размеры": "430x265x180 мм",
            Масса: "3,5 кг",
        },
    },
    {
        id: 3,
        name: "Жаротрубный теплообменник МЖТТ-20",
        category: "Теплообменники",
        image: Mjtt20Thumb,
        images: [
            Mjtt20Thumb,
            Mjtt20Boiler,
            Mjtt20LukRevizii,
            Mjtt20Vrazbore,
            Mjtt20Kronshtein,
            Mjtt20KronshteinShiber,
            Mjtt20RabotaShiber,
            Mjtt20Shtucer,
            Mjtt20Upakovka,
            Mjtt20Vbitu,
        ],
        imageDescriptions: [
            "Общий вид теплообменника МЖТТ-20.",
            "Корпус теплообменника, вид на жаровые трубы.",
            "Люк ревизии теплообменника.",
            "Теплообменник в разборе.",
            "Кронштейн крепления.",
            "Кронштейн крепления с шиберной заслонкой.",
            "Работа шиберной заслонки.",
            "Штуцер отвода конденсата.",
            "Упаковка теплообменника.",
            "Пример установки в бытовом помещении.",
        ],
        inStock: false,
        warranty: "2 года",
        price: 0,
        description:
            "Жаротрубный теплообменник для передачи тепла от выхлопных газов к теплоносителю",
        archiveUrl: Mjtt20Manual,
        fullDescription: `Теплообменник МЖТТ-20 адаптирован к использованию с отопителями MULTEAT TEX 20, MULTEAT NEXT 20, MULTEAT NEXT 20P. Также может быть использован и с другими устройствами.

Теплообменник предназначен для передачи части тепла от выхлопных газов теплогенератора к теплоносителю. В качестве теплогенератора может быть любая печь на любом виде топлива, в качестве теплоносителя — вода или антифриз.

При необходимости усилить тягу нужно удлинить и утеплить выхлопную трубу или установить дымосос. Если помещение, в котором расположен теплообменник, не нуждается в дополнительном тепле, целесообразно экранировать источник тепла и теплоизолировать сам теплообменник.`,
        specifications: {
            "Тепловая мощность": "20 кВт/ч",
            "Площадь рубашки при открытом шибере": "0,1 м²",
            "Площадь рубашки при закрытом шибере": "0,9 м²",
            "Рабочее давление": "0,63 бар",
            "Проверено на давление": "1 бар",
            "Резьба патрубков теплоносителя": '1"',
            "Диаметр входной трубы": "120 мм",
            "Диаметр выходной трубы": "120 мм",
            "Жаропрочное покрытие": "есть",
            "Возможность ревизии": "есть",
            "Максимальная температура теплоносителя": "90 °C",
            "Штуцер отвода конденсата": "есть",
            "Материал корпуса": "сталь, 1,2 мм",
            "Объём контура теплоносителя": "18 л",
            "Размеры (ДхВхШ)": "550x1080x160 мм",
            Масса: "29 кг",
        },
    },
    {
        id: 4,
        name: "MULTEAT CUB 40 деталь",
        category: "Теплообменники",
        image: MulteatCubImg,
        images: [MulteatCubImg, MulteatCubImg, MulteatCubImg, MulteatCubImg, MulteatCubImg],
        inStock: false,
        warranty: "5 лет",
        price: 0,
        description: "Мощный отопитель для коммерческого транспорта с высокой эффективностью",
        archiveUrl: "/archive",
        fullDescription: `Отопитель MULTEAT CUB 40 работает на любом отработанном масле, обеспечивая его бездымное сгорание. Он не потребляет электроэнергии и предназначен для отопления нежилых, взрывобезопасных помещений объёмом до 800 м3, таких как CТО, гаражи, склады, теплицы, бытовки, мобильные постройки.
Устройство оснащено системой аварийной остановки при нештатных ситуациях.
Отопитель быстро и эффективно создает комфортную атмосферу, легко устанавливается и обслуживается.
Плавная регулировка мощности во всём диапазоне.
Верхняя подвеска тарелки упрощает обслуживание и повышает стабильность работы.
Опора регулятора тяги надежно фиксирует выхлопную трубу.
Применение навесных и потолочных вентиляторов позволит выравнивать температуру даже при высоких потолках.`,
        specifications: {
            Топиво: "000кВт",
            "Тепловая мощность": "кВт/ч:",
            "Габаритные размеры": "222",
            Масса: "18 кг",
            Размеры: "450x350x200 мм",
            "Рабочая температура": "-40°C до +85°C",
        },
    },
    // {
    //     id: 2,
    //     name: "Вентилятор ВК-12",
    //     category: "Вентиляторы",
    //     image: "https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691652/pexels-photo-5691652.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: true,
    //     warranty: "12 месяцев",
    //     price: 12000,
    //     description: "Высокопроизводительный вентилятор для эффективной циркуляции воздуха",
    //     fullDescription: "Вентилятор ВК-12 обеспечивает оптимальную циркуляцию воздуха в системах отопления и вентиляции. Низкий уровень шума и высокая производительность делают его идеальным выбором для различных применений.",
    //     specifications: {
    //         "Производительность": "1200 м³/ч",
    //         "Напряжение": "12 В",
    //         "Потребляемая мощность": "120 Вт",
    //         "Уровень шума": "45 дБ",
    //         "Вес": "2.5 кг",
    //         "Диаметр": "200 мм"
    //     }
    // },
    // {
    //     id: 3,
    //     name: "Теплообменник ТО-200",
    //     category: "heat-exchangers",
    //     image: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691658/pexels-photo-5691658.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691657/pexels-photo-5691657.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: false,
    //     warranty: "18 месяцев",
    //     price: 28000,
    //     description: "Эффективный теплообменник для систем отопления с улучшенной теплопередачей",
    //     fullDescription: "Теплообменник ТО-200 разработан для максимальной эффективности теплопередачи. Изготовлен из высококачественных материалов, устойчивых к коррозии и высоким температурам.",
    //     specifications: {
    //         "Тепловая мощность": "200 кВт",
    //         "Рабочее давление": "16 бар",
    //         "Материал": "Нержавеющая сталь",
    //         "Вес": "45 кг",
    //         "Размеры": "600x400x300 мм",
    //         "Температура": "до 200°C"
    //     }
    // },
    // {
    //     id: 4,
    //     name: "Комплект фильтров",
    //     category: "parts",
    //     image: "https://images.pexels.com/photos/5691657/pexels-photo-5691657.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691657/pexels-photo-5691657.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691656/pexels-photo-5691656.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: true,
    //     warranty: "6 месяцев",
    //     price: 3500,
    //     description: "Комплект высококачественных фильтров для отопителей",
    //     fullDescription: "Комплект включает воздушный и топливный фильтры, изготовленные из высококачественных материалов для обеспечения долговечности и эффективной фильтрации.",
    //     specifications: {
    //         "Комплектация": "2 фильтра",
    //         "Тип": "Воздушный + топливный",
    //         "Материал": "Синтетическое волокно",
    //         "Эффективность": "99.5%",
    //         "Ресурс": "10000 км"
    //     }
    // },
    // {
    //     id: 5,
    //     name: "Отопитель Компакт 24",
    //     category: "heaters",
    //     image: "https://images.pexels.com/photos/5691655/pexels-photo-5691655.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691655/pexels-photo-5691655.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691654/pexels-photo-5691654.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: true,
    //     warranty: "24 месяца",
    //     price: 32000,
    //     description: "Компактный отопитель для легкового транспорта",
    //     fullDescription: "Отопитель Компакт 24 идеально подходит для легковых автомобилей и небольших коммерческих транспортных средств. Компактные размеры и высокая эффективность.",
    //     specifications: {
    //         "Мощность": "24 кВт",
    //         "Напряжение": "12 В",
    //         "Расход топлива": "2.4 л/ч",
    //         "Вес": "12 кг",
    //         "Размеры": "350x250x150 мм",
    //         "Рабочая температура": "-30°C до +70°C"
    //     }
    // },
    // {
    //     id: 6,
    //     name: "Вентилятор ВК-24 Профи",
    //     category: "Вентиляторы",
    //     image: "https://images.pexels.com/photos/5691652/pexels-photo-5691652.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691652/pexels-photo-5691652.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691650/pexels-photo-5691650.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: true,
    //     warranty: "18 месяцев",
    //     price: 18500,
    //     description: "Профессиональный вентилятор повышенной мощности",
    //     fullDescription: "Вентилятор ВК-24 Профи предназначен для профессионального использования в системах с повышенными требованиями к производительности.",
    //     specifications: {
    //         "Производительность": "2400 м³/ч",
    //         "Напряжение": "24 В",
    //         "Потребляемая мощность": "240 Вт",
    //         "Уровень шума": "50 дБ",
    //         "Вес": "4.2 кг",
    //         "Диаметр": "300 мм"
    //     }
    // },
    // {
    //     id: 7,
    //     name: "Теплообменник ТО-150",
    //     category: "heat-exchangers",
    //     image: "https://images.pexels.com/photos/5691658/pexels-photo-5691658.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691658/pexels-photo-5691658.jpeg?auto=compress&cs=tinysrgb&w=800",
    //         "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: true,
    //     warranty: "18 месяцев",
    //     price: 22000,
    //     description: "Компактный теплообменник для средних систем отопления",
    //     fullDescription: "Теплообменник ТО-150 обеспечивает оптимальную теплопередачу для систем средней мощности. Компактный дизайн и высокая эффективность.",
    //     specifications: {
    //         "Тепловая мощность": "150 кВт",
    //         "Рабочее давление": "12 бар",
    //         "Материал": "Алюминий",
    //         "Вес": "28 кг",
    //         "Размеры": "500x300x250 мм",
    //         "Температура": "до 150°C"
    //     }
    // },
    // {
    //     id: 8,
    //     name: "Датчик температуры",
    //     category: "parts",
    //     image: "https://images.pexels.com/photos/5691656/pexels-photo-5691656.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     images: [
    //         "https://images.pexels.com/photos/5691656/pexels-photo-5691656.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     ],
    //     inStock: false,
    //     warranty: "12 месяцев",
    //     price: 2800,
    //     description: "Высокоточный датчик температуры для систем управления",
    //     fullDescription: "Высокоточный датчик температуры обеспечивает точное измерение и контроль температуры в системах отопления. Устойчив к вибрациям и экстремальным температурам.",
    //     specifications: {
    //         "Диапазон измерения": "-40°C до +150°C",
    //         "Точность": "±0.5°C",
    //         "Тип": "Термистор",
    //         "Длина кабеля": "2 м",
    //         "Защита": "IP67"
    //     }
    // }
]

export const categories = [
    { id: "all", name: "Все товары", count: products.length },
    {
        id: "отопители",
        name: "Отопители",
        count: products.filter((p) => p.category === "отопители").length,
    },
    {
        id: "Вентиляторы",
        name: "Вентиляторы",
        count: products.filter((p) => p.category === "Вентиляторы").length,
    },
    {
        id: "Теплообменники",
        name: "Теплообменники",
        count: products.filter((p) => p.category === "Теплообменники").length,
    },
    {
        id: "parts",
        name: "Запчасти",
        count: products.filter((p) => p.category === "parts").length,
    },
]
