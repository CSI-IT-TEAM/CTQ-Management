import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/store';

import "./index.scss";
import 'devextreme/dist/css/dx.light.css';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Mulish',
            'Nunito',
            'sans-serif',
        ].join(','),
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);