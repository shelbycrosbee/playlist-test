import React from 'react';
import axios from 'axios'
import './App.css'

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
    };
    this.playerCheckInterval = null;
  }





  checkForPlayer() {
    const { token } = this.state;

    if (window.Spotify !== null) {
      this.player = new window.Spotify.Player({
        name: "Code School's Spotify Player",
        getOAuthToken: cb => { cb(this.props.token); },
      });
      this.createEventHandlers();
      clearInterval(this.playerCheckInterval);
      // finally, connect!
      this.player.connect();
    }
  }
  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      console.log(state.track_window);
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });

    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  }


  handleLogin() {
    if (this.props.token !== "") {
      this.setState({ loggedIn: true });
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }

    axios.get(
      'https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.props.token}`
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

  transferPlaybackHere() {
    const { deviceId } = this.state;
    axios({
      method: 'put',
      url: "https://api.spotify.com/v1/me/player",
      data: {
        device_ids: [deviceId],
        play: true
      },
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  joinButton() {
    const { deviceId } = this.state;
    axios({
      method: 'put',
      url: "https://api.spotify.com/v1/me/player/play",
      data: {
        device_ids: [deviceId],
        play: true,
        context_uri: "spotify:playlist:2GJ0HZwHHPaJ4J955ultN0",
        offset: {
          position: 0
        },
        position_ms: 0
      },
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  render() {
    const {
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
    } = this.state;



    return (
      <div className="App">
        <div>
          <h3>Code School Spotify Player</h3>
        </div>

        {error && <p>Error: {error}</p>}

        {loggedIn ?
          (<div>
            <p>Artist: {artistName}</p>
            <p>Track: {trackName}</p>
            <p>Album: {albumName}</p>
            <p>
              <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
              <button onClick={() => this.onNextClick()}>Next</button>
              <button onClick={() => this.joinButton()}>Make Shelby Mad</button>
            </p>
          </div>)
          :
          (<div>
            <p className="App-intro">
              Enter your Spotify access token.
          </p>
            <p>
              <input type="text" value={this.props.token} onChange={e => this.setState({ token: e.target.value })} />
            </p>
            <p>
              <button onClick={() => this.handleLogin()}>Go</button>
            </p>
          </div>)
        }
      </div>
    );
  }
}


export default Player;