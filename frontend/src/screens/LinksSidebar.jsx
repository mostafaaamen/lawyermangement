import {Children, React} from "react"
import { NavLink } from "react-router-dom"
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import "../styles/LinksSidebar.css"
const LinksSidebar =({ title, href,icon,children })=>{
    return (
          <li className="liSidebar">
            <NavLink className="aSidebar " to={href}>
            <i className={icon}>
            {children}
            </i>
            {title}
            </NavLink>
          </li>
        )}

export default LinksSidebar