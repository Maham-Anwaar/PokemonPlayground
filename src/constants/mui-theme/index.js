import {createTheme} from '@mui/material/styles';
import {responsiveFontSizes} from '@mui/material/styles';

import typography from './typography.js';


export default responsiveFontSizes(createTheme({
  typography,
}));
