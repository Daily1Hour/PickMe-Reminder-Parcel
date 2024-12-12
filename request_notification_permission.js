import register_push_notifications from "./register_push_notifications.js";

export default async function request_notification_permission() {
    if (!("Notification" in window)) {
        console.log("이 브라우저는 알림을 지원하지 않습니다.");
        return;
    }

    switch (Notification.permission) {
        case "granted":
            console.log("알림 권한이 허용되었습니다.");
            break;
        case "denied":
            console.log("알림 권한이 거부되었습니다.");
            break;
        default:
            console.log("알림 권한을 요청합니다.");

            try {
                await Notification.requestPermission();
            } catch (error) {
                console.error("알림 권한 요청 중 오류가 발생했습니다.", error);
            }
    }

    if (Notification.permission === "granted") {
        register_push_notifications();
    }
}
