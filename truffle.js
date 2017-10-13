module.exports = {
  networks: {
    localhost: {
      host: 'localhost',
      port: 8546, // for ropsten expose this one
      //port: 8545, // expose this one for testrpc
      network_id: '*' // Match any network id
    },
    ropsten: {
      host: 'localhost',
      port: 8545,
      network_id: '3',
      // gas: 5000000
    }
  }
};
