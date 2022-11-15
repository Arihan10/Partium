import axios from "axios"; 

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/users", 
    headers: {
        "Content-Type": "application/json"
        //"Content-type": 'application/x-www-form-urlencoded',
    }
})