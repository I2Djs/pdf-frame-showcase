<script setup>
  let pdfConfig = {
    margins: {
      top: 20,
      left: 10,
      right: 10,
      bottom: 10
    },
  fontRegister: {
    Chapbook :'fonts/Chapbook.woff',
    chinese: 'fonts/chinese.ttf',
    hindi: 'fonts/Lohit-Devanagari.ttf',
    arabic: 'fonts/Amiri-Regular.ttf'
  },
};
</script>

<template>
    <pdfFrame
      id="samplePdf"
      type="pdf"
      :width="595"
      :height="841"
      :config="pdfConfig"
    >
      <i-page-template id="temp-1">
        <i-linearGradient
            id="grad3"
            :x1="0"
            :y1="0"
            :x2="100"
            :y2="100"
            :colorStops="[{
                             color: '#023c73',
                             offset: 0,
                           },
                           {
                             color: '#5f0b9c',
                             offset: 50,
                           },
                           {
                             color: '#b814c4',
                             offset: 100,
                           }]"
          />
          <i-rect
            :x="0"
            :y="0"
            :width="595"
            :height="841"
            :style="{ fillStyle:'grad(grad3)' }"
          />
          <i-rect
            :x="10"
            :y="10"
            :width="575"
            :height="821"
            :rx=10
            :ry=10
            :style="{ strokeStyle:'#ffffff', lineWidth: 1 }"
          />
      </i-page-template>
      <i-page p-template="temp-1">
        <i-text 
          :x="0"
          :y="25"
          text="PDF-frame"
          :style="{ fill: '#ffffff',textAlign:'center', font: '70px Chapbook' }"
        />

        <i-g :transform="{ translate: [ 30, 125]}">
          <i-text 
            :x="0"
            :y="0"
            text="Chinese : "
            :style="{ fill: '#ffffff', font: '25px' }"
          />
          <i-text 
            :x="0"
            :y="30"
            :width="540"
            text="PDF-frame 是一个用于客户端 PDF 生成的 Web 框架。 凭借其声明性 HTML 语法和语义，它提供了一种有效定义 PDF 图形内容的简单方法。 它为 Vue、Nuxt 和 React（正在进行中）等流行框架提供组件支持。 PDF-frame 基于 i2djs 框架构建，目前支持 PDF 和 Canvas 格式的渲染输出"
            :style="{ fill: '#ffffff',textAlign:'justify', font: '14px chinese' }"
          />
        </i-g>
        <i-g :transform="{ translate: [ 30, 275]}">
          <i-text 
            :x="0"
            :y="0"
            text="Hindi : "
            :style="{ fill: '#ffffff', font: '25px' }"
          />
          <i-text 
            :x="0"
            :y="30"
            :width="540"
            text="पीडीएफ-फ्रेम क्लाइंट साइड पीडीएफ जेनरेशन के लिए एक वेब फ्रेमवर्क है। अपने घोषणात्मक एचटीएमएल सिंटैक्स और शब्दार्थ के साथ, यह पीडीएफ ग्राफिकल सामग्री को कुशलतापूर्वक परिभाषित करने का एक आसान तरीका प्रदान करता है। यह वीयूई, नक्स्ट जैसे लोकप्रिय फ्रेमवर्क के लिए घटक समर्थन प्रदान करता है। आई2डीजेएस फ्रेमवर्क पर निर्मित, पीडीएफ-फ्रेम वर्तमान में पीडीएफ और कैनवास प्रारूपों में आउटपुट प्रस्तुत करने का समर्थन करता है।"
            :style="{ fill: '#ffffff',textAlign:'justify', font: '14px hindi' }"
          />
        </i-g>

        <i-g :transform="{ translate: [ 30, 475]}">
          <i-text 
            :x="0"
            :y="0"
            text="Arabic : "
            :style="{ fill: '#ffffff', font: '20px' }"
          />
          <i-text 
            :x="0"
            :y="30"
            :width="530"
            text="PDF-frame هو إطار عمل ويب لإنشاء ملفات PDF من جانب العميل. بفضل تركيب HTML التعريفي ودلالاته، فإنه يوفر طريقة بسيطة لتعريف المحتوى الرسومي لـ PDF بكفاءة. وهو يوفر دعمًا مكونًا لأطر العمل الشائعة مثل Vue وnuxt وReact (العمل قيد التقدم). تم إنشاء إطار PDF استنادًا إلى إطار عمل i2djs ويدعم حاليًا عرض الإخراج بتنسيقات PDF وCanvas."
            :style="{ fill: '#ffffff',textAlign:'justify', font: '14px arabic' }"
          />
        </i-g>
      </i-page>
    </pdfFrame>
</template>

