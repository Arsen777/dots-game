import React from 'react';

import useFetch from 'hooks/useFetch';

function LeaderBoard() {
  const { response: leaders = [] } = useFetch('/server/winners.json');

  return (
    <div className="leader-board-wrapper">
      <div className="header">
        <h2>Leader Board</h2>
      </div>
      <div className="body">
        {leaders.map(leader => (
          <div className="winner">
            <div>{leader.winner}</div>
            <div>{new Date(leader.date).toLocaleDateString('en-US')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoard;
