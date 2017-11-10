pragma solidity ^0.4.15;

contract MercatusInstance {
    address public be;
    enum state { paid, verified, halted, finished}
    state public currentState;
    uint public deadline;
    uint public maxLoss;
    uint public startBallance;
    uint public targetBallance;
    uint256 public amount;
    string public invester;
    address public investerAddress;
    string public trader;
    address public traderAddress;
    function MercatusInstance(address _be, uint _deadline, uint _maxLoss, uint _startBallance, uint _targetBallance, uint256 _amount,  string _invester, address _investerAddress, string _trader, address _traderAddress){
        deadline = _deadline;
        maxLoss = _maxLoss;
        startBallance = _startBallance;
        targetBallance = _targetBallance;
        amount = _amount;
        invester = _invester;
        investerAddress = _investerAddress;
        trader = _trader;
        traderAddress = _traderAddress;
        currentState = state.paid;
        be = _be;
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
    function setVerified() external  onlyBe inState(state.paid) {
        currentState = state.verified;
   }

    function setHalted() external  onlyBe returns(state) {

        require(currentState == state.paid || currentState == state.verified);
        traderAddress.transfer(this.balance);
        currentState = state.halted;
      return currentState;
   }
    function setFinished(uint finishAmount) external  onlyBe inState(state.verified) {
        require(now < deadline);
        if(finishAmount<=startBallance){
          investerAddress.transfer(this.balance);
        }else if(finishAmount>targetBallance){
          traderAddress.transfer(this.balance);
        }
        else{
          traderAddress.transfer(((finishAmount-startBallance)/(targetBallance-startBallance))*this.balance);
          investerAddress.transfer(this.balance);
        }
        currentState = state.finished;
   }
   function () payable {
   }
}
