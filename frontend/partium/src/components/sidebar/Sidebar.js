import './Sidebar.css'
import { PersonPlusFill, HouseFill, BellFill, PersonFill, GearFill } from 'react-bootstrap-icons'
import { useMediaQuery } from "react-responsive";

function SidebarItem({icon, name, href, compact})
{
    const nm = "sidebar-item" + (compact ? "-compact" : "");
    return(
        <>
            <a className={nm} href={href}>
                <p>{name}</p>
            </a>
        </>
    );
}

function Sidebar()
{
    const handleMediaQueryChange = (matches) => { console.log(matches); };
    const desktop = useMediaQuery( {minWidth: 600}, undefined, handleMediaQueryChange);

    return(
        <div className="sidebar">
            { desktop &&
                <>
                    <h1 className='appName'>PARTIUM.</h1>
                    <SidebarItem name="Feed" href="/"/>
                    <SidebarItem name="Users" href="users"/>
                    <SidebarItem name="Notifications" href="notifs"/>
                    <SidebarItem name="Account" href="account"/>
                    <SidebarItem name="Preferences" href="preferences"/>
                </>
            }
            {!desktop &&
                <>
                    <SidebarItem name={<HouseFill/>} href="/" compact={true}/>
                    <SidebarItem name={<PersonPlusFill />} href="users" compact={true}/>
                    <SidebarItem name={<BellFill/>} href="notifs" compact={true}/>
                    <SidebarItem name={<PersonFill/>} href="account" compact={true}/>
                    <SidebarItem name={<GearFill/>} href="preferences" compact={true}/>
                </>
            }
        </div>
    );
}

export default Sidebar;