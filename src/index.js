const bot = require('./bot.js')

const NotificationService = require('./services/notification')

const taskSchedule = new NotificationService(bot.botInstance)

taskSchedule.createWatchListTask(process.env.CHAT_ID)


