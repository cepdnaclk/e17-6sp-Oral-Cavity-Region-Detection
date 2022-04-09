import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


export const MedButton = styled(Button)(() => ({
    color: "#fff",
    backgroundColor: "#0A9396",
    '&:hover': {
      backgroundColor: "#0A9396",
    },
    '&:disabled': {
      backgroundColor: '#D3D3D3',
    },
  }));

export const OutlinedButton = styled(Button)(() => ({
  color: "#0A9396",
  borderColor: "#0A9396",
  '&:hover': {
    borderColor: "#0A9396",
  },
}));

export const OutlinedLightButton = styled(Button)(() => ({
  color: "#74BDDC",
  borderColor: "#74BDDC",
  '&:hover': {
    borderColor: "#74BDDC",
  },
}));

const Input = styled('input')({
  display: 'none',
});

export function UploadButtons() {
  return (
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
  );
}

function LinearColor(){
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <br/>
      <LinearProgress/>
      <br/>
    </Stack>
  );
}

export const LightButton = styled(Button)(() => ({
  color: "#fff",
  backgroundColor: "#74BDDC",
  '&:hover': {
    backgroundColor: "#74BDDC",
    borderColor: "#74BDDC"
  },
  '&:disabled': {
    backgroundColor: '#D3D3D3',
  },
  borderColor: "#74BDDC",
}));

const IconLabelButtons= ({label,onClick,disabled, icon}) =>{
  return (
      <LightButton variant="outlined" 
      onClick={onClick}
      disabled={disabled}
      endIcon={icon}
      >
        {label}
      </LightButton>
  );
}


export default MedButton
export {LinearColor, IconLabelButtons}