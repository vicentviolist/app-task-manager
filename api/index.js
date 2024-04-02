import axios from "axios";
import { token } from "./enviroment";
export default axios.create({
  //Note: Declarare en este archivo la ruta base que se utilizara en el proyecto
  baseURL: "https://ecsdevapi.nextline.mx/vdev/tasks-challenge",
  timeout: 15000,

  headers: {
    //Note: Declaro token para respuestas exitosas
    Authorization: `Bearer ${token}`,
  },
});
