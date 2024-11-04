/** @type {import('@remix-run/dev').AppConfig} */
export default {
    // Other configurations...
    server: './server.js', // Use Express server instead of the default Remix server
    serverBuildTarget: 'node-cjs', // CommonJS for Node compatibility
  };