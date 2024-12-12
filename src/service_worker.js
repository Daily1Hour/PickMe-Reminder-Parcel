self.addEventListener("push", function (event) {
    let options = {
        body: event.data.text(), // 푸시 메시지 내용
    };

    event.waitUntil(self.registration.showNotification("푸시 알림 제목", options));
});
