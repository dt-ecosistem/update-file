<template>
  <div class="flex items-end gap-3.5 justify-center w-full mt-3.5">
    <div class="">
      <label for="dropzone-file" class="flex flex-col items-center justify-center w-[300px] h-[300px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
        </div>
        <input id="dropzone-file" @change="setData" type="file" multiple class="hidden" />
      </label>
    </div>
    <button @click="submit" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      {{ btnload ? "Loading..." : "Upload" }}
    </button>


  </div>

  <div class="mt-4 w-full grid place-content-center">

    <div v-if="imgloa" class="text-white bg-auto bg-cover w-[800px] flex-wrap  bg-center flex items-center gap-1">
      <div v-for="(itm, i) in data" :key="i">
        <p @click="remover(i)" class=" text-red-950 font-semibold cursor-pointer text-[20px]">remove</p>
        <img :src="itm" :alt="'salom ' + i" class="w-[200px] h-[200px] ">
      </div>
    </div>
  </div>



</template>

<script setup lang="ts">
import { uploadFiles } from "./components/api.ts";
import { ref } from "vue";

const data = ref<string[]>([]);
const imgloa = ref(false);
const file = ref<File[] | null>(null);
const btnload = ref(false);

const setData = (e: any) => {
  const inputFile = e.target.files;
  if (!inputFile) return;
  file.value = Array.from(inputFile)


  // fayllarni tekshirish va ma'lumotlarni saqlash
  for (let i = 0; i < file.value.length; i++) {
    const currentFile = file.value[i];
    if (currentFile.type.includes('jpeg') || currentFile.type.includes('png')) {
      data.value.push(URL.createObjectURL(currentFile)); // Fayllarni URL.createObjectURL orqali saqlash
    } else if (currentFile.type.includes('pdf')) {
      data.value.push('https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w');
    } else if (currentFile.type.includes('zip')) {
      data.value.push('https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png');
    } else if (currentFile.type.includes('sql')) {
      data.value.push('https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png');
    } else if (currentFile.type.includes('html')) {
      data.value.push('https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png');
    } else {
      data.value.push('https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png');
    }
  }

  imgloa.value = true;
}

const remover = (id: number) => {
  data.value.splice(id, 1);
}

const submit = async () => {
  if (!file.value) return;
  btnload.value = true;

  try {

    const datalar = new FormData();
    const fileName:string[] = [];
    datalar.append("tenantId", "test");
    datalar.append("module", "test");
    // datalar.append("fileName", "test");
    file.value.forEach((file: any, i: number) => {

      console.log(file.name);
      fileName.push(file.name);
      datalar.append(`file`, file);

    });
    console.log(fileName)
      datalar.append(`fileName`, fileName);

    const res = await uploadFiles(datalar);
    console.log(res);
    btnload.value = false;
  } catch (e) {
    console.log(e);
  }
}
</script>

<style>
</style>
