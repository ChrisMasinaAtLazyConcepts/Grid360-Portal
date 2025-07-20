const CACHE_NAME = 'saps-cam-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/images/checkmark.png',  // Add notification icons to cache
  '/images/xmark.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('Cache addAll failed:', err);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((err) => {
            console.error('Fetch failed; returning offline page:', err);
            // Return a fallback response if both cache and network fail
            return caches.match('/offline.html');
          });
      })
  );
});

// Push notification handler with better error handling
self.addEventListener('push', (event) => {
  let notificationData;
  try {
    notificationData = event.data ? event.data.json() : { title: 'SAPS Cam Alert', body: 'Gun detected!' };
  } catch (e) {
    notificationData = { title: 'SAPS Cam Alert', body: 'Gun detected!' };
  }

  const options = {
    body: notificationData.body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: notificationData.url || '/'
    },
    actions: [
      {
        action: 'explore', 
        title: 'View Camera',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close', 
        title: 'Dismiss',
        icon: '/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
      .catch((err) => {
        console.error('Notification failed:', err);
      })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    clients.openWindow(event.notification.data.url);
  }
});