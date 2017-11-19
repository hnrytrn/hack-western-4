pragma solidity ^0.4.11;
contract TestWallet {

    event Deposit(address indexed sender, uint value);
    event Execution(uint indexed transactionId);
    
    mapping (uint => Transaction) public transactions;
    uint public transactionCount;
    struct Transaction {
        address destination;
        uint value;
        bytes data;
        bool executed;
    }
    function()
        public
        payable
    {
        if (msg.value > 0)
            Deposit(msg.sender, msg.value);
    }
    function TestWallet()
        public
    {
        
    }
    function submitTransaction(address destination, uint value, bytes data)
        public
        returns (uint transactionId)
    {
        transactionId = addTransaction(destination, value, data);
    }
    function executeTransaction(uint transactionId)
        public
    {
        Transaction storage txToExecute = transactions[transactionId];
        txToExecute.executed = true;
        if (txToExecute.destination.call.value(txToExecute.value)(txToExecute.data))
            Execution(transactionId);
            
    }
    function addTransaction(address destination, uint value, bytes data)
    internal
    returns (uint transactionId)
    {
        transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination: destination,
            value: value,
            data: data,
            executed: false
        });
        transactionCount = transactionCount + 1;
    }
}