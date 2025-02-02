const ONE_SIGNAL_SDK = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
const ONE_SIGNAL_APP_ID = import.meta.env.VITE_ONE_SIGNAL_APP_ID;

export async function configureOneSignal(user_id) {
    // user_id가 없으면 종료
    if (user_id === void 0) {
        return;
    }

    // OneSignalSDK를 동적으로 로드
    await import(/* @vite-ignore */ ONE_SIGNAL_SDK);

    window.OneSignalDeferred = window.OneSignalDeferred || [];

    // OneSignal 스택
    OneSignalDeferred.push(async function (OneSignal) {
        // OneSignal 초기화
        await OneSignal.init({
            appId: ONE_SIGNAL_APP_ID,
            notifyButton: {
                enable: true,
            },
        });

        // OneSignal 사용자 등록
        await OneSignal.login(user_id);
    });
}
