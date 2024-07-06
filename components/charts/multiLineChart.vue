<template>
  <pdfFrame
    id="multiLineChartid"
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
    <i-group
      :transform="{
        translate: [padding.left, 0],
      }"
    >
      <i-group class="circleGroup" v-for="(lineitem, index) in dataPoints">
        <i-path
          :d="lineitem.linePath"
          :style="{
            strokeStyle: colors[lineitem.type],
            lineWidth: 2,
          }"
        ></i-path>
        <i-group
          v-for="(item, index) in lineChartData.items"
          :key="index"
          :transform="fetchcirclePosition(item, lineitem.type)"
        >
          <i-circle
            class="circle"
            :cx="-1.5"
            :cy="0"
            :r="3"
            :style="{ fillStyle: colors[lineitem.type] }"
          ></i-circle>
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
      <i-group
        class="axis"
        :transform="{
          translate: [padding.left, height - padding.bottom],
        }"
      >
        <i-line
          v-for="(tick, index) in axisTicksTicks"
          :key="index"
          :x1="tick * 10"
          :y1="0"
          :x2="tick * 10"
          :y2="
            () => {
              return tick % 5 === 0 ? 6 : 3;
            }
          "
          :style="{ strokeStyle: '#ffffff' }"
        ></i-line>
        <i-text
          v-for="(ticktext, index) in axisTicksTickText"
          :key="index"
          :x="ticktext.xPos - 20"
          :y="10"
          :text="ticktext.time"
          :style="{ fillStyle: '#ffffff', font: '9px Arial' }"
        ></i-text>
      </i-group>
    </i-group>
  </pdfFrame>
</template>

<script setup>
import { ref } from 'vue';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';
import { extent, max, min } from 'd3-array';
import { timeFormat } from 'd3-time-format';

const timeFormat_ = timeFormat('%b %Y');
const timeScale = scaleTime();
const heightScale = scaleLinear();
const tickWidth = 10;
const padding = {
  top: 40,
  bottom: 40,
  left: 10,
  right: 40,
};
let width = ref(0);
let height = ref(0);
let dataPoints = ref([]);
let colors = {
  value1: '#57ebff',
  value2: '#ffb957',
  value3: '#ff5779',
};

const props = defineProps({
    type: {
      type: String,
      required: true,
      default: 'canvas',
    },
  });

const lineInstance = line()
  .x((d) => timeScale(new Date(d.label)))
  .curve(curveCardinal);

const lineChartData = {
  items: new Array(10).fill(0).map((d, i) => {
    return {
      label: Date.now() - 20000000000 * (10 - i),
      value1: i * 50 + Math.round(Math.random() * 300),
      value2: i * 100 + Math.round(Math.random() * 400),
      value3: i * 150 + Math.round(Math.random() * 600),
    };
  }),
};

const axisTicksTicks = ref([]);
const axisTicksTickText = ref([]);

const barEntires = ref([]);

function onLayerReady(layer) {
  intializeChart(layer);
  renderData();
}

function onLayerResize(layer) {
  intializeChart(layer);
  updatePolyline();
  updateAxis();
}

function intializeChart(layer) {
  width.value = layer.width;
  height.value = layer.height;
  timeScale.range([padding.left, width.value - padding.right - padding.left]);
  heightScale.range([1, height.value - padding.top - padding.bottom]);
}

function renderData() {
  const data = lineChartData.items;
  const timeExtent = extent(data, function (d) {
    return new Date(d.label);
  });
  const valueExtent = [];

  valueExtent[0] = min(data, function (d) {
    return Math.min(d.value1, d.value2, d.value3);
  });

  valueExtent[1] = max(data, function (d) {
    return Math.max(d.value1, d.value2, d.value3);
  });
  if (data.length === 0) {
    timeScale.domain([new Date(), new Date()]);
  } else {
    timeScale.domain(timeExtent);
  }

  heightScale.domain([valueExtent[0] || 0, valueExtent[1] || 0]);

  updatePolyline();
  updateAxis();
}

function updatePolyline() {
  dataPoints.value = ['value1', 'value2', 'value3'].map((v) => {
    lineInstance.y((d) => height.value - padding.bottom - heightScale(d[v]));
    return {
      linePath: lineInstance(lineChartData.items),
      type: v,
    };
  });
}

function updateAxis() {
  let noOfTicks = Math.floor(
    (width.value - padding.right - padding.left) / 100
  );
  axisTicksTickText.value = timeScale.ticks(noOfTicks).map((d) => {
    return {
      xPos: timeScale(d),
      time: timeFormat_(d),
    };
  });

  const numTicks = Math.ceil(
    (width.value - padding.right - padding.left) / tickWidth
  );

  axisTicksTicks.value = new Array(numTicks).fill(0).map((d, i) => i);
}

function fetchcirclePosition(d, type) {
  return {
    translate: [
      timeScale(new Date(d.label)),
      height.value - heightScale(d[type]) - padding.bottom,
    ],
  };
}
</script>
