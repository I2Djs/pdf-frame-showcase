<template>
  <div class="canvasParentContainer">
    <pdfFrame id="tadpoleExample" type="canvas" @on-ready="onInstanceReady"
      @on-resize="onInstanceResize">
      <i-linearGradient
        id="grad3"
        :x1="0"
        :y1="0"
        :x2="100"
        :y2="100"
        :colorStops="[
          {
            color: '#023c73', offset: 0
          },
          {
            color: '#5f0b9c', offset: 50
          },
          {
            color: '#b814c4', offset: 100
          },
        ]"
      />
      <i-rect
        :x="0" :y="0" :width="width" :height="height" rx=20 ry=20
        :style="{ fillStyle: 'grad(grad3)' }"
      />
      <i-g class="heads" :style="{
                        strokeStyle: 'white',
                        lineJoin: 'round',
                        lineCap: 'round',
                    }" :bbox="false">
        <i-g v-for="(d, index) in dataArray" v-bind:key="index">
          <i-polyline
            class="mid"
            :style= "{ lineWidth: 4 }"
            :points="d.midArr"
          >
          </i-polyline>
          <i-polyline
            class="tail"
            :style= "{ lineWidth: 1 }"
            :points="d.tail"
          >
        </i-polyline>

        <i-ellipse
        :cx="0" :cy="0" :rx="6.5" :ry="4"
        :style="{
          fillStyle: '#ffffff'
        }"
        :transform="{
          translate: [d.px[0], d.py[0]],
          rotate: [Math.atan2(d.vy, d.vx) * (360 / (2 * Math.PI)), 0, 0]
        }"
        ></i-ellipse>
      </i-g>
    </i-g>
  </pdfFrame>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const n = 500;
const v = 2;
const m = 12;
let width = ref(0);
let height = ref(0);

let dataArray = ref([]);
let sqrt = Math.sqrt;
let sin = Math.sin;

  function step() {
      let t;
      for (let i =0, len = dataArray.value.length; i < len; i++ ) {
          t = dataArray.value[i];
          let dx = t.vx;
          let dy = t.vy;
          let x = (t.px[0] += dx);
          let y = (t.py[0] += dy);
          let speed = sqrt(dx * dx + dy * dy);
          const count = speed * 10;
          const k1 = -5 - speed / 3;

          // Bounce off the walls.
          if (x < 0 || x > width.value) t.vx *= -1;
          if (y < 0 || y > height.value) t.vy *= -1;

          // Swim!
          for (var j = 1; j < m; ++j) {
              const vx = x - t.px[j];
              const vy = y - t.py[j];
              const k2 = sin(((t.count += count) + j * 3) / 300) / speed;
              t.px[j] = (x += (dx / speed) * k1) - dy * k2;
              t.py[j] = (y += (dy / speed) * k1) + dx * k2;
              speed = sqrt((dx = vx) * dx + (dy = vy) * dy);
          }

          let midArr = [];
            for (let i = 0; i < 3; ++i) midArr[i] = { x: t.px[i], y: t.py[i] };

          let tail = [];
          for (let i = 0; i < m; ++i) tail[i] = { x: t.px[i], y: t.py[i] };

          t.midArr = midArr;
          t.tail = tail;
      }

      var elementExists = document.getElementById("tadpoleExample");
      if (elementExists) {
        window.requestAnimationFrame(step);
      }
  }

  function onInstanceResize(data) {
    width.value = data.width;
    height.value = data.height;
  }

  function onInstanceReady (layer) {
    width.value = layer.width;
    height.value = layer.height;

    dataArray.value = new Array(n).fill().map(() => ({
        vx: (Math.random() - 0.5) * v,
        vy: (Math.random() - 0.5) * v,
        px: new Array(m).fill(Math.random() * width.value),
        py: new Array(m).fill(Math.random() * height.value),
        count: 0,
        midArr: [],
        tail: []
    }));

    window.requestAnimationFrame(step);
  }
</script>
