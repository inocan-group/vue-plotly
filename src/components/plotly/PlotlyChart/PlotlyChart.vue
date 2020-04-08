<template>
  <div ref="chartdiv"><slot /></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, Ref, computed } from '@vue/composition-api'
import Plotly, { Layout, Legend, Axis, Config, PlotlyHTMLElement, Slider } from 'plotly.js-dist'
import { IPlotData } from '@/@types/plotly'

export default defineComponent({
  props: {
    layout: { type: Object as () => Partial<Layout>, default: () => ({ showlegend: false }) },
    config: Object as () => Partial<Config>,
  },
  setup(props, { emit }) {
    let isUnmounting = false
    const chartdiv = ref<HTMLElement>(null)
    const plotData: IPlotData[] = []
    const legend = ref<Partial<Legend>>(null)
    const xAxes = ref<Partial<Axis>[]>([])
    const yAxes = ref<Partial<Axis>[]>([])
    // TODO: Type needs shimming because of missing type definition in DefinitelyTyped package
    const buttons = ref([])
    const sliders = ref<Partial<Slider>[]>([])

    const eventsWithData = [
      'click',
      'legendclick',
      'legenddoubleclick',
      'hover',
      'unhover',
      'selecting',
      'selected',
      'restyle',
      'relayout',
      'clickannotation',
      'animatingframe',
      'sliderchange',
      'sliderend',
      'sliderstart',
      'beforeplot',
    ]

    const eventsWithoutData = [
      'doubleclick',
      'afterplot',
      'afterexport',
      'beforeexport',
      'autosize',
      'deselect',
      'redraw',
      'animated',
      'animationinterrupted',
      'transitioning',
      'transitioninterrupted',
    ]

    const plotLayout = computed(() => {
      let output: Partial<Layout> = { ...props.layout }
      if (legend.value) {
        output = { ...output, showlegend: true, legend: { ...legend.value } }
      }
      if (xAxes.value.length) {
        const [primary, ...rest] = xAxes.value
        output.xaxis = primary
        for (const i in rest) {
          const index = i + 2
          // Hacking the type here. In actuality it accepts any value of type 'xaxis' with a number >= 2 appended to it.
          output[`xaxis${+index}` as 'xaxis2'] = rest[i]
        }
      }
      if (yAxes.value.length) {
        const [primary, ...rest] = yAxes.value
        output.yaxis = primary
        for (const i in rest) {
          const index = i + 2
          // Hacking the type here. In actuality it accepts any value of type 'yaxis' with a number >= 2 appended to it.
          output[`yaxis${+index}` as 'yaxis2'] = rest[i]
        }
      }
      if (buttons.value.length) {
        output.updatemenus = { ...output.updatemenus, buttons: buttons.value }
      }
      if (sliders.value.length) {
        output.sliders = sliders.value
      }
      return output
    }) as Ref<Layout>

    function addSeries(series: IPlotData) {
      if (chartdiv.value) {
        Plotly.addTraces(chartdiv.value, series)
      } else {
        plotData.push(series)
      }
    }

    function deleteSeries(index: number) {
      if (chartdiv.value && !isUnmounting) {
        Plotly.deleteTraces(chartdiv.value, index)
      }
    }

    function updateSeries(index: number, newSeries: IPlotData) {
      plotData.splice(index, 1, newSeries)
      if (chartdiv.value) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (['bar', 'scatter'].includes(newSeries.type!)) {
          Plotly.animate(
            chartdiv.value as PlotlyHTMLElement,
            {
              data: plotData,
            },
            // TODO: make transition options configurable through props
            {
              transition: {
                duration: 300,
                easing: 'cubic-in-out',
              },
              frame: {
                duration: 300,
              },
            },
          )
        } else {
          Plotly.react(chartdiv.value, plotData, plotLayout.value, props.config)
        }
      }
    }

    onMounted(() => {
      Plotly.newPlot(chartdiv.value as PlotlyHTMLElement, plotData, plotLayout.value, props.config)

      // Enable listening to plotly events
      eventsWithData.forEach(eventName => {
        ;(chartdiv.value as PlotlyHTMLElement).on(`plotly_${eventName}` as any, data => emit(eventName, data))
      })

      eventsWithoutData.forEach(eventName => {
        ;(chartdiv.value as PlotlyHTMLElement).on(`plotly_${eventName}` as any, () => emit(eventName))
      })
    })

    onBeforeUnmount(() => {
      isUnmounting = true
      Plotly.purge(chartdiv.value as PlotlyHTMLElement)
    })

    return { chartdiv, plotData, addSeries, deleteSeries, updateSeries, legend, xAxes, yAxes, buttons, sliders }
  },
})
</script>
