<script setup lang="ts">
import { computed, ref } from 'vue'
import { injectService } from './services'
import { Button, Card, FloatLabel, Select } from 'primevue'

const midiService = injectService('midiService')

const outputDevices = computed(() => midiService.outputDevices)

const outputDevice = ref('')

function test() {
  const randomCcValue = Math.floor(Math.random() * 127)
  midiService.sendCC(outputDevice.value, 1, 24, randomCcValue)
}
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #title>MIDI <i>touch</i></template>
    <template #content>
      <FloatLabel variant="on">
        <Select
          id="outputDevice"
          v-model="outputDevice"
          :options="outputDevices"
          data-key="id"
          option-label="name"
          option-value="id"
          show-clear
          fluid
        />
        <label for="outputDevice">Output Device</label>
      </FloatLabel>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Test" class="w-full" @click="(_) => test()" />
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
