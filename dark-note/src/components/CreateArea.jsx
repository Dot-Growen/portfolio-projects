import React, { useState } from 'react'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Zoom } from '@material-ui/core';

const CreateArea = (props) => {

    const [task, setTask] = useState({
        title: "",
        content: "",
        complete: false
    })

    function handleChange(event) {
        const { name, value } = event.target
        setTask(prevTask => {
            return {
                ...prevTask,
                [name]: value
            }
        })
    }

    function sumbitTask(event) {
        console.log(task.content)
        if (task.content.length > 1 && task.title.length > 1) {
            props.onAdd(task)
            setTask({
                title: "",
                content: "",
                complete: false
            })
        }
        event.preventDefault()
    }

    const [isExpanded, setExpand] = useState(false)

    function handleClick() {
        setExpand(true)
    }

    return (
        <div>
            <form className="mx-auto mt-5 task-form">
                <div className="d-flex align-items-center text-center justify-content-center"><h4 className="align-center mr-1">Enter your best task</h4><AssignmentTurnedInIcon /></div>
                {isExpanded === true ? (<input
                    name="title"
                    placeholder="Enter title"
                    value={task.title}
                    className="form-control"
                    onChange={handleChange} />
                    ) : null}

                <textarea
                    name="content"
                    placeholder="Enter content"
                    value={task.content}
                    className="form-control"
                    onClick={handleClick}
                    onChange={handleChange}
                    rows={isExpanded === true ? "3" : "1"} />
                    <Zoom in={isExpanded}>
                <button type="sumbit" value="Add" className="btn btn-outline-light btn-block " onClick={sumbitTask}>Add</button></Zoom>
            </form>
        </div>
    )
}

export default CreateArea