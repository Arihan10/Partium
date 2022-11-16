import './Sidebar.css'
import { Search } from 'react-bootstrap-icons'

function SidebarItem({icon, name, href})
{
    return(
        <a className="sidebar-item" href={href}>
            <p>{name}</p>
        </a>
    );
}

function Sidebar()
{
    return(
        <div className="sidebar">
            <h1 className='appName'>PARTIUM</h1>
            <SidebarItem name="Feed" href="/"/>
            <SidebarItem name="Users" href="users"/>
            <SidebarItem name="Notifications" href="notifs"/>
            <SidebarItem name="Account" href="account"/>
            <SidebarItem name="Preferences" href="preferences"/>
        </div>
    );
}

export default Sidebar;