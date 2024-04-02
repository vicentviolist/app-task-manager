<template>
  <div>
    <v-row>
      <v-col class="mt-2">
        <v-btn @click="showCreatedForm" color="primary darken-2"
          >+ Add task</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <bap-table-task
          :headers="headers"
          :loading="loading"
          :data="task"
          @detailTask="detailTask"
          @showDeleteTask="showDeleteTask"
        />
      </v-col>
      <v-snackbar v-model="snackbar" multi-line :color="colorAlert">
        {{ textAlert }}
      </v-snackbar>

      <bap-confirm-alert
        @handleCancel="showDeleteConfirm = false"
        @handleOk="deleteTask()"
        :show="showDeleteConfirm"
      />
    </v-row>
    <bap-form-task
      :show="showForm"
      @closeDetail="closeDetail"
      @createTasks="createTasks"
      :rulesRequired="rulesRequired"
      :dataEdit="dataEdit"
      :isEdit="isEdit"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BapConfirmAlert from "../components/bapDialogDelete.vue";
import bapTableTask from "../components/bapTableTask.vue";
import bapFormTask from "../components/bapFormTask.vue";
export default {
  name: "task-App",
  components: {
    BapConfirmAlert,
    bapTableTask,
    bapFormTask,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: "Title", align: "start", value: "title" },
        { text: "Due date", align: "center", value: "due_date" },
        { text: "Completed", align: "center", value: "is_completed" },
        { text: "Action", align: "center", value: "id" },
      ],
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Title is required.";
        },
      ],
      snackbar: false,
      idTask: null,
      showDeleteConfirm: false,
      textAlert: "",
      colorAlert: "success",
      dataEdit: {},
      showForm: false,
      isEdit: false,
    };
  },
  mounted() {
    this.handleRequest();
  },
  computed: {
    ...mapState(["task"]),
  },
  methods: {
    async handleRequest() {
      try {
        this.loading = true;
        await this.$store.dispatch("getTaskData", { path: "" });
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    showCreatedForm() {
      this.dataEdit = {};
      this.showForm = true;
    },
    async detailTask(id) {
      try {
        this.isEdit = true;
        const res = await this.$store.dispatch("getTaskById", {
          path: `/${id?.item?.id}`,
        });
        this.dataEdit = { ...res.data[0] };
        this.idTask = this.dataEdit?.id;
        this.showForm = true;
      } catch (error) {
        this.handleError(error);
      }
    },
    showDeleteTask(task) {
      this.idTask = task?.item?.id;
      this.showDeleteConfirm = true;
    },
    async deleteTask() {
      try {
        await this.$store.dispatch("deleteTask", { path: `/${this.idTask}` });
        this.showMessage("The task was successfully deleted", "success");
        this.showDeleteConfirm = false;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.handleRequest();
      }
    },
    closeDetail() {
      this.showForm = false;
      this.idTask = null;
      this.isEdit = false;
    },
    async createTasks(filterData) {
      try {
        const payload = { data: { ...filterData } };
        if (!filterData.title)
          throw new Error("The title field must not be empty.");

        if (this.isEdit) {
          payload.path = `/${this.idTask}`;
          await this.$store.dispatch("updateTask", payload);
          this.showMessage("The task was updated successfully", "success");
        } else {
          await this.$store.dispatch("addTask", payload);
          this.showMessage("The task was created successfully", "success");
        }
        this.closeDetail();
        this.handleRequest();
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      this.colorAlert = "error";
      this.snackbar = true;
      this.textAlert = error.message || error;
    },
    showMessage(message, color) {
      this.colorAlert = color;
      this.snackbar = true;
      this.textAlert = message;
    },
  },
};
</script>
