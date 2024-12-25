import React, { useState } from 'react'
import { postData } from '../backend/postData.js';

function CreateSesstions({id}) {

    const [formDataSesstions, setFormDataSesstions] = useState({
        title: '',
        date: '',
        nots: '',
    });
    const handleChangeSesstions = (e) => {
        const { name, value } = e.target;
        setFormDataSesstions({
            ...formDataSesstions,
            [name]: value
        });
    }
    const sendDataSesstions = () => {
        postData(`sessions/${id}`, formDataSesstions);
        console.log("send", formDataSesstions);
    };
    return (
        <div>
            <div className='createsesstions'>
                <input type="text" name='title' placeholder='title' onChange={handleChangeSesstions} />
                <input type="date" name='date' onChange={handleChangeSesstions} />
                <textarea name="nots" onChange={handleChangeSesstions}></textarea>
                <button onClick={sendDataSesstions}>send</button>
            </div>
        </div>
    )
}

export default CreateSesstions