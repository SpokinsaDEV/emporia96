export class Pedido {
  id?: number;
  cliente= '';
  direccion= '';
  ciudad= '';
  fecha?: Date;
  identificacion?: number;
  telefono?: number;
  transporte= '';
  empresa= '';
  vendedor= '';
  status= '';
  autorizado= '';
  observacion= '';
  despachoPor = '';
  embaladoPor = '';
  entregadoPor = '';
  fechaDespacho?: Date;
  fechaEmbalado?: Date;
  fechaEntrega?: Date;
  detalles?: DetallePedidos[];

  constructor(cliente: string, direccion: string, ciudad: string, obsevacion: string,
    empresa: string, vendedor: string, transporte: string, despachoPor: string,
    embaladoPor: string, entregadoPor: string,
    fecha?: Date, identificacion?: number, telefono?: number,
    fechaDespacho?: Date, fechaEmbalado?: Date, fechaEntrega?: Date, detalles?: DetallePedidos[]
  ){
    this.cliente = cliente;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.fecha = fecha;
    this.identificacion = identificacion;
    this.telefono = telefono;
    this.transporte = transporte;
    this.empresa = empresa;
    this.vendedor = vendedor;
    this.observacion = obsevacion;
    this.detalles = detalles;
    this.despachoPor = despachoPor;
    this.embaladoPor = embaladoPor;
    this.entregadoPor = entregadoPor;
    this.fechaDespacho = fechaDespacho;
    this.fechaEmbalado = fechaEmbalado;
    this.fechaEntrega = fechaEntrega;
  }
}

export interface DetallePedidos{
  id?: number;
  pedidosId?: number;
  cantidad?: number;
  codigo: string;
  detalle: string;
  valorUnitario?: number;
}
