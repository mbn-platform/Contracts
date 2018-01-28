let beKey = '348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8701';
// var bip39 = require('bip39');
var eWallet = require('ethereumjs-wallet');
var ProviderEngine = require('web3-provider-engine');
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require('web3-provider-engine/subproviders/web3.js');
var Web3 = require('web3');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

// Get our mnemonic and create an hdwallet
//var mnemonic = 'couch solve unique spirit wine fine occur rhythm foot feature glory away';
//var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
var w = eWallet.fromPrivateKey(new Buffer(beKey,'hex'));

// Get the first account using the standard hd path.
// var wallet_hdpath = 'm/44\'/60\'/0\'/0/';
// var wallet = w.hdwallet.derivePath(wallet_hdpath + '0').getWallet();
var address = '0x' + w.getAddress().toString('hex');

var providerUrl = 'https://ropsten.infura.io/fU11ZK0hpGri8YVjyy8w';
var engine = new ProviderEngine();
// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(w, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.
module.exports = {
  networks: {
    localhost: {
      host: 'localhost',
      port: 8546, // for ropsten expose this one
      //port: 8545, // expose this one for testrpc
      network_id: '*' // Match any network id
    },
    // ropsten: {
    //   host: '127.0.0.1',
    //   port: 8545,
    //   network_id: 3,    // Official ropsten network id
    //   // provider: engine, // Use our custom provider
    //   from: '0x11b108d51bfed1494ac5bad307a1dfc96b5eeffd',     // Use the address we derived
    //   gas: 4600000
    // }
    ropsten: {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address,     // Use the address we derived
      gas: 2000000
    }
  }
};
