<template>
  <BaseScrollbarContext>
    <AGrid :cols="1" :col-gap="12" :row-gap="12">
      <AGridItem>
        <ACard :title="$t('routes.about.title')">
          {{ $t('routes.about.introduction') }}
        </ACard>
      </AGridItem>
      <AGridItem>
        <ACard :title="$t('routes.about.projectInfo.title')">
          <ADescriptions bordered>
            <ADescriptionsItem :label="$t('routes.about.projectInfo.version')">
              <ATag color="arcoblue">{{ version }}</ATag>
            </ADescriptionsItem>
            <ADescriptionsItem
              :label="$t('routes.about.projectInfo.latestBuildTime')"
            >
              <ATag color="arcoblue">{{ latestBuildTime }}</ATag>
            </ADescriptionsItem>
            <ADescriptionsItem
              :label="$t('routes.about.projectInfo.githubLink')"
            >
              <a
                class="text-primary"
                :href="homepage"
                target="_blank"
                :rel="$t('routes.about.projectInfo.githubLink')"
              >
                {{ $t('routes.about.projectInfo.githubLink') }}
              </a>
            </ADescriptionsItem>
            <ADescriptionsItem
              :label="$t('routes.about.projectInfo.documentLink')"
            >
              <a
                class="text-primary"
                :href="documentation"
                target="_blank"
                :rel="$t('routes.about.projectInfo.documentLink')"
              >
                {{ $t('routes.about.projectInfo.documentLink') }}
              </a>
            </ADescriptionsItem>
            <ADescriptionsItem
              :label="$t('routes.about.projectInfo.previewLink')"
            >
              <a
                class="text-primary"
                :href="website"
                target="_blank"
                :rel="$t('routes.about.projectInfo.previewLink')"
              >
                {{ $t('routes.about.projectInfo.previewLink') }}
              </a>
            </ADescriptionsItem>
          </ADescriptions>
        </ACard>
      </AGridItem>
      <AGridItem>
        <ACard :title="$t('routes.about.proDep')">
          <ADescriptions :data="dependencies" :column="2" bordered />
        </ACard>
      </AGridItem>
      <AGridItem>
        <ACard :title="$t('routes.about.devDep')">
          <ADescriptions :data="devDependencies" :column="2" bordered />
        </ACard>
      </AGridItem>
    </AGrid>
  </BaseScrollbarContext>
</template>

<script lang="ts" setup>
  import BaseScrollbarContext from '@/components/BaseScrollbarContent/src/index.vue';
  import { pkgJson } from './model';

  const {
    dependencies,
    devDependencies,
    version,
    homepage,
    website,
    documentation,
  } = pkgJson;

  const latestBuildTime = BUILD_TIME;
</script>

<style lang="less" scoped></style>
