<template>
	<div class="flex flex-wrap w-[100%] gap-2 p-2 mt-3.5">
		<div v-for="(itm, i) in data" :key="i" class="flex flex-wrap gap-4">
			<div class="w-[250px] p-3">
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
				<p v-if="itm.status ==='true' " class="w-[50px] border-y-green-50 relative top-[10px] left-[25px]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="Outline"
						viewBox="0 0 24 24"
						width="30"
						height="30"
					>
						<path
							d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"
						/>
					</svg>
				</p>
				<p v-if="itm.status === '404'" class="w-[50px] border-y-green-50 relative top-[10px] left-[25px]">
					<svg
						height="30px"
						width="30px"
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 512.001 512.001"
						xml:space="preserve"
					>
						<path
							style="fill: #4fc0e8"
							d="M512.001,256.006c0,141.395-114.606,255.998-255.996,255.994
	C114.606,512.004,0.001,397.402,0.001,256.006C-0.007,114.61,114.606,0,256.005,0C397.395,0,512.001,114.614,512.001,256.006z"
						/>
						<path
							style="fill: #3daed9"
							d="M498.97,336.633L257.308,94.97c-0.001-0.001-0.001-0.001-0.001-0.001l-3.335-3.335
	c-0.634-0.636-1.393-1.142-2.235-1.494c-0.838-0.35-1.744-0.539-2.67-0.539H96.534c-3.829,0-6.933,3.104-6.933,6.933v291.2
	c0,2.347,1.243,4.32,3.027,5.574c0.462,0.658,112.783,112.978,113.441,113.441c0.117,0.167,0.297,0.272,0.426,0.426
	c16.022,3.14,32.567,4.828,49.511,4.827C369.214,512.003,465.185,438.5,498.97,336.633z"
						/>
						<g>
							<path
								style="fill: #f4f6f9"
								d="M249.067,172.8h62.4v48.533h13.867v-55.467c0-0.926-0.189-1.831-0.539-2.67
		c-0.352-0.842-0.859-1.6-1.494-2.235l-69.329-69.329c-0.635-0.635-1.393-1.142-2.235-1.494c-0.838-0.35-1.744-0.539-2.67-0.539
		H96.534c-3.829,0-6.933,3.104-6.933,6.933v291.2c0,3.829,3.104,6.933,6.933,6.933h138.667V380.8H103.467V103.467h138.667v62.4
		C242.134,169.696,245.238,172.8,249.067,172.8z M256.001,113.27l45.662,45.663h-45.662V113.27z"
							/>
							<path
								style="fill: #f4f6f9"
								d="M421.669,412.366l-83.2-166.4c-2.35-4.699-10.054-4.699-12.404,0l-83.2,166.4
		c-1.073,2.149-0.958,4.702,0.305,6.747c1.263,2.042,3.493,3.287,5.898,3.287h166.4c2.403,0,4.635-1.246,5.898-3.287
		C422.627,417.068,422.742,414.515,421.669,412.366z M260.286,408.533l71.981-143.965l71.981,143.965H260.286z"
							/>
							<path
								style="fill: #f4f6f9"
								d="M325.334,317.14v45.378c0,3.829,3.104,6.933,6.933,6.933c3.829,0,6.933-3.104,6.933-6.933V317.14
		c0-3.829-3.104-6.933-6.933-6.933C328.438,310.207,325.334,313.312,325.334,317.14z"
							/>
							<path
								style="fill: #f4f6f9"
								d="M332.267,378.275c-3.83,0-6.933,3.116-6.933,6.94c0,3.836,3.103,6.927,6.933,6.927
		c3.837,0,6.933-3.091,6.933-6.927C339.201,381.391,336.104,378.275,332.267,378.275z"
							/>
						</g>
					</svg>
				</p>
				<img :src="itm.file" :alt="'salom ' + i" />
				<p class="text-black">{{ itm.name }}</p>
			</div>
		</div>
		<div class="mt-[50px]">
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
  status: string;
}

const data = ref<DataItem[]>([]);
const showData = ref(true);
const dizablet = ref<boolean>(false);
const imgloa = ref(false);
const file = ref<File[] | null>(null);
const btnload = ref(false);
const imgbarcha = ref<any[]>([]);
const reemoved = ref(false);

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
				name: file.value[i].name,
        status:""

			});
		} else if (currentFile.type.includes("pdf")) {
			data.value.push({
				file: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w",
				id: id,
				name: file.value[i].name,
        status:""

			});
		} else if (currentFile.type.includes("zip")) {
			data.value.push({
				file: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png",
				id: id,
				name: file.value[i].name,
        status:""

			});
		} else if (currentFile.type.includes("sql")) {
			data.value.push({
				file: "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png",
				id: id,
				name: file.value[i].name,
        status:""

			});
		} else if (currentFile.type.includes("html")) {
			data.value.push({
				file: "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png",
				id: id,
				name: file.value[i].name,
        status:""

			});
		} else {
			data.value.push({
				file: "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png",
				id: id,
				name: file.value[i].name,
        status:""

			});
		}
	}

	imgloa.value = true;
};

const remover = async (id: string) => {
	console.log("remove", id);

	data.value = data.value.filter((itm) => itm.id !== id);
	// imgbarcha.value.splice(id, 1);

	if (!reemoved) return;

	for (let i = 0; i < imgbarcha.value.length; i++) {
		const item = imgbarcha.value[i];

		if (item.id === id) {
			const res = await Delete(item.file);
			data.value.splice(i, 1);
			imgbarcha.value.splice(i, 1);
			message.success(`${id} this data has been deleted`);
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
      try {

      const res = await uploadkatta(currentFile);
      imgbarcha.value.push({
        file: res.data.objectName,
        id: currentFile.name,
        status:currentFile.name
      });
      data.value[i].status='true'
      }catch (e) {
        data.value[i].status='404';
      }
    }

    showData.value = false;
    dizablet.value = true;
    btnload.value = false;
    console.log(data.value);
    console.log(imgbarcha.value);
    message.success("This is a success message");
  } catch (e) {
    imgbarcha.value.push({
      status: e.request.status,
    });
    console.error("Error uploading files:", e);
    message.error(e);
  }
};

</script>

<style></style>
