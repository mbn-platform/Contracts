pragma solidity ^0.4.15;

import './MercatusInstance.sol';
contract MercatusFactory {
    function makeInstance(uint _duration, uint256 _maxLoss, uint256 _startBalance, uint256 _targetBalance, uint256 _amount,  string _investor, address _investorAddress, string _trader, address _traderAddress, uint256 offer, uint _currency)
    payable public {
      require(msg.value >= _amount);
        MercatusInstance mI =  (new MercatusInstance(_duration, _maxLoss, _startBalance, _targetBalance, _amount , _investor, _investorAddress, _trader, _traderAddress, _currency));
        address instanceAddr = mI.myAddr();
        spawnInstance(msg.sender,instanceAddr, mI.getStart(), offer);
        instanceAddr.transfer(msg.value);
    }
    event spawnInstance(address indexed from, address indexed instance, uint256 start, uint256 offer);
}
