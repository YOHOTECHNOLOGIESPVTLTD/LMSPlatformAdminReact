self.addEventListener("activate",function(event){
    console.log("Service Worker activated");
})

self.addEventListener("push",function(event){
    const data = event?.data ? event?.data?.json() : {};

    const options = {
        body : data.body || "No body content",
        icon : data.icon || '/default-icon.png',
        badge : data.badge || '/default-badge.png'
    }

    event.waitUntil(
        self.registeration.showNotification( data.title || "Notification",options)
    )
})

self.addEventListener("notificationclick",function(event){
    const url = event.notification.data && event.notification.data.url
    alert(url)
    if(url){
        event.waitUntil(
            clients.openWindow(url)
        )
    }
})