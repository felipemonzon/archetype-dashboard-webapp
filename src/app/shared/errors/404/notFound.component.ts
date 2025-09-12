import { Component } from '@angular/core';

@Component({
  selector: 'app-notFound',
  standalone: false,
  templateUrl: './notFound.component.html',
  styles: ``
})
export class NotfoundComponent {
  code: number = 404;
  title: string = 'Página no encontrada';
  body: string = 'Lo sentimos, la página que buscas no existe o ha sido movida.';
  returnTest: string = 'Regresar a la página principal';
  buttonText: string = 'Ir a la página de inicio';
}
