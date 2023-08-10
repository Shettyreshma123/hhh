const express = require('express');
const patientModel = require('../models/User');
const authenticate = require('../middleware/authentication');
const WebSocket = require('ws');

const router = express.Router();

// Create an HTTP server
const server = require('http').createServer();

// Create a WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('close', () => {
    clients.delete(ws);
  });
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const {
      username,
      age,
      chiefcomplaint,
      bloodgroup,
      sugarlevel,
      bloodpressure,
      message,
    } = req.body;

    const updatedData = {
      id: id,
      username: username,
      age: age,
      chiefcomplaint: chiefcomplaint,
      bloodgroup: bloodgroup,
      sugarlevel: sugarlevel,
      bloodpressure: bloodpressure,
      message: message,
    };

    await patientModel.findByIdAndUpdate(id, updatedData);
    const data = await patientModel.findById(id);
	// console.log(updatedData);

    // Notify connected clients about the data update
    const notification = {
      type: 'data_updated',
      patientId: id,
    };

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(notification));
      }
    });

    return res.status(200).send(updatedData);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;