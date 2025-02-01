import { defineConfig, loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ mode }) => {
    // 환경변수 증설
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    // 서버포트
    const SERVER_PORT = Number(process.env.VITE_SERVER_PORT);
    const PUBLIC_URL = process.env.VITE_PUBLIC_URL;

    return {
        server: {
            // 개발 서버 설정
            https: true,
            cors: true,
            port: SERVER_PORT,
        },
        plugins: [
            basicSsl(), // SSL 개발용 임시 인증서 생성
        ],
        base: PUBLIC_URL,
    };
});
