import {List, ListItem, ListItemButton, ListItemText, Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import API from '../../../API'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([])
  
  useEffect(() => {
    API.tournament.getAllTournaments()
      .then(setTournaments)
  }, [])
  
  return <Stack p={2}>
    < Typography variant={'h6'}> All Tournaments < /Typography>
    <List>
      {tournaments.map((tournament) => <ListItem disablePadding key={tournament.tournamentId}>
        <ListItemButton>
          <ListItemText primary={tournament.tournamentName}/>
        </ListItemButton>
      </ListItem>)}
    </List>
  </Stack>
}

export default Tournaments
