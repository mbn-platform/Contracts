let MercatusFactory = artifacts.require("./MercatusFactory.sol");
let MercatusInstance = artifacts.require("./MercatusInstance.sol");
// let ERC20Contract = artifacts.require("./ERC20Contract.sol");
let expect = require("chai").expect;
let mf;
let mi;
let miTransaction;
let miAddr;
let meta;

contract('Mercatus', function(accounts) {

  // it("should allow ERC20 token purchase", async function () {
  //   let expected = 900;
  //   meta = await ERC20Contract.deployed();
  //   let status = await meta.purchase({from:accounts[1],value:90000});
  //   let balance = await meta.balanceOf.call(accounts[1]);
  //   expect(parseInt(balance.valueOf())).to.equal(expected);
  // });

  // it("should deploy Mercatus Instance",async function() {
  //   let expected=1;
  //   mf = await MercatusFactory.deployed();
  //   let miTransaction = await mf.makeInstance(ERC20Contract.address, accounts[0], 30, 20, 1337, 31337, 100 , 'morat', accounts[1], 'borat' , accounts[2],{from:accounts[1],gas:1000000});
  //   let miAddr = (miTransaction.logs[0].args.instance);
  //   mi = MercatusInstance.at(miAddr);
  //   console.log(`ERC20: ${ERC20Contract.address}`);
  //   console.log(`Factory: ${MercatusFactory.address}`);
  //   let res = await mi.myAddr();
  //   expect(res.valueOf()).to.equal(miAddr);
  // });

  it("should deploy Mercatus Instance",async function() {
    console.log(accounts);
    let expected=1;
    mf = await MercatusFactory.deployed();
    miTransaction = await mf.makeInstance(30, 20, 1337, 31337, 10 , 'morat', accounts[1], 'borat' , accounts[2],'0xcafebeef',{from:accounts[1],gas:4600000,value:10});
    console.log(miTransaction);
    miAddr = (miTransaction.logs[0].args.instance);
    console.log(miTransaction.logs[0].args);
    mi = MercatusInstance.at(miAddr);
    // console.log(mi);
    // console.log(`ERC20: ${ERC20Contract.address}`);
    console.log(`Factory: ${MercatusFactory.address}`);
    let res = await mi.myAddr();
    let instanceData={
      state: (await mi.getState.call()).valueOf(),
      start: (await mi.start.call()).valueOf(),
      deadline: (await mi.deadline.call()).valueOf(),
      maxLoss: (await mi.maxLoss.call()).valueOf(),
      startBallance: (await mi.startBallance.call()).valueOf(),
      targetBallance: (await mi.targetBallance.call()).valueOf(),
      amount: (await mi.amount.call()).valueOf(),
      investor: (await mi.investor.call()).valueOf(),
      investorAddress: (await mi.investorAddress.call()).valueOf(),
      trader: (await mi.trader.call()).valueOf(),
      traderAddress: (await mi.traderAddress.call()).valueOf()
    }
    console.log(instanceData);
    expect(res.valueOf()).to.equal(miAddr);
  });

  it("should send ether in Mercatus Instance",async function() {
    let expected='10';
    let balance = web3.eth.getBalance(miAddr);
    // meta = await ERC20Contract.deployed();
    // await meta.purchase({from:accounts[1],value:10000});
    // let status = await meta.transfer(mi.address, 200, {from:accounts[1],gas:90000});
    // let balance = mi.balance;
    expect(balance.valueOf()).to.equal(expected);
  });
  // it("should send 200 tokens to  Mercatus Instance",async function() {
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
