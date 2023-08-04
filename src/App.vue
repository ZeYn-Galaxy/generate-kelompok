<script setup>
import { computed, reactive, ref, watch } from 'vue';

const data = reactive({ anggota: 0, kelompok: 0 })
const ErrorClass = ref("border-2 border-red-400")
const mode = ref("random");
const DataGenerate = reactive({ Kelompok: [] })
const eliminateList = reactive({ data: [] })
const eliminateBox = ref(0);
const elimanateAnggota = ref(false)
const hide = ref(false);

const addEliminate = () => {
  if ((eliminateBox.value > 0 && elimanateAnggota.value) && !eliminateList.data.includes(eliminateBox.value)) {
    eliminateList.data.push(eliminateBox.value);
    eliminateBox.value = 0;
  }
}

const DeleteEliminate = (index) => {
  eliminateList.data.splice(index, 1);
}

const Generate = () => {
  if (data.anggota > 0 && (data.kelompok > 0 && data.kelompok <= data.anggota)) {
    let anggota = []
    let kelompok = []
    let next = 0;
    // Reset
    DataGenerate.Kelompok.splice(0, DataGenerate.Kelompok.length);
    // Input Anggota
    for (let i = 1; i <= data.anggota; i++) {
      anggota.push(i)
    }
    // Input Kelompok
    for (let i = 1; i <= data.kelompok; i++) {
      kelompok.push([])
    }
    let GenerateByContinue = () => {
      for (let i = 1; i <= anggota.length; i++) {
        kelompok[next].push(anggota[i - 1])
        next = next >= data.kelompok - 1 ? 0 : next + 1
      }
    }

    let eliminate = () => {
      eliminateList.data.forEach((item) => {
        for (let i = 0; i <= anggota.length; i++) {
          if (item == anggota[i]) {
            anggota.splice(i, 1)
          }
        }
      })
    }

    if (elimanateAnggota.value) {
      eliminate()
    }

    let GenerateByRandomKelompok = () => {
      let sudah = []
      for (let i = 1; i <= anggota.length; i++) {
        let TambahAnggota = () => {
          let RandomAnggota = () => {
            let r = Math.floor(Math.random() * anggota.length)
            console.log(r);
            return r
          }
          let Anggota = RandomAnggota()
          if (sudah.includes(Anggota)) {
            TambahAnggota()
          } else {
            sudah.push(Anggota)
            kelompok[next].push(anggota[Anggota])
            next = next >= data.kelompok - 1 ? 0 : next + 1
          }
        }
        TambahAnggota()
      }
    }

    // GenerateByRandomKelompok()
    // GenerateByContinue()
    switch (mode.value) {
      case "random":
        GenerateByRandomKelompok();
        hide.value = true
        break;
      case "continue":
        GenerateByContinue();
        hide.value = true
        break;
    }
    // Input ke  reactiveKelompok
    for (const iterator of kelompok) {
      DataGenerate.Kelompok.push(iterator)
    }
  }
}



</script>

