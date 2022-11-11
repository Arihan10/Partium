//Manages data being passed to and from these routes

import express from "express"
import UsersCtrl from "./users.controller.js"
import EventsCtrl from "./events.controller.js"

const router = express.Router()

router
    .route("/")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiPostUser)

router
    .route("/events")
    .post(EventsCtrl.apiPostEvent)
    .put(EventsCtrl.apiUpdateEvent)
    .delete(EventsCtrl.apiDeleteEvent)

export default router