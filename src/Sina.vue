<template>

  <div class="flex items-center justify-center w-full mt-3.5">
    <div  class="">
      <label for="dropzone-file" class="flex flex-col items-center justify-center w-[500px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div v-if="loading" class="text-white w-full h-full " >

          <!--          <img :src="data" alt="salom">-->

          <img :src="`http://192.168.100.241:9999/api/file/view-image/${data}`" alt="salom" class="w-full  h-full">

        </div>
        <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>

        </div>
        <input id="dropzone-file" @input="setData" type="file" class="hidden" />
      </label>
    </div>
  </div>

</template>


<script setup lang="ts">
import {fechimg, upload} from "./components/api.ts";
import {ref} from "vue";
const loading = ref(false);
const data = ref(null);

// olish
const fechImgdata = async (responseData: any) => {
  try {
    const image = await fechimg(responseData);
// data.value=image;
    // console.log("Olingan rasm:", image);
    console.log(data)
  } catch (error) {
    console.error("Rasmni olishda xatolik yuz berdi:", error);
  }
}

// jonatish
const setData = async (event: any) => {
  const fileType = event.target.files[0];
  if (fileType) {
    try {
      const formdata = new FormData();
      formdata.append("tenantId", "test");
      formdata.append("module", "test");
      formdata.append("fileName", "test");
      formdata.append("file", fileType);
      const response = await upload(formdata);
      loading.value = true;
      console.log("as",response);
      data.value=response.objectName;
      await fechImgdata(response.objectName);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }
  console.log("Rasmning turi:", fileType);
}

</script>

<style scoped></style>
