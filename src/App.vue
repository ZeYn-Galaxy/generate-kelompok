<script setup>
import { computed, reactive, ref, watch } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'


const data = reactive({ anggota: 0, kelompok: 0 })
const ErrorClass = ref("border-2 border-red-400")

watch(data, (newValue, oldValue) => {
})

</script>

<template>
  <header class="w-full bg-slate-200 h-12 flex justify-end">
    <div class="w-1/2 h-full bg-slate-200 flex justify-end items-center">
      <!-- Anggota -->
      <span class="text-slate-800 px-2">Total Anggota: </span>
      <input :class="[(data.anggota < 0) ? ErrorClass : '', '']" v-model="data.anggota" type="number"
        class="h-1/2 p-4 text-slate-800 bg-slate-100 outline-none rounded-xl">
      <!-- Kelompok -->
      <span class="text-slate-800 px-2">Total Kelompok: </span>
      <input :class="[(data.kelompok < 0 || (data.anggota >= 0 && data.kelompok > data.anggota)) ? ErrorClass : '', '']" v-model="data.kelompok" type="number"
        class="h-1/2 p-4 text-slate-800 bg-slate-100 outline-none rounded-xl">
      <!-- Submit -->
      <button
        class="bg-indigo-500 text-slate-50 h-1/2 w-24 py-4 mx-2 font-bold flex justify-center items-center rounded-xl">Generate</button>
    </div>
  </header>
</template>
