import './Sidebar.css'
import { useEffect } from 'react';
import { PersonPlusFill, HouseFill, BellFill, PersonFill, GearFill, BoxArrowLeft } from 'react-bootstrap-icons'
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from 'react-router-dom';

function SidebarItem({icon, name, href, compact, classNm = "sidebar-item", pClassNm, onClickFunc})
{
    //const nm = "sidebar-item" + (compact ? "-compact" : "");
    const nm = classNm + (compact ? "-compact" : "");
    return(
        <>
            <a className={nm} href={href} onClick={() => onClickFunc()}>
                <p className={pClassNm}>{name}</p>
            </a>
        </>
    );
}

function Sidebar()
{
    const navigate = useNavigate(); 
    const location = useLocation(); 

    useEffect(() => {
        loginRedir(); 
    }, [])

    const loginRedir = () => {
        //console.log(!(location.pathname=="/login") + " " + (localStorage.getItem("userHandle")=="null")); 
        //console.log(localStorage.getItem("userHandle")=="null" && location.pathname=="/login"); 
        if (localStorage.getItem("userHandle")=="null" && !(location.pathname=="/login")) {
            console.log("hmmm"); 
            navigate("/signup"); 
        }
    }

    const handleMediaQueryChange = (matches) => { };
    const desktop = useMediaQuery( {minWidth: 600}, undefined, handleMediaQueryChange);

    return(
        <div className="sidebar">
            { desktop &&
                <>
                    <h1 className='appName'>PARTIUM.</h1>
                    <SidebarItem name={"Feed"} href="/"/>
                    <SidebarItem name={"Users"} href="users"/>
                    <SidebarItem name={"Notifications"} href="notifs"/>
                    <SidebarItem name={"Account"} href="account"/>
                    <SidebarItem name={"Preferences"} href="preferences"/>
                    {localStorage.getItem("userHandle") == "null" ? false : <SidebarItem name={"Logout"} href="/logout" classNm='sidebar-item logout-btn' pClassNm='logout-btn-text'/>}
                </>
            }
            {!desktop &&
                <>
                    <SidebarItem name={<HouseFill/>} href="/" compact={true}/>
                    <SidebarItem name={<PersonPlusFill />} href="users" compact={true}/>
                    <SidebarItem name={<BellFill/>} href="notifs" compact={true}/>
                    <SidebarItem name={<PersonFill/>} href="account" compact={true}/>
                    <SidebarItem name={<GearFill/>} href="preferences" compact={true}/>
                    {localStorage.getItem("userHandle") ? <SidebarItem name={<BoxArrowLeft/>} href="/logout" classNm='sidebar-item logout-btn' pClassNm='logout-btn-text'/> : false}
                </>
            }
        </div>
    );
}

export default Sidebar;