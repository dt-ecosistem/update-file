<template>
	<div class="flex flex-wrap w-[100%] gap-2 p-2 mt-3.5">
    <div v-for="(itm, i) in data" :key="i" class=" ">
      <div
          class="relative top-[38px] w-[90px] left-[125px] bg-cyan-100 grid place-content-center rounded-lg p-0.5 hover:bg-cyan-400"
      >
        <p
            @click="remover(itm.id)"
            class="text-black cursor-pointer text-[20px] hover:text-white"
        >
          Remove
        </p>
      </div>
      <div  class="w-[220px] h-[220px]" >
        <img :src="itm.file" :alt="'salom ' + i"/>
        <p class="text-black">{{itm.name}}</p>
      </div>
    </div>
		<div class=" mt-7">
			<label
				for="dropzone-file"
				class="flex flex-col items-center justify-center w-[270px] h-[270px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold">Click to upload</span> or drag and drop
					</p>
				</div>
				<input id="dropzone-file" @change="setData" type="file" multiple class="hidden" />
			</label>
		</div>
		<div class="flex items-end">
      <button
          :disabled="dizablet"
          @click="submit"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {{ btnload ? "Loading..." : "Upload" }}
      </button>
    </div>
	</div>

<!--	<div class="grid place-content-center w-full h-full">-->
<!--		<div class="mt-4  p-2 flex items-center flex-wrap">-->
<!--			<div-->
<!--				class="text-white flex-wrap bg-center flex items-center gap-3 p-2.5 overflow-x-auto border-solid border-2 border-sky-500 w-full h-full"-->
<!--			>-->
<!--				-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
</template>





<script setup lang="ts">
import { message } from "ant-design-vue";
import { Delete, uploadkatta } from "./components/api.ts";
import { ref } from "vue";
interface DataItem {
  file: string;
  id: string;
  name: string;
}

const data = ref<DataItem[]>([]);
const showData = ref(true);
const dizablet = ref<boolean>(false);
const imgloa = ref(false);
const file = ref<File[] | null>(null);
const btnload = ref(false);
const imgbarcha = ref<any[]>([]);

const setData = (e: any) => {
	const inputFile: FileList | null = e.target.files;

	if (!inputFile || inputFile.length === 0) return;

	file.value = Array.from(inputFile);
	dizablet.value = false;

	for (let i = 0; i < file.value.length; i++) {
		const currentFile = file.value[i];
		const id = currentFile.name;

		if (currentFile.type.includes("jpeg") || currentFile.type.includes("png")) {
			data.value.push({
				file: URL.createObjectURL(currentFile),
				id: id,
        name:file.value[i].name,
			});
		} else if (currentFile.type.includes("pdf")) {
			data.value.push({
				file: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w",
				id: id,
        name:file.value[i].name,
			});
		} else if (currentFile.type.includes("zip")) {
			data.value.push({
				file: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png",
				id: id,
        name:file.value[i].name,
			});
		} else if (currentFile.type.includes("sql")) {
			data.value.push({
				file: "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png",
				id: id,
        name:file.value[i].name,
			});
		} else if (currentFile.type.includes("html")) {
			data.value.push({
				file: "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png",
				id: id,
        name:file.value[i].name,
			});
		} else {
			data.value.push({
				file: "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png",
				id: id,
        name:file.value[i].name,
			});
		}
	}

	imgloa.value = true;

};

const remover = async (id: string) => {
	console.log("remove", id);

	for (let i = 0; i < imgbarcha.value.length; i++) {
		const item = imgbarcha.value[i];

		if (item.id === id) {
			imgbarcha.value.splice(i, 1);
			data.value.splice(i, 1);
			message.success(`${id} this data has been deleted`);
			const res = await Delete(item.file);
			console.log(res);
			console.log(imgbarcha.value);
			break;
		}
	}
};

// Upload files
const submit = async () => {
	if (!file.value) return;
	btnload.value = true;
	try {
		for (let i = 0; i < file.value.length; i++) {
			const currentFile = file.value[i];
			const res = await uploadkatta(currentFile);
			imgbarcha.value.push({
				file: res.objectName,
				id: currentFile.name,
			});
		}
		showData.value = false;
		dizablet.value = true;
		btnload.value = false;
		console.log(imgbarcha.value);
		console.log(data.value);
		message.success("This is a success message");
	} catch (error) {
		console.error("Error uploading files:", error);
		message.error(error);
	}
};
</script>

<style></style>
