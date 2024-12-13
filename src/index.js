async function configureOneSignal(user_id) {
    // user_id가 없으면 종료
    if (user_id === void 0) {
        return;
    }

    // OneSignalSDK를 동적으로 로드
    await import("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js");

    window.OneSignalDeferred = window.OneSignalDeferred || [];

    // OneSignal 스택
    OneSignalDeferred.push(async function (OneSignal) {
        // OneSignal 초기화
        await OneSignal.init({
            appId: "9ee7de51-45a6-4639-9284-0ad224b0f726",
            notifyButton: {
                enable: true,
            },
            // 서비스워커 설정
            serviceWorkerPath: "./serviceWorkers/OneSignalSDKWorker.js",
        });

        // OneSignal 사용자 등록
        await OneSignal.login(user_id);
    });
}

configureOneSignal("user_id");
