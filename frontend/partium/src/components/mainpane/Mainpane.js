import UserList from '../userlist/UserList';
import Sidebar from '../sidebar/Sidebar';
import './Mainpane.css'

function MainPane()
{
    return (
        <div className="main-pane">
            <UserList/>
            <Sidebar/>
        </div>
    );
}

export default MainPane;