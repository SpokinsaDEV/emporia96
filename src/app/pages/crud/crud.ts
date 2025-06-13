import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PARAMETRIZATION_CONFIG } from '../../config/parametrizacion.config';
import { ActivatedRoute } from '@angular/router';
import { ParametrizacionService } from '../service/parametrizacion.service';
import { forkJoin } from 'rxjs';

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    styles: [`
        .uppercase {
            text-transform: uppercase;
        }
        `,
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Nuevo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Eliminar" icon="pi pi-trash" outlined (onClick)="deleteSelectedItems()" [disabled]="!selectedItems || !selectedItems.length" />
            </ng-template>

            <ng-template #end>
                <p-button label="Exportar" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="data"
            [rows]="10"
            [columns]="columns"
            [paginator]="true"
            [globalFilterFields]="['nombre', 'descripcion', 'nombres', 'razonSocial']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedItems"
            [rowHover]="true"
            dataKey="id"
            [currentPageReportTemplate]="'Mostrando {first} a {last} de {totalRecords} ' + title.toLocaleLowerCase()"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">{{ title }} </h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Buscar..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th *ngFor="let item of columns">{{ item.header }}</th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-itemData let-rowData>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="itemData" />
                    </td>
                    <td *ngFor="let item of columns">
                        <span class="uppercase">{{ rowData[item.field] }}</span>
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editItem(itemData)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteItem(itemData)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="itemDialog" [style]="{ width: '450px' }" [header]="title" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6" *ngIf="fields">
                    <div *ngFor="let item of fields">
                        <label class="block font-bold mb-3" [for]="item.key">{{ item.label }}</label>
                        <ng-container [ngSwitch]="item.type">
                            <input *ngSwitchCase="'text'"
                            [id]="item.key"
                            [(ngModel)]="itemData[item.key]"
                            [name]="item.key"
                            [required]="item.required"
                            pInputText
                            class="uppercase"
                            fluid />
                            <p-select *ngSwitchCase="'select'"
                            [options]="selectData"
                            [placeholder]="placeHolderDynamic"
                            [optionLabel]="item.optionLabelKey"
                            [optionValue]="item.optionValueKey"
                            [(ngModel)]="itemData[item.key]"
                            appendTo="body"
                            [required]="item.required"
                            class="uppercase"
                            fluid />
                            <img *ngSwitchCase="'image'"
                            [src]="'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg'"
                            class="block m-auto pb-4" />
                        </ng-container>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Guardar" icon="pi pi-check" (click)="saveItem()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, ConfirmationService]
})
export class Crud implements OnInit {
    itemDialog: boolean = false;
    selectedItems!: any[] | null;
    submitted: boolean = false;

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    section!: string;
    config: any;
    columns: any[] = [];
    data: any[] = [];
    selectData: any[] = [];
    itemData!: any;
    title: string = '';
    fields: any[] = [];
    placeHolderDynamic: string = '';

    constructor(
        private parametrizacionService: ParametrizacionService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.section = params['type'];
            this.config = PARAMETRIZATION_CONFIG[this.section];

            if (this.config) {
                this.columns = this.config.columns;
                this.fields = this.config.dialog;
                this.title = this.config.title;
                this.loadData();
            } else {
                console.error('Configuración no encontrada para la sección: ', this.section);
            }

            this.placeHolderDynamic = '';

            if (this.section === 'lineas') {
            this.placeHolderDynamic = 'Seleccione una categoría';
            this.parametrizacionService
            .getAll("/Categoria/getallCategoria")
            .subscribe((res) => this.selectData = res);
            }
            else if (this.section === 'clientes') {
                this.placeHolderDynamic = 'Seleccione un vendedor';
                this.parametrizacionService
                .getAll("/Vendedor/getallVendedores")
                .subscribe((res) => this.selectData = res);
            }
            else if (this.section === 'productos') {
                this.placeHolderDynamic = 'Seleccione una marca'; //seleccione una categoria seleccione una línea
                this.parametrizacionService
                .getAll("/Marca/getallMarca")
                .subscribe((res) => this.selectData = res);
            }
        });
    }

    loadData() {
        this.parametrizacionService
        .getAll(this.config.endpoint)
        .subscribe((response) => {
            this.data = response;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    // Abre el modal = dialog (PrimeNG)
    openNew() {
        this.itemData = {}; // instancia del objeto.
        this.submitted = false; // para validación en el modal.
        this.itemDialog = true; // abre el modal
    }

    editItem(item: any) {
        console.log(item)
        this.itemData = { ...item};
        this.itemDialog = true;
    }

    deleteSelectedItems() {
        this.confirmationService.confirm({
            message: '¿Estás seguro(a) de que desea elimiar lo seleccionado?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                // Iterar sobre los elementos seleccionados y eliminarlos del backend.
                const deleteRequests = this.selectedItems!.map((item) =>
                    this.parametrizacionService
                    .delete(this.config.deletepoint, item.id)
                );

                forkJoin(deleteRequests)
                .subscribe(() =>{
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Products Deleted',
                        life: 3000
                    });

                    this.loadData();
                    this.selectedItems = null;
                });
            }
        });
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    deleteItem(item: any) {
        this.confirmationService.confirm({
            message: 'Estás seguro(a) de eliminar: ' + item.descripcion + '?',
            header: 'Eliminar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.parametrizacionService
                .delete(this.config.deletepoint, item.id)
                .subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Item Deleted',
                        life: 3000
                    });

                    this.loadData();
                });
            }
        });
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products().length; i++) {
    //         if (this.products()[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveItem() {
        this.submitted = true;

        if (this.itemData.id) {
            // Actualizar el registro existente
            this.parametrizacionService
            .update(this.config.updatepoint, this.itemData, this.itemData.id)
            .subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Item updated successfully',
                    life: 3000,
                });

                this.loadData();
                this.itemDialog = false;
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to upate item',
                    life: 3000,
                });
            });
        } else {
            console.log(this.itemData);
            // Crear un nuevo registro
            this.parametrizacionService
            .create(this.config.createpoint, this.itemData)
            .subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Item saved successfully',
                    life: 3000,
                });

                this.loadData();
                this.itemDialog = false;
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to save item',
                    life: 3000,
                });
            });
        }
    }
}
