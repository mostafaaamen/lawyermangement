import React, { useState } from 'react';
import "../styles/addclient.css"
import {LANG_AddNewClient} from "../lang/addNewClient.js"
import useLanguage from '../hooks/useLanguage.jsx'
import {postData} from '../backend/postData.js'
function AddNewClient() {
    const lang = useLanguage(LANG_AddNewClient);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        idCard: '',
        phone: '',
        gmail: '',
        nationality: '',
        address: '',
        nots: ''
    });
    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleClick = () => {
      postData("users",formData)
      console.log("send",formData)
    };
    

    return (
        <div className='addClientContainer'>
            <div className='content' style={{ direction: lang?.type }}>
                <div>
                    <label htmlFor="name" style={{ direction: lang?.type }}>{lang?.name}</label>
                    <input
                        type="text"
                        name="name"
                        placeholder={lang?.name}
                        style={{ direction: lang?.type }}
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="company" style={{ direction: lang?.type }}>{lang?.company}</label>
                    <input
                        type="text"
                        name="company"
                        placeholder={lang?.company}
                        style={{ direction: lang?.type }}
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="idCard" style={{ direction: lang?.type }}>{lang?.id}</label>
                    <input
                        type="number"
                        name="idCard"
                        placeholder={lang?.id}
                        style={{ direction: lang?.type }}
                        value={formData.idCard}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone" style={{ direction: lang?.type }}>{lang?.phone}</label>
                    <input
                        type="number"
                        name="phone"
                        placeholder={lang?.phone}
                        style={{ direction: lang?.type }}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="gmail" style={{ direction: lang?.type }}>{lang?.gmail}</label>
                    <input
                        type="text"
                        name="gmail"
                        placeholder={lang?.gmail}
                        style={{ direction: lang?.type }}
                        value={formData.gmail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="nationality" style={{ direction: lang?.type }}>{lang?.nationality}</label>
                    <input
                        type="text"
                        name="nationality"
                        placeholder={lang?.nationality}
                        style={{ direction: lang?.type }}
                        value={formData.nationality}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="address" style={{ direction: lang?.type }}>{lang?.address}</label>
                    <input
                        type="text"
                        name="address"
                        placeholder={lang?.address}
                        style={{ direction: lang?.type }}
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="nots" style={{ direction: lang?.type }}>{lang?.not}</label>
                    <textarea
                        name="nots"
                        value={formData.nots}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button onClick={handleClick}>Log Data</button>
            </div>
        </div>
    );
}

export default AddNewClient;
