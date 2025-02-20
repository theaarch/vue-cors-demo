export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    if (url.pathname.startsWith('/backend')) {
      url.hostname = 'dev.178778.xyz'

      let newRequest = new Request(url, request);

      return fetch(newRequest);
    }

    return env.ASSETS.fetch(request);
  },
};
