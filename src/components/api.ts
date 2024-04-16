import axios from 'axios';

export const upload = (fileInput: any) => {
    if (!fileInput) {
        console.error("No file selected");
        return Promise.reject("No file selected");
    }

    return axios.post("http://192.168.100.241:9999/api/file/upload/public", fileInput)
        .then((response) => {
            console.log("Completed upload", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error during upload:", error);
            throw error;
        });
};

export async function fechimg(data: string) {
    try {
        const response = await axios.get(`http://192.168.100.241:9999/api/file/view-image/${data}`);
        // console.log("Completed upload", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during upload:", error);
        throw error;
    }
}

