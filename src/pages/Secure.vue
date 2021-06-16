<template>
  <div class="q-pa-md">
    <q-btn label="Crear Rubro" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
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
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
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
      title="Rubros"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      alert: false,
      name: null,
      age: null,
      accept: false,
      dato:{},
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
        { name: 'imagen', align: 'center', label: 'Color', field: 'color', sortable: true },
        { name: 'color', label: 'Imagen', field: 'imagen', sortable: true },
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
  },
  methods:{
    misdatos(){
      this.$q.loading.show();
      this.$axios.get(process.env.URL+'/rubro').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },
    onSubmit () {
      this.$q.loading.show();
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'You need to accept the license and terms first'
      //   })
      // }
      // else {
      //   this.$q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'cloud_done',
      //     message: 'Submitted'
      //   })
      // }
      let nombre=this.dato.nombre;
      let imagen=this.dato.imagen;
      let color=this.dato.color;
      // console.log({nombre,imagen,color})
      // return false;
      this.$axios.post(process.env.URL+'/rubro', this.dato).then(res=>{
        console.log(res.data)
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Creado correctamente'
        });
        this.alert=false;
        this.misdatos();
      })
      //   .catch(err=>{
      //   this.alert=false;
      //     this.$q.notify({
      //       color: 'red-5',
      //       textColor: 'white',
      //       icon: 'warning',
      //       message: err.message
      //     })
      // })

    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
