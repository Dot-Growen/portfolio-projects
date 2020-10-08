import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DeleteButton from './DeleteButton';

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

const PlayerList = (props) => {

    const { players, removeDom } = props
    const removeFromDom = authorId => {
        removeDom(authorId)
    }

    return (
        <div className="list-area">
            <TableContainer elevation={3} component={Paper} >
                <Table aria-label="customized table" stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Player Name</StyledTableCell>
                            <StyledTableCell>Preferred Position</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player, idx) => {
                            return (
                                <TableRow key={idx} >
                                    <StyledTableCell>{player.playerName}</StyledTableCell>
                                    <StyledTableCell>{player.position}</StyledTableCell>
                                    <StyledTableCell> <DeleteButton playerId={player._id} successCallback={() => removeFromDom(player._id)} /> </StyledTableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PlayerList;
