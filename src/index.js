import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SpotifyApiContext } from 'react-spotify-api';

ReactDOM.render(<SpotifyApiContext.Provider value='Bearer BQCbkaoh8G-usRH103A9VyguBlzI0xyRAZ7p-eVqFlKUpwQDvbUFCCP7uBDC69Nn1LMhosa_IR0Ypvpbn126xOyKmKBltFX7GUASO7NxgRaAKmC1qEoY8XKmn_nNN8cAlPABBNsH-R0G9fOsr3YZObfRkdcZhofPwdYP1g'><App /></SpotifyApiContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
