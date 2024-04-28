import { Component } from '@angular/core';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.component.html',
  styleUrl: './administration-layout.component.css'
})
export class AdministrationLayoutComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Añadir', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search'},
    
  ]
}
