import { Injectable, Output, EventEmitter } from '@angular/core';
import SocialNetwork from '../../abis/SocialNetwork.json';
import Web3 from 'web3';
import { Observable, of } from 'rxjs';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public socialNetwork: any;
  public postCount = 0;
  public posts = [];
  public account = '';
  public balance = 0;
  public currentUserPublicPosts = [];
  public currentUserPrivatePosts = [];
  public notFollower;
  public profileWatched = null;
  public profileImg = null;
  @Output() profilePostsFetched$: EventEmitter<any> = new EventEmitter();

  constructor() { }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
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
    if (this.posts.length !== 0) {
      return;
    }
    const web3 = window.web3;
    // Network ID9
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    if (networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address);
      this.socialNetwork = socialNetwork;
      const postCount = await socialNetwork.methods.records().call();
      this.postCount = postCount;
      // this.loadPosts(postCount, socialNetwork);
      for (let i = 1; i <= await postCount; i++) {
        // tslint:disable-next-line: no-shadowed-variable
        const post = await socialNetwork.methods.posts(i).call();
        this.posts = [...this.posts, post];
      }
      // this.posts = this.posts.sort((a, b) => b.tipAmount - a.tipAmount);
      } else {
       window.alert('SocialNetwork contract not deployed to detected network.');
    }
  }

  async loadPosts(postCount: number, socialNetwork: any) {
    // Load Posts
  }

  async createPost(content: string, publicPost: boolean) {
    const created = await this.socialNetwork.methods.createPost(content, publicPost).send({ from: this.account });
    console.log(created);
    if (created) {
    }
  }

  public tipPost(id: any, tip: number): void {
    const web3 = window.web3;

    this.socialNetwork.methods.tipPost(id).send({ from: this.account , value: web3.utils.toWei(tip.toString(), 'Ether')});
  }

  public setProfileWatched(profile: any, img: any): void {
    this.profileImg = img;
    this.profileWatched = profile;
  }

  // Get posts of the user profile to watch
  async getProfilePosts() {
    this.currentUserPublicPosts = [];
    this.currentUserPrivatePosts = [];
    const web3 = window.web3;
    // Network ID9
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address);
    const posts = await socialNetwork.methods.postPersonalCounter(this.profileWatched).call();

    for (let i = 1; i <= await posts; i++) {
      // tslint:disable-next-line: no-shadowed-variable
      const post = await socialNetwork.methods.personalPosts(this.profileWatched, i).call();
      if (post.publicPost) {
        this.currentUserPublicPosts = [...this.currentUserPublicPosts, post];
      } else {
        this.currentUserPrivatePosts = [...this.currentUserPrivatePosts, post];
      }
    }
    // Emit event after fetching all the posts to navigate to the user's profile.
    // This event is listened by the home component.
    const result = {
      publics: this.currentUserPublicPosts,
      privates:  this.currentUserPrivatePosts
    };
    this.checkIfFollower();
    this.profilePostsFetched$.next(result);
  }

  async checkIfFollower() {
    const web3 = window.web3;
    // Network ID9
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address);
    const post = await socialNetwork.methods.followers(this.profileWatched, this.account).call();
    this.notFollower = post;
    console.log(this.notFollower);
  }

  async follow() {
    const web3 = window.web3;
    this.socialNetwork.methods.followAccount(this.profileWatched).send( {from: this.account, value: web3.utils.toWei('1', 'Ether')});

  }
}
