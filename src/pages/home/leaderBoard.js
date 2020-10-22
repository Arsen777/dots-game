import useFetch from 'hooks/useFetch';
import React, { useEffect } from 'react';

function LeaderBoard() {
  const { response: leaders = [] } = useFetch('/server/winners.json');

  console.log(leaders, 'llll');
  return (
    <div className="leader-board-wrapper">
      <div className="header">
        <h2>Leader Board</h2>
        </div>
      <div className="body">
        {leaders.map(leader => (
          <div className="winner">
            <div>{leader.winner}</div>
            <div>{new Date(leader.date).toISOString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoard;
