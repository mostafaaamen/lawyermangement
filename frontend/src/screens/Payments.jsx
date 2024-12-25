import React from 'react'
import Table from '../screens/Table.jsx';

function Payments({data}) {
    const thead=["#","title","payment","nots"]
    return (
        <div> 
            {/*  */}
            {data&& data.length > 0 ? (
            <Table thead={thead}>
                {data.map((data, i) => (
                    <tr key={data.id}>
                        <td>{i + 1}</td>
                        <td>{data.title}</td>
                        <td>{data.payment}</td>
                        <td>{data.nots}</td>
                    </tr>
                ))}
            </Table>
        ) : (
            <p style={{ textAlign: "center", padding: '50px 10px' }}> لا توجد مدفوعات حتي الان</p>
        )}</div>
    )
}

export default Payments