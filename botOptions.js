module.exports = {
    startBtn: {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {text: '🌐 Ilova', web_app: {url: 'https://zukko.talimsoft.uz/p/'}},
                    {text: '📚 Kurslar'},
                ],
                [
                    {text: "🤝 Bog'lanish"},
                    {text: "📃 Shartnoma"},
                ]
            ]
        }
    },
    getPhoneBtn: {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {text: "Telefon raqamni yuborish", request_contact: true}
                ]
            ]
        }
    },
    channelsBtn: {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Zukko", url: 'https://t.me/Zukko_Oquv_Markazi'},
                    {text: "Tekshirish", callback_data: '/check'},
                ]
            ]
        }
    },
    contactBtn: {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Instagram", url: "https://www.instagram.com/direct/t/17844433281196007"},
                    {text: "Web", web_app: {url: "https://zakiy-academy.uz/contact"}}
                ],
                [
                    {text: "Zukko admin", url: "https://t.me/ZukkoAdmin"}
                ]
            ]
        }
    },
    infoContentBtn: {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Telegram", url: "https://t.me/Zukko_Oquv_Markazi"},
                    {text: "Instagram", url: "https://www.instagram.com/zukko_oquv_markaz/"}
                ],
                [
                    {text: "Telegram bot", url: "https://t.me/zukko_shartnoma_bot"},
                    {text: "Web site", web_app: {url: "https://zakiy-academy.uz"}}
                ],
                [
                    {text: "Zukko admin", url: "https://t.me/ZukkoAdmin"}
                ]
            ]
        }
    },
    coursesBtn: {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {text: 'Matematika'},
                    {text: 'Ingliz tili'},
                    {text: 'Rus tili'}
                ],
                [
                    {text: "IT"},
                    {text: "Arab tili"},
                    {text: "Arab tili kids"},
                ],
                [
                    {text: "Orqaga"}
                ]
            ]
        }
    },
    mathContent: {
        caption: "#Matematika\n" +
            "\n" +
            "Matematika kurslarimiz haftada 3 marotaba dars davomiyligi esa 1 soat 50 minut(sal kam 2 soat) qilib belgilangan.🤩🤩🤩\n" +
            "\n" +
            "Matematika kursimizga 10 yoshdan qabul qilamiz noldan boshlab oʻrganishingiz yoki  oʻrgangan joyingizdan davom eritishingiz mumkin. ✅✅✅\n" +
            "\n" +
            "Matematika kursimiz 2 ga bo'linadi, Maktab o'quvchilari uchun va abituriyentlar uchun. 💥💥💥\n" +
            "\n" +
            "Oylik toʻlov Matematika kursi uchun 400ming soʻm etib belgilangan.❗️❗️\n" +
            "\n" +
            "Aloqa uchun:\n" +
            "📞+99895-960-55-66\n" +
            "📞+99895-970-55-66\n"
    },
    englishContent: {
        caption: "#Ingiliz_tili\n" +
            "  \n" +
            "\n" +
            "\n" +
            "Ingiliz tili kursimiz haftada 3 marotaba dars davomiyligi esa 1 soat 30 daqiqa qilib belgilangan.🤩🤩🤩\n" +
            "\n" +
            "Ingiliz tili kursimizga 8 yoshdan qabul qilinadi. Siz ingiliz tili kursimizda nôldan òrganishingiz yoki òrgangan joyingizdan davom ettirishingiz mumkin.✅✅✅\n" +
            "\n" +
            "\n" +
            "Ingiliz tili kursimiz uchun oylik tòlov miqdori 400.000 sõm etib belgilangan❗️❗️❗️\n" +
            "\n" +
            "\n" +
            "Murojat uchun:\n" +
            "📞+99895-960-55-66\n" +
            "📞+99895-970-55-66\n"
    },
    russianContent: {
        caption: "#Rus_tili\n" +
            "\n" +
            "Rus tili kurslarimiz haftada 3 marotaba dars davomiyligi esa 1 soat 50 minut(sal kam 2 soat) qilib belgilangan.🤩🤩🤩\n" +
            "\n" +
            "Rus tili kursimizga 10 yoshdan qabul qilamiz noldan boshlab oʻrganishingiz yoki  oʻrgangan joyingizdan davom eritishingiz mumkin. ✅✅✅\n" +
            "\n" +
            "Kursimiz aniq rejalashtirilgan mavzular va metodlar faqatgina razgavoʻr yani muloqotda ishlatiladigan grammatik mavzular, eng kerakli lugʻatlar va dialoglar yordamida oʻrgatiladi. 📚👩‍🏫\n" +
            "\n" +
            "Rus tili kursimiz 6 oydan 9 oygacha moʻljallangan farzandingiz vazifalarni vaqtida bajarib darslarda faol ishtirok etsa albatta natijasi  tezroq va aʼlo boʻladi.💥💥💥\n" +
            "\n" +
            "Oylik toʻlov Rus tili kursi uchun 400ming soʻm etib belgilangan.❗️❗️\n" +
            "\n" +
            "Aloqa uchun:\n" +
            "📞+99895-960-55-66\n" +
            "📞+99895-970-55-66\n"
    },
    arabKidsContent: {
        caption: "#Arab_tili_kids\n" +
            "\n" +
            "Arab tili kisd guruhlarimiz 4-yoshdan 7-yoshgacha boʻlib yani bolajonlarga yozish, oʻqitish va soʻzlashish oʻrgatiladi.📔🖊📖\n" +
            "\n" +
            "Darslar eng yangi usullar, foydali va sifatli yoʻnalishlar bilan olib boriladi.😇🤩\n" +
            "\n" +
            "Oylik toʻlov Arab tili kurs 320 ming soʻm etib belgilangan.❗️❗️❗️\n" +
            "\n" +
            "Aloqa uchun:\n" +
            "📞+99895-960-55-66\n" +
            "📞+99895-970-55-66\n"
    },
    arabContent: {
        caption: "#Arab_tili\n" +
            "\n" +
            "Arab tili kurslarimiz 6 oyga moʻljallangan, haftada 2 marotaba dars davomiyligi esa 1 yarim soat qilib belgilangan. ❗️❗️❗️\n" +
            "\n" +
            "6 oylik kursimiz ichida oʻquvchi arab tilida bemalol yoza oladi va istalgan badiy  kitoblarni oʻqiy oladi. 🖊📖\n" +
            "\n" +
            "Arab tili kurslarimizda faqat fonetika va grammatika oʻrgatiladi. 📚\n" +
            "\n" +
            "\n" +
            "Yosh chegarasi  7 yoshdan 70 yosh kattalar gruppasi hisoblanib, guruhlar yigit va qizlar uchun aralash holda tashkil etiladi. 🥳\n" +
            "\n" +
            "\n" +
            "Oylik toʻlov Arab tili kurs 320 ming soʻm etib belgilangan.✅\n" +
            "\n" +
            "Aloqa uchun:\n" +
            "📞+99895-960-55-66\n" +
            "📞+99895-970-55-66\n"
    },
    ITcontent: {
        caption: "#IT #Frontend #Backend #WebFullStack #CyberSecurity\n" +
            "\n" +
            "IT bo'yicha kurslarni xar xil yo'nalishlari mavjud:\n" +
            "1. Boshlang'ich komyuter savodxonlik\n" +
            "2. Frontend\n" +
            "3. Backend\n" +
            "4. Full Stack\n" +
            "5. Cyber Security (Kiber xavfsizlik boshlang'ich kurs)\n" +
            "\n" +
            "Kurs davomiyligi yo'nalishga qarab belgilanadi:\n" +
            "1. Komyuter savodxonligi 2-3 oy haftasiga 2 kun\n" +
            "2. Frontend 7 oy + 2 oy (umumiy 9 oy) amaliyot, haftasiga 3 marta 1.5-2 soat\n" +
            "3. Backend 7 oy + 2 oy (umumiy 9 oy) amaliyot, haftasiga 3 marta 1.5-2 soat\n" +
            "4. Full Stack (Frontend + Backend) 12-14 oy, haftasiga 3 marta 1.5-2 soat\n" +
            "5. Kiber xavfsizlik 2-3 oy haftasiga 3 marta 1.5 soat\n" +
            "\n" +
            "Yosh chegarasi 14 yoshdan boshlanadi, guruhlar yigit va qizlar uchun aralash holda tashkil etiladi\m" +
            "Oylik toʻlov Dasturlash kurslar 650 ming soʻm etib belgilangan.✅\n" +
            "\n" +
            "Murojat uchun:\n" +
            "📞+99895-960-55-66\n" +
            "📞+99895-970-55-66\n"
    }
};
