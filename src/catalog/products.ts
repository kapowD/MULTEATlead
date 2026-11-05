import Vmu230Passport from "../assets/documents/VMU 230-16/PassportVMU230.pdf"
import type { Product, ProductCategory, ProductCategoryOption } from "../types/product"
import { getCategoryLabel } from "../utils/categoryLabels"

const productImage = (...segments: string[]) =>
    `${import.meta.env.BASE_URL}images/products/${segments.map(encodeURIComponent).join("/")}`

const heaterImage = (model: string, filename: string) => productImage("Отопители", model, filename)
const partImage = (filename: string) => productImage("Запчасти", filename)
const fanImage = (model: string, filename: string) =>
    productImage("Вентиляторы", model, filename)

export const products: Product[] = [
    {
        id: 7,
        name: "MULTEAT TEX 20",
        category: "heaters",
        image: heaterImage("TEX 20", "MULTEAT_TEX 20_main.jpg"),
        images: [
            heaterImage("TEX 20", "MULTEAT_TEX 20_main.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_kamera sgoraniya v sbore.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_emkost pereliva.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_podveska tarelki.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_regulator tyagi.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_vid szadi.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_vid snizu.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_v rabote_badqual.jpg"),
            heaterImage("TEX 20", "MULTEAT_TEX 20_v bitu_somn.jpg"),
        ],
        imageDescriptions: [
            "Отопитель MULTEAT TEX 20, общий вид.",
            "Камера сгорания в сборе.",
            "Ёмкость перелива.",
            "Подвеска топливной тарелки.",
            "Регулятор тяги.",
            "Вид отопителя сзади.",
            "Вид отопителя снизу.",
            "Отопитель в работе.",
            "Пример установки в бытовом помещении.",
        ],
        price: 23750,
        warranty: "2 года",
        description:
            "Автономный отопитель без электропотребления для нежилых помещений объёмом до 200 м³.",
        fullDescription: `Отопитель MULTEAT TEX 20 не потребляет электроэнергии и предназначен для отопления нежилых, взрывобезопасных помещений объёмом до 200 м³: гаражей, складов, теплиц, бытовок и мобильных построек.

Отопитель просто установить и обслуживать. Корпус из зеркальной нержавеющей стали экранирует боковое инфракрасное излучение, а перфорация передней части помогает прогревать пространство перед прибором. Камера сгорания изготовлена из жаропрочной нержавеющей стали. Верхняя подвеска позволяет топливной тарелке самоцентрироваться.

В комплект не входит топливный бак. Можно использовать ёмкость с фильтром и краном или бак MULTEAT 20.

Отличие TEX 20 от NEXT 20P — толщина стенок камеры сгорания (она отличается в 1,6 раза) и марка нержавеющей стали; заявленный срок гарантии составляет 2 и 5 лет соответственно. Применение новых материалов позволило оптимизировать стоимость TEX 20.

*При работе на чистом дизельном топливе рекомендуется закрыть нижний ряд отверстий камеры сгорания винтами М3, установленными изнутри, чтобы снизить интенсивность горения.`,
        specifications: {
            Топливо: "Отработанные масла любого происхождения и их смесь с дизельным топливом",
            "Тепловая мощность": "5–20 кВт",
            "Расход топлива": "0,5–2,3 л/ч",
            "Объём топливного бака": "Не входит в комплект",
            "Объём отапливаемого помещения": "До 200 м³",
            "Время работы без очистки камеры сгорания": "Не менее 12 ч",
            "Регулировка мощности": "Есть",
            Электропотребление: "Нет",
            "Аварийное отключение": "Есть",
            Дымоход: "Высота 4–10 м, диаметр 120 мм",
            "Габаритные размеры": "480 × 340 × 640 мм (Д × Ш × В)",
            Масса: "12 кг",
        },
    },
    {
        id: 8,
        name: "MULTEAT NEXT 20P",
        category: "heaters",
        image: heaterImage("NEXT 20P", "MULTEAT_NEXT 20P_main.jpg"),
        images: [
            heaterImage("NEXT 20P", "MULTEAT_NEXT 20P_main.jpg"),
            heaterImage("NEXT 20P", "MULTEAT_NEXT 20P_kamera sgoranya v sbore.jpg"),
            heaterImage("NEXT 20P", "MULTEAT_NEXT 20P_podveska tarelki.jpg"),
            heaterImage("NEXT 20P", "MULTEAT_NEXT 20P_regulator tyagi.jpg"),
            heaterImage("NEXT 20P", "MULTEAT_NEXT 20P_vid szadi.jpg"),
        ],
        imageDescriptions: [
            "Отопитель MULTEAT NEXT 20P, общий вид.",
            "Камера сгорания в сборе.",
            "Подвеска топливной тарелки.",
            "Регулятор тяги.",
            "Вид отопителя сзади.",
        ],
        price: 28750,
        warranty: "5 лет",
        description:
            "Автономный отопитель мощностью до 20 кВт для помещений объёмом до 200 м³.",
        fullDescription: `Отопитель MULTEAT NEXT 20P не потребляет электроэнергии и предназначен для отопления нежилых, взрывобезопасных помещений объёмом до 200 м³: гаражей, складов, теплиц, бытовок и мобильных построек.

Отопитель просто установить и обслуживать. Корпус из зеркальной нержавеющей стали экранирует боковое инфракрасное излучение, а перфорация передней части помогает прогревать пространство перед прибором. Камера сгорания изготовлена из жаропрочной нержавеющей стали. Верхняя подвеска позволяет топливной тарелке самоцентрироваться.

В комплект не входит топливный бак. Можно использовать ёмкость с фильтром и краном или бак MULTEAT 20.

Отличие NEXT 20P от TEX 20 — толщина стенок камеры сгорания (она отличается в 1,6 раза) и марка нержавеющей стали; заявленный срок гарантии составляет 5 и 2 года соответственно.

*При работе на чистом дизельном топливе рекомендуется закрыть нижний ряд отверстий камеры сгорания винтами М3, установленными изнутри, чтобы снизить интенсивность горения.`,
        specifications: {
            Топливо: "Отработанные масла любого происхождения и их смесь с дизельным топливом",
            "Тепловая мощность": "5–20 кВт",
            "Расход топлива": "0,5–2,3 л/ч",
            "Объём топливного бака": "Не входит в комплект",
            "Объём отапливаемого помещения": "До 200 м³",
            "Время работы без очистки камеры сгорания": "Не менее 12 ч",
            "Регулировка мощности": "Есть",
            Электропотребление: "Нет",
            "Аварийное отключение": "Есть",
            Дымоход: "Высота 4–10 м, диаметр 120 мм",
            "Габаритные размеры": "480 × 340 × 640 мм (Д × Ш × В)",
            Масса: "14 кг",
        },
    },
    {
        id: 1,
        name: "MULTEAT CUB 40",
        category: "heaters",
        image: heaterImage("CUB 40", "MULTEAT_CUB 40_main.jpg"),
        images: [
            heaterImage("CUB 40", "MULTEAT_CUB 40_main.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_kamera sgoraniya v sbore.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_klapan KME.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_elementi podveski.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_podveska v kamere sgor.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_podveska v sbore.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_sdvig topliv trub.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_toplivniy bak.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_szadi.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_v rabote.jpg"),
            heaterImage("CUB 40", "MULTEAT_CUB 40_VMU 230-16.jpg"),
            productImage("Отопители", "Прочее", "MULTEAT_otopitel_emkost pereliva fix.jpg"),
            productImage("Отопители", "Прочее", "MULTEAT_otopitel_podveska tarelki.jpg"),
        ],
        imageDescriptions: [
            "Отопитель MULTEAT CUB 40, общий вид.",
            "Камера сгорания в сборе.",
            "Клапан КМЕ.",
            "Элементы подвески топливной тарелки.",
            "Подвеска внутри камеры сгорания.",
            "Подвеска топливной тарелки в сборе.",
            "Сдвиг топливной трубы.",
            "Топливный бак отопителя.",
            "Вид отопителя сзади.",
            "Отопитель в работе.",
            "Отопитель с навесным вентилятором ВМУ 230-16.",
            "Узел ёмкости перелива отопителя MULTEAT.",
            "Подвеска топливной тарелки отопителя MULTEAT.",
        ],
        price: 59900,
        warranty: "5 лет",
        description:
            "Отопитель на отработанном масле для нежилых помещений объёмом до 800 м³.",
        fullDescription: `Отопитель MULTEAT CUB 40 работает на отработанных маслах, обеспечивая их бездымное сгорание, и предназначен для отопления нежилых, взрывобезопасных помещений объёмом до 800 м³: СТО, гаражей, складов, теплиц, бытовок и мобильных построек.

Отопитель быстро прогревает помещение, легко устанавливается и обслуживается. Мощность плавно регулируется во всём диапазоне. Верхняя подвеска тарелки упрощает обслуживание и повышает стабильность работы, а опора регулятора тяги надёжно фиксирует выхлопную трубу. Устройство оснащено системой аварийной остановки.

Навесные и потолочные вентиляторы помогают равномернее распределять тепло в помещениях с высокими потолками.

*При работе на чистом дизельном топливе рекомендуется закрыть нижний ряд отверстий камеры сгорания винтами М4, установленными изнутри, чтобы снизить интенсивность горения.`,
        specifications: {
            Топливо: "Отработанные масла любого происхождения и их смесь с дизельным топливом",
            "Тепловая мощность": "15–50 кВт",
            "Расход топлива": "1,5–5 л/ч",
            "Объём топливного бака": "45 л",
            "Объём отапливаемого помещения": "До 800 м³",
            "Время работы без очистки камеры сгорания": "Не менее 12 ч",
            "Регулировка мощности": "Есть",
            Электропотребление: "Нет",
            "Аварийное отключение": "Есть",
            Дымоход: "Высота 6–12 м, диаметр 130–150 мм",
            "Размеры отопителя": "620 × 450 × 970 мм (Д × Ш × В)",
            "Размеры бака": "500 × 250 × 800 мм (Д × Ш × В)",
            Масса: "Отопитель 32 кг, бак 17 кг; всего 49 кг",
        },
    },
    {
        id: 9,
        name: "MULTEAT BUC 40",
        category: "heaters",
        image: heaterImage("BUC40", "MULTEAT_BUC 40_main.jpg"),
        images: [
            heaterImage("BUC40", "MULTEAT_BUC 40_main.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_obshiy vid.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_avariynaya stop.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_emkst pereliva.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_kamera sgoraniya.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_klapan KME.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_podveska tarelki.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_regulator tyagi.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_ryad1.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_ryad2.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_szadi.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_tarelka richag.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_toplibniy bak.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_vent s otkr krishk.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_vent sleva.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_vent sprava.jpg"),
            heaterImage("BUC40", "MULTEAT_BUC 40_vent szadi.jpg"),
        ],
        imageDescriptions: [
            "Отопитель MULTEAT BUC 40, общий вид.",
            "Общий вид отопителя.",
            "Система аварийной остановки.",
            "Ёмкость перелива.",
            "Камера сгорания.",
            "Клапан КМЕ.",
            "Подвеска топливной тарелки.",
            "Регулятор тяги.",
            "Первый ряд отопителя.",
            "Второй ряд отопителя.",
            "Вид отопителя сзади.",
            "Тарелка и рычаг.",
            "Топливный бак.",
            "Отопитель с открытой крышкой вентилятора.",
            "Вентилятор, вид слева.",
            "Вентилятор, вид справа.",
            "Вентилятор, вид сзади.",
        ],
        price: 62900,
        description:
            "Отопитель на отработанном масле с передней системой топливоподачи для помещений до 800 м³.",
        fullDescription: `Отопитель MULTEAT BUC 40 работает на отработанных маслах, обеспечивая их бездымное сгорание, и предназначен для отопления нежилых, взрывобезопасных помещений объёмом до 800 м³: СТО, гаражей, складов, теплиц, бытовок и мобильных построек.

Мощность плавно регулируется. Переднее расположение системы топливоподачи упрощает обслуживание. Устройство оснащено аварийной остановкой и индикацией состояния: блестящий цвет означает работу, красный — аварийную остановку. Верхняя подвеска тарелки упрощает обслуживание, а опора регулятора тяги фиксирует выхлопную трубу.

Навесные и потолочные вентиляторы помогают равномернее распределять тепло в помещениях с высокими потолками.

*При работе на чистом дизельном топливе рекомендуется закрыть нижний ряд отверстий камеры сгорания винтами М4, установленными изнутри, чтобы снизить интенсивность горения.`,
        specifications: {
            Топливо: "Отработанные масла любого происхождения и их смесь с дизельным топливом",
            "Тепловая мощность": "15–50 кВт",
            "Расход топлива": "1,5–5 л/ч",
            "Объём топливного бака": "45 л",
            "Объём отапливаемого помещения": "До 800 м³",
            "Время работы без очистки камеры сгорания": "Не менее 12 ч",
            "Регулировка мощности": "Есть",
            Электропотребление: "Нет",
            "Аварийное отключение": "Есть",
            Дымоход: "Высота 6–12 м, диаметр 130–150 мм",
            "Размеры отопителя": "620 × 450 × 970 мм (Д × Ш × В)",
            "Размеры бака": "500 × 250 × 800 мм (Д × Ш × В)",
            Масса: "Отопитель 32 кг, бак 17 кг; всего 49 кг",
        },
    },
    {
        id: 10,
        name: "Топливный бак MULTEAT 20",
        category: "heaters",
        image: heaterImage("Бак топливный MULTEAT 20", "MULTEAT_BAK 20_main.jpg"),
        images: [
            heaterImage("Бак топливный MULTEAT 20", "MULTEAT_BAK 20_main.jpg"),
            heaterImage("Бак топливный MULTEAT 20", "MULTEAT_BAK 20_krishka otrkrita.jpg"),
        ],
        imageDescriptions: [
            "Топливный бак MULTEAT 20, общий вид.",
            "Топливный бак с открытой крышкой.",
        ],
        price: 6750,
        description: "Топливный бак объёмом 20 л для отопителей MULTEAT TEX 20 и NEXT 20P.",
        fullDescription: `Топливный бак предназначен для отопителей MULTEAT TEX 20 и MULTEAT NEXT 20P. Он также подходит к некоторым более ранним моделям отопителей. Совместимость со старой моделью можно уточнить у продавца по телефону или электронной почте.

В бак встроено фильтрующее сито для очистки топлива при заливке.`,
        specifications: {
            Объём: "20 л",
            "Заливной фильтр": "Есть",
            Кран: "Есть",
            "Кран для слива отстоя": "Есть",
            "Внутренний диаметр топливного шланга": "12 мм",
            "Длина топливного шланга": "800 мм",
            "Габаритные размеры": "320 × 320 × 650 мм (Д × Ш × В)",
            Масса: "6 кг",
        },
    },
    {
        id: 2,
        name: "Навесной вентилятор MULTEAT ВМУ 230-16",
        category: "fans",
        image: fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_main.jpg"),
        images: [
            fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_main.jpg"),
            fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_obshiy vid.jpg"),
            fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_1.jpg"),
            fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_2.jpg"),
            fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_3.jpg"),
            fanImage("ВМУ 230-16", "MULTEAT_VMU 230-16_4.jpg"),
        ],
        imageDescriptions: [
            "Навесной вентилятор MULTEAT ВМУ 230-16, общий вид.",
            "Вентилятор ВМУ 230-16.",
            "Вентилятор, вид спереди.",
            "Вентилятор, боковой вид.",
            "Вентилятор на отопителе.",
            "Вентилятор в работе.",
        ],
        price: 6480,
        warranty: "5 лет",
        description:
            "Навесной вентилятор для ускоренного и равномерного прогрева воздуха.",
        fullDescription:
            "Навесной вентилятор устанавливается непосредственно на отопитель MULTEAT и направленно подаёт разогретый воздух в помещение.",
        archiveUrl: Vmu230Passport,
        specifications: {
            Назначение: "Для всех моделей отопителей MULTEAT",
            "Напряжение питания": "220 В, 50 Гц",
            "Мощность двигателя": "16 Вт",
            Производительность: "450 м³/ч",
            "Габаритные размеры": "430 × 265 × 180 мм (Д × Ш × В)",
            Масса: "3,5 кг",
        },
    },
    {
        id: 11,
        name: "Потолочный вентилятор MULTEAT ВП 300-34",
        category: "fans",
        image: fanImage("ВП 300-34", "MULTEAT_VP 300-34_main.jpg"),
        images: [
            fanImage("ВП 300-34", "MULTEAT_VP 300-34_main.jpg"),
            fanImage("ВП 300-34", "MULTEAT_VP 300-34_ustanovleniy.jpg"),
        ],
        imageDescriptions: [
            "Потолочный вентилятор MULTEAT ВП 300-34, общий вид.",
            "Вентилятор ВП 300-34, установленный на потолке.",
        ],
        price: 4800,
        description:
            "Потолочный вентилятор для равномерного прогрева помещения и снижения теплопотерь через кровлю.",
        fullDescription: `Потолочный вентилятор устанавливается в верхней части помещения и направляет скопившийся под потолком тёплый воздух вниз. Это помогает снизить теплопотери через кровлю и равномернее прогреть помещение.

В больших помещениях можно установить несколько вентиляторов в наиболее холодных местах.`,
        specifications: {
            "Напряжение питания": "220 В, 50 Гц",
            "Мощность двигателя": "34 Вт",
            Производительность: "750 м³/ч",
            "Габаритные размеры": "360 × 360 × 300 мм",
            Масса: "3 кг",
        },
    },
    {
        id: 5,
        name: "Дымоходы MULTEAT",
        category: "parts",
        image: "",
        images: [],
        price: 0,
        description: "Элементы дымохода из нержавеющей стали AISI 430.",
        fullDescription:
            "Подберите элементы дымохода в конструкторе ниже. В документе указана нержавеющая сталь AISI 430 толщиной 0,5 мм.",
        specifications: {
            Материал: "Нержавеющая сталь AISI 430",
            Толщина: "0,5 мм",
        },
        constructorType: "chimney",
    },
    {
        id: 12,
        name: "Дефлектор MULTEAT PLUS, eco18, GRATE, NEXT, TEX",
        category: "parts",
        image: partImage("MULTEAT_zap_deflektor_plus-eco18-grate-next.jpg"),
        images: [partImage("MULTEAT_zap_deflektor_plus-eco18-grate-next.jpg")],
        imageDescriptions: ["Дефлектор для отопителей MULTEAT PLUS, eco18, GRATE, NEXT и TEX."],
        price: 800,
        description: "Дефлектор для совместимых моделей отопителей MULTEAT.",
        fullDescription:
            "Дефлектор для моделей MULTEAT PLUS, eco18, GRATE, NEXT и TEX. При оформлении заказа выберите модель отопителя.",
        modelSelectLabel: "Выберите модель отопителя",
        modelOptionLabel: "Модель отопителя",
        modelOptions: ["MULTEAT PLUS", "MULTEAT eco18", "MULTEAT GRATE", "MULTEAT NEXT", "MULTEAT TEX"],
    },
    {
        id: 13,
        name: "Дефлектор MULTEAT MUL, eco40, CUB",
        category: "parts",
        image: partImage("MULTEAT_zap_deflektor_multeat_mul-eco40-cub.jpg"),
        images: [partImage("MULTEAT_zap_deflektor_multeat_mul-eco40-cub.jpg")],
        imageDescriptions: ["Дефлектор для отопителей MULTEAT MUL, eco40 и CUB."],
        price: 1100,
        description: "Дефлектор для совместимых моделей отопителей MULTEAT.",
        fullDescription:
            "Дефлектор для моделей MULTEAT MUL, eco40 и CUB. При оформлении заказа выберите модель отопителя.",
        modelSelectLabel: "Выберите модель отопителя",
        modelOptionLabel: "Модель отопителя",
        modelOptions: ["MULTEAT MUL", "MULTEAT eco40", "MULTEAT CUB"],
    },
    {
        id: 14,
        name: "Тарелка MULTEAT MUL, eco40, CUB",
        category: "parts",
        image: partImage("MULTEAT_zap_tarelka_mul-eco40-cub.jpg"),
        images: [partImage("MULTEAT_zap_tarelka_mul-eco40-cub.jpg")],
        imageDescriptions: ["Топливная тарелка для отопителей MULTEAT MUL, eco40 и CUB."],
        price: 900,
        description: "Топливная тарелка для совместимых моделей отопителей MULTEAT.",
        fullDescription:
            "Топливная тарелка для моделей MULTEAT MUL, eco40 и CUB. При оформлении заказа выберите модель отопителя.",
        modelSelectLabel: "Выберите модель отопителя",
        modelOptionLabel: "Модель отопителя",
        modelOptions: ["MULTEAT MUL", "MULTEAT eco40", "MULTEAT CUB"],
    },
    {
        id: 15,
        name: "Тарелка MULTEAT PLUS, GRATE, eco18, NEXT, TEX",
        category: "parts",
        image: partImage("MULTEAT_zap_tarelka_plus-eco18-grate-next.jpg"),
        images: [partImage("MULTEAT_zap_tarelka_plus-eco18-grate-next.jpg")],
        imageDescriptions: ["Топливная тарелка для отопителей MULTEAT PLUS, GRATE, eco18, NEXT и TEX."],
        price: 450,
        description: "Топливная тарелка для совместимых моделей отопителей MULTEAT.",
        fullDescription:
            "Топливная тарелка для моделей MULTEAT PLUS, GRATE, eco18, NEXT и TEX. При оформлении заказа выберите модель отопителя.",
        modelSelectLabel: "Выберите модель отопителя",
        modelOptionLabel: "Модель отопителя",
        modelOptions: ["MULTEAT PLUS", "MULTEAT GRATE", "MULTEAT eco18", "MULTEAT NEXT", "MULTEAT TEX"],
    },
    {
        id: 16,
        name: "Седло, подвеска, рычаг или заслонка",
        category: "parts",
        image: partImage("MULTEAT_zap_sedlo-podveska-rychag-zaslonka.jpg"),
        images: [partImage("MULTEAT_zap_sedlo-podveska-rychag-zaslonka.jpg")],
        imageDescriptions: ["Седло, подвеска, рычаг и заслонка отопителя MULTEAT."],
        price: 500,
        description: "Выберите нужную деталь. Цена указана за одну позицию.",
        fullDescription:
            "При оформлении заказа укажите заводской номер изделия или модель отопителя и год выпуска. Выбранная деталь будет добавлена в заказ.",
        modelSelectLabel: "Выберите деталь",
        modelOptionLabel: "Деталь",
        modelOptions: ["Седло", "Подвеска", "Рычаг", "Заслонка"],
    },
]

const categoryOrder: ProductCategory[] = ["heaters", "fans", "parts"]

export const categories: ProductCategoryOption[] = [
    { id: "all", name: getCategoryLabel("all"), count: products.length },
    ...categoryOrder.map((id) => ({
        id,
        name: getCategoryLabel(id),
        count: products.filter((product) => product.category === id).length,
    })),
]
