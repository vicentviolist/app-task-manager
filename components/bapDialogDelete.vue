<template>
  <v-dialog v-model="show" width="auto">
    <v-card>
      <!-- Texto alimetado por prop para titulo de la alerta -->
      <v-card-title> {{ title }} </v-card-title>
      <!-- Texto alimetado por prop para la descripcion de la alerta -->
      <v-card-text> {{ description }}</v-card-text>
      <v-card-actions>
        <!-- Texto del boton cancelar -->
        <v-btn color="primary" variant="text" @click="handleCancel()">
          {{ btnCancelText }}
        </v-btn>
        <!-- Texto del boton acepptar -->
        <v-btn color="primary" variant="text" @click="handleOk()">
          {{ btnOkText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "bap-confirm-alert",
  data() {
    return {};
  },
  methods: {
    handleOk() {
      /* Emitimos evento al darle clic a Confirm a nuestro componente padre*/
      this.$emit("handleOk");
    },
    handleCancel() {
      /* Emitimos evento al darle clic a Cancel a nuestro componente padre*/
      this.$emit("handleCancel");
    },
  },
  props: {
    title: {
      type: String,
      default: "The task will be deleted",
      description: "Titulo alimentado por medio de props",
    },
    description: {
      type: String,
      default: "Confirm delete?",
      description: "Descripcion alimentada por medio de props",
    },
    btnCancelText: {
      type: String,
      default: "Cancel",
      description: "Texto boton cancel alimentado por medio de props",
    },
    btnOkText: {
      type: String,
      default: "Confirm",
      description: "Texto boton confirm alimentado por medio de props",
    },
    show: {
      type: Boolean,
      default: false,
      description: "Bandera para mostrar o no dialog",
    },
  },
};
</script>
