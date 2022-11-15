import React, { userState, useEffect, useState } from "react"
import UserDataService from "../../services/user"
import { Link } from "react-router-dom"
import './UserList.css'
import { Search } from 'react-bootstrap-icons'

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveUsers();
    }, [])

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const retrieveUsers = () => {
        UserDataService.getAllUsers()
            .then(response => {
                console.log(response.data);
                setUsers(response.data.users);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const refreshList = () => {
        retrieveUsers();
    }

    const find = (query, by) => {
        UserDataService.getUsersBy(query, by)
            .then(response => {
                console.log(response.data);
                setUsers(response.data.users);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const findByName = () => {
        find(searchName, "name"); //"name" refers to filter type, all types can be found in usersDAO.js
    }

    const addFriend = (data) => {
        /*var dataThing = {
            handle: userHandle, 
            name: username,
        }*/

        UserDataService.sendFriendRequest(data)
            .then(response => {
                console.log(data); 
                console.log(response.data); 
            })
            .catch(e => {
                console.log(e);
            })
    }

    function UserListPane({ pfp = "pfp.jpg", name, handle, friends, groups }) {
        return (
            <a className="user-pane">
                <div className="pfp">
                    <img src="pfp.jpg"></img>
                </div>
                <div className="user-info">
                    <h1>{name}</h1>
                    <p>@{handle}</p>
                </div>
                <button className="friend" onClick={() => addFriend({
                    userHandle: "arihan10", 
                    friendHandle: handle,
                })}>+</button>
            </a>
        );
    }

    return (
        <div className="user-list">
            <div className="search-bar">
                <input type="text" placeholder="Search by name" value={searchName} onChange={onChangeSearchName} />
                <button onClick={findByName}><Search></Search></button>
            </div>
            <div>
                <div className="user-list-pane">
                    {users.map((user) => {
                        return (
                            <UserListPane name={user.name} handle={user.handle} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserList; 