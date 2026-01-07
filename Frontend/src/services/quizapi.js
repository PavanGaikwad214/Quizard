import axios from "axios";

const api = axios.create({
    baseURL: "https://quizard-z0g1.onrender.com",
})


export default api;