pragma solidity ^0.4.15;
contract MercatusTrades {
    address be = 0x873A2832898b17b5C12355769A7E2DAe6c2f92f7;
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
