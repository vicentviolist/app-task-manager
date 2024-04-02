<template>
  <v-data-table
    height="auto"
    :headers="headers"
    :loading="loading"
    :items="data"
    class="elevation-1"
  >
    <template v-slot:item.id="item">
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
      this.$emit("detailTask", task);
    },
    showDeleteTask(task) {
      this.$emit("showDeleteTask", task);
    },
  },
  props: {
    headers: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
