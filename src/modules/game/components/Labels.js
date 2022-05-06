import {Box, Stack} from '@mui/material'
import {styled} from '@mui/styles'
import {isWindow} from '../../../utils/utils'

const RowLabel = styled(Box)(() => ({
  height: `8v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`,
  minWidth: '16px',
  textAlign: 'center',
  lineHeight: `8v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`
}))

const ColLabel = styled(Box)(() => ({
  width: `8v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`,
  textAlign: 'center'
}))

const rows = new Array(8).fill('')

const RowLabels = ({reverse}) => <Stack>
  {rows.map((_row, rowNo) => <RowLabel key={rowNo}>{reverse ? rowNo + 1 : 8 - rowNo}</RowLabel>)}
</Stack>

const ColLabels = ({reverse}) => <Stack direction={'row'}>
  {rows.map((_col, colNo) => <ColLabel key={colNo}>
    {String.fromCharCode(reverse ? 72 - colNo : 65 + colNo)}
  </ColLabel>)}
</Stack>

export {RowLabels, ColLabels}
