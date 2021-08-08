const cacheVersion = 'image-cache';

self.addEventListener('fetch', event => {
  console.log('sw-images', cacheVersion, 'fetch');

  // This SW only handles image files
  if(!['jpg', 'png', 'webp'].includes(event.request.url.slice(-3))) return;

  // This method instructs the browser to replace its standard request
  // resolution with the given promise. Here we first open the cache,
  // then respond with the cached response, except if it doesn't exist 
  // then it responds with the normal network fetch behavior.
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request))
      .then(resp => {
        if(resp) {
          console.log(cacheVersion, 'fetch', 'found response in cache, returning that');
          return resp;
        }

        console.log(cacheVersion, 'fetch', 'didn\'t find response in cache, doing fetch');
        return fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone())
            return response
          })
      })
  )
});