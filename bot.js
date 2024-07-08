const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const pool = require('./db');

const {
    getPhoneBtn, channelsBtn, startBtn, contactBtn, coursesBtn, mathContent, infoContentBtn, englishContent,
    russianContent, ITcontent, arabContent, arabKidsContent
} = require("./botOptions");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const token = '6331159759:AAFN6_9rdAwdXOe7SlgrowEaJ2bCFeJSpEg';
const bot = new TelegramBot(token, {polling: true});

const channels = ['-1002170742320'];

let userMessages = {};

const upload = multer({ dest: 'uploads/' });

bot.setMyCommands([
    {command: '/start', description: 'Bosh menyu'},
]);

bot.on('message', async msg => {
    console.log(msg);
    const chatId = msg?.chat?.id;
    const text = msg?.text;
    const messageId = msg?.message_id;
    const firstName = msg?.from?.first_name;
    const userId = msg?.from?.id;
    const lastName = msg?.from?.last_name;
    const username = msg?.from?.username;
    if (text === '/start') {
        const query = 'SELECT * FROM users u where u.telegram_id = $1';
        const result = await pool?.query(query, [chatId]);
        if (result.rowCount > 0) {
            if (await checkJoinChannels(chatId, userId)) {
                await bot.sendMessage(chatId, `Salom ${result.rows[0].first_name}, o'zingizga menyudan kerakli bo'limni tanlang`, startBtn)
            }
        } else {
            await bot.sendMessage(chatId, "Salom " + firstName + "\n Iltimos telefon raqamingizni yuboring", getPhoneBtn)
            if (!userMessages[chatId]) {
                userMessages[chatId] = [];
            }
        }
    } else {
        if (await checkJoinChannels(chatId, userId)) {
            switch (text) {
                case '📚 Kurslar': {
                    await bot.sendMessage(chatId, "Ma'lumot olmoqchi bo'lgan kursni tanlang", coursesBtn)
                    break
                }
                case "Orqaga": {
                    await bot.sendMessage(chatId, "Menyudan kerakli bo'limni tanlang", startBtn)
                    break
                }
                case "Matematika": {
                    await sendCourseContentMessage(chatId, mathContent)
                    break;
                }
                case "Ingliz tili": {
                    await sendCourseContentMessage(chatId, englishContent)
                    break;
                }
                case "Rus tili": {
                    await sendCourseContentMessage(chatId, russianContent)
                    break;
                }
                case "IT": {
                    await sendCourseContentMessage(chatId, ITcontent)
                    break;
                }
                case "Arab tili": {
                    await sendCourseContentMessage(chatId, arabContent)
                }
                case "Arab tili kids": {
                    await sendCourseContentMessage(chatId, arabKidsContent)
                    break;
                }
                case "🤝 Bog'lanish": {
                    await bot.sendMessage(chatId, "Aloqa uchun:\n" +
                        "📞+99895-960-55-66\n" +
                        "📞+99895-970-55-66\n" +
                        "👉@Zukko_Oquv_Markazi", contactBtn)
                    break
                }
                case "📃 Shartnoma": {
                    await bot.sendMessage(chatId, "O'zingizga kerakli bo'limni tanlang", getContractBtn(chatId))
                    break
                }
                // case "Mening shartnomalarim": {
                //     const query = "SELECT * FROM contract c where c.telegram_id = $1";
                //     const result = await pool?.query(query, [chatId]);
                //     if (result.rowCount > 0) {
                //         await bot.sendMessage(chatId, "Sizning shartnomalaringiz: \n" +
                //             result.rows.map((row, index) => {
                //                 const dateOptions = {year: 'numeric', month: 'short', day: '2-digit'};
                //                 let formattedDate = new Date(row.joined_at).toLocaleDateString('en-US', dateOptions);
                //
                //                 const [month, day, year] = formattedDate.split(' ');
                //                 formattedDate = `«${day.replace(',', '')}» ${month} ${year}`;
                //
                //                 // const id = btoa(row.id)
                //                 return `${index + 1}. Shartnoma raqami: ${row.id}\n` +
                //                     `Fan: ${row.subject}\n` +
                //                     `Status: ${row.status === null ? "Tasdiqlash jarayonida" : row.status === true ? "Tasdiqlangan" : "Bekor qilingan\n" +
                //                         `Izoh: ${row.description || "Yo'q"}`}\n` +
                //                     `Sana: ${formattedDate}`;
                //             }).join("\n\n") +
                //             `\n\nAgar shartnoma bekor qilinganligi haqida ko'proq ma'lumot olish uchun @ZukkoAdmin ga murojaat qiling.\n` +
                //             "Shartnoma nusxasini ko'rish yoki yuklab olish uchun pastdagi shartnoma raqamini tanlang\n", {
                //                 reply_markup: JSON.stringify({
                //                     inline_keyboard: groupArrayElements(result.rows.map(row => {
                //                         return {
                //                             text: row.id,
                //                             web_app: {url: `https://zukko-academy-bot-web-6562e6a9fd84.herokuapp.com/document-pdf/${row.id}`}
                //                         };
                //                     }))
                //                 })
                //             }
                //         );
                //     } else {
                //         await bot.sendMessage(chatId, "Sizda shartnomalar mavjud emas");
                //     }
                //     break;
                // }
                default: {
                    await bot.sendMessage(chatId, "Kechirasiz siz mavjud bo'lmagan buyruq kiritmoqdasiz")
                }
            }
        }
    }
});

