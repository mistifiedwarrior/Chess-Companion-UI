import React, {useEffect, useState} from 'react'
import {Button, Stack} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import TournamentHeader from '../../common/components/TournamentHeader'
import API from '../../API'
import {setTournamentUser} from '../../modules/tournament/action'
import CreateTournamentModal from '../../modules/tournament/components/CreateTournamentModal'
import Tournaments from '../../modules/tournament/components/Tournaments'

// eslint-disable-next-line max-lines-per-function,max-statements
const Tournament = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.tournament)
  
  useEffect(() => {
    API.tournament.validate()
      .then((tournamentUser) => dispatch(setTournamentUser(tournamentUser)))
      .catch(() => router.push('/login'))
  }, [])
  
  if (user === null) {
    return <></>
  }
  
  return <>
    <Stack height={'100vh'}>
      <TournamentHeader/>
      <Stack justifyContent={'flex-end'} direction={'row'} pr={2}>
        {user.role === 'ADMIN' &&
          <Button variant={'contained'} onClick={() => setOpen(!open)}>Create New Tournament</Button>}
      </Stack>
      <Tournaments/>
    </Stack>
    <CreateTournamentModal open={open} handleClose={() => setOpen(false)}/>
  </>
}

export default Tournament
