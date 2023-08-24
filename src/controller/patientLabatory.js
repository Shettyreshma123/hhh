const express = require('express');
const patientModel = require('../models/Patient');
const authenticate = require('../middleware/authentication');
const WebSocket = require('ws');

const router = express.Router();

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
      testtype,
    } = req.body;

    const updatedData = {
      id: id,
      username: username,
      age: age,
      chiefcomplaint: chiefcomplaint,
      bloodgroup: bloodgroup,
      sugarlevel: sugarlevel,
      bloodpressure: bloodpressure,
      testtype: testtype,
    };

    await patientModel.findByIdAndUpdate(id, updatedData);
    const data = await patientModel.findById(id);
	// console.log(data);
	// console.log(updatedData);

   

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;