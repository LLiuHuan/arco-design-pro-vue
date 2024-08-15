<template>
  <div>
    <AGrid :col-gap="12" :cols="1" :row-gap="12">
      <AGridItem>
        <ACard :title="$t('about.title')">
          {{ $t('about.introduction') }}
        </ACard>
      </AGridItem>
      <AGridItem>
        <ACard :title="$t('about.projectInfo.title')">
          <ADescriptions :column="getIsMobile ? 1 : 3" bordered>
            <ADescriptionsItem :label="$t('about.projectInfo.version')">
              <ATag color="arcoblue">{{ version }}</ATag>
            </ADescriptionsItem>
            <ADescriptionsItem :label="$t('about.projectInfo.latestBuildTime')">
              <ATag color="arcoblue">{{ latestBuildTime }}</ATag>
            </ADescriptionsItem>
            <ADescriptionsItem :label="$t('about.projectInfo.githubLink')">
              <a
                :href="homepage"
                :rel="$t('about.projectInfo.githubLink')"
                class="text-[rgba(var(--primary-6))]"
                target="_blank"
              >
                {{ $t('about.projectInfo.githubLink') }}
              </a>
            </ADescriptionsItem>
            <ADescriptionsItem :label="$t('about.projectInfo.documentLink')">
              <a
                :href="documentation"
                :rel="$t('about.projectInfo.documentLink')"
                class="text-[rgba(var(--primary-6))]"
                target="_blank"
              >
                {{ $t('about.projectInfo.documentLink') }}
              </a>
            </ADescriptionsItem>
            <ADescriptionsItem :label="$t('about.projectInfo.previewLink')">
              <a
                :href="website"
                :rel="$t('about.projectInfo.previewLink')"
                class="text-[rgba(var(--primary-6))]"
                target="_blank"
              >
                {{ $t('about.projectInfo.previewLink') }}
              </a>
            </ADescriptionsItem>
          </ADescriptions>
        </ACard>
      </AGridItem>
      <AGridItem>
        <ACard :title="$t('about.proDep')">
          <ADescriptions
            :column="getIsMobile ? 1 : 2"
            :data="dependencies"
            :layout="getIsMobile ? 'vertical' : 'horizontal'"
            bordered
          />
        </ACard>
      </AGridItem>
      <AGridItem>
        <ACard :title="$t('about.devDep')">
          <ADescriptions
            :column="getIsMobile ? 1 : 2"
            :data="devDependencies"
            :layout="getIsMobile ? 'vertical' : 'horizontal'"
            bordered
          />
        </ACard>
      </AGridItem>
    </AGrid>
  </div>
</template>

<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting';
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

  const { getIsMobile } = useRootSetting();
</script>

<style lang="less" scoped></style>
