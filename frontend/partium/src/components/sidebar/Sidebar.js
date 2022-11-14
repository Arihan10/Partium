import './Sidebar.css'
import { Search } from 'react-bootstrap-icons'

function SidebarItem(icon, text, href)
{
    return(
        <div className="sidebar-item">
            <p>HELLO???</p>
        </div>
    );
}

function Sidebar()
{
    return(
        <div className="sidebar">
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
        </div>
    );
}

export default Sidebar;