<template>
  <v-dialog v-model="show" scrollable width="auto" persistent>
    <v-card>
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
            Close </v-btn
          ><v-btn
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
    closeDetail() {
      this.$emit("closeDetail");
    },
    createTasks() {
      this.filterData.is_completed
        ? this.filterData.is_completed
        : (this.filterData.is_completed = false);
      this.$emit("createTasks", this.filterData);
    },
  },
  watch: {
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
    },
    rulesRequired: {
      type: Array,
      default: [],
    },
    dataEdit: {
      type: Object,
      default: {},
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
