import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Role from '../Hooks/Role';

function Modal({ name, email, phone, description, route }) {
    const [open, setOpen] = useState(false);
    const role=Role()

    return (
        <div>
            <button onClick={() => setOpen(true)} className=' border px-3 py-1 hover:bg-gray-100'>About</button>
            <Dialog open={open} onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" padding={'0 0 10px 0'}>
                        {description}
                    </DialogContentText>
                    <DialogContentText >
                        Email: {email}
                    </DialogContentText>
                    <DialogContentText>
                        Phone: {phone}
                    </DialogContentText>
                </DialogContent>
                <DialogActions  >
                    <Button variant="outlined" onClick={() => setOpen(false)}>Close</Button>
                    {
                        role==='admin' && <Button variant="outlined"><Link to={route}>Update</Link></Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Modal