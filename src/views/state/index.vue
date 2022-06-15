<template>
  <div>
    <a-row v-if="state" class="grid-row" :gutter="24">
      <a-col class="col-row" :span="12">
        <a-card v-if="state?.os" class="card_item" title="Runtime" hoverable>
          <a-space class="col-text" direction="vertical" :size="10" style="display: block">
            <a-row :gutter="10">
              <a-col :span="12">
                <span>os</span>
              </a-col>
              <a-col :span="12">
                <span> {{ state?.os?.goos }} </span>
              </a-col>
            </a-row>
            <a-row :gutter="10">
              <a-col :span="12">
                <span>compiler</span>
              </a-col>
              <a-col :span="12">
                <span> {{ state?.os?.compiler }} </span>
              </a-col>
            </a-row>
            <a-row :gutter="10">
              <a-col :span="12">
                <span>go version</span>
              </a-col>
              <a-col :span="12">
                <span> {{ state?.os?.goVersion }} </span>
              </a-col>
            </a-row>
            <a-row :gutter="10">
              <a-col :span="12">
                <span>cpu nums</span>
              </a-col>
              <a-col :span="12">
                <span> {{ state?.os?.numCpu }} </span>
              </a-col>
            </a-row>
            <a-row :gutter="10">
              <a-col :span="12">
                <span>goroutine nums</span>
              </a-col>
              <a-col :span="12">
                <span> {{ state?.os?.numGoroutine }} </span>
              </a-col>
            </a-row>
          </a-space>
        </a-card>
      </a-col>
      <a-col class="col" :span="12">
        <a-card v-if="state?.disk" class="card_item" title="Disk" hoverable>
          <a-row :gutter="10">
            <a-col :span="12">
              <a-space class="col-text" direction="vertical" :size="10" style="display: block">
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>total (MB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ state?.disk?.totalMb }} </span>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>used (MB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ state?.disk?.usedMb }} </span>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>total (GB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ state?.disk?.totalGb }} </span>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>used (GB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span> {{ state?.disk?.usedGb }} </span>
                  </a-col>
                </a-row>
              </a-space>
            </a-col>
            <a-col :span="12">
              <a-progress
                animation
                type="circle"
                :color="color(state?.disk.usedPercent)"
                size="large"
                :percent="state?.disk.usedPercent / 100"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col class="col" :span="12">
        <a-card
          v-if="state?.cpu"
          class="card_item"
          title="CPU"
          :body-style="{ height: '140px', 'overflow-y': 'scroll' }"
          hoverable
        >
          <a-space class="col-text" direction="vertical" :size="10" style="display: block">
            <a-row :gutter="10">
              <a-col :span="12">
                <span>physical number of cores</span>
              </a-col>
              <a-col :span="12">
                <span>{{ state?.cpu.cores }}</span>
              </a-col>
            </a-row>
            <a-row v-for="(item, index) in state?.cpu.cpus" :key="index" :gutter="10">
              <a-col :span="12">core {{ index }}</a-col>
              <a-col :span="12">
                <!-- TODO: 这个组件有时候有点问题，暂时先把文字去掉了 -->
                <a-progress
                  animation
                  :show-text="false"
                  type="line"
                  :percent="(item / 100).toFixed(0)"
                  :color="color(item)"
                />
              </a-col>
            </a-row>
          </a-space>
        </a-card>
      </a-col>
      <a-col class="col" :span="12">
        <a-card v-if="state?.ram" class="card_item" title="Ram" hoverable>
          <a-row :gutter="10">
            <a-col :span="12">
              <a-space class="col-text" direction="vertical" :size="10" style="display: block">
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>total (MB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span>{{ state?.ram.totalMb }}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>used (MB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span>{{ state?.ram.usedMb }}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>total (GB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span>{{ state?.ram.totalMb / 1024 }}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <span>used (GB)</span>
                  </a-col>
                  <a-col :span="12">
                    <span>{{ (state?.ram.usedMb / 1024).toFixed(2) }}</span>
                  </a-col>
                </a-row>
              </a-space>
            </a-col>
            <a-col :span="12">
              <a-progress
                animation
                type="circle"
                :color="color(state?.ram.usedPercent)"
                size="large"
                :percent="state?.ram.usedPercent / 100"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, onBeforeUnmount, reactive, ref, toRefs } from 'vue';
  import { getSystemState } from '@/api/system/system';
  import { IStateTypes } from '@/api/system/system-types';

  export default defineComponent({
    name: 'State',
    setup() {
      const state = reactive({
        state: ref<IStateTypes>(),
        time: ref(),
      });
      const getState = async () => {
        const { server } = await getSystemState();
        state.state = server;
      };

      const color = (value: number) => {
        if (value < 40) {
          return '#5cb87a';
        }
        if (value > 40 && value < 80) {
          return '#e6a23c';
        }
        return '#f56c6c';
      };

      onBeforeMount(() => {
        getState();
        state.time = setInterval(() => {
          getState();
        }, 1000 * 5);
      });

      onBeforeUnmount(() => {
        clearInterval(state.time);
      });

      return {
        ...toRefs(state),

        color,
      };
    },
  });
</script>

<style lang="less" scoped>
  .grid-row {
    padding: 20px 30px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .col-row {
    padding-bottom: 20px;
  }

  .col-text {
    font-size: 16px;
  }

  .card_item {
    height: 230px;
  }
</style>
