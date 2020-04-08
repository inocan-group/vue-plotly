import PlotlyChart from './PlotlyChart.vue'
import PlotlySeries from './Series/PlotlySeries.vue'
import PlotlyBarSeries from './Series/PlotlyBarSeries.vue'
import PlotlyPieSeries from './Series/PlotlyPieSeries.vue'
import PlotlyScatterSeries from './Series/PlotlyScatterSeries.vue'
import PlotlyLineSeries from './Series/PlotlyLineSeries.vue'
import PlotlyLegend from './PlotlyLegend.vue'
import PlotlyButton from './PlotlyButton.vue'
import PlotlySlider from './PlotlySlider.vue'
import PlotlyAxis from './Axes/PlotlyAxis.vue'
import PlotlyLinearAxis from './Axes/PlotlyLinearAxis.vue'
import { withKnobs, object, text, select } from '@storybook/addon-knobs'

const SERIES_1 = 'Series 1'
const SERIES_2 = 'Series 2'

export default { title: 'plotly/PlotlyChart', decorators: [withKnobs] }

export const genericSeries = () => ({
  components: { PlotlyChart, PlotlySeries },
  props: {
    series: {
      default: object('series', {
        type: 'sunburst',
        labels: ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'],
        parents: ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'],
        values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
        outsidetextfont: { size: 20, color: '#377eb8' },
        leaf: { opacity: 0.4 },
        marker: { line: { width: 2 } },
      }),
    },
  },
  data() {
    return {
      layout: {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        width: 500,
        height: 500,
      },
    }
  },
  template: `
  <plotly-chart :layout="layout">
    <plotly-series :series="series" />
  </plotly-chart>
  `,
})

export const bar = () => ({
  components: { PlotlyChart, PlotlyBarSeries, PlotlyLegend, PlotlyAxis },
  data() {
    return {
      show: true,
    }
  },
  props: {
    series1: {
      default: object(
        'seriesData',
        {
          x: ['giraffes', 'orangutans', 'monkeys'],
          y: [20, 14, 23],
        },
        SERIES_1,
      ),
    },
    name1: {
      default: text('name', 'SF Zoo', SERIES_1),
    },
    series2: {
      default: object(
        'seriesData',
        {
          x: ['giraffes', 'orangutans', 'monkeys'],
          y: [12, 18, 29],
        },
        SERIES_2,
      ),
    },
    name2: {
      default: text('name2', 'LA Zoo', SERIES_2),
    },
  },
  template: `
  <plotly-chart>
    <plotly-legend bgcolor="#333" />
    <plotly-axis dimension="x" title="animals" :fixedrange="true" />
    <plotly-axis dimension="y" title="population" ticks="outside" />
    <plotly-bar-series :series-data="series1" :name="name1" :showlegend="false" />
    <plotly-bar-series v-if="show" :series-data="series2" :name="name2" />
  </plotly-chart>
  `,
  created() {
    document.onkeydown = e => {
      if (e.key === ' ') {
        this.show = !this.show
      }
    }
  },
})

export const pie = () => ({
  components: { PlotlyChart, PlotlyPieSeries },
  data() {
    return {
      show: true,
    }
  },
  props: {
    seriesData: {
      default: object('seriesData', {
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
      }),
    },
  },
  template: `
  <plotly-chart>
    <plotly-pie-series v-if="show" :series-data="seriesData" />
  </plotly-chart>
  `,
  created() {
    document.onkeydown = e => {
      if (e.key === ' ') {
        this.show = !this.show
      }
    }
  },
})

export const line = () => ({
  components: { PlotlyChart, PlotlyLineSeries },
  data() {
    return {
      show: true,
    }
  },
  props: {
    series1: {
      default: object(
        'seriesData',
        {
          x: [2, 3, 4, 5],
          y: [16, 5, 11, 9],
        },
        SERIES_1,
      ),
    },
    mode1: {
      default: text('mode', 'lines', SERIES_1),
    },
    series2: {
      default: object(
        'seriesData',
        {
          x: [1, 2, 3, 4],
          y: [12, 9, 15, 12],
        },
        SERIES_2,
      ),
    },
    mode2: {
      default: text('mode', 'lines', SERIES_2),
    },
  },
  template: `
  <plotly-chart>
    <plotly-line-series v-if="show" :series-data="series1" :mode="mode1" />
    <plotly-line-series :series-data="series2" :mode="mode2" />
  </plotly-chart>
  `,
  created() {
    document.onkeydown = e => {
      if (e.key === ' ') {
        this.show = !this.show
      }
    }
  },
})

