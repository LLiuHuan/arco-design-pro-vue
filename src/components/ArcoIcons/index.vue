<template>
  <a-input
    :placeholder="placeholder"
    v-model:model-value="inputValue"
    @clear="setValue('')"
    @blur="setValue(inputValue)"
    allow-clear
  >
    <template #prepend>
      <a-trigger
        class="demo-basic"
        trigger="click"
        position="bottom"
        update-at-scroll
        auto-fit-position
      >
        <a-button>
          <template #icon>
            <component :is="inputValue" />
          </template>
        </a-button>
        <template #content>
          <a-card :body-style="{ width: '300px', height: '300px', overflow: 'auto' }">
            <ul class="flex flex-wrap px-2">
              <li
                :class="{ 'border border-blue-700': inputValue === arcoIcon.name }"
                class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-blue-700"
                v-for="arcoIcon in ArcoVueIcon"
                v-show="arcoIcon.name !== 'install'"
                :key="arcoIcon.name"
                @click="setValue(arcoIcon.name)"
              >
                <span class="app-iconify anticon" style="font-size: 16px; display: inline-flex">
                  <component :is="arcoIcon.name" />
                </span>
              </li>
            </ul>
          </a-card>
        </template>
      </a-trigger>
    </template>
  </a-input>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
  import ArcoVueIcon from '@arco-design/web-vue/lib/icon';

  export default defineComponent({
    name: 'ArcoIcons',
    props: {
      iconValue: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
    },
    emits: ['update:iconValue'],
    setup(props, { emit }) {
      const state = reactive({
        inputValue: ref<string>(props.iconValue),
      });

      const setValue = (value: string) => {
        state.inputValue = value;
        emit('update:iconValue', value);
      };

      watch(
        () => props.iconValue,
        (val) => {
          state.inputValue = val;
        }
      );
      return {
        ...toRefs(state),
        ArcoVueIcon,
        setValue,
      };
    },
  });
</script>

<style scoped>
  @import './styles/index.less';
</style>
