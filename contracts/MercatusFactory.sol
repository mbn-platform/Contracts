pragma solidity ^0.4.15;

import './MercatusInstance.sol';
contract MercatusFactory {
    function makeInstance(uint _duration, uint _maxLoss, uint _startBalance, uint _targetBalance, uint _amount,  string _investor, address _investorAddress, string _trader, address _traderAddress, uint offer, uint _currency)
    payable public {
      require(msg.value >= _amount);
        MercatusInstance mI =  (new MercatusInstance(_duration, _maxLoss, _startBalance, _targetBalance, _amount , _investor, _investorAddress, _trader, _traderAddress, _currency));
        address instanceAddr = mI.myAddr();
        spawnInstance(msg.sender,instanceAddr, mI.getStart(), offer);
        instanceAddr.transfer(msg.value);
    }
    event spawnInstance(address indexed from, address indexed instance, uint start, uint offer);
}
