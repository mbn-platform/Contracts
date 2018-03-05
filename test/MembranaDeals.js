let MembranaDeals = artifacts.require('./MembranaDeals.sol');
// let MembranaInstance = artifacts.require("./MembranaInstance.sol");
// let ERC20Contract = artifacts.require("./ERC20Contract.sol");
let expect = require('chai').expect;
let md;
// let mi;
let mdTransaction;
let dealId;
let meta;
const investorAddr = '0x9315709cc7C8027f5309776C0B38db4a7F2F2AF3';
const traderAddr = '0x66A28d98D1C586aab0205D4d41E508eC9002849E';
contract('Membrana', function(accounts) {

  // it("should allow ERC20 token purchase", async function () {
  //   let expected = 900;
  //   meta = await ERC20Contract.deployed();
  //   let status = await meta.purchase({from:accounts[1],value:90000});
  //   let balance = await meta.balanceOf.call(accounts[1]);
  //   expect(parseInt(balance.valueOf())).to.equal(expected);
  // });

  // it("should deploy Membrana Instance",async function() {
  //   let expected=1;
  //   mf = await MembranaFactory.deployed();
  //   let miTransaction = await mf.makeInstance(ERC20Contract.address, accounts[0], 30, 20, 1337, 31337, 100 , 'morat', accounts[1], 'borat' , accounts[2],{from:accounts[1],gas:1000000});
  //   let miAddr = (miTransaction.logs[0].args.instance);
  //   mi = MembranaInstance.at(miAddr);
  //   console.log(`ERC20: ${ERC20Contract.address}`);
  //   console.log(`Factory: ${MembranaFactory.address}`);
  //   let res = await mi.myAddr();
  //   expect(res.valueOf()).to.equal(miAddr);
  // });

  it('should send ether  to Membrana Deal',async () => {
    console.log(accounts);
    md = await MembranaDeals.deployed();
    const oldBalance = await web3.eth.getBalance(md.address);
    await  web3.eth.send({to: md.address, value:100, from:accounts[0]});
    const newBalance = await web3.eth.getBalance(md.address);
    //"31", "50", "1", "2", "1", "Invvv", "0xBFa3ea134157fD7b4324c91428B6D7e1e3c29cCE", "trader333333" , "0xBFa3ea134157fD7b4324c91428B6D7e1e3c29cCE", "31337" , "BTC"

    console.log(mdTransaction);
    dealId = (mdTransaction.logs[0].args.dealId);
    console.log(mdTransaction.logs[0].args);
    console.log(`Deal: ${dealId}`);
    const dealCount2 = parseInt((await md.getDealsCount.call()).valueOf());
    expect(newBalance).to.equal(oldBalance);
  });

  it('should create Membrana Deal',async () => {
    console.log(accounts);

    const dealCount1 = parseInt((await md.getDealsCount.call()).valueOf());
    mdTransaction = await md.makeDeal(30, 20, 1000, 3000, 100000000000000000 , 'morat', investorAddr, 'borat', traderAddr, '0xcafebeef', 0 ,{from:accounts[0],gas:960000,value:100000000000000000});
    //"31", "50", "1", "2", "1", "Invvv", "0xBFa3ea134157fD7b4324c91428B6D7e1e3c29cCE", "trader333333" , "0xBFa3ea134157fD7b4324c91428B6D7e1e3c29cCE", "31337" , "BTC"

    console.log(mdTransaction);
    dealId = (mdTransaction.logs[0].args.dealId);
    console.log(mdTransaction.logs[0].args);
    console.log(`Deal: ${dealId}`);
    const dealCount2 = parseInt((await md.getDealsCount.call()).valueOf());
    expect(dealCount1).to.equal(dealCount2 - 1);
  });

  // it("should send ether in Membrana Instance",async function() {
  //   let expected='100';
  //   // meta = await ERC20Contract.deployed();
  //   // await meta.purchase({from:accounts[1],value:10000});
  //   // let status = await meta.transfer(mi.address, 200, {from:accounts[1],gas:90000});
  //   // let balance = mi.balance;
  //   await web3.eth.send({to: miAddr, value:100, from:accounts[0]});
  //   let balance = web3.eth.getBalance(miAddr);
  //   expect(balance.valueOf()).to.equal(expected);
  // });
  it('should verify Membrana Deal', async function() {
    // let expected='1';
    // let balance = web3.eth.getBalance(miAddr);
    // meta = await ERC20Contract.deployed();
    // await meta.purchase({from:accounts[1],value:10000});
    // let status = await meta.transfer(mi.address, 200, {from:accounts[1],gas:90000});
    // let balance = mi.balance;
    await md.setVerified(dealId, {from:accounts[0]});
    expect((await md.getState(dealId)).valueOf()).to.equal('1');
  });
  it('should finish Membrana Instance',async function() {
    // let expected='1';
    // let balance = web3.eth.getBalance(miAddr);
    // meta = await ERC20Contract.deployed();
    // await meta.purchase({from:accounts[1],value:10000});
    // let status = await meta.transfer(mi.address, 200, {from:accounts[1],gas:90000});
    // let balance = mi.balance;
    await md.setFinished(dealId, 2345, {from:accounts[0]});
    expect((await md.getState(dealId)).valueOf()).to.equal('3');
  });
  // it('should send investor\'s split',async function() {
  //   // let expected='1';
  //   // let balance = web3.eth.getBalance(miAddr);
  //   // meta = await ERC20Contract.deployed();
  //   // await meta.purchase({from:accounts[1],value:10000});
  //   // let status = await meta.transfer(mi.address, 200, {from:accounts[1],gas:90000});
  //   let balance = md.balance;
  //   await md.setFinished(dealId, 25500,{from:accounts[0]});
  //   expect((await md.getState(dealId)).valueOf()).to.equal('3');
  // });
  // it("should send 200 tokens to  Membrana Instance",async function() {
  //   let expected='200';
  //   // meta = await ERC20Contract.deployed();
  //   // await meta.purchase({from:accounts[1],value:10000});
  //   let status = await meta.transfer(mi.address, 200, {from:accounts[1],gas:90000});
  //   let balance = await meta.balanceOf.call(mi.address);
  //   expect(balance.valueOf()).to.equal(expected);
  // });

  // it("should set the instance paid", async function() {
  //   let expected='1';
  //   console.log(mi.address);
  //   await mi.setPaid({from:accounts[0],gas:1000000});
  //   let state = await mi.getState();
  //   //state = await mi.getState.call();
  //   expect(state.valueOf()).to.equal(expected);
  // });
  // it("should call a function that depends on a linked library", function() {
  //   var meta;
  //   var metaCoinBalance;
  //   var metaCoinEthBalance;
  //
  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(accounts[0]);
  //   }).then(function(outCoinBalance) {
  //     metaCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function(outCoinBalanceEth) {
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //   }).then(function() {
  //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
  // });
  //   });
  // it("should send coin correctly", function() {
  //   var meta;
  //
  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];
  //
  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;
  //
  //   var amount = 10;
  //
  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   }).then(function() {
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();
  //
  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  //   });
  // });
});
