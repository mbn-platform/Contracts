pragma solidity ^0.4.15;

import './MercatusInstance.sol';
contract MercatusFactory {
    function makeInstance(address _be, uint _deadline, uint _maxLoss, uint _startBallance, uint _targetBallance, uint256 _amount,  string _invester, address _investerAddress, string _trader, address _traderAddress, uint256 offer)
    payable
    returns (address){
      require(msg.value >= _amount);
        MercatusInstance mI =  (new MercatusInstance(_be, _deadline, _maxLoss, _startBallance, _targetBallance, _amount , _invester, _investerAddress, _trader, _traderAddress));
        address instanceAddr = mI.myAddr();
        spawnInstance(msg.sender,instanceAddr,offer);
        instanceAddr.transfer(msg.value);
        return instanceAddr;
    }
    event spawnInstance(address indexed from, address indexed instance, uint256 offer);
}
