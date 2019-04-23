const Trello = require('trello')

const API_TOKEN = '1fa06334b27485c9f7b89a09727b1bf62a227727733e57dd58320f7a514fffe8'
const APP_KEY = '35ab36c526d77c821813a12880fbb5da'

const trello = new Trello(APP_KEY, API_TOKEN)

trello.getBoards('me', (response) => {
  console.log(response)
})
