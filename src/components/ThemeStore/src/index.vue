<template>
  <ASpin :loading="pageInfo.loading" class="w-full h-full">
    <AGrid
      :col-gap="16"
      :cols="{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }"
      :row-gap="16"
    >
      <template v-if="themes">
        <AGridItem v-for="item in themes" :key="item.packageName">
          <ACard hoverable>
            <template #cover>
              <div class="h-160px overflow-hidden">
                <img
                  :src="
                    item.logo
                      ? item.logo
                      : 'https:////p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/79f6d121da908a4ff9a48e650b9004db.png~tplv-uwbnlip3yd-webp.webp'
                  "
                  alt="dessert"
                  class="w-full"
                />
              </div>
            </template>
            <ACardMeta :title="item.themeName" />
            <template #actions>
              <ATag
                v-if="getThemePro?.packageName === item.packageName"
                color="rgba(var(--primary-3))"
                >当前使用
              </ATag>
              <AButton
                v-else
                :loading="installing"
                size="mini"
                type="primary"
                @click="setTheme(item)"
                >{{ $t('common.install') }}
              </AButton>
            </template>
          </ACard>
        </AGridItem>
      </template>
      <template v-else>
        <AGridItem v-for="i in 6" :key="i">
          <ACard hoverable>
            <template #cover>
              <ASkeleton class="h-160px w-full">
                <ASkeletonShape class="!w-full !h-full" />
              </ASkeleton>
            </template>
            <ASkeleton>
              <ASkeletonLine :rows="2" />
            </ASkeleton>
          </ACard>
        </AGridItem>
      </template>
      <AGridItem :span="3" class="flex justify-end">
        <APagination
          v-model:current="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
          :total="pageInfo.total"
          @change="delaySetTheme"
        />
      </AGridItem>
    </AGrid>
  </ASpin>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ThemeInfo } from '~/types/config';
  import { useRootSetting } from '@/hooks/setting';
  import { getThemes, setThemeInfo } from './helpers';

  defineOptions({ name: 'ThemeStore' });

  const themes = ref();
  // 主题安装中
  const installing = ref(false);
  const pageInfo = reactive({
    page: 1,
    pageSize: 6,
    total: 0,
    loading: false,
  });
  const { setThemePro, setThemeAllColor, getThemePro } = useRootSetting();
  const setTheme = async (theme: ThemeInfo) => {
    installing.value = true;
    await setThemeInfo(theme.packageName, theme.colors).then(() => {
      installing.value = false;
      setThemePro(theme);
      setThemeAllColor(theme.colors);
    });
  };

  const delaySetTheme = (page: number = 1) => {
    pageInfo.loading = true;
    setTimeout(() => {
      pageInfo.page = page;
      const theme = getThemes(pageInfo.page, pageInfo.pageSize);
      [themes.value, pageInfo.total] = [theme.data, theme.total];
      pageInfo.loading = false;
    }, 500);
  };

  delaySetTheme();
</script>

<style lang="less" scoped></style>
