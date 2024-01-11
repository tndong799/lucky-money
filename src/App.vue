<script setup>
import { computed, ref, watch } from 'vue';
import congratulations1 from '@/assets/congratulations-1.gif';
import congratulations2 from '@/assets/congratulations-2.gif';
import congratulations3 from '@/assets/congratulations-3.gif';
import congratulations4 from '@/assets/congratulations-4.gif';
import congratulations5 from '@/assets/congratulations-5.gif';

const mainRef = ref(null);
const boxRef = ref(null);
const isSpinning = ref(false);
const open = ref(false);
const id = ref(null);
const percent = [
  {
    id: 1,
    value: '30.000đ',
    percent: 0.3,
    deg: [158, 203],
  },
  {
    id: 2,
    value: '10.000đ',
    percent: 0.1,
    deg: [338, 23],
  },
  {
    id: 3,
    value: '20.000đ',
    percent: 0.3,
    deg: [248, 293],
  },
  {
    id: 4,
    value: '50.000đ',
    percent: 0.1,
    deg: [68, 113],
  },
  {
    id: 5,
    value: '20.000đ',
    percent: 0,
    deg: [293, 338],
  },
  {
    id: 6,
    value: '100.000đ',
    percent: 0,
    deg: [113, 158],
  },
  {
    id: 7,
    value: '40.000đ',
    percent: 0.2,
    deg: [23, 68],
  },
  {
    id: 8,
    value: '200.000',
    percent: 0,
    deg: [203, 248],
  },
];

const luckyMessages = [
  'Chúc mừng năm mới',
  'Vạn sự như ý',
  'Phát tài phát lộc',
  'Tiền vào như nước',
  'Mau ăn chóng lớn',
];
const images = [
  congratulations1,
  congratulations2,
  congratulations3,
  congratulations4,
  congratulations5,
];
const boxOne = computed(() => [...percent].slice(0, 4));
const boxTwo = computed(() => [...percent].slice(4, 8));

const degRangeAvailable = computed(() => {
  return percent.filter(item => item.percent > 0);
});

const itemPercent = computed(() => {
  return degRangeAvailable.value.reduce((prev, curr) => {
    prev = prev || [];
    prev.push(...Array.from({ length: curr.percent * 10 }, () => curr.id));
    return prev;
  }, []);
});

const itemSelected = computed(() => {
  return id.value ? degRangeAvailable.value.find(item => item.id === id.value) : null;
});

const degRandom = computed(() => {
  return id.value ? randomIntFromInterval(...itemSelected.value.deg) : null;
});
const image = computed(() => {
  return images[itemSelected.value?.id % images.length];
});
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const handleSpin = () => {
  const indexRandom = randomIntFromInterval(0, 9);
  id.value = itemPercent.value[indexRandom];
};

watch(id, value => {
  if (value) {
    const duration = 5;
    isSpinning.value = true;
    boxRef.value.style.transition = 'transform 0s';
    boxRef.value.style.transform = `rotate(0deg)`;
    void boxRef.value.offsetWidth;

    boxRef.value.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    boxRef.value.style.transform = `rotate(${degRandom.value + 1440}deg)`; // 4 full spins (1440 degrees)
    mainRef.value.classList.remove('after:animate-animateArrow');
    setTimeout(() => {
      mainRef.value.classList.add('after:animate-animateArrow');
      boxRef.value.style.transition = '';
      isSpinning.value = false;
      open.value = true;
      // const currentRotation = deg.value + 1440;
      // boxRef.value.style.transform = `rotate(${currentRotation}deg)`;
    }, duration * 1000);
  }
});
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
            :class="`w-1/2 h-1/2 inline-block absolute span${index + 1}`"
            v-for="(item, index) in boxOne"
            :key="item.id"
          >
            <b
              class="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :class="{
                'rotate-[185deg]': index == 0,
                '-rotate-[270deg]': index == 2,
                '-rotate-[85deg]': index == 3,
              }"
            >
              {{ item.value }}
            </b>
          </span>
        </div>
        <div class="w-full h-full -rotate-[135deg] absolute top-0">
          <span
            :class="`w-1/2 h-1/2 inline-block absolute span${index + 1}`"
            v-for="(item, index) in boxTwo"
            :key="item.id"
          >
            <b
              class="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :class="{
                'rotate-[185deg]': index == 0,
                'rotate-90': index == 2,
                '-rotate-[85deg]': index == 3,
              }"
            >
              {{ item.value }}
            </b>
          </span>
        </div>
      </div>
      <button
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75px] h-[75px] rounded-full border-4 border-white bg-[#6e1213] text-[#fff] shadow-[0_5px_20px_#000] font-bold text-xl cursor-pointer active:w-[70px] active:h-[70px] active:text-sm"
        @click="handleSpin"
        :disabled="isSpinning"
      >
        Quay
      </button>
    </div>
  </div>

  <div class="fixed top-0 left-0 w-full h-screen bg-[#00000020]" v-if="open" @click="open = false">
    <div
      class="w-[320px] h-[320px] bg-[#e77638] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm border border-red-900"
      @click.stop
    >
      <div
        class="text-center my-4 font-medium text-2xl text-red-800 flex items-center justify-center"
      >
        <img class="w-[180px] h-[180px]" :src="image" alt="" />
      </div>
      <div class="text-center font-bold text-red-800 text-7xl mt-6">{{ itemSelected?.value }}</div>
    </div>
  </div>
</template>

<style scoped>
.span1 {
  clip-path: polygon(0 92%, 100% 50%, 0 8%);
  background-color: #ad120d;
  top: 120px;
  left: 0;
}

.span2 {
  clip-path: polygon(100% 92%, 0 50%, 100% 8%);
  background-color: #e77638;
  top: 120px;
  right: 0;
}
.span3 {
  clip-path: polygon(50% 0%, 8% 100%, 92% 100%);
  background-color: #6e1213;
  bottom: 0;
  left: 120px;
}
.span4 {
  clip-path: polygon(50% 100%, 92% 0, 8% 0);
  background-color: #fab32b;
  top: 0;
  left: 120px;
}
</style>
