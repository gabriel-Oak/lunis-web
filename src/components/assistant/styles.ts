import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChantContainer = styled('div')(({ theme }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 640px;
  height: 100%;
  max-height: 480px;
  background: white;
  border-radius: 8px;
  padding: ${theme.spacing(2)};
  overflow-y: auto;
`);
