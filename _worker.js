export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    if (url.pathname.startsWith('/backend')) {
      url.hostname = 'dev.178778.xyz';
      url.protocol = 'https:'; // HTTPS

      let newRequest = new Request(url, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
        redirect: 'follow', // 302/301
      });

      return fetch(newRequest);
    }

    return env.ASSETS.fetch(request);
  },
};
