import UserList from '../userlist/UserList';
import Sidebar from '../sidebar/Sidebar';
import './Mainpane.css'

function MainPane()
{
    return (
        <div className="main-pane">
            <UserList/>
        </div>
    );
}

export default MainPane;