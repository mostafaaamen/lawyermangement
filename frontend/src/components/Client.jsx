// lib
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

// components
import MainPopup from '../popup/mainPopup.jsx'
import AddNewClient from '../screens/AddNewClient.jsx'
// css and js
import "../styles/client.css"
import { LANGUSED } from "../assets/lang.js"
import { LANG_TableUsers } from "../lang/clientLang.js"
import useFetch from '../hooks/useFetch.jsx'
function Client() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState({})
  const handleClick = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (LANGUSED) {
      setLang(LANG_TableUsers[LANGUSED])
    } else {
      console.log("LANGUSED is undefined");
    }
  }, [LANGUSED]);
  const dataUser = useFetch("users")

  return (
    <>
      <div className='client'>
        <div className='top'>
          <div className='btn'>
            <button onClick={handleClick}>{lang?.topcontent?.addBtn}</button>
            <MainPopup isOpen={isModalOpen} close={closeModal} width={920} >
              <AddNewClient />
            </MainPopup>
          </div>
          <div className="search">
            <select name="" id="">
              <option style={{ direction: lang?.type }} value="username">{lang?.topcontent?.option?.username}</option>
              <option style={{ direction: lang?.type }} value="idcard">{lang?.topcontent?.option?.idcard}</option>
              <option style={{ direction: lang?.type }} value="city">{lang?.topcontent?.option?.city}</option>
            </select>
            <input type="text" placeholder={lang?.topcontent?.search} />
          </div>
        </div>
        <div className='tableContent'>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>{lang?.table?.id}</th>
                <th>{lang?.table?.name}</th>
                <th>{lang?.table?.cardId}</th>
                <th>{lang?.table?.phone}</th>
                <th>{lang?.table?.address}</th>
                <th>{lang?.table?.action}</th>
              </tr>
            </thead>
             <tbody>
              {dataUser?.users?.map((ele,index) => (
                <tr key={ele.id}> 
                  <td>{index + 1}</td>
                  <td>{ele.name}</td> 
                  <td>{ele.idCard}</td> 
                  <td>{ele.phone}</td> 
                  <td>{ele.address}</td> 
                  <td>
                    <Link to={`/home/client/${ele.id}`}>
                      {lang?.table?.action}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Client