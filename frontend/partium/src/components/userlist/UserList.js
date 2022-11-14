import React, { userState, useEffect, useState } from "react"
import UserDataService from "../../services/user"
import { Link } from "react-router-dom"
import './UserList.css'
import { Search } from 'react-bootstrap-icons'

function UserListPane({ pfp = "pfp.jpg", name, handle, friends, groups }) {
    return (
        <a className="user-pane" href="https://google.com">
            <div className="pfp">
                <img src="pfp.jpg"></img>
            </div>
            <div className="user-info">
                <h1>{name}</h1>
                <p>{handle}</p>
            </div>
        </a>
    );
}

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

    return (
        <div className="user-list">
            <div className="search-bar">
                <input type="text" placeholder="Search by name" value={searchName} onChange={onChangeSearchName} />
                <button onClick={findByName}><Search></Search></button>
            </div>
            <div>
                <div className="user-list-pane">
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    <UserListPane name={'Frostbiiten'} handle={'@frostbiiten'} />
                    {users.map((user) => {
                        return (
                            <>
                                <UserListPane name={user.name} handle={user.handle} />
                                <p>Ok so edem Idk how tf do add a list and I dont wanna map again lmao so im just gonna add sizes of the user lists</p>
                                <p><strong>No. of friends: {user.friends.length}</strong></p>
                                <p><strong>No. of groups: {user.groupNames.length}</strong></p>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserList; 