import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatButton from '../components/StatButton'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import GameArea from '../components/GameArea';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#303030",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        backgroundColor: "#1c1c1c",
        color: "white",
    },
}))(TableCell);

const GameTwo = () => {

    const [players, setPlayers] = useState([]);
    const [update, setUpdate] = useState(false);

    const changeStatus = player => {

        axios.put('http://localhost:8000/api/' + player._id, player)
            .then(res => console.log(res))
            .then(res => setUpdate(!update))
    }

    useEffect(() => {
        let isSubscribed = true;
        axios('http://localhost:8000/api/players')
            .then(res => setPlayers(res.data))
            .catch(error => console.log(error))
        return () => (isSubscribed = false);
    }, [update])

    return (
        <div className="p-5">

            <GameArea gameNumber={2} />
            <div style={{ padding: "2em" }}>

                <TableContainer elevation={2} component={Paper} >
                    <Table size="medium" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Player Name</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map((player, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <StyledTableCell>{player.playerName}</StyledTableCell>
                                        <StyledTableCell style={{ width: "70%" }}>
                                            {player.gameTwo.status === "playing" ? <StatButton
                                                id={player._id}
                                                color="green"
                                                stat={player.gameTwo.status}
                                            /> : <StatButton
                                                    id={player._id}
                                                    player={player}
                                                    game="gameTwo"
                                                    color="white"
                                                    stat="playing"
                                                    onClickStat={changeStatus}
                                                />}
                                            {player.gameTwo.status === "not playing" ? <StatButton
                                                id={player._id}
                                                color="red"
                                                stat={player.gameTwo.status}
                                            /> : <StatButton
                                                    id={player._id}
                                                    player={player}
                                                    game="gameTwo"
                                                    color="white"
                                                    stat="not playing"
                                                    onClickStat={changeStatus}
                                                />}
                                            {player.gameTwo.status === "undecided" ? <StatButton
                                                id={player._id}
                                                color="yellow"
                                                stat={player.gameTwo.status}
                                            /> : <StatButton
                                                    id={player._id}
                                                    player={player}
                                                    game="gameTwo"
                                                    color="white"
                                                    stat="undecided"
                                                    onClickStat={changeStatus}
                                                />}
                                        </StyledTableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default GameTwo;