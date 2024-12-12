import registerPushNotifications from "./register_push_notifications.js";

function request_notification_permission() {
    // 브라우저가 Notification API를 지원하는지 확인
    if (!("Notification" in window)) {
        console.log("이 브라우저는 알림을 지원하지 않습니다.");
        return;
    }

    switch (Notification.permission) {
        case "granted":
            console.log("알림 권한이 허용되었습니다.");

            registerPushNotifications();
            break;
        case "denied":
            console.log("알림 권한이 거부되었습니다.");
            break;
        case "default":
            console.log("알림 권한을 요청합니다.");

            Notification.requestPermission()
                .then((permission) => {
                    if (permission === "granted") {
                        console.log("알림 권한이 허용되었습니다.");

                        registerPushNotifications();
                    } else if (permission === "denied") {
                        console.log("알림 권한이 거부되었습니다.");
                    } else {
                        console.log("알림 권한 요청이 무시되었습니다.");
                    }
                })
                .catch((error) => {
                    console.error("알림 권한 요청 중 오류가 발생했습니다:", error);
                });
            break;
    }
}

// 버튼 클릭 이벤트 리스너로 허가 함수 등록
document
    .getElementById("requestPermissionButton")
    .addEventListener("click", request_notification_permission);
