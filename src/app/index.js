import { configureOneSignal } from "../services/configureOneSignal.js";
import { id as user_id } from "../api/getUser.js";

configureOneSignal(user_id);
