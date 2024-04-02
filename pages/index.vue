<template>
  <div>
    <!-- Uso de componentes vutify -->
    <v-row>
      <v-col class="mt-2">
        <v-btn @click="showCreatedForm" color="primary darken-2"
          >+ Add task</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- Componente tabla donde le inyectamos por medio de props los headers de la tabla, la data que llega las columnas, animación de loading y 
        Con la comunicación entre componentes esperamos los eventos @detailTask y @showDeleteTask para las funciones de los botones
        Que en este caso son cunsultas para llenar detalle de edición e eliminar tareas -->
        <bap-table-task
          :headers="headers"
          :loading="loading"
          :data="task"
          @detailTask="detailTask"
          @showDeleteTask="showDeleteTask"
        />
      </v-col>
      <!-- Componente que muestra alertas de error y de ok  -->
      <v-snackbar v-model="snackbar" multi-line :color="colorAlert">
        {{ textAlert }}
      </v-snackbar>
      <!-- Dialog que se muestra cuando eliminaremos una tarea -->
      <bap-confirm-alert
        @handleCancel="showDeleteConfirm = false"
        @handleOk="deleteTask()"
        :show="showDeleteConfirm"
      />
    </v-row>
    <!-- Formulario para crear/editar tareas -->
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
      // Encabezados de la tabla
      headers: [
        { text: "Title", align: "start", value: "title" },
        { text: "Due date", align: "center", value: "due_date" },
        { text: "Completed", align: "center", value: "is_completed" },
        { text: "Action", align: "center", value: "id" },
      ],
      // Reglas de forulario
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
    // Busqueda inicial al montar la aplicación
    this.handleRequest();
  },
  computed: {
    // Llamado de estado que almacena la inf de las consultas a la tabla
    ...mapState(["task"]),
  },
  methods: {
    // Consulta general a ta tabla usando vuex para el manejo de estatos y axios para las consultas
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
    // Abrir modal para crear tarea
    showCreatedForm() {
      this.dataEdit = {};
      this.showForm = true;
    },
    // Consultar el detalle de la tarea
    async detailTask(id) {
      try {
        this.isEdit = true;
        // Accedemos a vuex para el manejo de acciones y le inyectamos el id de la tarea seleccionada para saber que tarea editaremos
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
    // Mostrar ventana de confirmacion para la eliminacion de tareas
    showDeleteTask(task) {
      this.idTask = task?.item?.id;
      this.showDeleteConfirm = true;
    },
    //Enpoint para eliminar tarea
    async deleteTask() {
      try {
        // Accedemos a vuex para el manejo de acciones y le inyectamos el id de la tarea seleccionada para saber que tarea eliminaremos
        await this.$store.dispatch("deleteTask", { path: `/${this.idTask}` });
        this.showMessage("The task was successfully deleted", "success");
        this.showDeleteConfirm = false;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.handleRequest();
      }
    },
    // Cerrar modal de creación/edicion de tareas
    closeDetail() {
      this.showForm = false;
      this.idTask = null;
      this.isEdit = false;
    },
    // Endpoint para crear tarea
    async createTasks(filterData) {
      try {
        const payload = { data: { ...filterData } };
        // Filtro de seguridad para que mostremos error si es que no se envia el titulo
        if (!filterData.title)
          throw new Error("The title field must not be empty.");
        // La vandera isEdit nos indica si se trata de edición o creacionde tareas
        if (this.isEdit) {
          // Cuando editamos usamos este endpoint
          payload.path = `/${this.idTask}`;
          await this.$store.dispatch("updateTask", payload);
          this.showMessage("The task was updated successfully", "success");
        } else {
          // Cuando creamos tareas utilizaremos este
          await this.$store.dispatch("addTask", payload);
          this.showMessage("The task was created successfully", "success");
        }
        this.closeDetail();
        this.handleRequest();
      } catch (error) {
        this.handleError(error);
      }
    },
    // Funcion para manejo de errores y así mostrat alertas
    handleError(error) {
      this.colorAlert = "error";
      this.snackbar = true;
      this.textAlert = error.message || error;
    },
    // Se adapta funcion para llevar mejor contro de alertas succes y error y que esta sea reutilizables
    showMessage(message, color) {
      this.colorAlert = color;
      this.snackbar = true;
      this.textAlert = message;
    },
  },
};
</script>
