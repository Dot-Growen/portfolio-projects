import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const DeleteButton = (props) => {

    const { playerId, successCallback } = props;
    const deletePlayer = e => {
        axios.delete('http://localhost:8000/api/player/' + playerId)
            .then(res => {
                successCallback();
            })
    }
    return (
        <Button
            onClick={deletePlayer}
            style={{ width: "13em" }}
            size="small"
            variant="contained"
            color="secondary" >DELETE
        </Button>
    );
}

export default DeleteButton;
