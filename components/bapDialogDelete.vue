<template>
  <v-dialog v-model="show" width="auto">
    <v-card>
      <v-card-title> {{ title }} </v-card-title>
      <v-card-text> {{ description }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" variant="text" @click="handleCancel()">
          {{ btnCancelText }}
        </v-btn>
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
      this.$emit("handleOk");
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
  props: {
    title: {
      type: String,
      default: "The task will be deleted",
    },
    description: {
      type: String,
      default: "Confirm delete?",
    },
    btnCancelText: {
      type: String,
      default: "Cancel",
    },
    btnOkText: {
      type: String,
      default: "Confirm",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
