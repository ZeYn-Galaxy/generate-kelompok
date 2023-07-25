<script setup>
import { computed, reactive, ref, watch } from 'vue';

const data = reactive({ anggota: 0, kelompok: 0 })
const ErrorClass = ref("border-2 border-red-400")
const DataGenerate = reactive({ Kelompok: [] })

watch(data, (newValue, oldValue) => {
})

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
    let GenerateByRandomKelompok = () => {
      let sudah = []
      for (let i = 1; i <= anggota.length; i++) {
        let TambahAnggota = () => {
          let RandomAnggota = () => {
            return Math.ceil(Math.random() * anggota.length)
          }
          let Anggota = RandomAnggota()
          if (sudah.includes(Anggota)) {
            TambahAnggota()
          } else {
            sudah.push(Anggota)
            kelompok[next].push(Anggota)
            next = next >= data.kelompok - 1 ? 0 : next + 1
          }
        }
        TambahAnggota()
      }
    }

    GenerateByRandomKelompok()
    // Input ke  reactiveKelompok
    for (const iterator of kelompok) {
      DataGenerate.Kelompok.push(iterator)
    }
  }
}



</script>

<template>
  <header class="w-full bg-slate-200 h-12 flex justify-end max-sm:h-72 max-sm:flex-col">
    <div class="w-1/4 h-full flex justify-start items-center max-sm:w-full max-sm:justify-center">
      <a href="/" class="font-bold text-2xl text-indigo-500 mx-4">Generate Kelompok</a>
    </div>
    <div class="w-3/4 h-full bg-slate-200 flex justify-end items-center max-sm:w-full max-sm:flex-col">
      <!-- Anggota -->
      <span class="text-slate-800 px-2">Total Anggota: </span>
      <input :class="[(data.anggota < 0) ? ErrorClass : '']" v-model="data.anggota" type="number"
        class="h-1/2 w-32 p-4 text-slate-800 bg-slate-100 outline-none rounded-xl max-sm:w-1/2 max-sm:h-10">
      <!-- Kelompok -->
      <span class="text-slate-800 px-2">Total Kelompok: </span>
      <input
        :class="[((data.kelompok < 0) || (data.anggota > 0 && data.kelompok > data.anggota) || (data.anggota > 0 && data.kelompok <= 0)) ? ErrorClass : '']"
        v-model="data.kelompok" type="number"
        class="h-1/2 w-32 p-4 text-slate-800 bg-slate-100 outline-none rounded-xl max-sm:w-1/2 max-sm:h-10">
      <!-- Submit -->
      <button @click="Generate"
        class="bg-indigo-500 text-slate-50 h-1/2 w-24 py-4 mx-2 font-bold flex justify-center items-center rounded-xl max-sm:my-4 max-sm:w-1/4 max-sm:h-10">Generate</button>
    </div>
  </header>
  <!-- LIST -->
  <div class="bg-slate-100 w-full h-4/5 m-4 flex flex-wrap justify-center overflow-y-scroll rounded">
    <!-- CARD -->
    <div class="bg-slate-100 w-80 h-1/2 flex m-2 flex-col overflow-y-scroll rounded shadow-md"
      v-for="(item, index) in DataGenerate.Kelompok" :key="index">
      <header class="flex justify-start w-full bg-slate-200 px-2 shadow-md z-20">
        <span class="text-lg w-1/5 text-center font-bold ">ABSEN</span>
        <span class="text-lg w-4/5 px-14 font-bold">KELOMPOK {{ index + 1 }}</span>
      </header>
      <!-- LIST -->
      <div v-for="(id, no) in item" class="w-full flex flex-wrap shadow-md z-10" :class="[no % 2 == 0 ? 'z-0' : 'z-10']">
        <span class="h-7 w-1/5 text-center" :class="[no % 2 == 0 ? 'bg-slate-200' : 'bg-slate-300']">{{ id }}</span>
        <input class="h-7 w-4/5 text-center outline-none truncate px-2"
          :class="[no % 2 == 0 ? 'bg-slate-100' : 'bg-slate-200']" placeholder="Nama Anggota...">
      </div>
    </div>
  </div>
  <!-- Copyright -->
  <footer>
    <!--  -->
  </footer>
</template>
