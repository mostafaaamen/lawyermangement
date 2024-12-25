import React,{useState} from 'react'
import { postData } from '../backend/postData.js';
function CreatePayments({id}) {
      const [formDataPayment, setFormDataPayment] = useState({
        title: '',
        payment: '',
        nots: '',
      });
      const handleChangePayment = (e) => {
        const { name, value } = e.target;
        setFormDataPayment({
          ...formDataPayment,
          [name]: value
        });
      };
        const sendDataPayment = () => {
          postData(`payments/${id}`, formDataPayment);
          console.log("send", formDataPayment);
        };
    return (
        <div>
            <div className='createsesstions'>
                <input type="text" name='title' placeholder='title' onChange={handleChangePayment} />
                <input type="number" name='payment' placeholder='payment' onChange={handleChangePayment} />
                <textarea name="nots" onChange={handleChangePayment}></textarea>
                <button onClick={sendDataPayment}>send</button>
            </div>
        </div>
    )
}

export default CreatePayments