import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { ChartType } from '../dashboard/enum/chart-type.enum';
import * as Chartist from 'chartist';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    // Mock de Chartist para evitar errores de referencia en el entorno de prueba
    const ChartistMock = {
      Interpolation: {
        simple: () => {}
      }
    };

    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignora elementos desconocidos en las plantillas
    })
    // Se provee el mock de Chartist
    .overrideProvider(Chartist, { useValue: ChartistMock })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  it('should initialize chart data on ngOnInit', () => {
    // Verifica que el tipo de gráfico de correo se haya configurado como Pie
    expect(component.emailChartType).toEqual(ChartType.Pie);
    
    // Verifica que los datos del gráfico de correo se hayan configurado correctamente
    expect(component.emailChartData).toEqual({
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    });
    
    // Verifica que los elementos de la leyenda del gráfico de correo se hayan configurado
    expect(component.emailChartLegendItems.length).toBe(3);

    // Verifica que el tipo de gráfico de horas se haya configurado como Line
    expect(component.hoursChartType).toEqual(ChartType.Line);

    // Verifica que los datos del gráfico de horas se hayan configurado
    expect(component.hoursChartData.labels.length).toBe(8);
    expect(component.hoursChartData.series.length).toBe(3);

    // Verifica que el tipo de gráfico de actividad se haya configurado como Bar
    expect(component.activityChartType).toEqual(ChartType.Bar);

    // Verifica que los datos del gráfico de actividad se hayan configurado
    expect(component.activityChartData.labels.length).toBe(12);
    expect(component.activityChartData.series.length).toBe(2);
  });
});
