import React from 'react';
import { Card } from '@material-ui/core';
import { Link } from '@reach/router';
import Form from './Form'

const PlayerArea = (props) => {

    const { component } = props

    return (
        <div>
            <div className="d-flex mb-4 justify-content-center main-title" >
                <h3><Link className="main-title-1" to="/" >Manage Players</Link></h3>
                <h3><Link className="main-title-2" to="/status/game/1" >Manage Player Status</Link></h3>
            </div>
            <div className="player-list-sec">
                <div className="d-flex justify-content-center main-title" >
                    <h3><Link className="main-title-1" to="/" >List</Link></h3>
                    <h3><Link className="main-title-2" to="/players/addplayer" >Add Player</Link></h3>
                </div>
                {component}
            </div>
        </div>
    );
}

export default PlayerArea;
