import { Injectable, Output, EventEmitter } from '@angular/core';
import SocialNetwork from '../../abis/SocialNetwork.json';
import Web3 from 'web3';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

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
  @Output() posted = new EventEmitter<boolean>();


  constructor(private router: Router) {
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/notrunning']);
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
    // const networkId = await web3.eth.net.getId();
    //const networkData = SocialNetwork.networks[networkId];
    const abi = JSON.parse('[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"postMaker","type":"address"},{"indexed":false,"internalType":"address","name":"follower","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountPaid","type":"uint256"}],"name":"AccountFollowed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"personalId","type":"uint256"},{"indexed":false,"internalType":"string","name":"content","type":"string"},{"indexed":false,"internalType":"uint256","name":"tipAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"author","type":"address"},{"indexed":false,"internalType":"bool","name":"publicPost","type":"bool"}],"name":"PostCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"personalId","type":"uint256"},{"indexed":false,"internalType":"string","name":"content","type":"string"},{"indexed":false,"internalType":"uint256","name":"tipAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"author","type":"address"},{"indexed":false,"internalType":"bool","name":"publicPost","type":"bool"}],"name":"PostTipped","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"_content","type":"string"},{"internalType":"bool","name":"_publicPost","type":"bool"}],"name":"createPost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_postMaker","type":"address"}],"name":"followAccount","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"followers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myPost","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"personalId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"tipAmount","type":"uint256"},{"internalType":"address payable","name":"author","type":"address"},{"internalType":"bool","name":"publicPost","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"personalPosts","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"personalId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"tipAmount","type":"uint256"},{"internalType":"address payable","name":"author","type":"address"},{"internalType":"bool","name":"publicPost","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"postPersonalCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"personalId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"tipAmount","type":"uint256"},{"internalType":"address payable","name":"author","type":"address"},{"internalType":"bool","name":"publicPost","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"records","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tipPost","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]');

    const socialNetwork = web3.eth.Contract(abi, '0xb6ff7F9249F3B3A3eDd715E649b6eE96FaEeBcE1');
    this.socialNetwork = socialNetwork;
    const postCount = await socialNetwork.methods.records().call();
    this.postCount = postCount;
    // this.loadPosts(postCount, socialNetwork);
    for (let i = 1; i <= await postCount; i++) {
      // tslint:disable-next-line: no-shadowed-variable
      const post = await socialNetwork.methods.posts(i).call();
      this.posts = [...this.posts, post];
      // this.posts = this.posts.sort((a, b) => b.tipAmount - a.tipAmount);
    }
  }

  async loadPosts(postCount: number, socialNetwork: any) {
    // Load Posts
  }

  async createPost(content: string, publicPost: boolean) {
    this.posted.emit(true);
    const created = await this.socialNetwork.methods.createPost(content, publicPost).send({ from: this.account });
    console.log(created);
    if (created) {
      console.log('finished');
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
    const socialNetwork = web3.eth.Contract(SocialNetwork.abi, '0xb6ff7F9249F3B3A3eDd715E649b6eE96FaEeBcE1');
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
    const socialNetwork = web3.eth.Contract(SocialNetwork.abi, '0xb6ff7F9249F3B3A3eDd715E649b6eE96FaEeBcE1');
    const post = await socialNetwork.methods.followers(this.profileWatched, this.account).call();
    this.notFollower = post;
    console.log(this.notFollower);
  }

  async follow() {
    const web3 = window.web3;
    this.socialNetwork.methods.followAccount(this.profileWatched).send( {from: this.account, value: 1});

  }
}
