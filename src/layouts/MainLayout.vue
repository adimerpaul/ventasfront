<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Ventas
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Opciones del sistema
        </q-item-label>
        <q-item
          clickable
          to="/"
          exact
        >
          <q-item-section
            avatar
          >
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Principal</q-item-label>
            <q-item-label caption>
              Pagina principal
            </q-item-label>
          </q-item-section>
        </q-item>



        <q-item
          clickable
          to="/dosage"
          exact>
          <q-item-section
            avatar
          >
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dosificacion</q-item-label>
            <q-item-label caption>
              Dosificacion Factura
            </q-item-label>
          </q-item-section>
        </q-item>

                <q-item
          clickable
          to="/secure"
          exact>
          <q-item-section
            avatar
          >
            <q-icon name="precision_manufacturing" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Rubros</q-item-label>
            <q-item-label caption>
              Rubros del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

                <q-item
          clickable
          to="/product"
          exact>
          <q-item-section
            avatar
          >
            <q-icon name="inventory_2" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Productos</q-item-label>
            <q-item-label caption>
              Productos del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-if="$store.getters.isLoggedIn"
          @click="logout"
        >
          <q-item-section
            avatar
          >
            <q-icon name="close" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label caption>
              Salir del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  methods:{
    logout: function () {
      // console.log('a');
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
