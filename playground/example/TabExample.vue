<script setup lang="ts">
import { TwTabWrapper, TwTabNavigator, TwTabBody } from "../../src/build";
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Tabs</h2>
    <hr class="my-2 border dark:border-gray-700" />
    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12">
        <TwTabWrapper>
          <div class="flex border rounded-lg overflow-hidden">
            <div class="bg-gray-50 border-r">
              <div class="text-lg p-2 bg-gray-200">Title</div>
              <hr class="border-gray-300" />
              <TwTabNavigator type="vertical" line-class="!rounded-r">
                <template #tab1>
                  <div class="p-2 w-full">Test</div>
                </template>
                <template #tab2>
                  <div class="p-2 w-full">Test 2</div>
                </template>
              </TwTabNavigator>
              <hr class="border-gray-300" />
              <div class="text-lg p-2 bg-gray-200">Footer</div>
            </div>
            <TwTabBody id="tab1" v-slot="{ active }">
              <div class="w-full p-2 rounded-r bg-white" v-if="active">
                Test
              </div>
            </TwTabBody>
            <TwTabBody id="tab2" v-slot="{ active }">
              <div class="w-full p-2 rounded-r bg-white" v-if="active">
                Test 2
              </div>
            </TwTabBody>
          </div>
        </TwTabWrapper>
      </div>
      <div class="col-span-12">
        <TwTabWrapper>
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gray-100 shadow-inner">
              <div class="text-lg p-2 bg-gray-300">Title</div>
              <hr class="border-gray-300" />
              <TwTabNavigator class="bg-gray-100" type="horizontal">
                <template #tab1>
                  <div class="p-2 w-full">Test</div>
                </template>
                <template #tab2>
                  <div class="p-2 w-full">Test 2</div>
                </template>
                <template #tab3>
                  <div class="p-2 w-full">Test 3</div>
                </template>
              </TwTabNavigator>
            </div>
            <TwTabBody id="tab1" v-slot="{ active }">
              <div class="w-full p-2 rounded bg-white shadow" v-if="active">
                Test
              </div>
            </TwTabBody>
            <TwTabBody id="tab2" v-slot="{ active }">
              <div class="w-full p-2 rounded bg-white shadow" v-if="active">
                Test 2
              </div>
            </TwTabBody>
            <TwTabBody id="tab3" v-slot="{ active }">
              <div class="w-full p-2 rounded bg-white shadow" v-if="active">
                Test 3
              </div>
            </TwTabBody>
          </div>
        </TwTabWrapper>
      </div>
    </div>
  </div>
</template>
