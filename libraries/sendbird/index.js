const axios = require("axios");

const createUser = async (customer) => {
    try {
        const API_URL_V3 = process.env.SEND_BIRD_API_URL_V3;
        const API_TOKEN = process.env.SEND_BIRD_API_TOKEN;

        const url = `${API_URL_V3}/users`;
        const headers = {
            "Content-Type": "application/json; charset=utf8",
            "Api-Token": API_TOKEN,
        };

        const body = {
            user_id: customer._id,
            nickname: customer.name,
            profile_url: '',
        }

        const response = await axios.post(url, body, {headers});
        if (response.data) {
            return {
                isSuccess: true,
                data: response.data,
            };
        } else {
            return {
                isSuccess: false,
                message: "Failed to create user",
            };
        }
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
            message: err.response.data.message,
        };
    }
}

const getUser = async (userId) => {
    try {
        const API_URL_V3 = process.env.SEND_BIRD_API_URL_V3;
        const API_TOKEN = process.env.SEND_BIRD_API_TOKEN;

        const url = `${API_URL_V3}/users/${userId}`;
        const headers = {
            "Content-Type": "application/json; charset=utf8",
            "Api-Token": API_TOKEN,
        };

        const response = await axios.get(url, {headers});
        if (response.data) {
            return {
                isSuccess: true,
                data: response.data,
            };
        } else {
            return {
                isSuccess: false,
                message: "Failed to get user",
            };
        }
    } catch (err) {
        return {
            isSuccess: false,
            code: err.response.data.code,
            message: err.response.data.message,
        };
    }
}

module.exports = {
    createUser,
    getUser,
}
