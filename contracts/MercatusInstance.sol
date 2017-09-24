pragma solidity ^0.4.15;

import './ERC20Contract.sol';
contract MercatusInstance {
    address public be;
    enum state {init, paid, verified, halted, finished}
    state public currentState;
    uint public deadline;
    uint public maxLoss;
    uint public startBallance;
    uint public targetBallance;
    uint public amount;
    string public invester;
    address public investerAddress;
    string public trader;
    address public traderAddress;
    ERC20Contract token;
    function MercatusInstance(address _token, address _be, uint _deadline, uint _maxLoss, uint _startBallance, uint _targetBallance, uint _amount,  string _invester, address _investerAddress, string _trader, address _traderAddress){
        deadline = _deadline;
        maxLoss = _maxLoss;
        startBallance = _startBallance;
        targetBallance = _targetBallance;
        amount = _amount;
        invester = _invester;
        investerAddress = _investerAddress;
        trader = _trader;
        traderAddress = _traderAddress;
        currentState = state.init;
        be = _be;
        token =  ERC20Contract(_token);
    }
    function myAddr() constant returns(address) {
      return this;
   }
   modifier onlyBe() {
    require(msg.sender == be);
    _;
  }
   modifier inState(state s) {
    require(currentState == s);
    _;
  }
  function getState() constant returns (uint)  {
    return uint(currentState);
  }
    function setPaid() external onlyBe inState(state.init){
        require(token.balanceOf(this) >= amount);
        currentState = state.paid;
      }

    function setVerified() external  onlyBe inState(state.paid) {
        currentState = state.verified;
   }

    function setHalted() external  onlyBe returns(state) {

       require(currentState == state.paid || currentState == state.verified);
        token.transfer(traderAddress,token.balanceOf(this));
        currentState = state.halted;
      return currentState;
   }
    function setFinished() external  onlyBe inState(state.verified)  returns(state) {
        require(now < deadline);
        token.transfer(investerAddress,token.balanceOf(this));
        currentState = state.finished;
      return currentState;
   }
}
