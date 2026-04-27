const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello from CI/CD 🚀");
  res.end();
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
