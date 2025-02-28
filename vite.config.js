import { defineConfig, loadEnv } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import { viteStaticCopy } from "vite-plugin-static-copy";
import vitePluginSingleSpa from "vite-plugin-single-spa";

export default defineConfig(({ mode }) => {
    // 환경변수 증설
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const SERVER_PORT = Number(process.env.VITE_SERVER_PORT); // 서버포트
    const PUBLIC_URL = process.env.VITE_PUBLIC_URL; // 기본경로

    const plugins = [
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
    ];

    if (mode === "single-spa") {
        // single-spa 옵션 설정
        const vitePluginSingleSpaOptions = {
            serverPort: SERVER_PORT,
            spaEntryPoints: "src/app/index.js",
        };

        // single-spa 빌드 진입점 설정
        switch (process.env.VITE_MF_TYPE) {
            case "application":
                vitePluginSingleSpaOptions.spaEntryPoints = "src/app/application.js";
                break;
            case "parcel":
                vitePluginSingleSpaOptions.spaEntryPoints = "src/app/parcel.js";
                break;
        }
        plugins.push(vitePluginSingleSpa(vitePluginSingleSpaOptions)); // single-spa 라이브러리 적용
    }

    return {
        plugins,
        // 개발 서버 설정
        server: {
            https: false,
            cors: true,
            port: SERVER_PORT,
        },
        build: {
            target: "esnext",
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
