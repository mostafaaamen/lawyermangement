import React from 'react'
import Table from './Table.jsx';
function Sesstions({data}) {
    const thead=["#","title","date","nots" ]
    return (
        <div> 
            {/*  */}
            {data&& data.length > 0 ? (
      <Table thead={thead}>
      {data
          .sort((a, b) => b.id - a.id)  // Sorting by the 'id' field in ascending order
          .map((data, i) => (
              <tr key={data.id}>
                  <td>{i + 1}</td>
                  {/* <td>{data.id}</td> */}
                  <td>{data.title}</td>
                  <td>{data.date}</td>
                  <td>{data.nots}</td>
              </tr>
          ))}
  </Table>
  
        ) : (
            <p style={{ textAlign: "center", padding: '50px 10px' }}> لا توجد جلسات حتي الان</p>
        )}</div>
    )
}
export default Sesstions