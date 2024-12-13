import { defineConfig, loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
    // 환경변수 증설
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    // 서버포트
    const SERVER_PORT = Number(process.env.VITE_SERVER_PORT);
    const PUBLIC_URL = process.env.VITE_PUBLIC_URL;

    return {
        plugins: [
            basicSsl(), // SSL 개발용 임시 인증서 생성
            viteStaticCopy({
                // 파일 복사
                targets: [
                    {
                        src: "src/serviceWorkers/*",
                        dest: "",
                    },
                ],
            }),
        ],
        // 개발 서버 설정
        server: {
            https: false,
            cors: true,
            port: SERVER_PORT,
        },
        build: {
            rollupOptions: {
                output: {
                    // 번들링 파일 이름 설정
                    entryFileNames: "parcel.js",
                },
            },
        },
        preview: {
            port: SERVER_PORT,
        },
        base: PUBLIC_URL,
    };
});
