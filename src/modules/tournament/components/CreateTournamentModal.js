import {Box, Button, Chip, IconButton, Modal, Stack, TextField, Typography} from '@mui/material'
import {useState} from 'react'
import {Add} from '@mui/icons-material'
import API from '../../../API'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const CreateTournamentModal = ({open, handleClose}) => {
  const [teams, setTeams] = useState([])
  const [teamName, setTeamName] = useState('')
  const [tournamentName, setTournamentName] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (teamName.trim() && teams.length < 17 && !teams.includes(teamName)) {
      setTeams([...teams, teamName.trim()])
      setTeamName('')
    }
  }
  
  const handleDelete = (team) => () => setTeams(teams.filter((name) => team !== name))
  
  const handleCreateTournament = (event) => {
    event.preventDefault()
    API.tournament.createTournament({teams, tournamentName})
      .then(() => {
        setTeams([])
        setTournamentName('')
        handleClose()
      })
  }
  
  return <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Create Tournament
      </Typography>
      <TextField
        autoFocus
        margin="dense"
        label="Tournament Name"
        type="text"
        value={tournamentName}
        onChange={(event) => setTournamentName(event.target.value)}
        fullWidth
        variant="standard"
      />
      <form onSubmit={handleSubmit}>
        <Stack direction={'row'}>
          <TextField
            margin="dense"
            id="name"
            label="Team Name"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            fullWidth
            disabled={teams.length > 16}
            variant="standard"
            error={teams.includes(teamName)}
          />
          <IconButton type={'submit'}>
            <Add/>
          </IconButton>
        </Stack>
      </form>
      <Stack direction={'row'} flexWrap={'wrap'}>
        {
          teams.map((team, index) => <Box key={index} m={0.5}>
            <Chip label={team} onDelete={handleDelete(team)}/>
          </Box>)
        }
      </Stack>
      <Button variant={'contained'} fullWidth disabled={teams.length < 5 || !tournamentName.trim()}
              onClick={handleCreateTournament}>
        Create Tournament
      </Button>
    </Box>
  </Modal>
}

export default CreateTournamentModal
