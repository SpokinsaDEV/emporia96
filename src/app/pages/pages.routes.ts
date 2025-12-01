import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Orders } from './orders/orders';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'parametrizacion/:type', component: Crud },
    { path: 'pedidos', component: Orders},
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
