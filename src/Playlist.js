import React, { Component } from 'react';
 
import { SpotifyApiContext, Artist } from 'react-spotify-api';
 
function Playlist(props) {
  return (
    <SpotifyApiContext.Provider value={props.token}>
      <Artist id='0OdUWJ0sBjDrqHygGUXeCF'>
        {(artist, loading, error) =>
          artist ? (
            <div>
              <h1>{artist.name}</h1>
              <ul>
                {artist.genres.map(genre => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          ) : null
        }
      </Artist>
    </SpotifyApiContext.Provider>
  );
}
export default Playlist