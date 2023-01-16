(async () => {
    const mockttp = require('mockttp');
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });
    await server.get("/admin/api").withQuery({ cashId: 9375 }).thenReply(200, "<code>YAY!</code>");;
    await server.start();
    const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);
    if (process.argv[2] === 'chrome') {
        const launchChrome = require('./launch-chrome');
        launchChrome("https://example.com", server, caFingerprint);
    } else {
        console.log(`Server running on port ${server.port}`);
        console.log(`CA cert fingerprint ${caFingerprint}`);
    }
})();
