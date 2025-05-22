<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:44:54
 * @LastEditTime: 2025-05-19 02:51:54
 * @LastEditors: LLiuHuan
-->
<template>
  <div class="p4 flex flex-col items-center gap-8 text-center font-sans">
    <div class="flex gap-4">
      <div class="i-logos-vue text-3xl"></div>
      <div class="i-logos-vue text-3xl"></div>
      <div class="i-logos-unocss text-3xl"></div>
      <div class="i-logos-postcss text-3xl"></div>
    </div>
    <div text-gray2 text-2xl font-medium>UnoCSS + Vue + PostCSS</div>
    <div
      class="bg-[url(../src/uno.svg)] bg-[url(/uno.svg)]"
      h-220px
      w-220px
    ></div>
    <div class="flex items-center gap-2">
      <button>Hello</button>
      <div class="dark">
        <a href="#">Hello</a>
      </div>
    </div>

    <span class="i-carbon-logo-github"></span>
    <span class="i-mdi-light-home"></span>
    <div class="my-class">Directives in Vue SFC</div>
  </div>
</template>

<style>
/* @screen md {
  .my-class {
    @apply bg-red-800;

    color: theme('colors.red.300');
  }
} */

@layer base, components, utilities;

@layer base {
  @unocss preflights;
}

@layer utilities {
  @unocss default;

  @unocss;
}

@layer components {
  html {
    color: theme('colors.gray.300');
    background: theme('colors.black');
  }

  button,
  a {
    @apply focus:outline-2 focus:outline-offset-2 focus:outline-sky-600 focus-visible:outline-none;
    @apply b-0 bg-gray-900 text-base text-gray-200 no-underline hover:bg-gray-700 dark:hover:bg-blue-600 [&:hover]:text-[#fff];
    @apply block rounded-lg px-4 py-2;
  }
}

/* 

 */

/* @screen at-sm {
  html {
    background: theme('colors.gray.900');
  }
} */
</style>
