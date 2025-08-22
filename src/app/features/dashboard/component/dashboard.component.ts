import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartType } from '../enum/chart-type.enum';
import { LegendItem } from '../interface/legend-item';
import * as Chartist from 'chartist';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title: string = '';

  @Input()
  public subtitle: string = '';

  @Input()
  public chartClass: string = '';

  @Input()
  public chartType: ChartType = 0;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[] = [];

  @Input()
  public footerIconClass: string = '';

  @Input()
  public footerText: string = '';

  @Input()
  public legendItems: LegendItem[] = [];

  @Input()
  public withHr: boolean = false;

  public chartId: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public ngOnInit(): void {
    this.chartId = `chart-${DashboardComponent.currentId++}`;
  }

  public ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      switch (this.chartType) {
        case ChartType.Pie:
          new Chartist.PieChart(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
          break;
        case ChartType.Line:
          new Chartist.LineChart(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
          break;
        case ChartType.Bar:
          new Chartist.BarChart(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
          break;
      }
    }
  }
}
