import axios from "axios";

const api = axios.create({
    baseURL: "https://quizard-8.onrender.com/",
})


export default api;