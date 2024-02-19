// ** React Imports
import { forwardRef } from 'react'

// ** Custom Component Import
// import {TextField as CustomTextField} from '@mui/material'
import { TextField } from '@mui/material'

const PickersComponent = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField
      {...props}
      inputRef={ref}
      label={label || ''}
      {...(readOnly && { inputProps: { readOnly: true } })}
    />
  )
})

export default PickersComponent
