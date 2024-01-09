<script setup>
import { computed, ref } from 'vue';

const mainRef = ref(null);
const boxRef = ref(null);

const percent = [
  {
    id: 1,
    value: '30.000đ',
    percent: 0.3,
    deg: [338, 23],
    class: 'rotate-[185deg]',
  },
  {
    id: 2,
    value: '10.000đ',
    percent: 0.1,
    deg: [23, 68],
    class: '',
  },
  {
    id: 3,
    value: '20.000đ',
    percent: 0.3,
    deg: [68, 113],
    class: '-rotate-[270deg]',
  },
  {
    id: 4,
    value: '50.000đ',
    percent: 0.1,
    deg: [113, 158],
    class: '-rotate-[85deg]',
  },
  {
    id: 5,
    value: '20.000đ',
    percent: 0,
    deg: [158, 203],
    class: 'rotate-[185deg]',
  },
  {
    id: 6,
    value: '100.000đ',
    percent: 0,
    deg: [203, 248],
    class: '',
  },
  {
    id: 7,
    value: '40.000đ',
    percent: 0.2,
    deg: [248, 293],
    class: 'rotate-90',
  },
  {
    id: 8,
    value: '200.000',
    percent: 0,
    deg: [293, 338],
    class: '-rotate-[85deg]',
  },
];

const boxOne = computed(() => [...percent].slice(0, 4));
const boxTwo = computed(() => [...percent].slice(4, 8));

const handleSpin = () => {
  const x = 1024; //min value
  const y = 9999; // max value

  // const deg = Math.floor(Math.random() * (x - y)) + y;

  boxRef.value.style.transform = 'rotate(' + 360 + 'deg)';

  mainRef.value.classList.remove('after:animate-animateArrow');
  setTimeout(function () {
    mainRef.value.classList.add('after:animate-animateArrow');
  }, 5000); //5000 = 5 second
};
</script>
<template>
  <div class="bg-[#6e1213] h-screen flex items-center justify-center">
    <div
      ref="mainRef"
      class="w-[500px] h-[500px] relative after:content-[''] after:absolute after:w-8 after:h-8 after:bg-[url('@/assets/arrow-left.png')] after:bg-[length:32px_32px] after:-right-[30px] after:top-1/2 after:-translate-y-1/2"
    >
      <div
        class="w-full h-full relative font-bold rounded-full border-[10px] border-solid border-[#FAB32B] transition-all overflow-hidden"
        ref="boxRef"
      >
        <div class="h-full">
          <span
            class="w-1/2 h-1/2 inline-block absolute"
            :class="`span${index + 1}`"
            v-for="(item, index) in boxOne"
            :key="item.id"
          >
            <b
              class="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :class="item.class"
            >
              {{ item.value }}
            </b>
          </span>
        </div>
        <div class="w-full h-full -rotate-[135deg] absolute top-0">
          <span
            class="w-1/2 h-1/2 inline-block absolute"
            :class="`span${index + 1}`"
            v-for="(item, index) in boxTwo"
            :key="item.id"
          >
            <b
              class="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :class="item.class"
            >
              {{ item.value }}
            </b>
          </span>
        </div>
      </div>
      <button
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75px] h-[75px] rounded-full border-4 border-white bg-[#6e1213] text-[#fff] shadow-[0_5px_20px_#000] font-bold text-xl cursor-pointer active:w-[70px] active:h-[70px] active:text-sm"
        @click="handleSpin"
      >
        Spin
      </button>
    </div>
  </div>
</template>

<style scoped></style>
