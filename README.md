# Hack Western 4
A decentralized P2P lending platform built on the Ethereum blockchain.

![Landing Page](https://imgur.com/RPFIUuH.png)
![Lending Form](https://imgur.com/yyKY4Vz.png)
![Lender Dashboard](https://imgur.com/XL3JHjQ.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
To run this application you will need [Node.js](https://nodejs.org) (version 6.11.x). This will include `npm`, needed
to install dependencies. In order install these dependencies, you will also need [Python](https://www.python.org) (version 2.7.x) and
[git](https://git-scm.com/downloads). You will also need the [MetaMask](https://metamask.io/) plugin for Chrome.

### Building

1. Install truffle, and an Ethereum client. If you don't have a test environment, we recommend Ethereum TestRPC
  ```bash
  npm install -g truffle
  npm install -g ethereumjs-testrpc
  ```
  
2. Run your Ethereum client. For TestRPC:
  ```bash
  testrpc
  ```
Note the mnemonic 12-word phrase printed on startup, you will need it later.

3. Compile and migrate your contracts.
  ```bash
  truffle compile && truffle migrate
  ```

4. Run node server.
```bash
npm run build
```
### Configuration
1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the `testrpc` test accounts in MetaMask, using the 12-word phrase printed earlier.
    1. A detailed explaination of how to do this can be found [here](http://truffleframework.com/docs/advanced/truffle-with-metamask#using-the-browser-extension)
        1. Normally, the available test accounts will change whenever you restart `testrpc`.
        2. In order to receive the same test accounts every time you start `testrpc`, start it with a seed like this: `testrpc --seed 0` or `testrpc -m "put your mnemonic phrase here needs twelve words to work with MetaMask"`
3. Point MetaMask to `testrpc` by connecting to the network `localhost:8545` 

## Running

1. Run the app.
  ```bash
  npm run build
  ```
The app is now served on localhost:8080

2. Making sure you have configured MetaMask, visit http://localhost:8080 in your browser.

3. Loan and borrow Ether!

## Authors

* **[Henry Tran](https://github.com/hnrytrn)**
* **[Jonathan Fragkis](https://github.com/jfragg)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
