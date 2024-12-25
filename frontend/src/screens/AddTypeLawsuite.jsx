
import React,{useState} from 'react'
import {postData} from '../backend/postData.js'
import "../styles/addTypeClient_Lawsuite.css"
function AddTypeClient() {
  // const lang = useLanguage(LANG_AddNewClient);
  const [formData, setFormData] = useState({
      title: '',
  });
  // Handle change in form inputs
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };
  const sendData = () => {
    postData("lawsuiteType",formData)
    console.log("send",formData)
  };
  return (
    <div className='addTypeClient_Lawsuite'>
        <h2 className='title'>Add lawsuite Type</h2>
        <input className='input' name='title' onChange={handleChange} type="text" />
        <button className='btnsave ' onClick={sendData}>save</button>
    </div>
  )
}
export default AddTypeClient