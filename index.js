const server = require('./api/server.js');
// endpoints here

const port = process.env.PORT || 3300;
server.listen(port, () => console.log(`\n=== Listening on localhost:${port} === Hold on to your butts... ===\n`));
