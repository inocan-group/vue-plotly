<template>
  <plotly-axis type="multicategory" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PlotlyAxis from './PlotlyAxis.vue'

export default defineComponent({
  components: { PlotlyAxis },
})
</script>
