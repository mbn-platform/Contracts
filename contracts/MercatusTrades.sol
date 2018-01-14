pragma solidity ^0.4.15;
contract MercatusTrades {
    address be = 0x10367bD202112F862d715D093C0B78E26BEcdc9C;
    uint[] trades;
    modifier onlyBe() {
        require(msg.sender == be);
        _;
    }
    function addTradesBlock(uint hash) onlyBe public{
        trades.push(hash);
        TradesBlock(hash);
    }
    event TradesBlock(
        uint hash
    );
}
