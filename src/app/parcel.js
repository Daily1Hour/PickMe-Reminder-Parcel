import { configureOneSignal } from "../services/configureOneSignal.js";
import { id as user_id } from "../api/getUser.js";

export function bootstrap() {
    return Promise.resolve();
}

export function mount() {
    configureOneSignal(user_id);
    return Promise.resolve();
}

export function unmount() {
    return Promise.resolve();
}
