const USER = 'USER'

export const SET_USER = `SET_${USER}`
export const SET_OPPONENT = `SET_${USER}_OPPONENT`

export const setUser = (user) => ({type: SET_USER, user})
export const setOpponent = (opponent) => ({type: SET_OPPONENT, opponent})
