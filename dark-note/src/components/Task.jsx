import React from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from "@material-ui/icons/Delete";

const Task = (props) => {

    const handleDelete = () => {
        props.onDelete(props.id)
    }

    function handleDone() {
        props.onDone(props.id)
    }
    
    let className="task"
    let content=props.content

    if(props.status === true){
        className = "done-task"
        content = ""
    }


    return (
        <div className="new-task">
            <h3 className={className} >{props.title}</h3>
            <p>{content}</p>
            <DeleteIcon onClick={handleDelete} />
            <DoneAllIcon onClick={handleDone} />
        </div>
    )
}

export default Task