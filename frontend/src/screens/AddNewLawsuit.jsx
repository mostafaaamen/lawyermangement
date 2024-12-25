import React, { useState, useEffect } from 'react';
import "../styles/AddNewLawsuit.css";
import { postData } from '../backend/postData.js';
import useFetch from '../hooks/useFetch.jsx';

function AddNewLawsuit({ data }) {
    const [formData, setFormData] = useState({
        clientName: data.userName || "",
        clientType: "",
        ginstName: "",
        ginstAddress: "",
        ginstPhone: "",
        ginstLawyer: "",
        lawsuitType: "",
        lawsuitTitle: "",
        lawsuitNumber: "",
        courtName: "",
        payment: "",
        nots: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = () => {
        postData(`lawsuites/${data.userId}`, formData);
        console.log(`lawsuites/${data.userId}`);
    };

    let lawsuiteType = useFetch("lawsuiteType");
    let clientType = useFetch("clinetType");

    useEffect(() => {
        // Log the clientTypes and lawsuiteTypes when they are fetched
        console.log('Client Types:', clientType?.clientTypes);
        console.log('Lawsuite Types:', lawsuiteType?.lawsuiteTypes);
    }, [clientType, lawsuiteType]);

    return (
        <div className='newLawsuit'>
            <div className='users'>
                <div className='clientUsers'>
                    <h3>بيانات العميل</h3>
                    <div>
                        <label htmlFor="clientName">Client Name</label>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={formData.clientName}
                            name="clientName"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="clientType">Type of Client</label>
                        <select
                            id="clientType"
                            name="clientType"
                            value={formData.clientType}
                            onChange={handleChange}
                        >
                            <option value="">Select Client Type</option>
                            {clientType?.clientTypes?.length > 0 ? (
                                clientType.clientTypes.map((data) => (
                                    <option key={data?.id} value={data.title}>
                                        {data.title}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Client Types Available</option>
                            )}
                        </select>
                    </div>
                </div>

                {/*  */}
                <div className="genstUser">
                    <h3>بيانات الخصم</h3>
                    <div className="gen-content">
                        <div>
                            <label htmlFor="ginstName">Ginst Name</label>
                            <input
                                type="text"
                                placeholder="Ginst Name"
                                name="ginstName"
                                value={formData.ginstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="ginstAddress">Ginst Address</label>
                            <input
                                type="text"
                                placeholder="Ginst Address"
                                name="ginstAddress"
                                value={formData.ginstAddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="ginstPhone">Ginst Phone</label>
                            <input
                                type="text"
                                placeholder="Ginst Phone"
                                name="ginstPhone"
                                value={formData.ginstPhone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="ginstLawyer">Ginst Lawyer</label>
                            <input
                                type="text"
                                placeholder="Ginst Lawyer"
                                name="ginstLawyer"
                                value={formData.ginstLawyer}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Lawsuite Info */}
            <div className="lawsuiteInfo">
                <h3 className="title">Lawsuite Info</h3>
                <div className="content">
                    <div>
                        <label htmlFor="lawsuitType">Lawsuite Type</label>
                        <select
                            id="lawsuitType"
                            name="lawsuitType"
                            value={formData.lawsuitType}
                            onChange={handleChange}
                        >
                            <option value="">Select Lawsuite Type</option>
                            {lawsuiteType?.lawsuiteTypes?.length > 0 ? (
                                lawsuiteType.lawsuiteTypes.map((data) => (
                                    <option key={data?.id} value={data.title}>
                                        {data.title}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Lawsuite Types Available</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="lawsuitTitle">Lawsuit Title</label>
                        <input
                            type="text"
                            placeholder="Lawsuit Title"
                            name="lawsuitTitle"
                            value={formData.lawsuitTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lawsuitNumber">Lawsuit Number</label>
                        <input
                            type="text"
                            placeholder="Lawsuit Number"
                            name="lawsuitNumber"
                            value={formData.lawsuitNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="courtName">Court Name</label>
                        <input
                            type="text"
                            placeholder="Court Name"
                            name="courtName"
                            value={formData.courtName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="payment">Payment</label>
                        <input
                            type="text"
                            placeholder="Payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="nots">Notes</label>
                        <textarea
                            name="nots"
                            value={formData.nots}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="lawsuitBtn">
                <button onClick={handleClick}>Save</button>
            </div>
        </div>
    );
}

export default AddNewLawsuit;
