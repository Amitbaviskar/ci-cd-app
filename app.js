const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Final version 🚀");
  res.end();
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
