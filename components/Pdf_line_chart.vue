<template>
        <pdf-frame 
        :width="595"
        :height="841"
        type="pdf"  
        @on-ready="onLayerReady">
            <i-group :transform="chartTransform">
                <i-path
                    :d="dataPoints"
                    :style="{
                        strokeStyle: '#037C6E', lineWidth: 2,
                    }"></i-path>
                <i-group class="circleGroup">
                    <i-group
                        v-for="(item, index) in lineChartData.items"
                        :key="index"
                        :transform="fetchcirclePosition(item)">
                        <i-circle
                            class="circle"
                            :cx="-2"
                            :cy="0"
                            :r="4"
                            :style="{ fillStyle: '#037C6E' }"></i-circle>
                        <i-text
                            v-if="item.value !== 0"
                            class="count"
                            :x="-10"
                            :y="-15"
                            :style="{ fillStyle: '#030303', font: '9px' }"
                            :text="item.value"></i-text>
                    </i-group>
                </i-group>
                <i-group class="axis" :transform="axisTransform">
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
                        :style="{ strokeStyle: '#030303' }"></i-line>
                    <i-text
                        v-for="(ticktext, index) in axisTicksTickText"
                        :key="index"
                        :x="ticktext.xPos - 20"
                        :y="10"
                        :text="ticktext.time"
                        :style="{ fillStyle: '#030303', font: '9px Arial' }"></i-text>
                </i-group>
            </i-group>
        </pdf-frame>
</template>

<script setup>
import { scaleLinear, scaleTime } from "d3-scale";
import { line, curveStep } from "d3-shape";
import { extent } from "d3-array";
import { timeFormat } from "d3-time-format";

const timeFormat_ = timeFormat("%b %d %H:%M");
const timeScale = scaleTime();
const heightScale = scaleLinear();
const tickWidth = 10;
const chartDim = {
    height: 200,
    width: 500
}
const padding = {
    top: 40,
    bottom: 40,
    left: 0,
    right: 0,
};
let width = ref(0);
let height = ref(0);
let dataPoints = ref("");
let axisTransform = ref({
    translate: [0, 0]
});
let chartTransform = ref({
    translate: [50, 50]
});

const lineInstance = line()
        .x((d) => timeScale(new Date(d.label)))
        .y((d) => height.value - padding.bottom - heightScale(d.value))
        .curve(curveStep);

const lineChartData = {
    items: new Array(20).fill(0).map((d, i) => {
        return {
            label: Date.now() - 100000 * i,
            value: Math.round(Math.random()* 300)
        }
    })
}

const axisTicksTicks = ref([]);
const axisTicksTickText = ref([]);

const barEntires = ref([]);

function onLayerReady(layer) {
    intializeChart(layer);
    renderData();
}

function intializeChart(layer) {
    width.value = chartDim.width;
    height.value = chartDim.height;
    timeScale.range([padding.left, width.value - padding.right - padding.left]);
    heightScale.range([1, height.value - padding.top - padding.bottom]);

    const numTicks = Math.ceil((width.value - padding.right - padding.left) / tickWidth);

    axisTicksTicks.value = new Array(numTicks).fill(0).map((d, i) => i);

    axisTransform.value = {
        translate: [padding.left , (height.value - padding.bottom)]
    }
}

function renderData () {
    const data = lineChartData.items;
    const timeExtent = extent(data, function (d) {
        return new Date(d.label);
    });
    const valueExtent = extent(data, function (d) {
        return d.value;
    });
    if (data.length === 0) {
        timeScale.domain([new Date(), new Date()]);
    } else {
        timeScale.domain(timeExtent);
    }

    heightScale.domain([valueExtent[0] || 0, valueExtent[1] || 10]);

    updatePolyline();
    updateAxis();
}

function updatePolyline() {
    dataPoints.value = lineInstance(lineChartData.items);
}

function updateAxis() {
    const tickVal = [];
    let totalLabels = 10;
    let tickWidth = width.value / totalLabels;
    let sampleLabel = timeFormat_(timeScale.invert(0));
    if (sampleLabel.length * 10 > tickWidth) {
        totalLabels *= 0.5;
        tickWidth = width.value / totalLabels;
    }


    for (let i = 0; i < totalLabels; i = i + 1) {
        tickVal.push({
            xPos: i * tickWidth,
            time: timeFormat_(timeScale.invert(i * tickWidth)),
        });
    }

    axisTicksTickText.value = tickVal;
}

function fetchcirclePosition(d) {
    return {
        translate: [timeScale(new Date(d.label)), (height.value - heightScale(d.value) - padding.bottom)]
    };
}

</script>

<style scoped>
    .chart-container {
/*        height: 250px;*/
        max-height: 250px;
        height: 100%;
        width: 100%;
        position: relative;
    }
</style>
