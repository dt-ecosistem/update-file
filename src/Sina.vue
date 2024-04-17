<template>
  <div class="flex items-end gap-3.5 justify-center w-full mt-3.5">
    <div class="">
      <label for="dropzone-file" class="flex flex-col items-center justify-center w-[500px] h-[500px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div v-if="imgloa" class="text-white bg-auto bg-cover bg-center">
          <img :src="data" alt="salom" class="w-[500px] ">
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
    <button @click="submit" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      {{btnload ? "loading..." : "Upload" }}
    </button>

  </div>
</template>

<script setup lang="ts">
import { upload } from "./components/api.ts";

import { ref } from "vue";

const data = ref('');
const imgloa = ref(false);
const file = ref<File | null>(null);
const btnload = ref(false);

const setData = (e: any) => {
  const inputFile = e.target.files[0];
  if (!inputFile) return;
  file.value = inputFile;

  // fileni tekshiradi

  if (inputFile.type.includes('jpeg') || inputFile.type.includes('png')) {
    data.value = URL.createObjectURL(inputFile);
  } else if (inputFile.type.includes('pdf')) {
    data.value = 'https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w';
  } else if (inputFile.type.includes('zip')) {
    data.value = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png';
  } else if (inputFile.type.includes('sql')) {
    data.value = 'https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png';
  } else if (inputFile.type.includes('html')) {
    data.value = 'https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png';
  } else {
    data.value = 'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png';
  }

  const reader = new FileReader();
  reader.readAsDataURL(inputFile);
  reader.onload = (e) => {
    imgloa.value = true;
  };
}

// jonatayabdi
const submit = async () => {
  if (!file.value) return;

  btnload.value=true
  try {
    const res = await upload(file.value);
    console.log(res);
    btnload.value=false
  }catch (e) {
    console.log(e)
  }

}
</script>
<style>

</style>