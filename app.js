const express = require('express');
const cron = require('node-cron');
const { exec } = require('child_process');

const app = express();

// Your Express routes here
app.get('/', (req, res) => {
  res.send('Server running');
});

// Schedule job: every 1 hour 15 minutes
// Cron syntax: 'm h dom mon dow'
// node-cron uses 5 fields (second optional)
cron.schedule('0 */1 * * *', () => {
  // This runs every hour exactly, but we want 1h15m interval
});

// A better way: use a timer
function runScript() {
  console.log('Running Python script...');
  exec('python3 /path/to/bsf_data_collect_script.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    if (stderr) console.error(`stderr: ${stderr}`);
    if (stdout) console.log(`stdout: ${stdout}`);
  });
}

// run immediately on start
runScript();

// then run every 1h15m (4500000 ms)
setInterval(runScript, 4500000);

app.listen(3000, () => console.log('Server running on port 3000'));
