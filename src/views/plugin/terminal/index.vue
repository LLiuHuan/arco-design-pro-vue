<template>
  <div>
    <h1> terminal </h1>
    <!--    <a-card title="test">-->
    <!--      <div ref="terminalRef"></div>-->
    <!--    </a-card>-->
  </div>
</template>

<!--<script lang="ts" setup>-->
<!--  import { nextTick, onMounted, reactive, ref } from 'vue';-->
<!--  import { Terminal } from 'xterm';-->
<!--  import { FitAddon } from 'xterm-addon-fit';-->
<!--  import { AttachAddon } from 'xterm-addon-attach';-->
<!--  import { WebLinksAddon } from 'xterm-addon-web-links';-->
<!--  import 'xterm/css/xterm.css';-->
<!--  import { getToken } from '@/utils';-->

<!--  const terminalRef = ref();-->
<!--  const socket = ref();-->
<!--  const socketUri = ref('ws://127.0.0.1:8081/v2/base/test');-->
<!--  // const token = getToken();-->

<!--  const init = () => {-->
<!--    // 1.xterm终端初始化-->
<!--    const term = new Terminal({-->
<!--      rendererType: 'canvas', // 渲染类型-->
<!--      // rows: 780, // 行数-->
<!--      // rows: 40, // 行数-->
<!--      cols: 15, // 不指定行数，自动回车后光标从下一行开始-->
<!--      convertEol: true, // 启用时，光标将设置为下一行的开头-->
<!--      scrollback: 80, // 终端中的回滚量-->
<!--      disableStdin: false, // 是否应禁用输入-->
<!--      windowsMode: true, // 根据窗口换行-->
<!--      cursorStyle: 'underline', // 光标样式-->
<!--      cursorBlink: true, // 光标闪烁-->
<!--      theme: {-->
<!--        foreground: '#ECECEC', // 字体-->
<!--        background: '#000000', // 背景色-->
<!--        cursor: 'help', // 设置光标-->

<!--        // foreground: 'yellow', //字体-->
<!--        // cursor: "#3963bc",-->
<!--        // selection: '#3963bc',-->
<!--        // black: '\x1b[30m',-->
<!--        // red: '\x1b[30m',-->
<!--        // green: '\x1b[32m',-->
<!--        // yellow: '\x1b[33m',-->
<!--        // blue: 'blue',-->
<!--        // magenta: '\x1b[35m',-->
<!--        // cyan: '\x1b[36m',-->
<!--        // white: '\x1b[37m',-->
<!--        // brightBlack: '\x1b[1;30m',-->
<!--        // brightRed: '\x1b[1;31m',-->
<!--        // brightGreen: '\x1b[1;32m',-->
<!--        // brightYellow: '\x1b[1;33m',-->
<!--        // brightBlue: '\x1b[1;34m',-->
<!--        // brightMagenta: '\x1b[1;35m',-->
<!--        // brightCyan: '\x1b[1;36m',-->
<!--        // brightWhite: '\x1b[1;37m',-->
<!--      },-->
<!--      // lineHeight: 1.2,-->
<!--    });-->
<!--    // 2.webSocket初始化-->
<!--    if (socketUri.value === '') return;-->
<!--    socket.value = new WebSocket(socketUri.value); // 带 token 发起连接-->
<!--    socket.value.onclose = function () {-->
<!--      // websocket 关闭时-->
<!--      term.writeln('closed. Thank you for use!');-->
<!--    };-->

<!--    socket.value.onopen = () => {-->
<!--      console.log('websocket open');-->
<!--    };-->
<!--    socket.value.onerror = (error: any) => {-->
<!--      console.log('websocket error', error);-->
<!--    };-->
<!--    //-->
<!--    // socket.value.onmessage = (msg: any) => {-->
<!--    //   const text = String.fromCharCode.apply(null, new Uint16Array(msg.data));-->
<!--    //   console.log(text);-->
<!--    // };-->

<!--    // 3.websocket集成的插件,这里要注意,网上写了很多websocket相关代码.xterm4版本没必要.-->
<!--    const attachAddon = new AttachAddon(socket.value);-->
<!--    const fitAddon = new FitAddon(); // 全屏插件-->
<!--    term.loadAddon(attachAddon);-->
<!--    term.loadAddon(fitAddon);-->
<!--    term.loadAddon(new WebLinksAddon()); // 网址自动打开插件-->
<!--    term.open(terminalRef.value);-->

<!--    nextTick(() => {-->
<!--      setTimeout(() => {-->
<!--        fitAddon.fit();-->
<!--        term.focus();-->
<!--      }, 100);-->
<!--    });-->
<!--    // term = term;-->
<!--  };-->

<!--  onMounted(() => {-->
<!--    init();-->
<!--  });-->
<!--</script>-->

<style lang="less" scoped></style>
