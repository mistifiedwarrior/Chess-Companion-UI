import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import API from '../../API'
import {setOpponent, setUser} from '../../modules/players/action'
import {setGame} from '../../modules/game/action'
import {useRouter} from 'next/router'
import BroadCastGame from '../../modules/game/BroadCastGame'

const WatchGame = () => {
  const {game, players} = useSelector((state) => state)
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    if (router.query && router.query.gameId) {
      API.games.getStatusBy(router.query.gameId)
        .then(({game: gameStatus, player1, player2}) => {
          const whitePlayer = player1.color === 'WHITE' ? player1 : player2
          dispatch(setUser(whitePlayer))
          dispatch(setGame(gameStatus, players.user && players.user.color))
          dispatch(setOpponent(player1.color === 'BLACK' ? player1 : player2))
        })
    }
  }, [router.query])
  
  if (!game || !game.gameId) {
    return <></>
  }
  
  return <BroadCastGame/>
}

export default WatchGame
