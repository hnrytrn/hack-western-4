// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import "../css/home.css"
import "../css/borrower.css"
import "../css/lender.css"

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import test_wallet_artifacts from '../../build/contracts/TestWallet.json'
var TestWallet = contract(test_wallet_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the TestWallet abstraction for Use.
    TestWallet.setProvider(web3.currentProvider);
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      // self.refreshBalance();
      self.getBalance();
    });
  },

  setStatus: function (message) {
    // var status = document.getElementById("status");
    // status.innerHTML = message;
  },

  getBalance: function () {
    return web3.eth.getBalance(account, function (error, result) {
      if (!error) {
        console.log(result.toNumber());
        $("#port-val").text(web3.fromWei(result, "ether").toFixed(3));
      } else {
        console.error(error);
      }
    })
  },

  // refreshBalance: function() {
  //   var self = this;

  //   var meta;
  //   MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account, {from: account});
  //   }).then(function(value) {
  //     var balance_element = document.getElementById("balance");
  //     balance_element.innerHTML = value.valueOf();
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error getting balance; see log.");
  //   });
  // },

  depositLoan: function () {
    var self = this;

    var amount = parseInt(document.getElementById("loan-input").value);
    this.setStatus("Initiating deposit... (please wait)");

    var meta;
    return TestWallet.deployed().then(function (instance) {
      meta = instance;
      // localStorage.setItem("contract", instance.address);
      instance.sendTransaction({ from: account, value: web3.toWei(amount) }).then(function (result) {
        console.log("transaction sent");
      });
    }).then(function () {
      self.setStatus("Transaction complete!");
      self.getBalance();
    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

  requestLoan: function () {
    var self = this;
    var amount = parseInt(document.getElementById("borrow-input").value);
    this.setStatus("Initiating request... (please wait)");

    var meta;
    return TestWallet.deployed().then(function (instance) {
      meta = instance;
      instance.submitTransaction(account, web3.toWei(amount), "0x", {from: account}).then(function (result) {
        return meta.transactionCount.call({from: account});
      }).then(function(count) {
        return meta.executeTransaction(parseInt(count.toLocaleString()) - 1, {from: account});
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }).then(function() {
      self.setStatus("payment complete!");
      self.getBalance();
    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
