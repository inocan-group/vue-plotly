<script lang="ts">
import { defineComponent, PropType, computed, Ref } from '@vue/composition-api'
import { useSetupPlotlySeries } from '@/composables/plotly'
import { IPlotData, IPlotlyChart } from '@/@types/plotly'

export default defineComponent({
  props: {
    seriesData: { type: Object as PropType<Pick<IPlotData, 'values' | 'labels'>>, required: true },
  },
  /**
   * Do not destructure context or you'll lose reactivity. This is a bug in the composition API plugin.
   * See https://github.com/vuejs/composition-api/issues/264
   */
  setup(props, context) {
    const series = computed(() => ({
      values: props.seriesData.values,
      labels: props.seriesData.labels,
      ...context.attrs,
      type: 'pie',
    })) as Ref<IPlotData>

    useSetupPlotlySeries(series, context.parent as Vue & IPlotlyChart)
  },
  render(h) {
    return h()
  },
})
</script>
