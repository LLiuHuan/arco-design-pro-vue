<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-05-27 12:20:09
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
interface Props {
  companyName?: string;
  companySiteLink?: string;
  date?: string;
  icp?: string;
  icpLink?: string;
}

defineOptions({
  name: 'Copyright',
});

withDefaults(defineProps<Props>(), {
  companyName: 'Arco Design Pro',
  companySiteLink: '',
  date: '2024',
  icp: '',
  icpLink: '',
});
</script>

<template>
  <div class="text-md flex-center">
    <!-- ICP Link -->
    <a
      v-if="icp"
      :href="icpLink || 'javascript:void(0)'"
      class="hover:text-primary-hover mx-1"
      target="_blank"
    >
      {{ icp }}
    </a>

    <!-- Copyright Text -->
    Copyright © {{ date }}

    <!-- Company Link -->
    <a
      v-if="companyName"
      :href="companySiteLink || 'javascript:void(0)'"
      class="hover:text-primary-hover mx-1"
      target="_blank"
    >
      {{ companyName }}
    </a>
  </div>
</template>
