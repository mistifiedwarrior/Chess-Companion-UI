import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import API from '../../API'
import {useDispatch} from 'react-redux'
import {setTournamentUser} from '../../modules/tournament/action'
import {handleTournamentLogin} from '../../utils/storage'

const OAuth = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const {code} = router.query
    if (code) {
      API.tournament.login(code)
        .then(({user, token}) => {
          dispatch(setTournamentUser(user))
          handleTournamentLogin(token)
          return router.push('/tournament')
        })
        .catch(() => router.push('/tournament'))
    }
  }, [router.query.code])
  
  return <></>
}

export default OAuth
