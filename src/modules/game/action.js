const GAME = 'GAME'
export const SET_GAME = `SET_${GAME}`

export const setGame = (game) => ({type: SET_GAME, game})
