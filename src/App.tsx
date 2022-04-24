import React, { useEffect, useState } from 'react';
import './App.css';
import GameBlock from './Game';
import { Game } from './models/Game';
import thing from './wordart.png';
function App() {

  const [games, setGames] = useState<Game[]>([
    {
      name: 'Game 1',
      urls: {
        status: 'active',
        stop: '',
        start: ''
      }
    },
    {
      name: 'Game 2',
      urls: {
        status: 'stopped',
        stop: '',
        start: ''
      }
    },
  ]);
  useEffect(() => {
    fetch('https://us-west1-game-management-348123.cloudfunctions.net/info').then(res => res.json()).then(data => {
      setGames(data['games']);
    });
  }, []);
  return (
    <div>
      <div className="header">
        <img src={thing} alt="thing" />
      </div>
      <div className="games">
        {games.map(game => <GameBlock game={game} key={game.name} />)}
      </div>
    </div>
  );
}

export default App;
