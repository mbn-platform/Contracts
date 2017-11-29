pragma solidity ^0.4.15;

contract MercatusInstance {
    address public be = 0x10367bD202112F862d715D093C0B78E26BEcdc9C;
    enum state { paid, verified, halted, finished}
    enum currencyType { USDT, BTC}
    state public currentState;
    uint256 public start;
    uint256 public deadline;
    uint256 public maxLoss;
    uint256 public startBallance;
    uint256 public targetBallance;
    uint256 public amount;
    currencyType public currency;
    string public investor;
    address public investorAddress;
    string public trader;
    address public traderAddress;
    function MercatusInstance(uint duration, uint _maxLoss, uint _startBallance, uint _targetBallance, uint256 _amount,  string _investor, address _investorAddress, string _trader, address _traderAddress, uint _currency){
        require( _currency >= 0 &&  _currency < 2  );
        start = now;
        deadline = start + duration * 86400;
        maxLoss = _maxLoss;
        startBallance = _startBallance;
        targetBallance = _targetBallance;
        amount = _amount;
        currency = currencyType(_currency);
        investor = _investor;
        investorAddress = _investorAddress;
        trader = _trader;
        traderAddress = _traderAddress;
        currentState = state.paid;
    }
    function myAddr() public constant returns(address) {
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
  function getState() public constant returns (uint)  {
    return uint(currentState);
  }
  function getStart() public constant returns (uint256)  {
    return start;
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
          investorAddress.transfer(this.balance);
        }else if(finishAmount>targetBallance){
          traderAddress.transfer(this.balance);
        }
        else{
          traderAddress.transfer(((finishAmount-startBallance)/(targetBallance-startBallance))*this.balance);
          investorAddress.transfer(this.balance);
        }
        currentState = state.finished;
   }
   function () public payable {
   }
}
