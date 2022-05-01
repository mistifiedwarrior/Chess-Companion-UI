import {reverseBoard} from './utils'

const GAME = 'GAME'
export const SET_GAME = `SET_${GAME}`

export const setGame = (game, color) => {
  if (color === 'BLACK' && game.board) {
    game.board = reverseBoard(game.board)
  }
  return {type: SET_GAME, game}
}
