const express = require('express');
const router = express.Router();
const HostController =  require('../controllers/hostControllers');
const child_process = require('child_process');

router.post('/ping', function(req, res) {
    let { host, count } = req.body;
    host = host.toLowerCase();
    var pingProcess = child_process.spawn('ping', ['-n', count, host]);

    // Listen for the `stdout` event of the child process
    pingProcess.stdout.on('data', (data) => {
        res.write(data);
    });
    
    // Listen for the `stderr` event of the child process
    pingProcess.stderr.on('data', (data) => {
        res.write(data);
    });

    // Listen for errors during the execution of the ping command
    pingProcess.on('error', (error) => {
        res.status(500).send(`Error: ${error.message}`);
    });

    // When the child process exits, send the response to the client
    pingProcess.on('exit', (code) => {
        res.end();
    });
});

// GET top hosts
router.get('/tophosts', HostController.getTopHosts);

// Update ping counter per host
router.post('/countPing', HostController.updatePingCounter);
  

module.exports = router;
