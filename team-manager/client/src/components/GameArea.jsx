import React, { useEffect, useState } from 'react'
import { Card } from '@material-ui/core';
import { Link } from '@reach/router';

const GameArea = (props) => {

    const { gameNumber } = props

    return (
        <div>
            <div className="d-flex mb-4 justify-content-center main-title" >
                <h3><Link className="main-title-1" to="/" >Manage Players</Link></h3>
                <h3><Link className="main-title-2" to="/status/game/1" >Manage Player Status</Link></h3>
            </div>
            <div className="game-sec">
                <h1>Player Status - Game {gameNumber}</h1>
                <div className="d-flex justify-content-center" >
                    <h3><Link className="game-title-1" to="/status/game/1" >Game 1</Link></h3>
                    <h3><Link className="game-title-1" to="/status/game/2" >Game 2</Link></h3>
                    <h3><Link className="game-title-2" to="/status/game/3" >Game 3</Link></h3>
                </div>
            </div>
        </div>
    );
}

export default GameArea;
