<script lang="ts">
import { defineComponent, watch, onMounted } from '@vue/composition-api'
import { IPlotlyChart } from '@/@types/plotly'
import { AxisType, Axis } from 'plotly.js-dist'

export default defineComponent({
  props: {
    dimension: {
      type: String,
      required: true,
      validator: (v: string) => ['x', 'y'].includes(v.toLowerCase()),
    },
    type: {
      type: String,
      default: '-',
    },
  },
  setup(props, context) {
    const d = props.dimension.toLowerCase()

    if (!['x', 'y'].includes(d)) return

    const parent = context.parent as Vue & IPlotlyChart
    let axesArray: Partial<Axis>[]

    // when the component is used directly
    if (parent[`${d}Axes` as 'xAxes' | 'yAxes']) {
      axesArray = parent[`${d}Axes` as 'xAxes' | 'yAxes']
      // when the component is used as a base for other axis types
    } else {
      axesArray = (parent?.$parent as Vue & IPlotlyChart)[`${d}Axes` as 'xAxes' | 'yAxes']
    }

    const index = axesArray.length

    onMounted(() => {
      watch(
        () => context.attrs,
        (newAttrs, _, onInvalidate) => {
          axesArray.push({ ...context.attrs, type: props.type as AxisType })

          onInvalidate(() => {
            axesArray.splice(index, 1)
          })
        },
      )
    })
  },
  render(h) {
    return h()
  },
})
</script>
