import React from 'react';

import Game from './game';
import LeaderBoard from './leaderBoard';

import './style.scss'

function Home() {
  return (
    <div className="home-wrapper">
      <Game />
      <LeaderBoard />
    </div>
  )
}

export default Home;
