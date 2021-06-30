import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login'
import { getTokenFromRUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';


const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState(null);


  // Runs code based on a given condition
  useEffect(() => {
      const hash = getTokenFromRUrl();
      window.location.hash = "";

      const _token = hash.access_token;

      if (_token) {
         setToken(_token)

         spotify.setAccessToken(_token);

         spotify.getMe().then(user=> {
           console.log(user);
         });
      }

      console.log('I have a tokaen >>> ', token);
  },  []);

  return (
    <div className="app">

      {
        token ? (
          <Player />
        ) : (
          <Login />
        )
      }

      

    </div>
  );
}

export default App;
