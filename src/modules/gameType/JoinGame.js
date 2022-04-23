import {Stack, TextField} from '@mui/material'
import {useEffect, useState} from 'react'
import SelectOption from './SelectOption'
import {LoadingButton} from '@mui/lab'
import API from '../../API'
import {handleLogin} from '../../utils/storage'

const typeOptions = [{name: 'HOST', value: 'HOST'}, {name: 'JOIN', value: 'JOIN'}]

const JoinGame = ({changeType}) => {
  const [values, setValues] = useState({type: 'JOIN', name: '', roomNo: ''})
  const [loading, setLoading] = useState(false)
  
  const handleChange = (key) => (event, value = '') => setValues({...values, [key]: value || event.target.value})
  
  useEffect(() => {
    if (values.type === 'HOST') {
      changeType()
    }
  }, [values.type])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    API.games.initGame(values)
      .then(({game, token}) => {
        handleLogin(token)
      })
      .catch(() => ({}))
      .finally(() => setLoading(false))
  }
  
  return <form onSubmit={handleSubmit}>
    <Stack spacing={2}>
      <SelectOption label="Select Type" options={typeOptions} value={values.type} setValue={handleChange('type')}/>
      <TextField label="Name" variant="outlined" value={values.name} onChange={handleChange('name')} required/>
      <TextField label="Room No" variant="outlined" value={values.roomNo} onChange={handleChange('roomNo')} required/>
      <LoadingButton loading={loading} variant={'contained'} type={'submit'}>Join Game</LoadingButton>
    </Stack>
  </form>
  
}

export default JoinGame
