import axios from 'axios';


export const upload = (fileInput: any) => {
        if (!fileInput) {
            console.error("No file selected");
            return;
        }
        const formdata = new FormData();
        formdata.append("tenantId", "test");
        formdata.append("module", "test");
        formdata.append("fileName", "test");
        formdata.append("file", fileInput);
        axios.post("http://192.168.100.241:9999/api/file/upload/public", formdata)
            .then((response) => {
                console.log(response.data);
                return(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
};


export const Delete = async (id: any) => {
    try {
        const response = await axios.delete(`http://192.168.100.241:9999/api/file/delete/${id}`);

        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
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



export async function uploadkatta(data: any) {
    if (!data) {
        console.error("No file selected");
        return null;
    }

    try {
        const formdata = new FormData();
        formdata.append("tenantId", "test");
        formdata.append("module", "test");
        formdata.append("fileName", `test`);
        formdata.append("file", data);

        const response = await axios.post("http://192.168.100.241:9999/api/file/upload/public", formdata);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}
