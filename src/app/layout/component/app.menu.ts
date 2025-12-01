import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'] }]
            },
            {
                label: 'Parametrizacion',
                items: [
                    {
                        label: 'Inventario',
                        icon: 'pi pi-fw  pi-box',
                        items: [
                            {
                                label: 'Bodegas',
                                icon: 'pi pi-warehouse',
                                routerLink: ['/pages/parametrizacion/bodegas']
                            },
                            {
                                label: 'Categorias',
                                icon: 'pi pi-sitemap',
                                routerLink: ['/pages/parametrizacion/categorias']
                            },
                            {
                                label: 'Lineas',
                                icon: 'pi pi-sliders-v',
                                routerLink: ['/pages/parametrizacion/lineas']
                            },
                            {
                                label: 'Marcas',
                                icon: 'pi pi-tag',
                                routerLink: ['/pages/parametrizacion/marcas']
                            },
                            {
                                label: 'Productos',
                                icon: 'pi pi-box',
                                routerLink: ['/pages/parametrizacion/productos']
                            },
                            {
                                label: 'Unidades',
                                icon: 'pi pi-calculator',
                                routerLink: ['/pages/parametrizacion/unidades']
                            }
                        ]
                    },
                    {
                        label: 'Comercial',
                        icon: 'pi pi-briefcase',
                        items: [
                            {
                                label: 'Vendedores',
                                icon: 'pi pi-phone',
                                routerLink: ['/pages/parametrizacion/vendedores']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-face-smile',
                                routerLink: ['/pages/parametrizacion/clientes']
                            },
                            {
                                label: 'Recaudadores',
                                icon: 'pi pi-money-bill',
                                routerLink: ['/pages/parametrizacion/recaudadores']
                            },
                            {
                                label: 'Formas de pagos',
                                icon: 'pi pi-credit-card',
                                routerLink: ['/pages/parametrizacion/formasPagos']
                            },
                            {
                                label: 'Tipos de negocios',
                                icon: 'pi pi-building',
                                routerLink: ['/pages/parametrizacion/tiposNegocios']
                            },
                            {
                                label: 'Transportes',
                                icon: 'pi pi-truck',
                                routerLink: ['/pages/parametrizacion/transportes']
                            }
                        ]
                    },
                    {
                        label: 'Configuración ubicación',
                        icon: 'pi pi-map-marker',
                        items: [
                            {
                                label: 'País',
                                icon: 'pi pi-globe',
                                routerLink: ['/pages/parametrizacion/pais']
                            },
                            {
                                label: 'Provincia',
                                icon: 'pi pi-map',
                                routerLink: ['/pages/parametrizacion/provincia']
                            },
                            {
                                label: 'Ciudad',
                                icon: 'pi pi-home',
                                routerLink: ['/pages/parametrizacion/ciudad']
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Gestión Comercial',
                items: [
                    {
                        label: 'Pedidos',
                        icon: 'pi pi-shopping-cart',
                        routerLink: ['/pages/pedidos']
                    },
                    {
                        label: 'Facturas',
                        icon: 'pi pi-file',
                        routerLink: ['']
                    },
                    {
                        label: 'Cobranzas',
                        icon: 'pi pi-wallet',
                        routerLink: ['']
                    }
                ]
            },
            {
                label: 'Importación',
                items: [
                    {
                        label: ''
                    }
                ]
            },
            {
                label: 'Extras',
                items: [{
                    label: 'Portal R.H.',
                    icon: 'pi pi-users'
                }]
            }
        ];
    }
}
