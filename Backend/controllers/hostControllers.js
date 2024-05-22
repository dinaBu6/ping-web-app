const Host = require('../models/hostModel')

// get top 5
const getTopHosts = async (req, res) => {
    try {
        const hosts = await Host.find({}).sort({pingCounter: -1}).limit(5);
        res.status(200).json(hosts);
    } catch (err) {
        res.status(500).json({ error: 'Error getting top hosts.' });
    }
}             

//update the count of the host
const updatePingCounter = async (req, res) => {
      try {
        let { host } = req.body;
        host = host.toLowerCase();
        //if the host starts with 'www', we want to save/update it without the 'www'
        if (host.startsWith('www')) {
            host = host.slice(4);
        }

        // Check if the host exists in the database 
        const existingHost = await Host.findOne({ host: host });
        if (!existingHost) {
          // If the host doesn't exist in db, add it
            let pingCounter = 1;
            const newHost = new Host({ host, pingCounter});
            await newHost.save();
            res.status(200).json(newHost);
        } else {
        //If the host exists, update its count
            existingHost.pingCounter += 1;
            await existingHost.save();
            res.status(200).json(existingHost);
        }
      } catch (err) {
        res.status(500).json({ error: 'Error updating or creating the host.' });
      }
  }

module.exports = {
    getTopHosts,
    updatePingCounter
}