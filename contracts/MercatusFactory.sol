pragma solidity ^0.4.15;

import './MercatusInstance.sol';
contract MercatusFactory {
    function makeInstance(address _token, address _be, uint _deadline, uint _maxLoss, uint _startBallance, uint _targetBallance, uint _amount,  string _invester, address _investerAddress, string _trader, address _traderAddress)
    returns (address){
        MercatusInstance mI =  (new MercatusInstance(_token, _be, _deadline, _maxLoss, _startBallance, _targetBallance, _amount , _invester, _investerAddress, _trader, _traderAddress));
        spawnInstance(msg.sender,mI.myAddr());
        return mI.myAddr();
    }
    event spawnInstance(address indexed from, address indexed instance);
}
