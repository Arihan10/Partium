import EventsDAO from "../dao/eventsDAO.js"

export default class EventsController {
    static async apiPostEvent(req, res, next) {
        try {
            const eventTitle = req.body.title
            const eventBody = req.body.text
            const eventDate = req.body.eventDate
            const eventTime = req.body.eventTime
            const userInfo = {
                handle: req.body.userHandle, 
                name: req.body.username, 
                _id: req.body.user_id
            }
            const date = new Date()

            const EventResponse = await EventsDAO.addEvent(
                eventTitle, 
                eventBody, 
                eventDate, 
                eventTime,
                userInfo, 
                date,
            )
            //res.json({ status: "success" })
            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateEvent(req, res, next) {
        try {
            const eventId = req.body.event_id
            const eventTitle = req.body.title
            const eventBody = req.body.text
            const eventDate = req.body.eventDate
            const eventTime = req.body.eventTime
            const date = new Date()

            const EventResponse = await EventsDAO.updateEvent(
                eventId, 
                req.body.user_id, 
                eventTitle, 
                eventBody, 
                eventDate, 
                eventTime, 
                date,
            )

            var { error } = EventResponse
            if (error) res.status(400).json({ error })

            if (EventResponse.modifiedCount == 0) {
                throw new Error(
                    "unable to update event - user may not be original poster",
                )
            }

            res.json({ status: "success" })
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteEvent(req, res, next) {
        try {
            const eventId = req.query._id
            const userId = req.body.user_id
            console.log(eventId)

            const EventResponse = await EventsDAO.deleteEvent(
                eventId, 
                userId,
            )

            //res.json({ status: "success" })
            //res.json({eventId, userId}); 
            res.json(EventResponse); 
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}