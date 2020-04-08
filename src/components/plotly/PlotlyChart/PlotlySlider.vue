<script lang="ts">
import { defineComponent, watch, onMounted } from '@vue/composition-api'
import { IPlotlyChart } from '@/@types/plotly'

export default defineComponent({
  props: {},
  setup(props, context) {
    const slidersArray = (context.parent as Vue & IPlotlyChart).sliders
    const index = slidersArray.length

    onMounted(() => {
      watch(
        () => context.attrs,
        (newAttrs, _, onInvalidate) => {
          slidersArray.push({ ...context.attrs })

          onInvalidate(() => {
            slidersArray.splice(index, 1)
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
