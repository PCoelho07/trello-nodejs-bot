const cron = require('node-cron')
const TrelloService = require('./trello')

class NotificationService {

  constructor(bot) {
    this.bot = bot
  }

  createWatchListTask(chatId) {
    const task = cron.schedule('0 0 18 * * 1-5', async () => {
      console.log('Iniciando Job :)\n')
      const trello = new TrelloService()

      const hasCards = await trello.watchList('Agora/Pomodoro')

      if (hasCards) {
        let textMessage = '*Aviso*\n'
          + "Vc esqueceu alguns cards na lista 'Agora/Pomodoro'!"

        this.bot.sendMessage(chatId, textMessage, { parse_mode: 'Markdown' })
      }
    }, {
        timezone: "America/Sao_Paulo"
      })
  }

}

module.exports = NotificationService
