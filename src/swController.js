function register(link = '/service-worker.js') {
  if(!'serviceWorker' in navigator) {
    console.log('Registration not attempted, navigator.serviceWorker unsupported');
    return false;
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(link, {scope: '/app/'})
      .then((reg) => {
        console.log(link + ' registered. Scope is ' + reg.scope);
      }).catch((error) => {
        console.log(link + ' registration failed. ' + error);
      });
  }
}

export default {register}