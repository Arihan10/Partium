//Has functions called in routes; takes data from User DAO

import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        //const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        //const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters, 
            //page, 
            //usersPerPage, 
        })

        let response = {
            users: usersList, 
            //page: page, 
            filters: filters, 
            //entries_per_page: usersPerPage, 
            total_results: totalNumUsers,
        }
        res.json(response)
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {}
            let user = await UsersDAO.getUserById(id)

            if (!user) {
                res.status(404).json({ error: "Not found bro" })
                return
            }

            res.json(user)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetUserByHandle(req, res, next) {
        try {
            let handle = req.params.handle || {}
            let user = await UsersDAO.getUserEventsByHandle(handle)

            if (!user) {
                res.status(404).json({ error: "Not found bro" })
                return
            }

            res.json(user)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetUserEventsByHandle(req, res, next) {
        try {
            let handle = req.params.handle || {}
            let user = await UsersDAO.getUserEventsByHandle(handle)

            if (!user) {
                res.status(404).json({ error: "Not found bro" })
                return
            }

            res.json(user)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiPostUser(req, res, next) {
        try {
            const userHandle = req.body.handle
            const username = req.body.name
            const password = req.body.password

            const EventResponse = await UsersDAO.addUser(
                userHandle, 
                username, 
                password,
            )
            //res.json({ status: "success" })
            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiVerifyPassword(req, res, next) {
        try {
            const userHandle = req.body.handle
            const password = req.body.password

            const EventResponse = await UsersDAO.verifyUserPassword(
                userHandle, 
                password, 
            )

            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiSendFriendRequest(req, res, next) {
        try {
            const userHandle = req.body.userHandle
            const friendHandle = req.body.friendHandle

            const EventResponse = await UsersDAO.sendFriendRequest(
                userHandle, 
                friendHandle,
            )

            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiAcceptFriendRequest(req, res, next) {
        try {
            const userHandle = req.body.userHandle
            const friendHandle = req.body.friendHandle

            const EventResponse = await UsersDAO.acceptFriendRequest(
                userHandle, 
                friendHandle,
            )

            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}