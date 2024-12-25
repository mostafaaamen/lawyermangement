import React,{useState} from 'react'
import Table from './Table.jsx';
import MainPopup from '../popup/mainPopup.jsx'
import {UrlBackend} from '../backend/api'
import PdfPreview from "../screens/PdfViewer.jsx"
function FilesShow({data}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [renderData,setRenderData]=useState(<h2>test</h2>)
    const handleClick = (data) => {
    console.log(data)
    let type=data.split(".").slice(-1)[0]
    console.log(type)
    let URL=`${UrlBackend}${data}`
    if(type==="pdf"){
        setRenderData(<PdfPreview urlPdf={URL}/> )


    }else{
    setRenderData( <img style={{width:"100%",height:"100%"}} src={URL} alt="" />)
    console.log(renderData)
    }
    setIsModalOpen(true)
    }
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const thead=["#","title","nots" ,"عرض"]
    return (
        <div> 
            {/*  */}
            <MainPopup isOpen={isModalOpen} close={closeModal} width={1120} >
               
                 {renderData}
            </MainPopup>
            {data&& data.length > 0 ? (
            <Table thead={thead}>
                {data.map((data, i) => (
                    <tr key={data.id}>
                        <td>{i + 1}</td>
                        <td>{data.title}</td>
                        <td>{data.nots}</td>
                        <td><button onClick={()=>handleClick(data.url)}>click</button></td>
                        </tr>
                ))}
            </Table>
        ) : (
            <p style={{ textAlign: "center", padding: '50px 10px' }}> لا توجد مرفقات حتي الان</p>
           
        )}</div>
    )
}

export default FilesShow