<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<template>
  <NButton v-bind="$attrs">
    <slot />
  </NButton>
</template>
