<template>
  <div class="test">
    <div class="rooster">
      <div class="rooster__eyes">
        <div class="rooster__eye rooster__eye--1">
          <div class="rooster__eye-ans"></div>
          <div class="rooster__eye-ans--d"></div>
        </div>
        <div class="rooster__eye rooster__eye--2">
          <div class="rooster__eye-ans"></div>
          <div class="rooster__eye-ans--d"></div>
        </div>
      </div>

      <div class="rooster__mouth"></div>
      <div class="rooster__mouth-d rooster__mouth-d--shadow"></div>
      <div class="rooster__mouth-d"></div>
      <div class="rooster__head">
        <div class="rooster__head--wing"></div>
        <div class="rooster__head--wing--2"></div>
        <div class="rooster__head--wing--3"></div>
        <div class="rooster__head--wing--4"></div>
      </div>

      <div class="rooster__neck">
        <div class="rooster__neck-s">
          <div class="rooster__neck--1 rooster__neck--l"></div>
          <div class="rooster__neck--1"></div>
          <div class="rooster__neck--1"></div>
          <div class="rooster__neck--1"></div>
          <div class="rooster__neck--1 rooster__neck--r"></div>
        </div>
        <div class="rooster__neck--curve"></div>
      </div>

      <div class="rooster__body">
        <div class="rooster__body--tb"></div>
        <div class="rooster__wing"></div>
      </div>

      <div class="rooster__tail rooster__tail--1"></div>
      <div class="rooster__tail rooster__tail--2"></div>

      <div class="rooster__leg rooster__leg--1">
        <div class="rooster__leg--line"></div>
        <div class="rooster__leg--hide"></div>
        <div class="rooster__leg--b"></div>
        <div class="rooster__leg--overlay"></div>
      </div>

      <div class="rooster__leg rooster__leg--2">
        <div class="rooster__leg--line"></div>
        <div class="rooster__leg--hide"></div>
        <div class="rooster__leg--b"></div>
        <div class="rooster__leg--overlay"></div>
      </div>

      <div class="surface"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  @--color-bg: #f0693e;
  @--color-1: #f3c074;
  @--color-2: #753d22;

  .test {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: @--color-bg;
    overflow: hidden;
  }
  .rooster {
    position: relative;
    animation: body-ans 0.6s linear infinite;
  }

  .rooster__head {
    width: 3rem;
    height: 3rem;
    background-color: @--color-2;
    margin-left: 1.5rem;
    --radius: 10rem;
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }

  .rooster__head--wing {
    --h: 1.6rem;
    --w: calc(var(--h) * 2);
    position: absolute;
    top: calc(var(--h) * -0.9);
    left: 1rem;
    width: var(--w);
    height: var(--h);
    border-radius: 0 0 4rem 4rem;
    border-left: 0.8rem solid #c71e24;
    background-color: #d52026;
    animation: ans-wing-1 0.4s infinite;
  }

  @keyframes ans-wing-1 {
    0%,
    100% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(10deg);
    }
  }

  .rooster__head--wing--2 {
    --h: 2.8rem;
    --w: calc(var(--h) / 2);
    position: absolute;
    top: calc(var(--h) * -1);
    left: 2.8rem;
    width: var(--w);
    height: var(--h);
    border-radius: 0 4rem 4rem 0;
    background-color: #a21f21;
    border-right: 4px solid #991c1e;
    transform-origin: bottom;
    transform: rotate(-10deg);
    animation: ans-wing-2 0.4s ease-in-out infinite;
  }

  @keyframes ans-wing-2 {
    0%,
    100% {
      transform: rotate(-10deg);
    }

    50% {
      transform: rotate(-20deg);
    }
  }

  .rooster__head--wing--3 {
    --h: 1.2rem;
    --w: calc(var(--h) * 2);
    position: absolute;
    top: -0.4rem;
    left: 2.6rem;
    width: var(--w);
    height: var(--h);
    border-radius: 0 0 4rem 4rem;
    background-color: #a21f21;
    border-right: 4px solid #991c1e;
    transform-origin: bottom;
    --rotate: 15deg;
    transform: rotate(var(--rotate));
    animation: ans-wing-3 0.5s infinite;
  }

  .rooster__head--wing--4 {
    --h: 2.8rem;
    --w: calc(var(--h) / 2);
    position: absolute;
    top: calc(var(--h) * -0.9);
    left: 2.4rem;
    width: var(--w);
    height: var(--h);
    border-radius: 4rem 0 2rem 0;
    background-color: #d52026;
    border-right: 8px solid #c71e24;
    transform-origin: bottom;
    --rotate: 10deg;
    transform: rotate(var(--rotate));
    animation: ans-wing-3 0.4s infinite;
  }

  @keyframes ans-wing-3 {
    0%,
    100% {
      transform: rotate(var(--rotate));
    }

    50% {
      transform: rotate(calc(var(--rotate) + 15deg));
    }
  }

  .rooster__eyes {
    position: absolute;
    top: 0.3rem;
    left: 0.8rem;
    display: flex;
    align-items: center;
  }

  .rooster__eye {
    --s: 1.4rem;
    width: var(--s);
    height: var(--s);
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    overflow: hidden;
  }

  .rooster__eye--1 {
    border: 4px solid @--color-2;
    box-sizing: content-box;
  }

  .rooster__eye--2 {
    margin-left: -0.2rem;
  }

  .rooster__eye::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #000;
  }

  .rooster__eye-ans {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0;
    background-color: #753d22;
    transform: translateY(-70%);
    z-index: 2;
    animation: eye-ans 1.2s infinite;
  }

  .rooster__eye-ans--d {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0;
    background-color: #753d22;
    border-radius: inherit;
    transform: translateY(100%);
    z-index: 2;
    animation: eye-ans-d 1.2s infinite;
  }

  @keyframes eye-ans {
    0%,
    85%,
    100% {
      transform: translateY(-70%);
    }

    95% {
      transform: translateY(-40%);
    }
  }

  @keyframes eye-ans-d {
    0%,
    85%,
    100% {
      transform: translateY(100%);
    }

    95% {
      transform: translateY(40%);
    }
  }

  .rooster__mouth {
    position: absolute;
    width: 1.4rem;
    height: 0.9rem;
    left: 1rem;
    top: 2rem;
    border-radius: 50%;
    background-color: yellow;
    transform: rotate(2deg);
    z-index: 100;
  }

  .rooster__mouth-d {
    position: absolute;
    top: 2.97rem;
    left: 1.55rem;
    width: 0.9rem;
    height: 0.9rem;
    background-color: #991c1e;
    border-radius: 50%;
    z-index: 2;
    transform-origin: top;
    animation: mouth-ans 0.5s ease-in-out infinite;
  }

  .rooster__mouth-d--shadow {
    top: 2.97rem;
    left: 1.66rem;
    transform: scale(1.1);
    background-color: #7e0404;
  }

  .rooster__mouth-d::after {
    content: '';
    position: absolute;
    top: -0.1rem;
    left: 0.15rem;
    width: 0.4rem;
    height: 0.5rem;
    transform: rotate(35deg);
    background-color: #991c1e;
  }

  .rooster__mouth-d::before {
    content: '';
    position: absolute;
    top: -0.1rem;
    left: 0.35rem;
    width: 0.4rem;
    height: 0.5rem;
    transform: rotate(-35deg);
    background-color: #991c1e;
  }

  .rooster__mouth-d--shadow::after,
  .rooster__mouth-d--shadow::before {
    background-color: #7e0404;
  }

  .rooster__mouth::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 0.5rem;
    height: 0.8rem;
    border-top-right-radius: 5rem;
    border-bottom-right-radius: 5rem;
    border-right: 3px solid #fff;
    transform: rotate(-20deg);
    box-sizing: content-box;
  }

  .rooster__mouth::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem 0 0 0;
    border-top: 8px solid yellow;
    transform: translate(-40%, -6%) rotate(10deg);
  }

  @keyframes mouth-ans {
    0%,
    100% {
      transform: rotate(-10deg);
    }

    50% {
      transform: rotate(10deg);
    }
  }

  .rooster__neck {
    margin-top: -1rem;
    height: 8.7rem;
    width: 4.5rem;
    border-top-left-radius: 5rem;
    border-bottom-left-radius: 4rem;
    background-color: @--color-2;
    position: relative;
    overflow: hidden;
  }

  .rooster__neck::after {
    content: '';
    position: absolute;
    left: 0;
    top: 48%;
    width: 100%;
    height: 1.2rem;
    border-right: 4px solid #ddaf68;
    border-left: 4px solid #ffd89e;
    background-color: @--color-1;
    z-index: 11;
  }

  .rooster__neck-s {
    position: absolute;
    top: 3.5rem;
    left: -0.5rem;
    display: flex;
    gap: 0.1rem;
    z-index: 10;
  }
  .rooster__neck--l {
    background-image: linear-gradient(to bottom left, transparent 20%, #ffd89e 30%);
  }

  .rooster__neck--r {
    background-image: linear-gradient(to bottom left, #ddaf68 64%, transparent 64%);
  }

  .rooster__neck--1 {
    width: 1rem;
    height: 1rem;
    background-color: #f3c074;
    border-left: 4px solid #4e2816;
    border-top: 4px solid #4e2816;
    transform: rotate(45deg);
  }

  .rooster__neck--curve {
    position: absolute;
    top: 0.5rem;
    left: 0rem;
    width: 3rem;
    height: 4rem;
    border-left: 0.8rem solid #a3572eb7;
    transform: rotate(30deg);
    border-radius: 50%;
  }

  .rooster__body {
    --radius: 5rem;
    margin-top: -3.4rem;
    width: 10rem;
    height: 5rem;
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    background-color: @--color-1;
    border: 4px solid #ffd89e;
    border-top: transparent;
    position: relative;
    z-index: 10;
  }

  .rooster__body--tb {
    position: absolute;
    right: -4px;
    top: 0;
    width: 60.5%;
    height: 4px;
    background-color: #ddaf68;
  }

  .rooster__tail {
    --width: 4.5rem;

    position: absolute;
    width: var(--width);
    height: calc(var(--width) - 2rem);
    background-color: #d52026;
    right: 0;
    top: 40%;
    transform: translateX(60%);
    border-top-left-radius: calc(var(--width) - 1rem);
    border-top-right-radius: calc(var(--width) - 1rem);

    border-right: 6px solid #c91e24;
    border-left: 6px solid #d72229;
    transform-origin: left bottom;
    animation: tail-ans 0.5s ease-in-out infinite;
  }

  @keyframes tail-ans {
    0%,
    100% {
      transform: translateX(60%) rotate(0deg);
    }

    50% {
      transform: translateX(60%) rotate(10deg);
    }
  }

  .rooster__tail--1 {
    background-color: #991c1e;
    border-right: 6px solid #8d181c;
    border-left: 6px solid #a11e22;
    right: 1.2rem;
    top: 45%;
    transform-origin: left;
    transform: translateX(60%) rotate(-45deg);
    animation: tail-1-ans 0.5s ease-in-out infinite;
  }

  @keyframes tail-1-ans {
    0%,
    100% {
      transform: translateX(60%) rotate(-45deg);
    }

    50% {
      transform: translateX(60%) rotate(-35deg);
    }
  }

  .rooster__wing {
    position: absolute;
    left: 36%;
    top: 1%;
    transform: rotate(10deg);
    width: 7rem;
    height: 3.4rem;
    background-color: #753d22;
    border-radius: 2rem 0 3.5rem 2rem;
    border-right: 8px solid #6e3a20;
    border-left: 8px solid #7c4024;
    transform-origin: top left;
    animation: wing-ans 1s linear infinite;
  }

  @keyframes wing-ans {
    0%,
    40%,
    100% {
      transform: rotate(10deg);
    }

    20%,
    60% {
      transform: rotate(18deg);
    }

    80% {
      transform: rotate(2deg);
    }
  }

  .rooster__leg {
    position: absolute;
    left: 36%;
    bottom: -9%;
    width: 4.2rem;
    height: 2.4rem;
    background-color: #60321c;
    border-radius: 0 0 4rem 4rem;
  }

  .rooster__leg--line {
    position: absolute;
    top: 40%;
    left: 35%;
    height: 4rem;
    width: 0.8rem;
    overflow: hidden;
    transform: rotate(2deg);
    z-index: -1;
  }

  .rooster__leg--line::before {
    content: '';
    position: absolute;
    top: -4rem;
    left: 0rem;
    --s: 12rem;
    width: var(--s);
    height: var(--s);
    background-color: yellow;
    border-radius: 50%;
  }

  .rooster__leg--line::after {
    content: '';
    position: absolute;
    top: -5.5rem;
    left: 0.5rem;
    --s: 15rem;
    width: var(--s);
    height: var(--s);
    background-color: rgb(228, 228, 13);
    border-radius: 50%;
  }

  .rooster__leg--hide {
    content: '';
    position: absolute;
    top: -5.5rem;
    left: 0.8rem;
    --s: 15rem;
    width: var(--s);
    height: var(--s);
    border-left: px solid rgb(228, 228, 13);
    border-radius: 50%;
    z-index: 1;
  }

  .rooster__leg--b {
    position: absolute;
    top: 4.6rem;
    left: 0rem;
    width: 3rem;
    height: 0.4rem;
    background-color: yellow;
    border-radius: 0.4rem;
    z-index: 100;
    animation: leg-b-ans 1s infinite;
  }

  .rooster__leg--1 {
    animation: leg-ans 1s linear infinite;
  }

  .rooster__leg--1 .rooster__leg--overlay {
    background-color: #60321c;
  }

  .rooster__leg--2 {
    animation: leg-ans 1s 0.6s linear infinite;
  }

  .rooster__leg--2 .rooster__leg--overlay {
    background-color: #753d22;
  }

  @keyframes leg-ans {
    0%,
    100% {
      transform: translate(0, 0);
    }

    20% {
      transform: translate(-0.5, -0.6rem);
    }

    40% {
      transform: translate(-1rem, -0.6rem);
    }

    70% {
      transform: translate(-2rem, 0rem);
    }
  }

  @keyframes leg-b-ans {
    0%,
    100% {
      transform: rotate(0);
    }

    20% {
      transform: rotate(4deg);
    }

    40% {
      transform: rotate(-4deg);
    }

    70% {
      transform: rotate(4deg);
    }
  }

  @keyframes body-ans {
    0%,
    100% {
      transform: translateY(0, 0);
    }

    50% {
      transform: translateY(-0.4rem);
    }
  }

  .rooster__leg--overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: @--color-2;
    border-radius: inherit;
  }

  .surface {
    position: absolute;
    top: 15.8rem;
    left: -5rem;
    width: 20rem;
    height: 1rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.259);
    animation: surface-ans 1s linear infinite;
    z-index: -1;
  }

  @keyframes surface-ans {
    0%,
    100% {
      transform: scaleX(1);
    }

    50% {
      transform: scaleX(1.1);
    }
  }
</style>
