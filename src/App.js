import React from 'react';
import './App.css';
// import Playlist from './Playlist'
import { tsPropertySignature } from '@babel/types';
import axios from 'axios'
import { CodeGenerator } from '@babel/generator';



const CLIENT_ID = '1af7ab55e7e64df992dadf08719596ac';
const CLIENT_SECRET = '40d2b6c4973444328b30f84a871dcce9';
export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "1af7ab55e7e64df992dadf08719596ac";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      song: ''
    }
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }


async componentDidMount(){
  await axios.get(
    'https://api.spotify.com/v1/users/22f63oznp4huleaxulv63sjxi',
    {
    //   headers: {
    //     Authorization: 'Bearer BQAp2HbDRE3nDCTY-V0xUfDjIT--97sSVEvtVKWhmdgb-nviEPe290Tbj1JSHRk7NV9oF5DVW943CTTu3o2O8WFSS4gRVvz9Kv_cXbMllJPV4MbIjypTN9e9gwLuwrwL4ShoR8E2q7NGVEIxXwS7znwlUtemSIj_A26O43I9'
    //   }
     }
  )
  .then(response => {
    console.log(response)
  }) 
  .catch(error => {
    console.log(error)
  })
}

  render (){
    return(
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
