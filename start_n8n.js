const { spawn } = require("child_process");

spawn("n8n", [], {
  shell: true,
  windowsHide: true,
  stdio: "ignore",
});
