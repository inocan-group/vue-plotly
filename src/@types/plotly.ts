import { PlotData, Legend, Axis, Slider } from 'plotly.js-dist'

export type IPlotData = Partial<PlotData>

export interface IPlotlyChart {
  plotData: IPlotData[]
  addSeries: (series: IPlotData) => void
  deleteSeries: (index: number) => void
  updateSeries: (index: number, newSeries: IPlotData) => void
  legend: Partial<Legend> | null
  xAxes: Partial<Axis>[]
  yAxes: Partial<Axis>[]
  // TODO: Type needs shimming because of missing type definition in DefinitelyTyped package
  buttons: any[]
  sliders: Partial<Slider>[]
}
