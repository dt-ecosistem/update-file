<template>
  <div class="m-10">
    <div id="main" class="flex flex-wrap w-[100%] gap-2 p-2 mt-3.5 p-3.5">
      <label
        for="single"
        class="w-[300px] h-[250px] flex flex-col justify-center items-center cursor-pointer bg-gray-200 rounded text-white border-dashed border-2 border-black"
        :class="{ 'bg-black shadow-none': !fileName }"
      >
        <input
          id="single"
          type="file"
          class="hidden"
          ref="fileInput"
          @change="handleFileChange"
        />

        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512" id="upload"><path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z"></path></svg>


        <p class="font-bold text-gray-500">Click to upload </p>

        <i
          v-if="isUploaded"
          class="fa-solid fa-square-check text-[35px] absolute top-2 right-2 text-green-500"
        ></i>
        <i
          v-if="highSize"
          title="Size is too high"
          class="fa-solid fa-circle-xmark text-[35px] absolute top-2 right-2 text-red-500"
        ></i>
        <i class="fa-solid"></i>
        <i
          v-if="cantSend"
          title="Can't send"
          class="fa-solid fa-circle-exclamation text-[35px] absolute top-2 right-2 text-red-400"
        ></i>
        <img :src="fileContent" class="max-w-[100%] max-h-[100%]" />
      </label>

      <button
        :disabled="isUploaded || highSize"
        @click="upload()"
        type="submit"
        class="h-[50px]  w-[100px] ml-5 p-3 bg-gray-600  rounded text-white rounded-2xl"
        :class="{
          'hover:bg-yellow-600  cursor-not-allowed': isUploaded || highSize,
        }"
      >
        Upload
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useUploadStore } from "../stores/uploadStore";
import Notification from "../plugins/Notification";
import type { AxiosResponse } from "axios";

interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

const store = useUploadStore();
const fileName = ref("");
const fileContent = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const sendingFile: Ref<File | null> = ref(null);
const isUploaded = ref(false);
const highSize = ref(false);
const cantSend = ref(false);

const handleFileChange = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0];

  isUploaded.value = false;
  highSize.value = false;
  cantSend.value = false;
  if (file) {
    if (file.size / (1024 * 1024) > 20) highSize.value = true;
    sendingFile.value = file;
    if (file) {
      fileName.value = file.name;
      if (fileName.value.includes("png")) {
        const reader = new FileReader();
        reader.onload = () => {
          fileContent.value = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else if (fileName.value.includes("jpg")) {
        const reader = new FileReader();
        reader.onload = () => {
          fileContent.value = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else if (fileName.value.includes("mp4")) {
        fileContent.value =
          "https://static.vecteezy.com/system/resources/previews/000/644/657/original/vector-video-icon-symbol-sign.jpg";
      } else if (fileName.value.includes("mp3")) {
        fileContent.value = "/audio.png";
      } else if (fileName.value.includes("zip")) {
        fileContent.value =
          "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png";
      } else if (fileName.value.includes("pdf")) {
        fileContent.value =
          "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w";
      } else if (fileName.value.includes("html")) {
        fileContent.value =
          "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png";
      } else if (fileName.value.includes("sql")) {
        fileContent.value =
          "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png";
      } else {
        fileContent.value =
          "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png";
      }
    }
  }
};

const upload = async () => {
  if (sendingFile.value) {
    const data={} as ImageItem
    data.file=sendingFile.value
    data.id=0
    data.size=highSize.value
    data.image=fileContent.value
    const res:AxiosResponse = await store.uploadSingle(data);
    if (res.status == 200) {
      isUploaded.value = true;
      Notification(
        "success",
        "Successfully",
        "Your file successfully uploaded"
      );
    } else {
      cantSend.value = true;
      Notification("error", "Can't send", "This file can't be send");
    }
  } else
    Notification(
      "error",
      "Choose a file",
      "You have to choose at least one file"
    );
};
</script>

<style lang="scss" scoped></style>
