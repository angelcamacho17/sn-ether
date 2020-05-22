import { Injectable } from '@angular/core';
import SocialNetwork from '../../abis/SocialNetwork.json';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public socialNetwork: any;
  public postCount = 0;
  public posts = [];
  public account = '';
  public balance = 0;

  constructor() { }

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
  }

  async loadPost() {
    const web3 = window.web3;
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    if (networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address);
      this.socialNetwork = socialNetwork;
      const postCount = await socialNetwork.methods.postCount().call();
      this.postCount = postCount;
      // Load Posts
      for (let i = 1; i <= await postCount; i++) {
        // tslint:disable-next-line: no-shadowed-variable
        const post = await socialNetwork.methods.posts(i).call();
        this.posts = [...this.posts, post];
      }
      // Sort posts. Show highest tipped posts first
      // this.posts = this.posts.sort((a, b) => b.tipAmount - a.tipAmount );
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.');
    }
  }

  public createPost(content: string): void {
    this.socialNetwork.methods.createPost(content).send({ from: this.account }).call();  
  }
}
