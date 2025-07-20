export default {
  async fetch(request) {
    return new Response("Worker is active!", { status: 200 });
  },
};