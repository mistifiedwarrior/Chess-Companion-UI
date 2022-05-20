import {Stack, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import {LoadingButton} from '@mui/lab'
import {styled} from '@mui/styles'
import API from '../../API'

const Container = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.grey[300]}`,
  width: theme.spacing(60),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}))

const ResetGame = () => {
  const [values, setValues] = useState({gameId: '', password: ''})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleChange = (key) => (event) => setValues({...values, [key]: event.target.value})
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    API.games.resetGame(values)
      .then(({status}) => setMessage(status ? 'Successfully reset game' : 'Failed to reset game'))
      .catch(() => setMessage('Failed to reset game'))
      .finally(() => setLoading(false))
  }
  
  return <Stack spacing={2} justifyContent={'center'} direction={'row'} height={'100vh'}>
    <Container>
      <Typography variant={'h4'} mb={2}>Reset Game</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Game Id" variant="outlined" value={values.gameId} onChange={handleChange('gameId')}
                     required/>
          <TextField label="Password" variant="outlined" value={values.password} onChange={handleChange('password')}
                     type={'password'} required/>
          <LoadingButton loading={loading} variant={'contained'} type={'submit'}>Host Game</LoadingButton>
          <Typography variant={'body1'}>{message}</Typography>
        </Stack>
      </form>
    </Container>
  </Stack>
  
}

export default ResetGame
