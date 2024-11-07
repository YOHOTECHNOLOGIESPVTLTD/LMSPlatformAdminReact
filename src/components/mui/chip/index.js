// ** MUI Imports
import MuiChip from '@mui/material/Chip'

// ** Third Party Imports
import clsx from 'clsx'

// ** Hooks Imports
import useBgColor from 'hooks/useBgColor'

const Chip = props => {
  // ** Props
  const { sx, skin, color, rounded } = props

  // ** Hook
  const bgColors = useBgColor()

  // ** Predefined colors
  const colors = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  }

  // ** Check if color is a predefined color or a custom hex value
  const isPredefinedColor = color in colors
  const customColor = !isPredefinedColor && /^#([0-9A-F]{3}){1,2}$/i.test(color)
    ? { backgroundColor: color, contrastText: '#ffffff' } // Set default contrastText
    : {}

  const propsToPass = { ...props }
  propsToPass.rounded = undefined

  return (
    <MuiChip
      {...propsToPass}
      variant='filled'
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light'
      })}
      sx={skin === 'light' && color ? Object.assign(isPredefinedColor ? colors[color] : customColor, sx) : sx}
    />
  )
}

export default Chip
