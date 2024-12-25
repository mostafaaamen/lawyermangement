import React, { useState } from 'react';
// 
import MainPopup from '../popup/mainPopup.jsx'
import AddNewLawsuit from '../screens/AddNewLawsuit.jsx'
import Table from "../screens/Table.jsx"
import useLanguage from '../hooks/useLanguage.jsx'
import { LANG_Lawsuit } from '../lang/lawsuit.js'
import AddTypeClient from '../screens/AddTypeClient.jsx'
import AddTypeLawsuite from '../screens/AddTypeLawsuite.jsx'

import { Link } from 'react-router-dom';
// hooks

import useFetch from '../hooks/useFetch.jsx'


// styles
import "../styles/lawsuit.css"

function Lawsuites() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Start with false so modal is initially closed
  const [openRender, setOpenRender] = useState(null); // Initialize as null to avoid accessing undefined

  // const openLawsuit = () => {
  //   setIsModalOpen(true);
  //   let render = {
  //     render: <AddNewLawsuit />,
  //     width: 1000,
  //   };
  //   setOpenRender(render);
  // };

  const openTypeClient = () => {
    setIsModalOpen(true);
    let render = {
      render: <AddTypeClient />,
      width: 600,
    };
    setOpenRender(render);
  };

  const openTypeLawsuit = () => {
    setIsModalOpen(true);
    let render = {
      render: <AddTypeLawsuite />,
      width: 600,
    };
    setOpenRender(render);
  };

  const closeModal = () => { 
    setIsModalOpen(false);
    setOpenRender(null); // Reset render to null when modal is closed
  };

  const lang = useLanguage(LANG_Lawsuit);

  let thead = [lang.id, lang.lawsuitNum, lang.client, lang.phone, lang.typeofClient, lang.typeLawsuit, lang.address, lang.nextSetion];

  let data = [
    {
      _id: "87293",
      id: "#",
      lawsuitNum: "17872",
      client: "توفيق السمان سيد ابراهيم",
      phone: "011111111111",
      typeofClient: "مجني عليه",
      address: "الاسكندرية",
      typeLawsuit: "جنائية",
      nextsetion: "12/oct"
    },
    {
      _id: "87293",
      id: "#",
      lawsuitNum: "7872",
      client: "محمد علي سيد ابراهيم",
      phone: "011111111111",
      typeofClient: "مجني عليه",
      address: "فيشا الكبري",
      typeLawsuit: "جنائية",
      nextsetion: "12/oct"
    },
    {
      _id: "87293",
      id: "#",
      lawsuitNum: "787٤2",
      client: "خالد محمد ادهم",
      phone: "011111111111",
      typeofClient: " المدعي بالحق المدني",
      address: "منوف ",
      typeLawsuit: "مدنية",
      nextsetion: "12/oct"
    },
  ];


  // lawsuites
  let dataLawsuite=useFetch("lawsuites")

  return (
    <div>
      <div className='lawsuitTop'>
        <div className='btn'>
          {/* <button onClick={openLawsuit}>add new lawsuit</button> */}
          <MainPopup isOpen={isModalOpen} close={closeModal} width={openRender?.width}>
            {openRender?.render} {/* If openRender is not null, render the component */}
          </MainPopup>
          <button onClick={openTypeClient}>open new Client</button>
          <button onClick={openTypeLawsuit}>add type of lawsuit</button>
        </div>
        <div className='search'>
          <input type="text" />
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
          <button className='btn'>search</button>
        </div>
      </div>
      <Table thead={thead} dataRender={data}>
        {dataLawsuite?.lawsuite?.map((data, i) => (
          <tr key={data._id}>
            <td>{i + 1}</td>
            <td> 
            <Link to={`/home/lawsuites/${data.id}`}>
            {`${data?.lawsuitNumber}-  ${data?.lawsuitType}  - ${data?.courtName} `}
              </Link>
            </td>
            <td>

              <Link to={`/home/client/${data.user_id}`}>
                {data.clientName}
              </Link>
            </td>
            <td>{data.ginstName}</td>
            <td>{data.clientType}</td>
            <td>{data.lawsuitTitle}</td>
            <td>{data.address}</td>
            <td>{data.nextsetion}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default Lawsuites;
