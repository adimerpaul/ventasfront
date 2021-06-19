<template>
  <div class="q-pa-md">
    <q-btn label="Crear Producto" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Crear</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato.nombre"
              type="text"
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.descripcion"
              type="text"
              label="Descripcion"
              hint="Ingresar descripcion"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.precio"
              label="Precio"
              type="number"
              hint="Ingresar precio"
              lazy-rules
              :rules="[ val => val>0 && val < 500 || 'Por favor Valor']"
            />
            <q-select
              v-model="dato.rubro_id"
              label="Rubro"
              :options="options"
              emit-value
            />

            <q-input
              filled
              type="text"
              v-model="dato.color"
              label="Ingresar color"
              lazy-rules
              :rules="[
              val => val && val.length > 0 || 'Por favor ingresa datos',
              // val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            />
            <q-input
              filled
              type="text"
              v-model="dato.imagen"
              label="Ingresar imagen"
              lazy-rules
              :rules="[
              val => val && val.length > 0 || 'Por favor ingresa datos',
              // val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            />

<!--            <q-toggle v-model="accept" label="I accept the license and terms" />-->

            <div>
              <q-btn label="Crear" type="submit" color="positive" icon="add_circle"/>
<!--              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
<!--              <q-card-actions align="right">-->
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
<!--              </q-card-actions>-->
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>
    <q-table
      title="Productos"
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
      name: null,
      age: null,
      accept: false,
      dato:{},
      dato2:{},
      options:[],
      props:[],
      columns: [
        {
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.nombre,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'precio', align: 'center', label: 'Precio', field: 'precio', sortable: true },
        //{ name: 'rubro.nombre', align: 'center', label: 'Rubro', field: 'rubro.nombre}', sortable: true },
        { name: 'imagen', align: 'center', label: 'Color', field: 'color', sortable: true },
        { name: 'color', label: 'Imagen', field: 'imagen', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
        // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        // { name: 'protein', label: 'Protein (g)', field: 'protein' },
        // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
    this.misdatos();
    this.misrubros();
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
    misrubros(){
        this.options=[];
        this.$axios.get(process.env.URL+'/rubro').then(res=>{
            res.data.forEach(row => {
                this.options.push({label:row.nombre,value:row.id});
            });
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
