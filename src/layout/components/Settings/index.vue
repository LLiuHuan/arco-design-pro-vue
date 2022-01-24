<template>
  <div class="btn" @click="visible = true">
    <icon-settings />
  </div>

  <a-drawer
    :visible="visible"
    placement="right"
    @cancel="closeDrawer"
    :footer="false"
    unmountOnClose
  >
    <template #title> 页面配置 </template>
    <a-typography>
      <a-typography-title :heading="6"> 主题色 </a-typography-title>
      <a-typography-paragraph>
        <a-trigger class="demo-basic" trigger="click">
          <div class="input">
            <div class="current-color" :style="{ backgroundColor: `${pureColor}` }"> </div>
            <span>{{ pureColor }}</span>
          </div>
          <template #content>
            <color-picker v-model:pureColor="pureColor" :isWidget="true" />
          </template>
        </a-trigger>
      </a-typography-paragraph>
      <a-typography-title :heading="6"> 主题 </a-typography-title>
      <a-typography-paragraph>
        <a-trigger class="demo-basic" trigger="click">
          <a-space>
            <a-card
              v-for="theme in themes"
              class="card-theme"
              hoverable
              :style="{
                width: '100px',
                marginBottom: '20px',
                textAlign: 'center',
                borderColor: theme.value === baseTheme ? pureColor : '',
              }"
              :key="theme.value"
            >
              <div class="cursor-pointer select-none" @click="setTheme(theme.value)">
                {{ theme.title }}
              </div>
            </a-card>
          </a-space>
        </a-trigger>
      </a-typography-paragraph>
    </a-typography>
  </a-drawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
  import { ColorPicker } from 'vue3-colorpicker';
  import 'vue3-colorpicker/style.css';
  import { ColorInputWithoutInstance } from 'tinycolor2';
  import { storage } from '@/utils/storage';
  import { useUserStore } from '@/store/modules/users';

  export default defineComponent({
    name: 'Settings',
    components: {
      ColorPicker,
    },
    setup() {
      const usersStore = useUserStore();
      const state = reactive({
        visible: false,
        pureColor: ref<ColorInputWithoutInstance>(
          `rgb(${usersStore.getBaseColor})` ?? 'rgb(5, 160, 69)'
        ),
        themes: [
          { title: '默认', value: 'default' },
          { title: '圣诞主题', value: 'theme-christmas' },
        ],
        baseTheme: storage.get('_theme') ?? 'default',
      });

      const closeDrawer = () => {
        state.visible = false;
      };

      const setTheme = (val: string) => {
        storage.set('_theme', val);
        state.baseTheme = val;
        location.reload();
      };

      watch(
        () => state.pureColor,
        (value: any) => {
          let regex1 = /\d+, \d+, \d+/gi;
          let color = value.match(regex1);
          usersStore.setBaseColor(color[0]);
          document.body.style.setProperty(`--arcoblue-6`, color[0]);
        }
      );
      return {
        ...toRefs(state),
        closeDrawer,
        setTheme,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import 'styles/index.module.less';
  @import 'styles/color.module.less';

  .current-color {
    height: 25px;
    width: 80px;
    margin-right: 10px;
  }
</style>
