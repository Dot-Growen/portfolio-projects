import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PlayerList from '../components/PlayerList';
import PlayerArea from '../components/PlayerArea';
import { Container } from '@material-ui/core';

export default () => {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        axios('http://localhost:8000/api/players')
            .then(res => setPlayers(res.data))
            .catch(error => console.log(error))
        return () => (isSubscribed = false);
    }, [])

    const removeFromDom = playerId => {
        setPlayers(players.filter(player => player._id !== playerId));
        console.log(players)
    }

    return (
        <Container className="mt-5">
            <PlayerArea component={ <PlayerList removeDom={removeFromDom} players={players} /> } />
        </Container>
    )
}