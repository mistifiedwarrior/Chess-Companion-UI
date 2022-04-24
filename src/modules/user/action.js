const USER = 'USER'

export const SET_USER = `SET_${USER}`

export const setUser = (user) => ({type: SET_USER, user})
