(async () => {
    await import("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js");

    window.OneSignalDeferred = window.OneSignalDeferred || [];

    OneSignalDeferred.push(async function (OneSignal) {
        await OneSignal.init({
            appId: "9ee7de51-45a6-4639-9284-0ad224b0f726",
            notifyButton: {
                enable: true,
            },
            serviceWorkerPath: "./OneSignalSDKWorker.js",
        });

        await OneSignal.login("testuser");
    });
})();
