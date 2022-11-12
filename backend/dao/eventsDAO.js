import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let events

export default class EventsDAO {
    static async injectDB(conn) {
        if (events) return

        try {
            events = await conn.db(process.env.PARTIUM_NS).collection("events")
        } catch (e) {
            console.error(`Unable to establish connection handles in userDAO: ${e.message}`)
        }
    }

    static async addEvent(eventTitle, eventBody, eventDate, eventTime, userInfo, date) {
        try {
            const eventDoc = {
                title: eventTitle, 
                text: eventBody, 
                eventDate: eventDate, 
                eventTime: eventTime, 
                userHandle: userInfo.handle, 
                username: userInfo.name, 
                //user_id: userInfo._id, //change to MongoDB Id if needed - ObjectId(userInfo._id)
                user_id: ObjectId(userInfo._id), //change to MongoDB Id if needed - ObjectId(userInfo._id)
                date: date,
            }
    
            return await events.insertOne(eventDoc)
            //await events.insertOne(eventDoc)
            //return "hmm yes this worked"
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateEvent(eventId, userId, eventTitle, eventBody, eventDate, eventTime, date) {
        try {
            const updateResponse = await events.updateOne(
                { 
                    user_id: userId, 
                    _id: ObjectId(eventId),
                }, 
                { $set: {
                    title: eventTitle, 
                    text: eventBody, 
                    eventDate: eventDate, 
                    eventTime: eventTime, 
                    date: date,
                }}
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteEvent(reviewId, userId) {
        try {
            const deleteResponse = await events.deleteOne({
                _id: ObjectId(reviewId), 
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }
}