import { configureOneSignal } from "../services/configureOneSignal.js";

const USER_ID = import.meta.env.VITE_USER_ID;

export function bootstrap() {
    return Promise.resolve();
}

export function mount() {
    configureOneSignal(USER_ID);
    return Promise.resolve();
}

export function unmount() {
    return Promise.resolve();
}
