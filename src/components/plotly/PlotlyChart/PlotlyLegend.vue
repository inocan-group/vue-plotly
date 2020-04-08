<script lang="ts">
import { defineComponent, watch, onMounted } from '@vue/composition-api'
import { IPlotlyChart } from '@/@types/plotly'

export default defineComponent({
  props: {},
  setup(_, context) {
    onMounted(() => {
      watch(
        () => context.attrs,
        (newAttrs, _, onInvalidate) => {
          ;(context.parent as Vue & IPlotlyChart).legend = newAttrs

          onInvalidate(() => {
            ;(context.parent as Vue & IPlotlyChart).legend = null
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
