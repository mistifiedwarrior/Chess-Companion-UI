import {Box, Stack} from '@mui/material'
import {styled} from '@mui/styles'
import {isWindow} from '../../../utils/utils'
import useMedia from '../../../hooks/useMedia'

const RowLabel = styled(Box)(({sm}) => ({
  height: `${sm ? 10 : 8}v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`,
  minWidth: '16px',
  textAlign: 'center',
  lineHeight: `${sm ? 10 : 8}v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`
}))

const ColLabel = styled(Box)(({sm}) => ({
  width: `${sm ? 10 : 8}v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`,
  textAlign: 'center'
}))

const rows = new Array(8).fill('')

const RowLabels = ({reverse}) => {
  const media = useMedia()
  return <Stack>
    {rows.map((_row, rowNo) => <RowLabel key={rowNo} sm={media.sm}>{reverse ? rowNo + 1 : 8 - rowNo}</RowLabel>)}
  </Stack>
}

const ColLabels = ({reverse}) => {
  const media = useMedia()
  return <Stack direction={'row'}>
    {rows.map((_col, colNo) => <ColLabel key={colNo} sm={media.sm}>
      {String.fromCharCode(reverse ? 72 - colNo : 65 + colNo)}
    </ColLabel>)}
  </Stack>
}

export {RowLabels, ColLabels}
