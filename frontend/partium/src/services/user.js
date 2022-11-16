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

    createEvent(data) {
        return http.post("/event", data); 
    }

    updateEvent(data) {
        return http.put("/event", data); 
    }

    deleteEvent(id, userId) {
        return http.delete(`/review?id=${id}`, { data: { user_id: userId }}); 
    }
}

export default new UserDataService(); 