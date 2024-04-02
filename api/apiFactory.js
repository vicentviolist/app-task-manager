import api from "./index";
import { transformToParamsString } from "./utils/apiUtils";
const path = "/tasks";
// Token necesario en todos los endpoints que requiere esta prueba tecnica
import { token } from "../api/enviroment";

//Note:Se crean los metods CRUD que se utilizaran a lo largo del proyecto
export default {
  async gets(payload) {
    //Note: en el objeto config se pueden meter los heders por si fuera necesario utilizar otro metodo de autentificacion en un metodo en especifico
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .get(`${path}${payload.path}?token=${token}${query}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async posts(payload) {
    var config = {};
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .post(`${path}${query}?token=${token}`, payload.data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async deletes(payload) {
    var config = {};
    return new Promise((resolve, reject) => {
      api
        .delete(`${path}${payload.path}?token=${token}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async puts(payload) {
    var config = {};
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .put(
          `${path}${payload.path}?token=${token}${query}`,
          payload.data,
          config
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
