import {Stack, TextField} from '@mui/material'
import {useEffect, useState} from 'react'
import SelectOption from './SelectOption'
import {LoadingButton} from '@mui/lab'
import API from '../../API'
import {setGame} from '../game/action'
import {handleLogin} from '../../utils/storage'
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import {setUser} from '../players/action'

const typeOptions = [{name: 'HOST', value: 'HOST'}, {name: 'JOIN', value: 'JOIN'}]
const colorOptions = [{name: 'WHITE', value: 'WHITE'}, {name: 'BLACK', value: 'BLACK'}]

const HostGame = ({changeType}) => {
  const [values, setValues] = useState({type: 'HOST', name: '', color: 'WHITE'})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  
  const handleChange = (key) => (event, value = '') => setValues({...values, [key]: value || event.target.value})
  
  useEffect(() => {
    if (values.type === 'JOIN') {
      changeType()
    }
  }, [values.type])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    API.games.initGame(values)
      .then(({game, token, player}) => {
        dispatch(setGame(game))
        dispatch(setUser(player))
        handleLogin(token)
        return router.push('/waiting')
      })
      .catch(() => ({}))
      .finally(() => setLoading(false))
  }
  
  return <form onSubmit={handleSubmit}>
    <Stack spacing={2}>
      <SelectOption label="Select Type" options={typeOptions} value={values.type} setValue={handleChange('type')}/>
      <TextField label="Name" variant="outlined" value={values.name} onChange={handleChange('name')} required/>
      <SelectOption label="Select Color" options={colorOptions} value={values.color} setValue={handleChange('color')}/>
      <LoadingButton loading={loading} variant={'contained'} type={'submit'}>Host Game</LoadingButton>
    </Stack>
  </form>
  
}

export default HostGame
