const Trello = require('node-trello')

const API_TOKEN = '1fa06334b27485c9f7b89a09727b1bf62a227727733e57dd58320f7a514fffe8'
const APP_KEY = '35ab36c526d77c821813a12880fbb5da'



class TrelloAccount {

  constructor() {
    this.t = new Trello(APP_KEY, API_TOKEN)
  }

  me() {

    return this.t.get('/1/members/me', (err, data) => {
      if (err)
        throw err;

      data = data
      return data
    })

  }
}


module.exports = TrelloAccount
