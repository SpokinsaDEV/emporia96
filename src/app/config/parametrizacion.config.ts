export const PARAMETRIZATION_CONFIG: { [key: string]: {
    title: string;
    endpoint: string;
    createpoint: string;
    readpoint: string;
    updatepoint: string;
    deletepoint: string;
    columns: {
        field: string;
        header: string;
    }[];
    dialog: {
        label: string;
        key: string;
        type: string;
        required: boolean;
        optionsEndPoint?: string;
        optionLabelKey?: string;
        optionValueKey?: string;
    }[];
} } = {
    bodegas: {
        title: 'Bodegas',
        endpoint: '/Bodega/getallBodega',
        createpoint : '/Bodega/createBodega',
        readpoint: '/Bodega/getBodega',
        updatepoint: '/Bodega/updateBodega',
        deletepoint: '/Bodega/deleteBodega',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'sucursal', header: 'Sucursal' },
            { field: 'estado', header: 'Estado' }
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Nombre', key: 'nombre', type: 'text', required: false },
            { label: 'Sucursal', key: 'sucursal', type: 'text', required: false },
            { label: 'Estado', key: 'estado', type: 'text', required: false },
        ],
    },
    categorias: {
        title: 'Categorías',
        endpoint: '/Categoria/getallCategoria',
        createpoint : '/Categoria/createCategoria',
        readpoint: '/Categoria/getCategoria',
        updatepoint: '/Categoria/updateCategoria',
        deletepoint: '/Categoria/deleteCategoria',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' }
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Descripción', key: 'descripcion', type: 'text', required: false },
            { label: 'Estado', key: 'estado', type: 'text', required: false },
        ],
    },
    lineas: {
        title: 'Líneas',
        endpoint: '/Familia/getallFamilia',
        createpoint : '/Familia/createFamilia',
        readpoint: '/Familia/getFamilia',
        updatepoint: '/Familia/updateFamilia',
        deletepoint: '/Familia/deleteFamilia',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
            { field: 'categoriaDescripcion', header: 'Categoría' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Descripción', key: 'descripcion', type: 'text', required: false },
            { label: 'Estado', key: 'estado', type: 'text', required: false },
            { label: 'Categoría', key: 'categoriaId', type: 'select', optionLabelKey: 'descripcion', optionValueKey: 'id', required: false },
        ],
    },
    marcas: {
        title: 'Marcas',
        endpoint: '/Marca/getallMarca',
        createpoint : '/Marca/createMarca',
        readpoint: '/Marca/getMarca',
        updatepoint: '/Marca/updateMarca',
        deletepoint: '/Marca/deleteMarca',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Descripción', key: 'descripcion', type: 'text', required: false },
            { label: 'Estado', key: 'estado', type: 'text', required: false },
        ],
    },
    productos: {
        title: 'Productos',
        endpoint: '/Producto/getallProduct',
        createpoint : '/Producto/createProduct',
        readpoint: '/Producto/getProduct',
        updatepoint: '/Producto/updateProduct',
        deletepoint: '/Producto/deleteProduct',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'stockTotal', header: 'Stock Total' },
            { field: 'precio', header: 'Precio' },
        ],
        dialog: [
            { label: 'Imagen', key: '', type: 'image', required: false },
            { label: 'Código', key: '', type: 'text', required: false },
            { label: 'Descripción', key: '', type: 'text', required: false },
            { label: 'Precio', key: '', type: '', required: false },
            { label: 'Stock', key: '', type: '', required: false },
            { label: 'Ubicación', key: '', type: 'text', required: false },
            { label: 'Unidad', key: '', type: 'select', required: false },
            { label: 'Línea', key: '', type: 'select', required: false },
            { label: 'Categoría', key: '', type: 'select', required: false },
            { label: 'Marca', key: '', type: 'select', required: false },
        ],
    },
    unidades: {
        title: 'Unidades',
        endpoint: '/Unidad/getallUnidad',
        createpoint : '/Unidad/createUnidad',
        readpoint: '/Unidad/getUnidad',
        updatepoint: '/Unidad/updateUnidad',
        deletepoint: '/Unidad/deleteUnidad',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Descripción', key: 'descripcion', type: 'text', required: false },
            { label: 'Estado', key: 'estado', type: 'text', required: false },
        ],
    },
    vendedores: {
        title: 'Vendedores',
        endpoint: '/Vendedor/getAllVendedores',
        createpoint : '/Vendedor/createVendedor',
        readpoint: '/Vendedor/getVendedor',
        updatepoint: '/Vendedor/updateVendedor',
        deletepoint: '/Vendedor/deleteVendedor',
        columns: [
            { field: 'nombres', header: 'Nombres' },
            { field: 'direccionDomicilio', header: 'Dirección' },
            { field: 'provinciaVenta', header: 'Provincia Venta' },
            { field: 'porcentajeComision', header: '% Comisión' },
        ],
        dialog: [
            { label: 'Nombres', key: 'nombres', type: 'text', required: false },
            { label: 'Dirección', key: 'direccionDomicilio', type: 'text', required: false },
            { label: 'Provincia', key: 'provinciaVenta', type: 'text', required: false },
            { label: 'Porcentaje comisión', key: 'porcentajeComision', type: 'text', required: false },
        ],
    },
    clientes: {
        title: 'Clientes',
        endpoint: '/Cliente/getAllClientes',
        createpoint : '/Cliente/createCliente',
        readpoint: '/Cliente/getCliente',
        updatepoint: '/Cliente/updateCliente',
        deletepoint: '/Cliente/deleteCliente',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'razonSocial', header: 'Razón Social' },
            { field: 'identificacion', header: 'RUC/C.I.' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'correo', header: 'Correo' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Razón social', key: 'razonSocial', type: 'text', required: false },
            { label: 'RUC/C.I.', key: 'identificacion', type: 'text', required: false },
            { label: 'Dirección', key: 'direccion', type: 'text', required: false },
            { label: 'Correo', key: 'correo', type: 'text', required: false },
            { label: 'Vendedor', key: 'vendedorId', type: 'select', optionLabelKey: 'nombres', optionValueKey: 'id', required: false },
        ],
    },
    recaudadores: {
        title: 'Recaudadores',
        endpoint: '/Recaudador/getAllRecaudadores',
        createpoint : '/Recaudador/createRecaudador',
        readpoint: '/Recaudador/getRecaudador',
        updatepoint: '/Recaudador/updateRecaudador',
        deletepoint: '/Recaudador/deleteRecaudador',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'nombre', header: 'Nombre' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Nombre', key: 'nombre', type: 'text', required: false },
        ],
    },
    formasPagos: {
        title: 'Formas de Pagos',
        endpoint: '/FormaPago/getAllFormaPagos',
        createpoint : '/FormaPago/createFormaPago',
        readpoint: '/FormaPago/getFormaPago',
        updatepoint: '/FormaPago/updateFormaPago',
        deletepoint: '/FormaPago/deleteFormaPago',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Descripción', key: 'descripcion', type: 'text', required: false },
        ],
    },
    tiposNegocios: {
        title: 'Tipos de Negocios',
        endpoint: '/TipoNegocio/getAllTipoNegocios',
        createpoint : '/TipoNegocio/createTipoNegocio',
        readpoint: '/TipoNegocio/getTipoNegocio',
        updatepoint: '/TipoNegocio/updateTipoNegocio',
        deletepoint: '/TipoNegocio/deleteTipoNegocio',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Descripción', key: 'descripcion', type: 'text', required: false },
        ],
    },
    transportes: {
        title: 'Transportes',
        endpoint: '/Transporte/getAllTransportes',
        createpoint : '/Transporte/createTransporte',
        readpoint: '/Transporte/getTransporte',
        updatepoint: '/Transporte/updateTransporte',
        deletepoint: '/Transporte/deleteTransporte',
        columns: [
            { field: 'codigo', header: 'Código' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'identificacion', header: 'Identifación' },
            { field: 'direccion', header: 'Dirección' },
        ],
        dialog: [
            { label: 'Código', key: 'codigo', type: 'text', required: false },
            { label: 'Nombre', key: 'nombre', type: 'text', required: false },
            { label: 'Cédula', key: 'identificacion', type: 'text', required: false },
            { label: 'Dirección', key: 'direccion', type: 'text', required: false },
        ],
    },
}
