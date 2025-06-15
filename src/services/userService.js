import axios from "axios"
const registerNewUser = (email, phone, username, password) => {
    return axios.post("http://localhost:8080/api/v1/register", {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post("http://localhost:8080/api/v1/login", {
        valueLogin, password
    })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`); // template string
    // return axios.get
}

// return axios.post("http://localhost:8080/api/v1/user/delete", {data:{id: user.id}}{

// })

const deleteUser = (user) => {
    return axios.delete("http://localhost:8080/api/v1/user/remove", { data: { id: user.id } });

}


export { registerNewUser, loginUser, fetchAllUser, deleteUser };