<script lang="ts">
import { defineComponent, watch, onMounted } from '@vue/composition-api'
import { IPlotlyChart } from '@/@types/plotly'

export default defineComponent({
  props: {},
  setup(props, context) {
    const buttonsArray = (context.parent as Vue & IPlotlyChart).buttons
    const index = buttonsArray.length

    onMounted(() => {
      watch(
        () => context.attrs,
        (newAttrs, _, onInvalidate) => {
          buttonsArray.push({ ...context.attrs })

          onInvalidate(() => {
            buttonsArray.splice(index, 1)
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
