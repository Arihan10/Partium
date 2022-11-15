import './Sidebar.css'
import { Search } from 'react-bootstrap-icons'

function SidebarItem(icon, text, href)
{
    return(
        <a className="sidebar-item" href='google.com'>
            <p>ARIHAN DA BEST</p>
        </a>
    );
}

function Sidebar()
{
    return(
        <div className="sidebar">
            <h1 className='appName'>PARTIUM</h1>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
        </div>
    );
}

export default Sidebar;