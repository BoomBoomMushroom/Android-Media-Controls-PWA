window.addEventListener('install', (e) => {
    console.log("Service Worker Installed");
    // pre-cache assets here
})

window.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.result).then((response) => {
            return response || fetch(e.request)
        })
    )
})