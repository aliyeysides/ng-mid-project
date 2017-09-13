import {Component, Input} from '@angular/core';
import {ChartService} from '../../../services/chart.service';

@Component({
  selector: 'chart-profile',
  templateUrl: './chart-panel.component.html'
})

export class ChartPanelComponent {
  public classPanelId: string;
  @Input()
  set classId(id: string) {
    this.classPanelId = id;
  }

  constructor(private chartService: ChartService) {
  }

  @Input()
  set chartInit(data : any){
    /*
     For ALi understanding( chart for panel view )
     key points:- Need to notice  before draw chart.
     1. Make sure that xAxisData has string values and yAxisData has Int/Float values.
     2. length of  xAxisData and yAxisData data array has same length.
     3. Before draw chart make sure that div have width and height prperty(For the time i'm apply inline style).
     4. update hardCoded chart data describe in '_chartPanelData' variable with your
     particular symbol data.

     Change According to your requirement
     */
    setTimeout(() => {
      if (document.getElementById(this.classPanelId)){
        let ele = document.getElementById(this.classPanelId);
      }
      this.chartService.interactiveAreaChartControler.init({ data: data, id: this.classPanelId });
    }, 500);
  }
  sendData() {
    //Not using in code only for future use for ali
  }
}
