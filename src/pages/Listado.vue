<template>
  <div class="q-pa-md">
      <q-form
      @submit.Enter.prevent="buscar"      
      >
      <div class="row" >
      <q-input
        filled
        type="date"
        v-model="fecha"
        label="Fecha de Venta"
        lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa la fecha']"
      />
      <q-btn label="Buscar" type="submit" color="primary" icon="search"/>
    </div>
      </q-form>
    <q-table
      title="Listado"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-opcion="props">
            <q-td :props="props">
              <q-btn dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn dense round flat color="red" @click="deleteRow(props)" icon="delete"></q-btn>
            </q-td>
          </template>

    </q-table>
    <q-dialog v-model="dialog_mod">
      <q-card>
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Modificar</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onMod"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato2.nombre"
              type="text"
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.descripcion"
              type="text"
              label="Descripcion"
              hint="Ingresar descripcion"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.precio"
              label="Precio"
              type="number"
              hint="Ingresar precio"
              lazy-rules
              :rules="[ val => val>0 && val < 500 || 'Por favor Valor']"
            />
            <q-select
              v-model="dato2.rubro_id"
              label="Rubro"
              :options="options"
              emit-value
            />

<!--            <q-input-->
<!--              filled-->
<!--              type="text"-->
<!--              v-model="dato2.color"-->
<!--              label="Ingresar color"-->
<!--              lazy-rules-->
<!--              :rules="[-->
<!--              val => val && val.length > 0 || 'Por favor ingresa datos',-->
<!--              // val => val > 0 && val < 100 || 'Please type a real age'-->
<!--              ]"-->
<!--            />-->

            <q-input
              filled
              type="text"
              v-model="dato2.imagen"
              label="Ingresar imagen"
              lazy-rules
              :rules="[
              val =>  val.length > 0 || 'Por favor ingresa datos',
              // val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            />

<!--            <q-toggle v-model="accept" label="I accept the license and terms" />-->

            <div>
              <q-btn label="Modificar" type="submit" color="positive" icon="add_circle"/>
<!--              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
<!--              <q-card-actions align="right">-->
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
<!--              </q-card-actions>-->
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_del" >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="clear" color="red" text-color="white" />
          <span class="q-ml-sm">Seguro de eliminar Registro.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Eliminar" color="deep-orange" @click="onDel"/>
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>

</template>

<script>
export default {
  data () {
    return {
      alert: false,
      dialog_mod:false,
      dialog_del:false,
      dato2:{},
      name: null,
      age: null,
      accept: false,
      fecha:'',
      dato:{},
      options:[],
      props:[],
      columns: [
        {
          name: 'sales.id',
          required: true,
          label: 'id',
          align: 'left',
          field: row => row.id,
          // format: val => `${val}`,
          sortable: true
        },  
        { name: 'nrocomprobante', align: 'center', label: 'NroComprobante', field: 'nrocomprobante', sortable: true },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
        { name: 'cliente', label: 'Cliente', field: row=> row.client.nombrerazon, sortable: true },
        { name: 'user', label: 'Usuario', field: row=> row.user.name, sortable: true },
        { name: 'total', label: 'Total', field: 'total', sortable: true },
        { name: 'tipo', label: 'tipo', field: 'tipo', sortable: true },
        { name: 'estado', label: 'estado', field: 'estado', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
      ],
      data: [
        // {
        //   nombre: 'Frozen Yogurt',
        //   color: 'red',
        //   imagen:'1.png'
        // }
      ]
    }
  },
  created() {
    
  },
  methods:{
    misdatos(){
      this.$q.loading.show();
      this.$axios.get(process.env.URL+'/product').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },
    buscar(){
        this.$axios.post(process.env.URL+'/listabuscar/'+this.fecha).then(res=>{
            console.log(res.data);
            this.data=res.data;
            // res.data.forEach(row => {
            //     this.options.push({label:row.nombre,value:row.id});
            // });
        })
    },
    editRow(producto){
        console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_mod=true;
    },
    deleteRow(producto){
        console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_del=true;

    },

    onSubmit () {
      this.$q.loading.show();

      this.$axios.post(process.env.URL+'/product', this.dato).then(res=>{
        console.log(res.data);
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Creado correctamente'
        });
        this.alert=false;
        this.misdatos();
      })


    },
    onMod(){
        this.$q.loading.show();
        this.$axios.put(process.env.URL+'/product/'+this.dato2.id,this.dato2).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Modificado correctamente'
        });
        this.dialog_mod=false;
        this.misdatos();})
    },
    onDel(){
        this.$q.loading.show();
        this.$axios.delete(process.env.URL+'/product/'+this.dato2.id).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Eliminado correctamente'
        });
        this.dialog_del=false;
        this.misdatos();})
    },



    onReset () {
      this.dato.nombre = null;
      this.dato.precio = 0.00;
      this.dato.rubro_id=1;
      this.dato.color = null;
      this.dato.imagen=null;
    }
  }
}
</script>