bot.on('contact', async (msg) => {
    console.log(msg);
    const chatId = msg?.chat?.id;
    const username = msg?.chat?.username;
    const userId = msg?.contact?.user_id;
    const firstName = msg?.contact?.first_name
    const lastName = msg?.contact?.last_name
    const phoneNumber = msg?.contact?.phone_number
    if (await checkJoinChannels(chatId, userId, true)) {
        try {
            const query = "INSERT INTO users (telegram_id, first_name, last_name, username, phone) VALUES ( $1, $2, $3, $4, $5 )"
            await pool?.query(query, [chatId, firstName, lastName, username, phoneNumber])
        } catch (err) {
            console.log(err)
            const message = await bot.sendMessage(chatId, "Ma'lumotlarni saqlashda xatolik yuz berdi\n" + err)
            userMessages[chatId] = [...(userMessages[chatId] || []), message.message_id];
        }
    }
});

bot.on('callback_query', async callbackQuery => {
    console.log(callbackQuery)
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const messageId = message.message_id;
    const userId = callbackQuery.from.id;
    const data = callbackQuery.data
    switch (data) {
        case '/check': {
            return await checkJoinChannels(chatId, userId, true, messageId);
        }
    }
});

const checkJoinChannels = async (chatId, userId, start = false, messageId = null) => {
    let isMemberOfAllChannels = true;
    for (const channel of channels) {
        try {
            const chatMember = await bot.getChatMember(channel, userId);
            if (chatMember.status === 'left' || chatMember.status === 'kicked') {
                isMemberOfAllChannels = false;
                break;
            }
        } catch (error) {
            isMemberOfAllChannels = false;
            break;
        }
    }

    if (messageId) {
        if (userMessages[chatId]) {
            for (const msgId of userMessages[chatId]) {
                try {
                    await bot.deleteMessage(chatId, msgId);
                } catch (err) {
                    console.error(err);
                }
            }
            userMessages[chatId] = [];
        }
    }

    if (isMemberOfAllChannels) {
        try {
            if (start) {
                await bot.sendMessage(chatId, 'Rahmat! Siz barcha kanallarga ulangan ekansiz.', startBtn);
                delete userMessages[chatId]
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        if (!start && !userMessages[chatId]) userMessages[chatId] = []
        if (messageId) {
            try {
                const message = await bot.sendMessage(chatId, "Siz, barcha kanallarga a'zo bo'lmagansiz! iltimos, a'zo bo'lib qayta urinib ko'ring", {reply_markup: {remove_keyboard: true}});
                userMessages[chatId].push(message.message_id);
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const message = await bot.sendMessage(chatId, 'Iltimos, ushbu kanallarga ulaning va tekshirish tugmasini bosing.', {reply_markup: {remove_keyboard: true}});
                userMessages[chatId].push(message.message_id);
            } catch (err) {
                console.error(err);
            }
        }
        try {
            const message = await bot.sendMessage(chatId, 'Quyidagi kanallarga ulaning:', channelsBtn);
            userMessages[chatId].push(message.message_id);
        } catch (err) {
            console.error(err);
        }
    }
    return isMemberOfAllChannels
};

const sendCourseContentMessage = async (chatId, courseContent) => {
    const message = await bot.sendMessage(chatId, "... ✍️")
    const photoPath = path.join(__dirname, './Zakiy.jpg');
    await bot.sendPhoto(chatId, photoPath, {...courseContent, ...infoContentBtn})
        .then(() => {
            bot.deleteMessage(chatId, message.message_id)
        })
}

const getContractBtn = (chatId) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: "Shartnoma shartlari",
                        web_app: {url: "https://zukko-academy-bot-web-6562e6a9fd84.herokuapp.com/conditions"}
                    },
                ],
                [
                    {
                        text: "Shartnoma tuzishga ariza topshirish",
                        web_app: {url: "https://zukko-academy-bot-web-6562e6a9fd84.herokuapp.com/document-form/" + chatId}
                    },
                ],
                // [
                //     {text: "Mening shartnomalarim"}
                // ],
                [
                    {text: "Orqaga"}
                ]
            ]
        }
    }
}

