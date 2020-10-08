import React from 'react';
import Main from './views/Main';
import { Router } from '@reach/router';
import CreatePlayer from './views/CreatePlayer';
import GameOne from './views/GameOne';
import GameTwo from './views/GameTwo';
import GameThree from './views/GameThree';
import './styles.css'

export default () => {
    return (
        <div className="App">
            <Router>
                <Main path="/" />
                <CreatePlayer path="/players/addplayer" />
                <GameOne path="/status/game/1" />
                <GameTwo path="/status/game/2" />
                <GameThree path="/status/game/3" />
            </Router>
        </div>
    );
}