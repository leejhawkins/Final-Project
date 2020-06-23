import axios from "axios";

export default {
    getUserById: function (id) {
        return axios.get("/api/users/" + id);
    },
    getUserByName: function (name) {
        return axios.get("api/users/" + name)
    },
    getUsers: function () {
        return axios.get("/api/users");
    },
    saveUser: function (userData) {
        return axios.post("/api/books", userData);
    }
}
