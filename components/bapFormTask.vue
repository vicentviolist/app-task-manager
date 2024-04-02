<template>
  <v-dialog v-model="show" scrollable width="auto" persistent>
    <v-card>
      <!-- Textos dinamicos dependiendo si es edición o creación -->
      <v-card-title>{{ !isEdit ? "Create task" : "Edit task" }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 400px">
        <v-form v-model="valid" ref="formTask" @submit="createTasks">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filterData.title"
                  :rules="rulesRequired"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filterData.description"
                  label="Description"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filterData.due_date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filterData.due_date"
                    no-title
                    scrollable
                    @change="menu = false"
                  >
                    <v-spacer></v-spacer>
                    <!-- Cerramos menú del selector de fechas -->
                    <v-btn text color="primary darken-2" @click="menu = false">
                      Cancel
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filterData.tags"
                  label="Tags"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="filterData.is_completed"
                  label="Completed"
                  required
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="filterData.comments"
                  label="Comments"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions class="d-flex justify-space-between">
        <div>
          <v-btn color="blue-darken-1" variant="text" @click="closeDetail()">
            Close
          </v-btn>
          <!-- Emitimos al componente padre el evento para crear y el respectivo formulario con la información necesaria -->
          <v-btn
            color="primary darken-2"
            class="ml-3"
            variant="text"
            @click="createTasks"
            v-on:keyup.enter="createTasks"
            :disabled="!valid"
          >
            {{ isEdit ? "Save" : "Create" }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "bap-form-task",
  data() {
    return {
      filterData: {},
      // Nombre de v-models utilizados en el formulario
      filterDataAux: {
        title: null,
        is_completed: false,
        due_date: null,
        comments: null,
        description: null,
        tags: null,
      },
      date: null,
      //Note: la variable menu alimenta al calendario dentro del input haciendo que se vea o no al darchick
      menu: false,
      valid: false,
    };
  },
  created() {
    this.filterData = this.filterDataAux;
  },
  methods: {
    // Emitimos el evento para cerra la dialog de formulario
    closeDetail() {
      this.$emit("closeDetail");
    },
    // Emitimos al componente padre el evento para crear y el respectivo formulario con la información necesaria
    createTasks() {
      // Vemos si va is_completed en nustra peticion
      this.filterData.is_completed
        ? this.filterData.is_completed
        : (this.filterData.is_completed = false);
      this.$emit("createTasks", this.filterData);
    },
  },
  watch: {
    // Utilizamos el hook watch para ver cuando dataEdit reciba un nuevo valor y de esta forma actualizamos la información de formulario
    dataEdit: {
      handler(newData) {
        this.filterData = newData;
      },
      immediate: true,
      deep: true, // Esto permite que el watcher observe cambios profundos en dataEdit
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      description: "Bandera para saber si mostrar o no dialog",
    },
    rulesRequired: {
      type: Array,
      default: [],
      description: "Reglas de formulario",
    },
    dataEdit: {
      type: Object,
      default: {},
      description: "Información que podria contener el formulario",
    },
    isEdit: {
      type: Boolean,
      default: false,
      description: "Bandera para saber si estaremos editando o creando tareas",
    },
  },
};
</script>
