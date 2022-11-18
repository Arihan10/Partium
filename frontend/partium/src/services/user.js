import http from "../http-common"

class UserDataService {
    getAllUsers() {
        return http.get(); 
    }

    getUser(id) {
        http.get(`/id/${id}`); 
    }

    getUsersBy(query, by) {
        return http.get(`?${by}=${query}`); 
    }

    createUser(data) {
        return http.post("/", data); 
    }

    verifyUserPassword(data) {
        return http.post("/login", data); 
    }

    sendFriendRequest(data) {
        return http.put("/friendReq/send", data); 
    }

    acceptFriendRequest(data) {
        return http.put("/friendReq/accept", data); 
    }

    getUserEventsByHandle(handle) { 
        return http.get(`/events/${handle}`); 
    }

    createEvent(data) {
        return http.post("/events", data); 
    }

    updateEvent(data) {
        return http.put("/events", data); 
    }

    deleteEvent(id, userId) {
        return http.delete(`/event?id=${id}`, { data: { user_id: userId }}); 
    }
}

export default new UserDataService(); 