<template>
  <PageWrapper
    content="由于刷新的时候会请求用户信息接口，会根据接口重置角色信息，所以刷新后界面会恢复原样，如果不需要，可以注释 src/layout/default/index内的获取用户信息接口"
    content-class="px-4"
    title="前端权限按钮示例"
  >
    <ACard class="mt-4">
      <p>
        当前角色: <a> {{ authStore.userInfo?.userRole }} </a>
      </p>

      <!--    <AAlert class="mt-4">点击后请查看按钮变化</AAlert>-->

      <ADivider
        ><span class="ellipsis-text"
          >组件方式判断权限(有需要可以自行全局注册)</span
        ></ADivider
      >
      <ASpace size="mini" wrap>
        <Authority :value="RoleEnum.SUPER">
          <AButton class="mx-4" type="primary"> 拥有super角色权限可见</AButton>
        </Authority>
        <Authority :value="RoleEnum.USER">
          <AButton class="mx-4" type="primary"> 拥有user角色权限可见</AButton>
        </Authority>
        <Authority :value="[RoleEnum.USER, RoleEnum.SUPER]">
          <AButton class="mx-4" type="primary">
            拥有[super,user]角色权限可见
          </AButton>
        </Authority>
      </ASpace>

      <ADivider
        ><span class="ellipsis-text"
          >函数方式方式判断权限(适用于函数内部过滤)</span
        ></ADivider
      >
      <ASpace size="mini" wrap>
        <AButton
          v-if="hasPermission(RoleEnum.SUPER)"
          class="mx-4"
          type="primary"
        >
          拥有super角色权限可见
        </AButton>
        <AButton
          v-if="hasPermission(RoleEnum.USER)"
          class="mx-4"
          type="primary"
        >
          拥有user角色权限可见
        </AButton>
        <AButton
          v-if="hasPermission([RoleEnum.SUPER, RoleEnum.USER])"
          class="mx-4"
          type="primary"
        >
          拥有[super,user]角色权限可见
        </AButton>
      </ASpace>

      <ADivider
        ><span class="ellipsis-text"
          >指令方式方式判断权限(该方式不能动态修改权限)</span
        ></ADivider
      >
      <ASpace size="mini" wrap>
        <AButton v-auth="RoleEnum.SUPER" class="mx-4" type="primary">
          拥有super角色权限可见
        </AButton>
        <AButton v-auth="RoleEnum.USER" class="mx-4" type="primary">
          拥有user角色权限可见
        </AButton>
        <AButton
          v-auth="[RoleEnum.SUPER, RoleEnum.USER]"
          class="mx-4"
          type="primary"
        >
          拥有[super,user]角色权限可见
        </AButton>
      </ASpace>
    </ACard>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '@/components/PageWrapper';
  import { Authority } from '@/components/Authority';
  import { RoleEnum } from '@/enums/authEnum';
  import { usePermission } from '@/hooks/web/usePermission';
  import { useAuthStore } from '@/store/modules/auth';

  const { hasPermission } = usePermission();
  const authStore = useAuthStore();
</script>

<style lang="less" scoped></style>
