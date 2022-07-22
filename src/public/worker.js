console.log("Service Worker");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log(data);
  // console.log("Notification received");
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "./icon.png",
    requireInteraction: true,
  });
});