<template>
  <header :class="[hide ? 'max-sm:h-12' : '']" class="max-sm:w-full w-80 p-2 dashboard-color h-full flex flex-col z-10">
    <div class="w-full flex justify-start items-center max-sm:w-full max-sm:justify-center mt-2 mb-4">
      <a href="https://zeyn-galaxy.github.io/generate-kelompok/" class="font-bold text-xl text-color mx-auto">Generate Kelompok</a>
    </div>
    <!-- List Input -->
    <div :class="[hide ? 'max-sm:hidden' : '']" class="w-full flex flex-col item-center gap-2">
      <!-- Input Anggota -->
      <div class="flex justify-around items-center w-full input-color h-12">
        <div class="w-1/5 h-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
            <path
              d="M12.5 14.2857C14.3944 14.2857 16.2112 13.5332 17.5508 12.1936C18.8903 10.8541 19.6429 9.03726 19.6429 7.14286C19.6429 5.24845 18.8903 3.43164 17.5508 2.09209C16.2112 0.752549 14.3944 0 12.5 0C10.6056 0 8.78878 0.752549 7.44924 2.09209C6.10969 3.43164 5.35714 5.24845 5.35714 7.14286C5.35714 9.03726 6.10969 10.8541 7.44924 12.1936C8.78878 13.5332 10.6056 14.2857 12.5 14.2857ZM9.94978 16.9643C4.45313 16.9643 0 21.4174 0 26.9141C0 27.8292 0.742188 28.5714 1.65737 28.5714H23.3426C24.2578 28.5714 25 27.8292 25 26.9141C25 21.4174 20.5469 16.9643 15.0502 16.9643H9.94978Z"
              fill="#232654" />
          </svg>
        </div>
        <span class="text-color uppercase font-bold w-2/4 max-sm:mr-6">anggota</span>
        <input :class="[(data.anggota < 0) ? ErrorClass : '']" v-model="data.anggota" type="number"
          class="h-8 w-16 text-color bg-slate-100 outline-none rounded-xl font-semibold shadow-sm input-text text-center mr-2">
      </div>
      <!-- Input Kelompok -->
      <div class="flex justify-around items-center w-full input-color h-12">
        <div class="w-1/5 h-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="28" viewBox="0 0 35 28" fill="none">
            <path
              d="M5.25 7C5.25 5.14348 5.9875 3.36301 7.30025 2.05025C8.61301 0.737498 10.3935 0 12.25 0C14.1065 0 15.887 0.737498 17.1997 2.05025C18.5125 3.36301 19.25 5.14348 19.25 7C19.25 8.85652 18.5125 10.637 17.1997 11.9497C15.887 13.2625 14.1065 14 12.25 14C10.3935 14 8.61301 13.2625 7.30025 11.9497C5.9875 10.637 5.25 8.85652 5.25 7ZM0 26.3758C0 20.9891 4.36406 16.625 9.75078 16.625H14.7492C20.1359 16.625 24.5 20.9891 24.5 26.3758C24.5 27.2727 23.7727 28 22.8758 28H1.62422C0.727344 28 0 27.2727 0 26.3758ZM33.3211 28H25.7797C26.075 27.4859 26.25 26.8898 26.25 26.25V25.8125C26.25 22.493 24.768 19.5125 22.4328 17.5109C22.5641 17.5055 22.6898 17.5 22.8211 17.5H26.1789C31.0516 17.5 35 21.4484 35 26.3211C35 27.2508 34.2453 28 33.3211 28ZM23.625 14C21.9297 14 20.3984 13.3109 19.2883 12.2008C20.3656 10.7461 21 8.94687 21 7C21 5.53438 20.6391 4.15078 19.9992 2.93672C21.0164 2.19297 22.2688 1.75 23.625 1.75C27.0102 1.75 29.75 4.48984 29.75 7.875C29.75 11.2602 27.0102 14 23.625 14Z"
              fill="#232654" />
          </svg>
        </div>
        <span class="text-color uppercase font-bold w-2/4 max-sm:mr-6">kelompok</span>
        <input
          :class="[((data.kelompok < 0) || (data.anggota > 0 && data.kelompok > data.anggota) || (data.anggota > 0 && data.kelompok <= 0)) ? ErrorClass : '']"
          v-model="data.kelompok" type="number"
          class="h-8 w-16 text-color bg-slate-100 outline-none rounded-xl font-semibold shadow-sm input-text text-center mr-2">
      </div>
      <!-- Input Mode -->
      <div class="flex justify-start items-center w-full input-color h-12">
        <div class="w-1/5 h-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M20.625 18.75C25.8047 18.75 30 14.5547 30 9.375C30 8.47852 29.8711 7.61133 29.6367 6.78516C29.4551 6.15234 28.6758 6.01172 28.2129 6.47461L23.7129 10.9746C23.5371 11.1504 23.2969 11.25 23.0508 11.25H19.6875C19.1719 11.25 18.75 10.8281 18.75 10.3125V6.94922C18.75 6.70312 18.8496 6.46289 19.0254 6.28711L23.5254 1.78711C23.9883 1.32422 23.8418 0.544922 23.2148 0.363281C22.3887 0.128906 21.5215 0 20.625 0C15.4453 0 11.25 4.19531 11.25 9.375C11.25 10.4941 11.4492 11.5723 11.8066 12.5684L1.16602 23.209C0.421875 23.9531 0 24.9668 0 26.0215C0 28.2188 1.78125 30 3.97852 30C5.0332 30 6.04688 29.5781 6.79102 28.834L17.4316 18.1934C18.4277 18.5566 19.5059 18.75 20.625 18.75ZM4.6875 23.9062C5.06046 23.9062 5.41815 24.0544 5.68187 24.3181C5.94559 24.5819 6.09375 24.9395 6.09375 25.3125C6.09375 25.6855 5.94559 26.0431 5.68187 26.3069C5.41815 26.5706 5.06046 26.7188 4.6875 26.7188C4.31454 26.7188 3.95685 26.5706 3.69313 26.3069C3.42941 26.0431 3.28125 25.6855 3.28125 25.3125C3.28125 24.9395 3.42941 24.5819 3.69313 24.3181C3.95685 24.0544 4.31454 23.9062 4.6875 23.9062Z"
              fill="#232654" />
          </svg>
        </div>
        <span class="text-color uppercase font-bold w-2/4 mx-2">mode</span>
        <select v-model="mode"
          class="h-8 w-24  text-color bg-slate-100 outline-none rounded-xl font-semibold shadow-sm input-text text-center mr-2">
          <option value="random">Random</option>
          <option value="continue">Continue</option>
        </select>
      </div>
      <!-- Eliminasi Enable -->
      <div class="flex justify-start items-center w-full input-color h-12">
        <div class="w-1/5 h-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <g clip-path="url(#clip0_19_2)">
              <path
                d="M15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30ZM10.2539 10.2539C10.8047 9.70313 11.6953 9.70313 12.2402 10.2539L14.9941 13.0078L17.748 10.2539C18.2988 9.70313 19.1895 9.70313 19.7344 10.2539C20.2793 10.8047 20.2852 11.6953 19.7344 12.2402L16.9805 14.9941L19.7344 17.748C20.2852 18.2988 20.2852 19.1895 19.7344 19.7344C19.1836 20.2793 18.293 20.2852 17.748 19.7344L14.9941 16.9805L12.2402 19.7344C11.6895 20.2852 10.7988 20.2852 10.2539 19.7344C9.70898 19.1836 9.70313 18.293 10.2539 17.748L13.0078 14.9941L10.2539 12.2402C9.70313 11.6895 9.70313 10.7988 10.2539 10.2539Z"
                fill="#232654" />
            </g>
            <defs>
              <clipPath id="clip0_19_2">
                <rect width="30" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span class="text-color uppercase font-bold w-2/4 max-sm:mx-1">eliminasi</span>
        <div class="checkbox-wrapper-6 max-sm:ml-8">
          <input class="tgl tgl-light" id="cb1-6" type="checkbox" v-model="elimanateAnggota">
          <label class="tgl-btn" for="cb1-6"></label>
        </div>

      </div>
      <!-- Eliminasi -->
      <div :class="[elimanateAnggota ? '' : 'hidden']" class="flex flex-col items-center">
        <!-- Input -->
        <div class="flex justify-start items-center w-full input-color h-12">
          <div class="w-1/5 h-full flex justify-center items-center mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
              <path
                d="M12.5 14.2857C14.3944 14.2857 16.2112 13.5332 17.5508 12.1936C18.8903 10.8541 19.6429 9.03726 19.6429 7.14286C19.6429 5.24845 18.8903 3.43164 17.5508 2.09209C16.2112 0.752549 14.3944 0 12.5 0C10.6056 0 8.78878 0.752549 7.44924 2.09209C6.10969 3.43164 5.35714 5.24845 5.35714 7.14286C5.35714 9.03726 6.10969 10.8541 7.44924 12.1936C8.78878 13.5332 10.6056 14.2857 12.5 14.2857ZM9.94978 16.9643C4.45313 16.9643 0 21.4174 0 26.9141C0 27.8292 0.742188 28.5714 1.65737 28.5714H23.3426C24.2578 28.5714 25 27.8292 25 26.9141C25 21.4174 20.5469 16.9643 15.0502 16.9643H9.94978Z"
                fill="#232654" />
            </svg>
          </div>
          <span class="text-color uppercase font-bold w-2/4">absen</span>
            <input type="number" v-model="eliminateBox"
              class="h-8 w-16 text-color bg-slate-100 outline-none rounded-xl font-semibold shadow-sm input-text text-center">
            <button @click="addEliminate"
              class="mx-2 h-8 w-12 text-color bg-slate-100 outline-none rounded-xl font-semibold shadow-sm input-text text-center">+</button>
        </div>
        <!-- List -->
        <div class="flex justify-start items-center w-full input-color h-12 mt-2">
          <span class="text-color uppercase font-bold text-center  w-1/5 mx-2">absen</span>
          <span class="text-color uppercase font-bold text-center  w-10 mx-14">anggota</span>
        </div>
        <!-- Item -->
        <div v-for="(absen, no) in eliminateList.data" :class="[no % 2 == 0 ? 'list-2' : 'list-1']"
          class="flex justify-around items-center w-full input-color h-12">
          <span class="w-12 text-color uppercase font-bold text-center  ">{{ absen }}</span>
          <input type="text" placeholder="Nama Anggota..."
            class="outline-none bg-transparent text-color w-32 truncate text-center">
          <button @click="DeleteEliminate(no)"
            class="h-8 w-10 text-color bg-slate-100 outline-none rounded-xl font-semibold shadow-sm input-text text-center mr-2">-</button>
        </div>
      </div>
      <!-- Submit -->
      <button @click="Generate"
        class="bg-indigo-900 text-color h-9 w-36 py- m-4 mx-auto font-bold flex justify-center items-center rounded-xl">Generate</button>
    </div>
  </header>
  <!-- LIST -->
  <div :class="[!hide ? 'max-sm:hidden' : '']"
    class=" h-full w-full flex flex-wrap justify-center rounded  mt-4 overflow-y-auto">
    <!-- CARD -->
    <div class="h-80 w-80 m-4 overflow-y-auto" v-for="(item, index) in DataGenerate.Kelompok" :key="index">
      <header class="flex justify-start w-full input-color px-2 shadow-md z-20 h-10 sticky top-0">
        <span class="w-1/5 text-center font-bold text-color flex justify-center items-center">ABSEN</span>
        <span class="w-4/5 px-14 font-bold text-center text-color flex justify-center items-center">KELOMPOK {{ index + 1
        }}</span>
      </header>
      <!-- LIST -->
      <div v-for="(id, no) in item" :class="[no % 2 == 0 ? 'list-2' : 'list-1']" class="w-full flex h-10">
        <span class="h-full w-1/5 text-center text-color font-semibold text-lg flex justify-center items-center">{{ id
        }}</span>
        <input class="h-full w-4/5 text-center outline-none truncate px-2 bg-transparent text-color font-semibold"
          placeholder="Nama Anggota...">
      </div>
    </div>
  </div>
  <!-- Copyright -->
  <footer>
    <!--  -->
  </footer>
</template>