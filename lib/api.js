import { axios } from "@/config/axios";

const PUBLIC_API = "f5764e869eaffd83020a27ea741d33211289c154e23fc39128ade435a5c80ab0c6f08dca94f30b548b58f2bc247081a33c33901e73d933384cf3c85cd1e2f209fe7eca7f212a4ef209a2fa1b7ef1c924891fc2d9eae1ac590069e3b831f68a43f508b695443a9e2de2a24ffa036984fbec7cfe23b072a5e0541f69288254aba1";


export const register = async (name, one_word, image, inspire, playlist, message, score) => {
    try {
        console.log("Registering User", name, one_word, image, inspire, playlist, message, score);
        const response = await axios.post(`/happy-birthdays`, { data: { name: name, one_word: one_word, image: image, inspire:inspire, playlist: playlist, message: message, score: score } },
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


