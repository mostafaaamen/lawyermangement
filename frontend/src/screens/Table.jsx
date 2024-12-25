// lib
import React, { useEffect, useState } from 'react'

// css and js
import "../styles/table.css"
import useLanguage from '../hooks/useLanguage.jsx'
function Table({ thead,children }) {
    const lang = useLanguage({})
    return (
<>
    <div className='client'>
        <div className='tableContent'>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {thead.map((head)=>(
                            <th>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </table>
        </div>
    </div>
</>
    )
}

export default Table