self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request).then(res => {
        if (res.ok) {
          const c = res.clone();
          caches.open('st-v2').then(cache => cache.put(e.request, c));
        }
        return res;
      }).catch(() => caches.match(e.request))
    )
  );
});
