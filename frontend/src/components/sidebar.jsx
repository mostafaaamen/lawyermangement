// sidebar.jsx
import "../styles/sidebar.css"
import React from 'react'
import TopSidebar from "../screens/TopSidebar.jsx"
import LinksSidebar from "../screens/LinksSidebar.jsx"
import {LANG_SideBar}from "../lang/sideBar.js"
import useLanguage from "../hooks/useLanguage.jsx"
function Sidebar() {
  const lang=useLanguage(LANG_SideBar)
  return (
    <div className='mainSidebar'>
     <TopSidebar/>
     <ul className="containerLiksSidebar" style={{direction:lang?.type}}>
        <LinksSidebar title={lang?.home} href="/home" icon="fa-solid fa-house"/>
        <LinksSidebar title={lang?.client} href="home/client" icon="fa-solid fa-users"/>
       
        <LinksSidebar title={lang?.case}  href="home/lawsuites" >
        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1iirmgg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountBalanceIcon"><path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z"></path></svg>
       </LinksSidebar>
        <LinksSidebar title={lang?.payment}  href="home/payments" icon="fa-solid fa-sack-dollar"/>
        <LinksSidebar title={lang?.file}  href="home/files" icon="fa-solid fa-file"/>
        <LinksSidebar title={lang?.report}  href="home/reports" icon="fa-solid fa-feather-pointed"/>
        <LinksSidebar title={lang?.template}  href="home/templates" icon="fa-solid fa-code"/>
        <LinksSidebar title={lang?.law}  href="home/law" icon="fa-solid fa-gavel"/>
        <LinksSidebar title={lang?.system}  href="home/system" icon="fa-solid fa-gear"/>
     </ul>
    </div>
  )
}
export default Sidebar
