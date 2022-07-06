const TOURNAMENT = 'TOURNAMENT'

export const SET_TOURNAMENT_USER = `SET_${TOURNAMENT}_USER`

export const setTournamentUser = (user) => ({type: SET_TOURNAMENT_USER, user})
