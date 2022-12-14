//Manages data being passed to and from these routes

import express from "express"
import UsersCtrl from "./users.controller.js"
import EventsCtrl from "./events.controller.js"

const router = express.Router()

router
    .route("/")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiPostUser)

router.route("/id/:id").get(UsersCtrl.apiGetUserById)

router.route("/friendReq/send").put(UsersCtrl.apiSendFriendRequest)
router.route("/friendReq/accept").put(UsersCtrl.apiAcceptFriendRequest)

router.route("/login").post(UsersCtrl.apiVerifyPassword)

router
    .route("/events")
    .post(EventsCtrl.apiPostEvent)
    .put(EventsCtrl.apiUpdateEvent)
    .delete(EventsCtrl.apiDeleteEvent)

router.route("/events/:handle").get(UsersCtrl.apiGetUserEventsByHandle)

export default router