<template>
<div class="q-pa-md">
    <h6>LIBRO DE IVA</h6>
        <q-form
            @submit.Enter.prevent="buscarlibro"  
        >
    <div class="row">

        <q-select
            label="Mes"
            v-model="fecha.mes"
            :options="options"

        />

        <q-input
            label="Anio"
            v-model="fecha.anio"
            type="number"
            min=1000
            max=9999
            lazy-rules
              :rules="[ val => val>1000 && val<9999 && val.length >=4 || 'Ingrese el anio']"

        />

        <q-btn 
        label="Generar"
        type="submit"
        color="primary"
        />
        </q-form>
    </div>
    <q-table
      title="Treats"
      :data="filas"
      :columns="columns"
      row-key="name"
    >
    </q-table>

</div>
</template>
<script>
    export default {
    data(){
        return{

            fecha:{},
            options:[{label:"Enero",value:'01'}, 
            {label:"Febrero",value:'02'},
            {label:"Marzo",value:'03'},
            {label:"Abril",value:'04'},
            {label:"Mayo",value:'05'},
            {label:"Junio",value:'06'},
            {label:"Julio",value:'07'},
            {label:"Agosto",value:'08'},
            {label:"septiembre",value:'09'},
            {label:"Octubre",value:'10'},
            {label:"Noviembre",value:'11'},
            {label:"Diciembre",value:'12'},
            ],
            filas:[],
            columns = [
  {
    
    name: 'index',
    label: 'No',
    field: 'index'
  },
  { name: 'fecha', align: 'center', label: 'FECHA', field: 'fecha', sortable: true },
  { name: 'N Factura', label: 'N FACTURA', field: 'N Factura', sortable: true },
  { name: 'N Autorizacion', label: 'N AUTORIZACION', field: 'N Autorizacion' },
  { name: 'Estado', label: 'ESTADO', field: 'estado' },
  { name: 'cinit', label: 'CI/NIT CLIENTE', field: 'cinit' },
  { name: 'nombrerazon', label: 'NOMBRE O RAZON SOCIAL', field: 'nombrerazon', sortable: true },
  { name: 'total', label: 'IMPORTE TOTAL DE VENTA', field: 'total', sortable: true },
  { name: 'ice', label: 'IMPORTE ICE/IEHD/TASAS', field: 'ice', sortable: true },
  { name: 'exenta', label: 'EXPORTACIONES OPERACIONES EXENTAS', field: 'exenta', sortable: true },
  { name: 'tasa', label: 'VENTAS GRAVADAS A TASA CERO', field: 'tasa', sortable: true },
  { name: 'total', label: 'SUB TOTAL', field: 'total', sortable: true },
  { name: 'rebaja', label: 'DESCUENTOS BONIFICACIONES Y REBAJAS OTORGADAS', field: 'rebaja', sortable: true },
  { name: 'total', label: 'IMPORTE BASE PARA DÉBITO FISCAL IVA', field: 'total', sortable: true },
  { name: 'fiscal', label: 'DÉBITO FISCAL IVA', field: 'fiscal', sortable: true },
  { name: 'codigocontrol', label: 'CÓDIGO DE CONTROL', field: 'codigocontrol', sortable: true }
]
        }
    },
        created() {
            //this.fecha.anio=date('Y'); 
    },
    methods:{

        buscarlibro(){
        // this.$axios.post(process.env.URL+'/libro',this.fecha).then(res=>{
        //     this.filas=res.data;   
        //     });
        },
 
    }
    }
    
</script>