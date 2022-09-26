import {styled} from '@mui/material/styles';

export const FancyDiv = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})(({color}) => ({
    ...color && {
        'backgroundColor': color,
        'border': 'none',
        'color': 'black',
        'padding': '5px 10px',
        'textAlign': 'center',
        'display': 'inline-block',
        'margin': '4px 2px',
        'borderRadius': '16px'
    }
  }));