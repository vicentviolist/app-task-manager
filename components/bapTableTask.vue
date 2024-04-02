<template>
  <!-- Componente tabla vutify utilizada para mostrar la información de consulta de tareas y el manejo de acciones -->
  <v-data-table
    height="auto"
    :headers="headers"
    :loading="loading"
    :items="data"
    class="elevation-1"
  >
    <template v-slot:item.id="item">
      <!-- Slot de componente tabla para mostrar acciones de la tabla -->
      <v-chip
        class="ma-2"
        color="primary"
        outlined
        style="cursor: pointer"
        @click="detailTask(item)"
      >
        <v-icon small color="primary"> mdi-pencil </v-icon>
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
        outlined
        style="cursor: pointer"
        @click="showDeleteTask(item)"
      >
        <v-icon small color="primary"> mdi-delete </v-icon>
      </v-chip>
    </template>
    <template v-slot:item.is_completed="item">
      <div
        class="mr-2"
        :class="item.item.is_completed == 1 ? 'success--text' : 'error--text'"
      >
        {{ item.item.is_completed == 1 ? "Completed" : "Incomplete" }}
      </div>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "bap-table-task",
  data() {
    return {};
  },
  methods: {
    detailTask(task) {
      /* Emitimos eventos al componente padre que contienen la información de la tarea seleccionada */
      this.$emit("detailTask", task);
    },
    showDeleteTask(task) {
      /* Emitimos eventos al componente padre que contienen la información de la tarea seleccionada */
      this.$emit("showDeleteTask", task);
    },
  },
  props: {
    headers: {
      type: Array,
      default: [],
      description: "Encabezados de la tabla",
    },
    data: {
      type: Array,
      default: [],
      description: "Información de la tabla",
    },
    loading: {
      type: Boolean,
      default: false,
      description: "Bandera para saber si mostrar animación de loading",
    },
  },
};
</script>
