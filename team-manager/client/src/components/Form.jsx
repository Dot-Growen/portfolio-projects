import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const Form = (props) => {

    const { onSubmitProp, errors } = props
    const [playerName, setPlayerName] = useState("");
    const [position, setPosition] = useState("");

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({
            playerName: playerName,
            position: position,
            gameOne: {
                game: "gameOne",
                status: "undecided"
            },
            gameTwo: {
                game: "gameTwo",
                status: "undecided"
            },
            gameThree: {
                game: "gameThree",
                status: "undecided"
            },
            
        })
    }

    return (
        <Paper style={{ padding: "2em", margin: "2em" }} elevation={2} >
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <form onSubmit={onSubmitHandler}>
                <h3>Add Player</h3>
                <TextField
                    className="my-2"
                    name="playerName"
                    value={playerName}
                    fullWidth
                    label="Enter player's name"
                    variant="outlined"
                    onChange={e => setPlayerName(e.target.value)}
                />
                <TextField
                    className="my-2"
                    name="position"
                    value={position}
                    fullWidth label="Enter position"
                    variant="outlined"
                    onChange={e => setPosition(e.target.value)}
                />
                <Button
                    type="submit"
                    className="my-2"
                    variant="contained"
                    color="primary" >ADD
                </Button>
            </form>
        </Paper>
    );
}

export default Form;
