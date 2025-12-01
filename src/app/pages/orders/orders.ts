import { Component, OnInit } from "@angular/core";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { PedidosService } from "../service/pedidos.service";
import { CommonModule, formatDate } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SelectModule } from "primeng/select";
import { ParametrizacionService } from "../service/parametrizacion.service";
import { DetallePedidos, Pedido } from "../../models/pedido";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { Table } from "primeng/table";
import { TagModule } from "primeng/tag";

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [ ToolbarModule, ButtonModule, DialogModule,
        InputTextModule, TableModule, CommonModule,
        FormsModule, SelectModule, IconFieldModule,
        InputIconModule, TagModule

    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Nuevo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
            </ng-template>
            <ng-template #end>
                <p-button label="Exportar" icon="pi pi-upload" severity="secondary" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="pedido"
            [rows]="10"
            paginator="true"
            [tableStyle]="{ 'min-width': '75rem' }"
            [globalFilterFields]="['cliente', 'vendedor']"
            [rowHover]="true"
            dataKey="id"
            [currentPageReportTemplate]="'Mostrando {first} a {last} de {totalRecords} ' + 'pedidos'"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Pedidos</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" placeholder="Buscar..." (input)="onGlobalFilter(dt, $event)" />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem"><p-tableHeaderCheckbox /></th>
                    <th>Clientes</th>
                    <th>Fecha</th>
                    <th>Status</th>
                    <th>Ubicación</th>
                    <th>Vendedor</th>
                    <th>Autorizado</th>
                    <th>Observaciones</th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-data>
                <tr>
                    <td style="width: 3rem"><p-tableCheckbox [value]="data" /></td>
                    <td>{{ data.cliente }}</td>
                    <td>{{ data.fecha | date: 'dd-MM-yyyy' }}</td>
                    <td><p-tag [value]="data.status" [severity]="getSeverity(data.status)" /></td>
                    <td>{{ data.direccion }}</td>
                    <td>{{ data.vendedor }}</td>
                    <td>{{ data.autorizado }}</td>
                    <td>{{ data.observacion }}</td>
                    <td><p-button icon="pi pi-eye" [rounded]="true" [outlined]="true" (click)="verPedido(data)" /></td>
                </tr>
            </ng-template>
        </p-table>
        <!-- Modal nuevo pedido -->
        <p-dialog [(visible)]="itemDialog" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" [style]="{ width: '50vw' }"
        header="Pedidos" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Fecha:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.fecha" fluid readonly>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">R.U.C o C/I:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.identificacion" (blur)="verificarRuc()" fluid>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Cliente:</label>
                            <p-select [options]="clientes" [(ngModel)]="pedidoData.cliente"
                            placeholder="SELECCIONE UN CLIENTE" [editable]="true"
                            optionLabel="razonSocial" (onChange)="onClienteSeleccionado($event)" fluid />
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Teléfono:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.telefono" fluid>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Dirección:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.direccion" fluid>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Transporte:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.transporte" fluid>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Vendedor:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.vendedor" fluid>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Ciudad:</label>
                            <input type="text" pInputText [(ngModel)]="pedidoData.ciudad" fluid>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mt-4">
                    <div class="col-span-12">
                        <p-table [value]="pedidoDetalles" class="p-datatable-sm w-full" >
                        <ng-template pTemplate="header">
                            <tr>
                                <th>CANT.</th>
                                <th>COD.</th>
                                <th>DETALLE</th>
                                <th>V. UNITARIO</th>
                                <th></th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-producto let-rowIndex="rowIndex">
                            <tr class="align-middle">
                                <td>
                                    <input type="text" pInputText fluid [(ngModel)]="producto.cantidad" (ngModelChange)="actualizarCalculos()" class="w-full" />
                                </td>
                                <td><input type="text" pInputText fluid [(ngModel)]="producto.codigo" class="w-full" /></td>
                                <td><input type="text" pInputText fluid [(ngModel)]="producto.detalle" class="w-full" /></td>
                                <td>
                                    <input type="text" pInputText fluid [(ngModel)]="producto.valorUnitario" (ngModelChange)="actualizarCalculos()" class="w-full" />
                                </td>
                                <td class="flex items-center gap-2 justify-center">
                                    <p-button icon="pi pi-plus" (onClick)="agregarFila()" styleClass="p-button-sm p-button-success"></p-button>
                                    <p-button icon="pi pi-minus" (onClick)="eliminarFila(rowIndex)"
                                    *ngIf="pedidoDetalles.length > 1" styleClass="p-button-sm p-button-danger"></p-button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                    </div>
                    <div class="grid grid-cols-12 col-span-12 mt-4 gap-4">
                        <div class="col-span-0 text-right font-bold">
                            Subtotal:
                        </div>
                        <div class="col-span-10">
                            <input type="text" pInputText [value]="subtotal | currency: 'USD' : 'symbol'" readonly />
                        </div>
                        <div class="col-span-0"></div>
                        <div class="col-span-0 text-right font-bold">
                            IVA:
                        </div>
                        <div class="col-span-10">
                            <input type="text" pInputText [value]="iva | currency: 'USD' : 'symbol'" readonly />
                        </div>
                        <div class="col-span-0"></div>
                        <div class="col-span-0 text-right font-bold">
                            Total:
                        </div>
                        <div class="col-span-10">
                            <input type="text" pInputText [value]="total | currency:'USD' : 'symbol'" readonly />
                        </div>
                    </div>
                </div>
            </ng-template>
            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="itemDialog = false" />
                <p-button label="Guardar" icon="pi pi-check" />
            </ng-template>
        </p-dialog>
        <!-- Modal de detalle -->
        <p-dialog header="Detalle" [(visible)]="itemDetail" [modal]="true" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
        [style]="{ width: '50w' }">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Fecha:</label>
                            <p>{{ pedidoData.fecha }}</p>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">R.U.C o C/I:</label>
                            <p>{{ pedidoData.identificacion }}</p>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Cliente:</label>
                            <p>{{ pedidoData.cliente }}</p>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Teléfono:</label>
                            <p>{{ pedidoData.telefono }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Dirección:</label>
                            <p>{{ pedidoData.direccion }}</p>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Transporte:</label>
                            <p>{{ pedidoData.transporte }}</p>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Vendedor:</label>
                            <p>{{ pedidoData.vendedor }}</p>
                        </div>
                        <div class="col-span-3">
                            <label for="" class="block font-bold mb-3">Ciudad:</label>
                            <p>{{ pedidoData.ciudad }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-6">
                    <div class="col-span-12">
                        <p-table [value]="pedidoDetalles" class="p-datatable-sm w-full">
                            <ng-template pTemplate="header">
                                <tr>
                                <th>CANT.</th>
                                <th>COD.</th>
                                <th>DETALLE</th>
                                <th>V. UNITARIO</th>
                                <th></th>
                            </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-item>
                                <tr>
                                    <td>{{ item.cantidad }}</td>
                                    <td>{{ item.codigo }}</td>
                                    <td>{{ item.detalle }}</td>
                                    <td>{{ item.valorUnitario }}</td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                    <div class="grid grid-cols-12 col-span-12 mt-4 gap-4">
                        <div class="col-span-0 text-right font-bold">
                            Subtotal:
                        </div>
                        <div class="col-span-10">
                            <input type="text" pInputText [value]="subtotal | currency: 'USD' : 'symbol'" readonly />
                        </div>
                        <div class="col-span-0"></div>
                        <div class="col-span-0 text-right font-bold">
                            IVA:
                        </div>
                        <div class="col-span-10">
                            <input type="text" pInputText [value]="iva | currency: 'USD' : 'symbol'" readonly />
                        </div>
                        <div class="col-span-0"></div>
                        <div class="col-span-0 text-right font-bold">
                            Total:
                        </div>
                        <div class="col-span-10">
                            <input type="text" pInputText [value]="total | currency:'USD' : 'symbol'" readonly />
                        </div>
                    </div>
                </div>
            </ng-template>
            <ng-template #footer>
                <p-button label="Rechazar" icon="pi pi-times" />
                <p-button label="Aprobar" icon="pi pi-check" />
            </ng-template>
        </p-dialog>
    `,
    providers: []
})
export class Orders implements OnInit {
    // modal
    itemDialog: boolean = false;
    itemDetail: boolean = false;
    // data
    pedido: Pedido[] = [];
    pedidoData: Pedido = new Pedido('','','','','','','','','','', new Date(),0,0, new Date(), new Date(), new Date(),[]);
    pedidoDetalles: any[] = [
        {
            cantidad: 0,
            codigo: '',
            detalle: '',
            valorUnitario: 0,
        },
    ];
    clientes: any[] | undefined;
    //pedido data
    subtotal: number = 0;
    iva: number = 0;
    total: number = 0;
    ivaRate = 0.15;

    constructor(private pedidoService: PedidosService, private parametrizacion: ParametrizacionService){}

    ngOnInit(): void {
        this.loadClientes();
        this.loadPedidos();
    }

    loadClientes(){
        this.parametrizacion
        .getAll('/Cliente/getAllClientes')
        .subscribe((result) => {
            this.clientes = result;
        });
    }
    loadPedidos(){
        this.parametrizacion
        .getAll('/Pedido/getAllPedido')
        .subscribe((result) => {
            this.pedido = result;
        });
    }

    rellenarCampos(cliente: any){
        this.pedidoData.identificacion = cliente.identificacion;
        this.pedidoData.telefono = cliente.telefono;
        this.pedidoData.direccion = cliente.direccion;
        this.pedidoData.cliente = cliente.nombre;
    }

    verificarRuc(){
        const cliente = this.clientes?.find((c) => c.identificacion === this.pedidoData.identificacion);
        if (cliente) {
            this.rellenarCampos(cliente);
        }else{
            this.vaciarCampos();
        }
    }

    onClienteSeleccionado(event: any){
        const clienteSeleccionado = this.clientes?.find((c) => c.id === event.value.id);
        if (clienteSeleccionado) {
            this.rellenarCampos(clienteSeleccionado);
        }
    }

    vaciarCampos(){
        this.pedidoData.cliente = '';
        this.pedidoData.telefono = 0;
        this.pedidoData.direccion = '';
    }

    agregarFila(){
        this.pedidoDetalles.push({
            cantidad: 0,
            codigo: '',
            detalle: '',
            valorUnitario: 0
        });
    }

    eliminarFila(index: number){
        this.pedidoDetalles.splice(index, 1);
        this.actualizarCalculos();
    }

    actualizarCalculos(){
        this.subtotal = this.pedidoDetalles.reduce(
            (total, item) => total + (item.cantidad * item.valorUnitario), 0
        );
        this.iva = this.subtotal * this.ivaRate;
        this.total = this.subtotal + this.iva;
    }

    getSeverity(valor: string){
        switch (valor) {
            case 'Enviado':
                return 'secondary';
            case 'Despachado':
                return 'info';
            case 'Facturado':
                return 'warn';
            case 'Entregado':
                return 'success';
            case 'Embalado':
                return 'contrast';
            case 'Anulado':
                return 'danger';
            default:
                return 'primary';
        }
    }

    onGlobalFilter(table: Table, event: Event){
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew(){
        this.itemDialog = true;
        this.pedidoData = new Pedido('','','','','','','','','','', new Date(),0,0, new Date(), new Date(), new Date(),[]);
        this.pedidoDetalles = [{ cantidad: 0, codigo: '', detalle: '', valorUnitario: 0, },];
        this.subtotal = 0;
        this.iva = 0;
        this.total = 0;
    }

    verPedido(data: any){
        this.itemDetail = true;
        this.pedidoData = data;
        this.pedidoDetalles = data.detalles;
        this.actualizarCalculos();
        console.log(data);
    }

    formatFecha(fecha: Date){
        return formatDate(fecha, 'dd/MM/yyyy', 'en-US');
    }
}
