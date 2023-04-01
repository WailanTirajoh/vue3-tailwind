<script setup lang="ts">
import { TwTabWrapper, TwTabNavigator, TwTabBody } from "../../src/build";
</script>

<template>
  <div>
    <h2 class="vt-text-2xl vt-font-bold">Tabs</h2>
    <hr class="vt-my-2 vt-border dark:vt-border-gray-700" />
    <div class="vt-grid vt-grid-cols-12 vt-gap-2">
      <div class="vt-col-span-12">
        <TwTabWrapper>
          <div class="vt-flex vt-border vt-rounded-lg vt-overflow-hidden">
            <div class="vt-bg-gray-50 vt-border-r">
              <div class="vt-text-lg vt-p-2 vt-bg-gray-200">Title</div>
              <hr class="vt-border-gray-300" />
              <TwTabNavigator type="vertical" line-class="!vt-rounded-r">
                <template #tab1>
                  <div class="vt-p-2 vt-w-full">Test</div>
                </template>
                <template #tab2>
                  <div class="vt-p-2 vt-w-full">Test 2</div>
                </template>
              </TwTabNavigator>
              <hr class="vt-border-gray-300" />
              <div class="vt-text-lg vt-p-2 vt-bg-gray-200">Footer</div>
            </div>
            <TwTabBody id="tab1" v-slot="{ active }">
              <div
                class="vt-w-full vt-p-2 vt-rounded-r vt-bg-white"
                v-if="active"
              >
                Test
              </div>
            </TwTabBody>
            <TwTabBody id="tab2" v-slot="{ active }">
              <div
                class="vt-w-full vt-p-2 vt-rounded-r vt-bg-white"
                v-if="active"
              >
                Test 2
              </div>
            </TwTabBody>
          </div>
        </TwTabWrapper>
      </div>
      <div class="vt-col-span-12">
        <TwTabWrapper>
          <div
            class="vt-border vt-border-gray-200 vt-rounded-lg vt-overflow-hidden"
          >
            <div class="vt-bg-gray-100 vt-shadow-inner">
              <div class="vt-text-lg vt-p-2 vt-bg-gray-300">Title</div>
              <hr class="vt-border-gray-300" />
              <TwTabNavigator class="vt-bg-gray-100" type="horizontal">
                <template #tab1>
                  <div class="vt-p-2 vt-w-full">Test</div>
                </template>
                <template #tab2>
                  <div class="vt-p-2 vt-w-full">Test 2</div>
                </template>
                <template #tab3>
                  <div class="vt-p-2 vt-w-full">Test 3</div>
                </template>
              </TwTabNavigator>
            </div>
            <TwTabBody id="tab1" v-slot="{ active }">
              <div
                class="vt-w-full vt-p-2 vt-rounded vt-bg-white vt-shadow"
                v-if="active"
              >
                Test
              </div>
            </TwTabBody>
            <TwTabBody id="tab2" v-slot="{ active }">
              <div
                class="vt-w-full vt-p-2 vt-rounded vt-bg-white vt-shadow"
                v-if="active"
              >
                Test 2
              </div>
            </TwTabBody>
            <TwTabBody id="tab3" v-slot="{ active }">
              <div
                class="vt-w-full vt-p-2 vt-rounded vt-bg-white vt-shadow"
                v-if="active"
              >
                Test 3
              </div>
            </TwTabBody>
          </div>
        </TwTabWrapper>
      </div>
    </div>
  </div>
</template>
