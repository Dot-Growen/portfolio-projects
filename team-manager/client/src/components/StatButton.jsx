import React from 'react';
import Button from '@material-ui/core/Button';

const StatButton = (props) => {

    const { id, stat, onClickStat, game, player, color } = props

    const onClick = () => {
        if (game === "gameOne") {
            let newPlayer = {
                _id: id,
                playerName: player.playerName,
                position: player.position,
                gameOne: {
                    game: "gameOne",
                    status: stat
                }
            }
            onClickStat(newPlayer)
        } else if (game === "gameTwo") {
            let newPlayer = {
                _id: id,
                playerName: player.playerName,
                position: player.position,
                gameTwo: {
                    game: "gameTwo",
                    status: stat
                },
            }
            onClickStat(newPlayer)
        } else {
            let newPlayer = {
                _id: id,
                playerName: player.playerName,
                position: player.position,
                gameThree: {
                    game: "gameThree",
                    status: stat
                },
            }
            onClickStat(newPlayer)
        }
    }

    return (
        <Button style={{ width: "22em", margin: ".5em", backgroundColor: color }} size="small"
            variant="contained"
            onClick={onClick}
        >{stat}</Button>
    );
}

export default StatButton;
