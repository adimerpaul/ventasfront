<template>
  <div class="q-pa-md">
    <q-btn label="Agregar Usuario" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert" >
      <q-card style="width:50%">
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
              v-model="dato.name"
              type="text"
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.email"
              type="email"
              label="Email"
              hint="Ingresar email"
              lazy-rules
              :rules="[ val => valemail(val)  || 'Por favor ingresa email']"
            />
            <q-input
              filled
              v-model="dato.password"
              label="Password"
              type="password"
              hint="Ingresar password"
              lazy-rules
              :rules="[ val => val.length > 8 || 'Ingrese password']"
            />
            
            <q-input
              filled
              v-model="verifica"
              label="Verificacion password"
              type="password"
              hint="Ingresar password"
              lazy-rules
              :rules="[ val => val==dato.password || 'No es igual']"
            />
            <h5>Permisos</h5>
            <div>
                    <q-option-group
                    :options="options"
                    type="checkbox"
                    v-model="dato.group"
                    ></q-option-group>
            </div>


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
      title="Usuarios"
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
              v-model="dato2.name"
              type="text"
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.email"
              type="email"
              label="Email"
              hint="Ingresar email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            
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
const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
export default {
  data () {
    return {
      alert: false,
      dialog_mod:false,
      dialog_del:false,
      name: null,
      age: null,
      accept: false,
      dato:{group:[]},
      permiso:{},
      dato2:{},
      verifica:'',
      options:[],
      props:[],
      group:[],
      columns: [
        {
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
      ],
      data: [
      ]
    }
  },
  created() {
    this.misdatos();
    this.mispermisos();
  },
  methods:{
    misdatos(){
      this.$q.loading.show();
      this.$axios.post(process.env.URL+'/listuser').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },
    mispermisos(){
        this.dato.group=[];
        this.$axios.get(process.env.URL+'/permiso').then(res=>{
            //this.permiso=res.data;
            console.log(res.data);
            res.data.forEach(row => {
                this.options.push({label:row.nombre,value:row.id});
            });
        })
        console.log(this.options);
    },
    valemail(em){
        return emailPattern.test(em);
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
        console.log(this.dato);
      this.$axios.post(process.env.URL+'/register', this.dato).then(res=>{
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
        this.$axios.put(process.env.URL+'/user/'+this.dato2.id,this.dato2).then(res=>{
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
