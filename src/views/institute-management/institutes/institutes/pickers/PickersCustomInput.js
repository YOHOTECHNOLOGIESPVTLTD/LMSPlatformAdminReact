// ** React Imports
import { forwardRef } from 'react'

// ** Custom Component Import
import { TextField } from '@mui/material'

const PickersComponent = forwardRef(({ ...props }, ref) => {
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
