import axios from 'axios';


export const upload = (fileInput: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!fileInput) {
            console.error("No file selected");
            reject("No file selected");
            return;
        }

        const formdata = new FormData();
        formdata.append("tenantId", "test");
        formdata.append("module", "test");
        formdata.append("fileName", "test");
        formdata.append("file", fileInput);

        axios.post("http://192.168.100.241:9999/api/file/upload/public", formdata)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};




export const uploadFiles = (fileInput: any) => {
    if (!fileInput) {
        console.error("No file selected");
        return;
    }
    console.log(fileInput)

    axios.post("http://192.168.100.241:9999/api/file/upload/public", fileInput)
        .then((response) => {
            console.log(response.data);
           return response.data
        })
        .catch((error) => {
            console.error("Error uploading files:", error);
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

