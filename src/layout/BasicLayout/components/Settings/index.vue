<!--<template>-->
<!--  <div class="btn" @click="visible = true">-->
<!--    <icon-settings />-->
<!--  </div>-->

<!--  <a-drawer-->
<!--    :visible="visible"-->
<!--    placement="right"-->
<!--    @cancel="closeDrawer"-->
<!--    :footer="false"-->
<!--    unmountOnClose-->
<!--  >-->
<!--    <template #title> 页面配置</template>-->
<!--    <div class="drawer">-->
<!--      <a-divider orientation="center">主题色</a-divider>-->
<!--      <div class="justify-center drawer-setting-item dark-switch">-->
<!--        <a-trigger class="demo-basic" trigger="click">-->
<!--          <div class="input">-->
<!--            <div class="current-color" :style="{ backgroundColor: `${pureColor}` }"></div>-->
<!--            <span>{{ pureColor }}</span>-->
<!--          </div>-->
<!--          <template #content>-->
<!--            <color-picker v-model:pureColor="pureColor" :isWidget="true" format="hex" />-->
<!--          </template>-->
<!--        </a-trigger>-->
<!--      </div>-->

<!--      <a-divider orientation="center">主题</a-divider>-->
<!--      <div class="drawer-setting-item align-items-top">-->
<!--        <div class="drawer-setting-item-style align-items-top">-->
<!--          <a-trigger class="demo-basic" trigger="click">-->
<!--            <a-space>-->
<!--              <a-card-->
<!--                v-for="(theme, index) in themes"-->
<!--                class="card-theme"-->
<!--                hoverable-->
<!--                :style="{-->
<!--                  width: '100px',-->
<!--                  marginBottom: '20px',-->
<!--                  textAlign: 'center',-->
<!--                  borderColor: theme.value === baseTheme ? pureColor : '',-->
<!--                }"-->
<!--                :key="index"-->
<!--              >-->
<!--                <div class="cursor-pointer select-none" @click="setTheme(theme.value)">-->
<!--                  {{ theme.title }}-->
<!--                </div>-->
<!--              </a-card>-->
<!--            </a-space>-->
<!--          </a-trigger>-->
<!--        </div>-->
<!--      </div>-->

<!--      <a-divider orientation="center">界面功能</a-divider>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 固定多页签</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.multiTabsSetting.fixed" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <a-divider orientation="center">界面</a-divider>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 显示重载页面按钮</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.headerSetting.isReload" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 显示面包屑导航</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.crumbsSetting.show" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 显示面包屑显示图标</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.crumbsSetting.showIcon" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 显示多页签</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.multiTabsSetting.show" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 显示水印</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.watermark" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <a-divider orientation="center">动画</a-divider>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 启用动画</div>-->
<!--        <div class="drawer-setting-item-action">-->
<!--          <a-switch v-model:model-value="settingStore.isPageAnimate" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="drawer-setting-item">-->
<!--        <div class="drawer-setting-item-title"> 动画类型</div>-->
<!--        <div class="drawer-setting-item-select">-->
<!--          <a-select v-model:model-value="settingStore.pageAnimateType" :options="animateOptions" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="drawer-setting-item">-->
<!--        <a-alert type="warning" :show-icon="false">-->
<!--          <p>{{ alertText }}</p>-->
<!--        </a-alert>-->
<!--      </div>-->
<!--    </div>-->
<!--  </a-drawer>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { defineComponent, onBeforeMount, reactive, toRefs, watch } from 'vue';-->
<!--  import { ColorPicker } from 'vue3-colorpicker';-->
<!--  import 'vue3-colorpicker/style.css';-->
<!--  import { storage } from '@/utils/storage/storage';-->
<!--  import { useUserStore } from '@/store/modules/user/users';-->
<!--  import { useSettingStore } from '@/store/modules/settings';-->
<!--  import { animates as animateOptions } from '@/settings/animateSetting';-->
<!--  import { setBaseColor } from '@/utils/color';-->

<!--  export default defineComponent({-->
<!--    name: 'Settings',-->
<!--    components: {-->
<!--      ColorPicker,-->
<!--    },-->
<!--    setup() {-->
<!--      const userStore = useUserStore();-->
<!--      const settingStore = useSettingStore();-->
<!--      const state = reactive({-->
<!--        visible: false,-->
<!--        pureColor: userStore.getBaseColor,-->
<!--        themes: [-->
<!--          { title: '默认', value: 'default' },-->
<!--          { title: '圣诞主题', value: 'theme-christmas' },-->
<!--        ],-->
<!--        baseTheme: storage.get('_theme') ?? 'default',-->
<!--        alertText:-->
<!--          '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',-->
<!--      });-->

<!--      const closeDrawer = () => {-->
<!--        state.visible = false;-->
<!--      };-->

<!--      const setTheme = (val: string) => {-->
<!--        storage.set('_theme', val);-->
<!--        state.baseTheme = val;-->
<!--        location.reload();-->
<!--      };-->

<!--      watch(-->
<!--        () => state.pureColor,-->
<!--        (value: any) => {-->
<!--          // let regex1 = /\d+, \d+, \d+/gi;-->
<!--          // let color = value.match(regex1);-->
<!--          userStore.setBaseColor(value);-->

<!--          setBaseColor(value);-->
<!--          // document.body.style.setProperty(`&#45;&#45;arcoblue-5`, color[0]);-->
<!--        }-->
<!--      );-->

<!--      onBeforeMount(() => {-->
<!--        if (userStore.getBaseColor != '') {-->
<!--          setBaseColor(userStore.getBaseColor);-->
<!--        }-->
<!--      });-->
<!--      return {-->
<!--        ...toRefs(state),-->
<!--        closeDrawer,-->
<!--        setTheme,-->
<!--        settingStore,-->
<!--        animateOptions,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--  @import 'styles/index.module.less';-->
<!--  @import 'styles/color.module.less';-->

<!--  .current-color {-->
<!--    height: 25px;-->
<!--    width: 80px;-->
<!--    margin-right: 10px;-->
<!--  }-->
<!--</style>-->
