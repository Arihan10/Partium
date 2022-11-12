import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

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

    static async addUser(userHandle, username) {
        try {
            const userDoc = {
                handle: userHandle, 
                name: username, 
                friends: [], 
                groupNames: [], 
                groupUsers: [[]]
            }
    
            return await users.insertOne(userDoc)
            //await events.insertOne(eventDoc)
            //return "hmm yes this worked"
        } catch (e) {
            console.error(`Unable to create user: ${e}`)
            return { error: e }
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
}