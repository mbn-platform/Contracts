pragma solidity ^0.4.15;

import './MercatusInstance.sol';
contract MercatusFactory {
    function makeInstance(uint _duration, uint256 _maxLoss, uint256 _startBallance, uint256 _targetBallance, uint256 _amount,  string _investor, address _investorAddress, string _trader, address _traderAddress, uint256 offer)
    payable
    returns (address){
      require(msg.value >= _amount);
        MercatusInstance mI =  (new MercatusInstance(_duration, _maxLoss, _startBallance, _targetBallance, _amount , _investor, _investorAddress, _trader, _traderAddress));
        address instanceAddr = mI.myAddr();
        spawnInstance(msg.sender,instanceAddr,offer);
        instanceAddr.transfer(msg.value);
        return instanceAddr;
    }
    event spawnInstance(address indexed from, address indexed instance, uint256 offer);
}
