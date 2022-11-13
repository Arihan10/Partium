import React, { userState, useEffect, useState } from "react"
import UserDataService from "../services/user"
import { Link } from "react-router-dom"

const UserList = props => {
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
            .catch (e => {
                console.log(e); 
            })
    }

    const findByName = () => {
        find(searchName, "name"); //"name" refers to filter type, all types can be found in usersDAO.js
    }

    return (
        <div className="App">
            <input type = "text" placeholder="Search by name" value={searchName} onChange={onChangeSearchName} />
            <button type="button" onClick={findByName}>Find</button>
            <div>
                {users.map((user) => {
                    return (
                        <div className="card">
                            <h2>{user.name}</h2>
                            <h5>{user.handle}</h5>
                            <p>Ok so edem Idk how tf do add a list and I dont wanna map again lmao so im just gonna add sizes of the user lists</p>
                            <p><strong>No. of friends: {user.friends.length}</strong></p>
                            <p><strong>No. of groups: {user.groupNames.length}</strong></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserList; 