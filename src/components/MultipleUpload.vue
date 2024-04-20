<template>
  <hr />
  <div id="main" class="flex flex-wrap w-[100%] gap-2 p-2 mt-3.5 p-3.5  " >
    <input
      type="file"
      class="hidden"
      ref="fileInput"
      multiple
      id="multiple"
      @change="handleFileChange"
    />

    <!-- Selected files -->
    <button
      v-for="(item, index) in pictures"
      @click="reUpload(item)"
      :key="index"
      class="w-[200px] h-[200px] relative "
      :title="item.size ? 'Size is too high' : ''"
    >
      <i
        v-if="item.size"
        class="fa-solid fa-circle-xmark text-[35px] absolute bottom-2 right-2 text-red-500"
      ></i>
      <i
        v-if="item.id == 1"
        class="fa-solid fa-square-check text-[35px] absolute top-0 left-2 text-green-500"
      ></i>
      <i
        v-if="item.id == 2"
        class="fa-solid fa-circle-exclamation text-[35px] absolute top-0 left-2 text-red-500"
      ></i>
      <button
        class="absolute p-1 rounded-md bg-slate-500 text-white right-0 top-0"
        @click="removeeeeee(index)"
      >
        remove
      </button>
      <img :src="item.image" class="max-w-[100%] max-h-[100%]" />
    </button>

    <!-- First input -->
    <label
      for="multiple"
      class="w-[300px] h-[250px] flex flex-col justify-center items-center cursor-pointer bg-gray-200 rounded text-white border-dashed border-2 border-black"
    >

      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512" id="upload"><path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z"></path></svg>


      <p class="font-bold text-gray-500">Click to upload </p>


      <img class="max-w-[100%] max-h-[100%]" />
    </label>
    <button
      @click="upload()"
      type="submit"
      class="h-[50px]  w-[100px] ml-5 p-3 bg-gray-600  rounded text-white rounded-2xl"
    >
     {{isUploaded? "loading ...":"Upload"}}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useUploadStore } from "../stores/uploadStore";
import Notification from "../plugins/Notification";
import type { AxiosResponse } from "axios";
const isUploaded = ref(false)
const store = useUploadStore();

interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

const fileName: Ref<String | null> = ref("");
const pictures: Ref<ImageItem[]> = ref([]);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

const removeeeeee = (index: number) => {
  pictures.value.splice(index, 1);
};

const handleFileChange = (event: Event): void => {
  const inputElement = event.target as HTMLInputElement;
  const files: FileList | null = inputElement.files;

  if (!files) return;
  for (const file of Array.from(files)) {
    if (file) {
      fileName.value = file.name;
      const size = file.size / (1024 * 1024) > 20;
      if (fileName.value.includes("png")) {
        const reader = new FileReader();
        reader.onload = () => {
          pictures.value.push({
            image: reader.result as string,
            file,
            size,
            id: 0,
          });
        };
        reader.readAsDataURL(file);
      } else if (fileName.value.includes("jpg")) {
        const reader = new FileReader();
        reader.onload = () => {
          pictures.value.push({
            image: reader.result as string,
            file,
            size,
            id: 0,
          });
        };
        reader.readAsDataURL(file);
      } else if (fileName.value.includes("mp4")) {
        pictures.value.push({
          image:
            "https://static.vecteezy.com/system/resources/previews/000/644/657/original/vector-video-icon-symbol-sign.jpg",
          file,
          size,
          id: 0,
        });
      } else if (fileName.value.includes("mp3")) {
        pictures.value.push({ image: "/audio.png", file, size, id: 0 });
      } else if (fileName.value.includes("zip")) {
        pictures.value.push({
          image:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png",
          file,
          size,
          id: 0,
        });
      } else if (fileName.value.includes("pdf")) {
        pictures.value.push({
          image:
            "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w",
          file,
          size,
          id: 0,
        });
      } else if (fileName.value.includes("html")) {
        pictures.value.push({
          image:
            "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png",
          file,
          size,
          id: 0,
        });
      } else if (fileName.value.includes("sql")) {
        pictures.value.push({
          image:
            "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png",
          file,
          size,
          id: 0,
        });
      } else {
        pictures.value.push({
          image:
            "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png",
          file,
          size,
          id: 0,
        });
      }
    }
  }
};

const reUpload = async (item: ImageItem): Promise<void> => {
  if (item.id == 2) {
    const res = await store.uploadSingle(item);
    if (res && res.status == 200) {
      item.id = 1;
    }
  }
};

const upload = async () => {
  if (pictures.value.length > 0) {
    for (const i of pictures.value) {
      console.log(i);

      const imageItem = i as ImageItem;
      if (imageItem.id != 1 && !imageItem.size) {
        try {
        const res: AxiosResponse | undefined = await store.uploadSingle(
          imageItem
        );
        isUploaded.value = true;
        if (res && res.status == 200) {
          imageItem.id = 1;
        } else {
          imageItem.id = 2;
        }
        }catch (e){
          console.log(e)}

      }

    }
        isUploaded.value = false;
  } else {
    Notification(
      "warning",
      "Choose file",
      "You have to choose file at least one"
    );
  }
};
</script>

<style lang="scss" scoped></style>
