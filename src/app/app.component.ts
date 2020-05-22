import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'dapp-client';
  public account = null;
  public balance = '';

  async ngOnInit() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();

    this.account = accounts[0];

    const ethBalance = await web3.eth.getBalance(this.account);
    this.balance = window.web3.utils.fromWei(ethBalance, 'Ether');

    // Load Token
    // const networkId =  await web3.eth.net.getId()
    // const tokenData = Token.networks[networkId]
    // if(tokenData) {
    //   const token = await new web3.eth.Contract(Token.abi, tokenData.address)
    //   console.log(token);
    //   if (token) {
    //     this.setState({ token })
    //     const tokenBalance = await token.methods.balanceOf(this.state.account).call()

    //     if(tokenBalance) {
    //       console.log(tokenBalance.toString());
    //       this.setState({ tokenBalance: tokenBalance.toString() })
    //     }
    //   }
    // } else {
    //   window.alert('Token contract not deployed to detected network.')
    // }

    // // Load EthSwap
    // const ethSwapData = EthSwap.networks[networkId]
    // if(ethSwapData) {
    //   const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
    //   this.setState({ ethSwap })
    // } else {
    //   window.alert('EthSwap contract not deployed to detected network.')
    // }

    // this.setState({ loading: false })
  }
}
