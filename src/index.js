require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {

  let textMessage = ' Opa, e aí, tudo tranquilo?\n\nEstou aqui para te ajudar a gerenciar o teu trello' +
    ' e consequentemente te ajudar a a ser mais organizado.\n' +
    '\n' +
    'Conte cmg!'

  bot.sendMessage(msg.chat.id, textMessage)
})

bot.onText(/\/pendentes/, (msg) => {

  let textMessage = 'Cards que vc deixou pendente!'

  bot.sendMessage(msg.chat.id, textMessage)
})

bot.onText(/\/hoje/, (msg) => {

  let textMessage = 'Cards que estão na lista ~Hoje~'

  bot.sendMessage(msg.chat.id, textMessage)
})

bot.onText(/\/semana/, (msg) => {

  let textMessage = 'Cards que estão na lista ~Semana~'

  bot.sendMessage(msg.chat.id, textMessage)
})



