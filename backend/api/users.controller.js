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

    static async apiPostUser(req, res, next) {
        try {
            const userHandle = req.body.handle
            const username = req.body.name

            const EventResponse = await UsersDAO.addUser(
                userHandle, 
                username,
            )
            //res.json({ status: "success" })
            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}