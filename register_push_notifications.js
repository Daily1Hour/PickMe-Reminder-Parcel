export default function register_push_notifications() {
    if ("Notification" in window && "serviceWorker" in navigator) {
        // 서비스 워커 등록
        navigator.serviceWorker
            .register("/service_worker.js")
            .then(function (registration) {
                console.log("서비스 워커 등록 성공:", registration);

                // 푸시 구독 생성
                registration.pushManager
                    .subscribe({
                        userVisibleOnly: true, // 사용자가 알림을 볼 수 있도록
                        applicationServerKey: urlBase64ToUint8Array("<VAPID_PUBLIC_KEY>"), // VAPID 공개 키
                    })
                    .then(function (subscription) {
                        console.log("푸시 구독 성공:", subscription);
                        // 구독 정보를 서버로 전송하여 저장
                    })
                    .catch(function (error) {
                        console.error("푸시 구독 실패:", error);
                    });
            })
            .catch(function (error) {
                console.error("서비스 워커 등록 실패:", error);
            });
    } else {
        console.error("서비스 워커를 지원하지 않는 브라우저입니다.");
    }
}
