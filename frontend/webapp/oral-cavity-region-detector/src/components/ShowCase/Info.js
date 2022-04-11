import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

const Info = ({details})=> {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <IconButton 
        sx={{ color: '#fff'}}
        onClick={handleClickOpen}
        >
        <InfoIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Image Info</DialogTitle>
        <DialogContent>
        <table style={{width:"100%"}}>
        <tbody>
        <tr><th>Masks :</th><th>{details.mask.length}</th></tr>
        <tr><th>Updated at :</th><th>{details.updatedAt}</th></tr>
        <tr><th>Created at :</th><th> {details.createdAt}</th></tr>
        <tr><th>Patients' Name :</th><th> {details.patient_name}</th></tr>
        <tr><th>District :</th><th> {details.patient_district}</th></tr>
        <tr><th>Age :</th><th> {details.patient_age}</th></tr>
        <tr><th>Gender :</th><th> {details.patient_gender}</th></tr>
        <tr><th style={{verticalAlign: "top"}}>Habits :</th><th> {
        details.patient_habits.map((a,index)=>{
          return <p key={index} style={{padding:0, margin:0}}>{a}</p>
        })}</th></tr>
        <tr><th>Description : </th><th> {details.description}</th></tr>
        </tbody>
        </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export default Info