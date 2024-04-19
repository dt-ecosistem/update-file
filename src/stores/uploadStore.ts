import { defineStore } from "pinia";
import upload from "../api/upload";
import { type AxiosResponse, isAxiosError } from "axios";
interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

export const useUploadStore = defineStore({
  id: "upload",

  actions: {
    async uploadSingle(payload: ImageItem) {
      try {
        let res: AxiosResponse = await upload.uploadSingle(payload);
        return res;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          return error.response;
        }
        console.log(error);
      }
    },
    async uploadMultiple(payload: ImageItem) {
      try {
        let res = await upload.uploadMultiple(payload);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