export const scatter = () => ({
  components: { PlotlyChart, PlotlyScatterSeries },
  props: {
    layout: {
      default: object(
        'layout',
        {
          xaxis: {
            range: [0.75, 5.25],
          },
          yaxis: {
            range: [0, 8],
          },
          legend: {
            y: 0.5,
            yref: 'paper',
            font: {
              family: 'Arial, sans-serif',
              size: 20,
              color: 'grey',
            },
          },
          title: 'Data Labels on the Plot',
        },
        'Layout',
      ),
    },
    series1: {
      default: object(
        'seriesData',
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 6, 3, 6, 1],
        },
        SERIES_1,
      ),
    },
    mode1: {
      default: text('mode', 'text+markers', SERIES_1),
    },
    name1: {
      default: text('name', 'Team A', SERIES_1),
    },
    text1: {
      default: object('text', ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'], SERIES_1),
    },
    textposition1: {
      default: text('textposition', 'top center', SERIES_1),
    },
    textfont1: {
      default: object(
        'textfont',
        {
          family: 'Raleway, sans-serif',
        },
        SERIES_1,
      ),
    },
    marker1: {
      default: object('marker', { size: 12 }, SERIES_1),
    },
    series2: {
      default: object(
        'seriesData',
        {
          x: [1.5, 2.5, 3.5, 4.5, 5.5],
          y: [4, 1, 7, 1, 4],
        },
        SERIES_2,
      ),
    },
    mode2: {
      default: text('mode', 'text+markers', SERIES_2),
    },
    name2: {
      default: text('name', 'Team B', SERIES_2),
    },
    text2: {
      default: object('text', ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'], SERIES_2),
    },
    textposition2: {
      default: text('textposition', 'bottom center', SERIES_2),
    },
    textfont2: {
      default: object(
        'textfont',
        {
          family: 'Times New Roman',
        },
        SERIES_2,
      ),
    },
    marker2: {
      default: object('marker', { size: 12 }, SERIES_2),
    },
  },
  template: `
  <plotly-chart :layout="layout">
    <plotly-scatter-series :series-data="series1"
    :mode="mode1"
    :name="name1"
    :text="text1"
    :textposition="textposition1"
    :textfont="textfont1"
    :marker="marker1" />
    <plotly-scatter-series :series-data="series2"
    :mode="mode2"
    :name="name2"
    :text="text2"
    :textposition="textposition2"
    :textfont="textfont2"
    :marker="marker2" />
  </plotly-chart>
  `,
})

export const multipleYAxes = () => ({
  components: { PlotlyChart, PlotlyLineSeries, PlotlyAxis, PlotlyLinearAxis },
  data() {
    return {
      series1: {
        x: [1, 2, 3],
        y: [40, 55, 60],
      },
      series2: {
        x: [2, 3, 4],
        y: [4, 5, 6],
      },
    }
  },
  template: `
  <plotly-chart>
    <plotly-axis dimension="y" title="yaxis title" />
    <plotly-linear-axis
    dimension="y"
    title="yaxis2 title"
    :titlefont="{color: 'rgb(148, 103, 189)'}"
    side="right"
    overlaying="y"
    />
    <plotly-line-series :series-data="series1" yaxis="y2" />
    <plotly-line-series :series-data="series2" />
  </plotly-chart>
  `,
})

export const events = () => ({
  components: { PlotlyChart, PlotlyScatterSeries },
  props: {
    event: {
      default: select(
        'event',
        {
          click: 'click',
          doubleclick: 'doubleclick',
          hover: 'hover',
          unhover: 'unhover',
          selected: 'selected',
          deselect: 'deselect',
          relayout: 'relayout',
        },
        'click',
      ),
    },
    callback: {
      default: text(
        'callback',
        `
      function(data) {
        console.log('clicked!')
      }
      `,
      ),
    },
  },
  data() {
    return {
      seriesData: {
        x: [1, 2, 3, 4, 5],
        y: [10, 20, 30, 20, 10],
      },
    }
  },
  methods: {
    handleEvent(data) {
      eval(`(${this.callback})(data)`)
    },
  },
  template: `
  <plotly-chart v-on:[event]="handleEvent">
    <plotly-scatter-series :series-data="seriesData" />
  </plotly-chart>
  `,
})

events.story = {
  parameters: {
    knobs: { escapeHTML: false },
  },
}

export const slider = () => ({
  components: { PlotlyChart, PlotlyLineSeries, PlotlySlider },
  props: {
    sliderSteps: {
      default: object('steps', [
        {
          label: 'red',
          method: 'restyle',
          args: ['line.color', 'red'],
        },
        {
          label: 'green',
          method: 'restyle',
          args: ['line.color', 'green'],
        },
        {
          label: 'blue',
          method: 'restyle',
          args: ['line.color', 'blue'],
        },
      ]),
    },
  },
  data() {
    return {
      series: {
        x: [1, 2, 3],
        y: [2, 1, 3],
      },
      sliderCurrentValue: {
        xanchor: 'right',
        prefix: 'color: ',
        font: {
          color: '#888',
          size: 20,
        },
      },
    }
  },
  template: `
  <plotly-chart>
    <plotly-line-series :series-data="series" />
    <plotly-slider :pad="{t: 30}" :currentvalue="sliderCurrentValue" :steps="sliderSteps" />
  </plotly-chart>
  `,
})
