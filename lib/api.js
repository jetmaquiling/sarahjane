import { axios } from "@/config/axios";

const PUBLIC_API = "c5de19f018019b8bfe423898ba27953b2f4881e7f36cc5aaedbab4c420c6c1e2a6c50fe0229980797bb2114967b75f2d57c46212e3d932f78e1e72d2883e8a7bae782e8194b64728c8e7c00644ea6bacc5070b18cccc46d0fb3f0d30515f2f972fde7b5a95045b5d54e0dfc0f7ccbdd5944bf13c2e02777f675d51043969f14a";


export const register = async (name, one_word, image, inspire, playlist, message, score) => {
    try {
        console.log("Registering User", name, one_word, image, inspire, playlist, message, score);
        
        const data = { name, one_word, inspire, playlist, message, score };
        if (image) {
            data.image = image;
        }

        const response = await axios.post(`/happy-birthdays`, { data },
            {
                headers: {
                    Authorization: `Bearer ${PUBLIC_API}`,
                },
            });
        console.log("User REGISTERED", response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};


export const getAllData = async () => {
    try {
        const response = await axios.get(`/happy-birthdays?populate=*`, 
            {
                headers: {
                    Authorization: `Bearer ${PUBLIC_API}`,
                },
            });
        console.log("Get all User REGISTERED", response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};



export const uploadImageRequest = async (file) => {
    try {
        const response = await axios.post(`/upload/`, file, {
            headers: {
                Authorization: `Bearer ${PUBLIC_API}`,
            },
        });
        console.log("Image Uploaded", response);

        return response;


    } catch (error) {
        console.error("Image Error", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};


