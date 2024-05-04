<template>
  <pdfFrame
    id="barChartid"
    :type="type"
    :height="250"
    @on-ready="onLayerReady"
    @on-resize="onLayerResize"
  >
    <i-group class="background">
      <i-linearGradient
        id="grad3" :x1="0" :y1="0" :x2="100" :y2="100"
        :colorStops="[
          {
            color: '#023c73', offset: 0,
          },
          {
            color: '#5f0b9c', offset: 50,
          },
          {
            color: '#b814c4', offset: 100,
          },
        ]"
      />
      <i-rect :x="0" :y="0" :width="width" :height="height" :rx="20" :ry="20"
        :style="{ fillStyle: 'grad(grad3)' }"
      />
    </i-group>

    <i-group :transform="{
      translate: [padding.left, 0],
    }">
      <i-group class="barGroup">
        <i-group
          v-for="(item, index) in dataPoints"
          :key="index"
          :transform="{
            translate: [
              item.xPos,
              height - heightScale(item.value) - padding.bottom,
            ],
          }"
        >
          <i-rect
            class="rect"
            :x="-10"
            :y="0"
            :height="heightScale(item.value)"
            :width="rectWidth"
            :style="{ fillStyle: '#ffffff' }"
          ></i-rect>
          <i-text
            v-if="item.value !== 0"
            class="count"
            :x="-10"
            :y="-15"
            :style="{ fillStyle: '#ffffff', font: '9px' }"
            :text="item.value"
          ></i-text>
        </i-group>
      </i-group>
      <i-group class="axis" :transform="{
        translate: [padding.left, height - padding.bottom],
      }">
        <i-line
          v-for="(tick, index) in dataPoints"
          :key="index"
          :x1="tick.xPos - 20"
          :y1="0"
          :x2="tick.xPos - 20"
          :y2="10"
          :style="{ strokeStyle: '#ffffff' }"
        ></i-line>
        <i-text
          v-for="(ticktext, index) in dataPoints"
          :key="index"
          :x="ticktext.xPos - 20"
          :y="10"
          :text="ticktext.label"
          :style="{ fillStyle: '#ffffff', font: '9px Arial' }"
        ></i-text>
      </i-group>
    </i-group>
  </pdfFrame>
</template>

<script setup>
import { ref, watch } from 'vue';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';
import { extent } from 'd3-array';
const ordinalScale = scaleBand().padding(0.3);
const heightScale = scaleLinear();
const padding = {
  top: 40,
  bottom: 40,
  left: 20,
  right: 40,
};
let width = ref(0);
let height = ref(0);
let dataPoints = ref('');
let rectWidth = ref(0);

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: 'canvas',
  },
});

const barChartData = {
  items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((d, i) => {
    return {
      label: d,
      value: Math.round(Math.random() * 300),
      xPos: 0,
    };
  }),
};

function onLayerReady(layer) {
  intializeChart(layer);
  renderData();
}

function onLayerResize(layer) {
  intializeChart(layer);
  updateBars();
}

function intializeChart(layer) {
  width.value = layer.width;
  height.value = layer.height;
  ordinalScale.range([
    padding.left,
    width.value - padding.right - padding.left,
  ]);
  heightScale.range([1, height.value - padding.top - padding.bottom]);
}

function renderData() {
  const data = barChartData.items;

  ordinalScale.domain(data.map((d) => d.label));
  heightScale.domain(extent(data, (d) => d.value));

  updateBars();
}

function updateBars() {
  const data = barChartData.items;
  data.forEach((d) => {
    d.xPos = ordinalScale(d.label);
  });
  rectWidth.value = ordinalScale.bandwidth();
  dataPoints.value = data;
}
</script>
