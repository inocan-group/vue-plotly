<template>
  <plotly-axis type="category" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PlotlyAxis from './PlotlyAxis.vue'

export default defineComponent({
  components: { PlotlyAxis },
})
</script>
