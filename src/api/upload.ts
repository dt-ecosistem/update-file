import axiosClient from "./apiClient";
interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

const upload = {
  uploadSingle(payload: ImageItem) {
    const data = new FormData();
    data.append("module", "test");
    data.append("tenantId", "test");
    data.append("fileName", "test");
    data.append("file", payload.file);
    const url = "file/upload/public";
    return axiosClient.post(url, data);
  },


  uploadMultiple(payload: ImageItem) {
    const url = "file/multiple-upload/public";
    return axiosClient.post(url, payload);
  },
};

export default upload;
