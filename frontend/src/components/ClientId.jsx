import React, { useState } from 'react'
import "../styles/clientId.css"
import { useParams } from 'react-router-dom';
// import {useFetch} from "../hooks/useFetch.jsx"
import useFetch from '../hooks/useFetch.jsx'
import Table from "../screens/Table"
import useLanguage from '../hooks/useLanguage'
import { LANG_Lawsuit } from '../lang/lawsuit'
import { Link } from "react-router-dom"
import MainPopup from '../popup/mainPopup.jsx'
import AddNewLawsuit from '../screens/AddNewLawsuit.jsx'
function ClientId() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Start with false so modal is initially closed
  const [openRender, setOpenRender] = useState(null); // Initialize as null to avoid accessing undefined
  const openLawsuit = () => {
    setIsModalOpen(true);
    let render = {
      render: <AddNewLawsuit />,
      width: 1000,
    };
    setOpenRender(render);
  };

  let dataArray = {
    userId: 21,
    userName: "name"
  }
  const { id } = useParams(); // Get the `id` from the URL
  const dataUser = useFetch(`users/${id}`)
  const data = dataUser.user
  const closeModal = () => {
    setIsModalOpen(false);
    setOpenRender(null); // Reset render to null when modal is closed
  };
  // const lang = useLanguage(LANG_Lawsuit);
  // let thead = [lang.id, lang.lawsuitNum, lang.client, lang.phone, lang.typeofClient, lang.typeLawsuit, lang.address, lang.nextSetion];
  let thead = ['#', , "lawsuite client", "lawsuitType", "lawsuitTitle", "ginstName", "next time", "show"]
  return (
    <div className='userId'>
      <MainPopup isOpen={isModalOpen} close={closeModal} width={openRender?.width}>
        <AddNewLawsuit data={{ userId: dataUser?.user?.id, userName: dataUser?.user?.name }} />
      </MainPopup>
      <div className='left'>
        <div className='topUserId'>
          <div className='enumData'>
            <div className='contentTitle'>
              <h4>المبالغ المتبقية</h4>
              <span>0</span>
            </div>
            <div className='contentIcon'>
              <i class="fa-solid fa-file-invoice-dollar"></i>
            </div>
          </div>
          <div className='enumData'>
            <div className='contentTitle'>
              <h4>اجمالي المبلغ المدفوعة</h4>
              <span>0</span>
            </div>
            <div className='contentIcon'>
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
          </div>
          <div className='enumData'>
            <div className='contentTitle'>
              <h4>اجمالي مبلغ العميل</h4>
              <span>{dataUser?.user?.totalPayment}</span>
            </div>

            <div className='contentIcon'>
              <i class="fa-solid fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <div className='showdata'>

          <button onClick={openLawsuit} className="addnewlawsuite">اضافة قضية جديدة</button>


          {dataUser?.user?.lawsuites && dataUser?.user?.lawsuites.length > 0 ? (
            <>
              <div>
                <h3 style={{marginTop:'10px',textAlign:'right'}}> عدد القضايا {dataUser.user.lawsuites.length}</h3>
              </div>
              <Table thead={thead}>
                {dataUser.user.lawsuites.map((data, i) => (
                  <tr key={data.id}>
                    <td>{i + 1}</td>
                    <td>{`${data.lawsuitNumber} - ${data.lawsuitType} - ${data.courtName}`}</td>
                    <td>{data.clientType}</td>
                    <td>{data.lawsuitTitle}</td>
                    <td>{data.ginstName}</td>
                    <td>{'11-10-2020'}</td>
                    <td>
                      <Link to={`/home/lawsuites/${data.id}`}>
                        show
                      </Link>
                    </td>
                  </tr>
                ))}
              </Table>
            </>
          ) : (
            <p>No data available</p>
          )}


        </div>
      </div>
      <div className='right' dir='rtl'>
        <i class="fa-solid fa-user"></i>
        <h3 className='title'>{dataUser?.user?.name}</h3>
        <div className='content'>
          <div className='info'>
            <span>address</span>
            <p>{dataUser?.user?.address}</p>
          </div>      <div className='info'>
            <span>phone</span>
            <p>{dataUser?.user?.phone}</p>
          </div>      <div className='info'>
            <span>gmail</span>
            <p>{dataUser?.user?.gmail}</p>
          </div>
          <div className='info'>
            <span>id</span>
            <p>{dataUser?.user?.idCard}</p>
          </div>
          <div className='info'>
            <span>nots</span>
            <p>{dataUser?.user?.nots}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientId