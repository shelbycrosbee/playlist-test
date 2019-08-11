import React from 'react';
import './App.css';
// import Playlist from './Playlist'
import axios from 'axios'



const CLIENT_ID = '1af7ab55e7e64df992dadf08719596ac';
const CLIENT_SECRET = '40d2b6c4973444328b30f84a871dcce9';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = CLIENT_ID;
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  'user-read-email',
  'user-read-private'
];
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: ''
    }
  }
  componentDidMount() {

    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    }

   axios.get(
      'https://api.spotify.com/v1/users/e3itsm9xo2go4zn5j2lgmkg5g', {
      headers: {
        Authorization: `Bearer ${_token}`
      }
    }
    )
      .then(response => {
        console.log(response)
      
      })

      .catch(error => {
        console.log(error)
      })
  
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
        </a>
          )}
          {/* {this.state.token && (
        // Spotify Player Will Go Here In the Next Step
      )} */}
        </header>
      </div>
    );
  }
}
export default App;
