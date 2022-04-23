import {FormControl, InputLabel, MenuItem, Select} from '@mui/material'

const SelectOption = ({label, value, options, setValue}) => <FormControl fullWidth>
  <InputLabel required>{label}</InputLabel>
  <Select required label={label} value={value} onChange={(event) => setValue(event, event.target.value)}>
    {options.map(({name, value: optionValue}) => <MenuItem value={optionValue} key={optionValue}>{name}</MenuItem>)}
  </Select>
</FormControl>

export default SelectOption