function groupArrayElements(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 3) {
        result.push(arr.slice(i, i + 3));
    }
    return result;
}

app.get('/', (req, res) => {
    res.send('Server is running...');
})

app.post('/contract', async (req, res) => {
    try {
        const {chatId, fullName, address, phone, subject, signature, passport} = req.body;
        const query = "INSERT INTO contract (telegram_id, full_name, address, subject, phone, signature, passport) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

        let newContract = await pool.query(query, [chatId, fullName, address, subject, phone, signature, passport]);
        newContract = newContract.rows[0];
        res.status(200).json({message: 'Contract saved successfully'});

        const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = new Date(newContract.joined_at).toLocaleDateString('uz-UZ', dateOptions).replace('.', '').replace('.', '');

        bot.sendMessage(chatId, "Sizning arizangiz qabul qilindi.\n" +
            "Ariza ma'lumotlari: \n" +
            "Shartnoma raqami: " + newContract.id + "\n" +
            "F.I.O: " + fullName + "\n" +
            "Manzil: " + address + "\n" +
            "Telefon raqam: " + phone + "\n" +
            "Passport: " + passport + "\n" +
            "Sana: " + formattedDate + "\n"
        )
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error saving contract'});
    }
});

app.get('/contract', async (req, res) => {
    const contractId = req?.query?.contractId
    const query = "SELECT * FROM contract c where c.id = $1";
    const result = await pool?.query(query, [contractId]);
    if (result.rowCount > 0) {
        res.status(200).json(result.rows[0]);
    } else {
        res.status(404).json({message: 'Contract not found'})
    }
})

app.get('/contracts', async (req, res) => {
    const query = "SELECT c.id, c.telegram_id, c.full_name, c.address, c.subject, c.phone, c.passport, c.joined_at, c.status FROM contract c";
    const result = await pool?.query(query);
    if (result.rowCount > 0) {
        res.status(200).json(result.rows);
    } else {
        res.status(404).json({message: 'Contracts not found'})
    }
})

app.post('/upload', upload.single('file'), (req, res) => {
    const chatId = req?.query?.chatId;
    const file = req.file;

    if (!chatId) {
        return res.status(400).send('chatId mavjud emas.');
    }

    if (!file) {
        return res.status(400).send('Hech qanday fayl yuklanmadi.');
    }

    // Fayl nomini kengaytmasi bilan tekshiring
    if (!file.originalname.endsWith('.pdf')) {
        return res.status(400).send('Fayl PDF formatda emas.');
    }

    const url = `https://api.telegram.org/bot${token}/sendDocument`;
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', fs.createReadStream(file.path), 'shartnoma.pdf');

    axios.post(url, formData, {
        headers: formData.getHeaders()
    })
        .then(response => {
            console.log('Telegramga yuborildi:', response.data);
            res.send('PDF fayl muvaffaqiyatli yuborildi.');
        })
        .catch(error => {
            console.error('Telegramga yuborishda xatolik yuz berdi:', error);
            res.status(500).send('Telegramga yuborishda xatolik yuz berdi.');
        });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
