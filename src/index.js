import { configureOneSignal } from "./services/configureOneSignal.js";

const USER_ID = import.meta.env.VITE_USER_ID;

configureOneSignal(USER_ID);