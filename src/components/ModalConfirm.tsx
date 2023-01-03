import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ModalConfirmType } from '../types/Types'

const ModalConfirm = forwardRef(
  ({ disable, icon, title, confirmAction }: ModalConfirmType, ref) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    useImperativeHandle(ref, () => ({
      close() {
        console.log('child function')
        handleClose()
      },
    }))

    return (
      <div>
        <Button disabled={disable} onClick={handleClickOpen}>
          {icon}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você já completou o objetivo acima?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={confirmAction} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
)
ModalConfirm.displayName = 'ModalConfirm'
export default ModalConfirm
