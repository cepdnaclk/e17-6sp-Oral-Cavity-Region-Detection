import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';


export const MedButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#0A9396",
    '&:hover': {
      backgroundColor: "#0A9396",
    },
  }));

export const OutlinedButton = styled(Button)(({ theme }) => ({
  color: "#0A9396",
  borderColor: "#0A9396",
  '&:hover': {
    borderColor: "#0A9396",
  },
}));

export default MedButton