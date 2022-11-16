import mongodb from "mongodb"
import bcrypt, { hash } from "bcrypt"

const ObjectId = mongodb.ObjectId
//const bcrypt = require("bcrypt")

let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) return
        
        try {
            users = await conn.db(process.env.USERS_NS).collection("users")
        } catch (e) {
            console.error(`Unable to establish a collection handle in usersDAO: ${e}`)
        }
    }

    static async getUsers({
        filters = null, 
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) query = { $text: { $search: filters["name"] }}
        }

        let cursor

        try {
            cursor = await users.find(query);
        } catch (e) {
            console.error(`Unable to find issue command, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }

        try {
            const usersList = await cursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers}
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)

            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async getUserById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id)
                    }, 
                }, 
                {
                    $lookup: {
                        from: "events", 
                        let: {
                            id: "$_id", 
                        }, 
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$user_id", "$$id"], 
                                    }, 
                                }, 
                            }, 
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "events", 
                    }, 
                }, 
                {
                    $addFields: {
                        events: "$events", 
                    }, 
                }, 
            ]
            return await users.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getUserById: ${e}`)
            throw e
        }
    }

    static async getUserByHandle(handle) {
        try {
            const pipeline = [
                {
                    $match: {
                        handle: handle
                    }
                }
            ]

            return await users.aggregate(pipeline).next(); 
        } catch (e) {
            console.error(`Something went wrong in getUserByHandle: ${e}`)
            throw e
        }
    }

    static async addUser(userHandle, username, password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const passHash = await bcrypt.hash(password, salt)

            const userDoc = {
                handle: userHandle, 
                name: username, 
                passHash: passHash,
                friends: [], 
                friendRequests: [], 
                groupNames: [], 
                groupUsers: [[]]
            }
    
            return await users.insertOne(userDoc)
        } catch (e) {
            console.error(`Unable to create user: ${e}`)
            return { error: e }
        }
    }

    static async verifyUserPassword(userHandle, password) {
        try {
            const data = await this.getUserByHandle(userHandle); 

            const passHash = data.passHash

            return await bcrypt.compare(password, passHash)

            //return await bcrypt.compare(password, passHash)
        } catch (e) {
            //console.error(`Unable to verify user: ${e} + ${passHash} + ${password}`)
            console.error(`Unable to verify user: ${e}`)
            return { error: e }
        }
    }

    static async sendFriendRequest(userHandle, friendHandle) {
        try {
            const updateResponse = await users.updateOne(
                {
                    handle: friendHandle,
                }, 
                { $push: {
                    "friendRequests": userHandle,
                }}
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to add friend requests: ${e}`)
            return { error: e }
        }
    }

    static async acceptFriendRequest(userHandle, friendHandle) {
        try {
            const updateResponse = await users.updateOne(
                {
                    handle: userHandle,
                }, 
                { $push: {
                    "friends": friendHandle, //change to ID and centralize this thing
                }, $pull: {
                    "friendRequests": friendHandle,
                }}
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to accept friend requests: ${e}`)
            return { error: e }
        }
    }
}