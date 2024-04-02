import apiFactory from "../api/apiFactory";

export const state = () => ({
  //Note: variable que poblara de informacion la tabla
  task: [],
});

export const mutations = {
  //Note: Se muta la variable task con la data que vendra como resultado en la peticion
  settask(state, task) {
    state.task = task;
  },
};

export const actions = {
  //Note: peticion que traera la consulta que llena la tabla
  async getTaskData({ commit }, payload) {
    let res = await apiFactory.gets(payload);
    commit("settask", res.data);
  },
  //Note: traera registro uno a uno para llenar inf de detalle
  async getTaskById({ commit }, payload) {
    const res = await apiFactory.gets(payload);
    return res;
  },
  //Note: api que se utiliza para la creacion de tareas
  async addTask({ commit }, payload) {
    const res = await apiFactory.posts(payload);
    return res;
  },
  //Note: esta api borrara los items
  async deleteTask({ commit }, payload) {
    const res = await apiFactory.deletes(payload);
    return res;
  },
  //Note: actualizar un registro en especifico
  async updateTask({ commit }, payload) {
    const res = await apiFactory.puts(payload);
    return res;
  },
};
