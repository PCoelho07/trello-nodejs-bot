const Trello = require('trello')
const rp = require('request-promise')

const API_TOKEN = process.env.API_TOKEN
const APP_KEY = process.env.APP_KEY

class TrelloService {

  constructor() {
    this.t = new Trello(APP_KEY, API_TOKEN)
  }

  async me() {
    let data = await this.t.getMember('me')

    return data
  }

  async getBoardData() {
    let boardId = process.env.BOARD_ID
    let data = await this.t.getListsOnBoard(boardId)

    return data
  }

  async getCardsByList(listName) {

    const selectedList = await this.getListIdByName(listName)

    const { id: listId } = selectedList

    const data = await this.t.getCardsOnList(listId)

    return data
  }

  async watchList(listName) {

    const selectedList = await this.getListIdByName(listName)

    const { id: listId } = selectedList

    const data = await this.t.getCardsOnList(listId)

    if (data.length > 0) {
      return true
    }

    return false
  }

  async getListIdByName(listName) {
    const lists = await this.getBoardData()
    let selectedList = {}

    for (let list of lists) {
      const { name } = list

      if (name.toString().indexOf(listName) === 0) {
        selectedList = list
        break
      }
    }

    return selectedList
  }
}


module.exports = TrelloService
