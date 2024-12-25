import React, { useState } from 'react';
import "../styles/lawsuiteId.css";
import useFetch from "../hooks/useFetch";
import { useParams } from 'react-router-dom';
import { postData } from '../backend/postData.js';

import { Link } from 'react-router-dom';




import Payments from '../screens/Payments.jsx';
import Sesstions from "../screens/Sesstions.jsx"
import CreateSesstions from '../screens/CreateSesstions.jsx';
import FilesShow from '../screens/FilesShow.jsx';
import CreatePayments from '../screens/CreatePayments.jsx';
import CreateFileLawsuites from "../screens/CreateFileLawsuites.jsx"



function LawsuitesId() {
  const { id } = useParams();
  const lawsuiteIdData = useFetch(`lawsuites/${id}`);
  const [activeTab, setActiveTab] = useState(0); 
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className='lawsuiteId'>
      <div className='lawsuiteInfo'>
        <div className="top" dir='rtl'>
          <Link to={`/home/client/${lawsuiteIdData?.lawsuite?.user_id}`}>

          <div className="client">
            <p>client name</p>
            <h3>{lawsuiteIdData?.lawsuite?.clientName}</h3>
            <p>{lawsuiteIdData?.lawsuite?.clientType}</p>
          </div>
          </Link>
          <div className="ginst">
            <p>genst name</p>
            <h3>{lawsuiteIdData?.lawsuite?.ginstName}</h3>
            <p>{lawsuiteIdData?.lawsuite?.ginstAddress}</p>
          </div>
        </div>
        <div className="middle">
          <div className='lawInfo'>
            {`${lawsuiteIdData?.lawsuite?.lawsuitNumber}-  ${lawsuiteIdData?.lawsuite?.lawsuitType}  - ${lawsuiteIdData?.lawsuite?.courtName} `}
          </div>
          <div className='lawTitle'>
            <h3>{lawsuiteIdData?.lawsuite?.lawsuitTitle}</h3>
          </div>
        </div>
        <div className='' dir='rtl' style={{textAlign:'right',padding:'10px'}}>
            ملاحظات علي القضية: 
            <p style={{width:'700px'}}>{lawsuiteIdData?.lawsuite?.nots}</p>
          </div>
        <div className="taps">
          <ul className='tapsUl' dir='rtl'>
            <li onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}>جلسات القضية</li>
            <li onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>اضافة جلسة للقضية</li>
            <li onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>المدفوعات</li>
            <li onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>عرض الصور و المرفقات</li>
            <li onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>اضافة صور و مرفقات للقضية</li>
          </ul>
          <div className="tapsContainer">
            <div className={activeTab === 0 ? 'activeTab' : 'inactiveTab'}>
              <Sesstions data={lawsuiteIdData?.lawsuite?.sessions}/>
            </div>
            <div className={activeTab === 1 ? 'activeTab' : 'inactiveTab'}>
            <CreateSesstions id={id}/>
            </div>
            <div className={activeTab === 2 ? 'activeTab' : 'inactiveTab'}>
              <CreatePayments id={id} />
                <Payments data={lawsuiteIdData?.lawsuite?.payments}/>
            </div>
            <div className={activeTab === 3 ? 'activeTab' : 'inactiveTab'}>
              <FilesShow data={lawsuiteIdData?.lawsuite?.files}/>
            </div>
            <div className={activeTab === 4 ? 'activeTab' : 'inactiveTab'}>
               <CreateFileLawsuites id={id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawsuitesId;
