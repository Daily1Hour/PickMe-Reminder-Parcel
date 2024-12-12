import request_notification_permission from "./request_notification_permission.js";

// 버튼 클릭 이벤트 리스너로 허가 함수 등록
document
    .getElementById("requestPermissionButton")
    .addEventListener("click", request_notification_permission);
