import { Ref, watch, onBeforeUnmount } from '@vue/composition-api'
import { IPlotData, IPlotlyChart } from '@/@types/plotly'

export const useSetupPlotlySeries = (series: Ref<IPlotData>, parent: Vue & IPlotlyChart) => {
  const index = parent.plotData.length

  parent.addSeries(series.value)

  watch(
    series,
    newSeries => {
      // console.log('RUNNING WATCHER')
      parent.updateSeries(index, newSeries)
    },
    { lazy: true },
  )

  onBeforeUnmount(() => {
    parent.deleteSeries(index)
  })
}
