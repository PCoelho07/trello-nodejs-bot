require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const TrelloService = require('./services/trello')

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, { polling: true })
const trello = new TrelloService()

bot.onText(/\/start/, (msg) => {

  let textMessage = ' Opa, e aí, tudo tranquilo?\n\nEstou aqui para te ajudar a gerenciar o teu trello' +
    ' e consequentemente te ajudar a a ser mais organizado.\n' +
    '\n' +
    'Conte cmg!'

  bot.sendMessage(msg.chat.id, textMessage)
})

bot.onText(/\/pendentes/, async (msg) => {

  const data = await trello.getCardsByList('Hoje')

  let textMessage = '*Cards que vc deixou pendente hoje*\n\n'
  textMessage += getSanitizedCardNames(data)

  bot.sendMessage(msg.chat.id, textMessage, { parse_mode: 'Markdown' })
})

bot.onText(/\/semana/, async (msg) => {

  const data = await trello.getCardsByList('Essa semana')

  let textMessage = '*Cards para a semana*\n\n'
  textMessage += getSanitizedCardNames(data)

  bot.sendMessage(msg.chat.id, textMessage, { parse_mode: 'Markdown' })
})

bot.onText(/\/me/, async (msg) => {

  const data = await trello.me()
  const { fullName: name, email, gravatarHash } = data

  let boardsQtt = data.idBoards.length

  let textMessage = `Nome: ${name}\nEmail: ${email}\nQuantidade de quadros: ${boardsQtt}\n`
  let imageUrl = `https://www.gravatar.com/avatar/${gravatarHash}`

  bot.sendPhoto(msg.chat.id, imageUrl, { caption: "Opa, \nAqui sua foto do perfil! " })
  bot.sendMessage(msg.chat.id, textMessage)
})

bot.on('message', async (msg) => {
  let board = 'board'

  if (msg.text.toString().toLocaleLowerCase().indexOf(board) === 0) {
    const data = await trello.getBoardData()
    console.log(data)
  }
})


bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});


function getSanitizedCardNames(data) {

  if (data.length === 0) {
    return 'Não existem cards! :)'
  }

  let cardNames = []

  for (let cards of data) {
    const { name } = cards
    cardNames.push(`- ${name}`)
  }

  let textMessage = cardNames.join('\n')

  return textMessage
}
