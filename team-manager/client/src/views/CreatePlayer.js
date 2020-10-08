import React, { useState } from 'react';
import Form from '../components/Form';
import axios from 'axios';
import PlayerArea from '../components/PlayerArea';
import { navigate } from '@reach/router';

const CreatePlayer = () => {

    const [errors, setErrors] = useState([]);
    const createPlayer = player => {
        axios.post('http://localhost:8000/api/new', player)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div className="p-5">
            <PlayerArea component={ <Form errors={errors} onSubmitProp={createPlayer} />} />
        </div>
    );
}

export default CreatePlayer;
