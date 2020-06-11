pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public records = 0;
    mapping(uint => Post) public posts;
    mapping(address => mapping(uint => Post)) public personalPosts;
    mapping(address => mapping(address => bool)) public followers;
    Post public myPost;
    mapping(address => uint) public postPersonalCounter;

    struct Post {
        uint id;
        uint personalId;
        string content;
        uint tipAmount;
        address payable author;
        bool publicPost;
    }

    event AccountFollowed(
        address postMaker,
        address follower,
        uint amountPaid
    );

    event PostCreated (
        uint id,
        uint personalId,
        string content,
        uint tipAmount,
        address author,
        bool publicPost
    );

    event PostTipped (
        uint id,
        uint personalId,
        string content,
        uint tipAmount,
        address author,
        bool publicPost

    );

    constructor() public {
        name = 'Angels Social Network';
    }

    function createPost(string memory _content, bool _publicPost) public {
        require(bytes(_content).length>0,'the content should not be blank.');
        // Increment post count
        records ++;
        // Increment personal counters
        postPersonalCounter[msg.sender] = postPersonalCounter[msg.sender] + 1;
        // Create the post
        Post memory _post = Post(records, postPersonalCounter[msg.sender], _content, 0, msg.sender, _publicPost);
        posts[records] = _post;
        // Create the post for each author
        personalPosts[msg.sender][postPersonalCounter[msg.sender]] = posts[records];
        // Emit post created
        emit PostCreated(records, postPersonalCounter[msg.sender], _content, 0, msg.sender, _publicPost);
    }

    function tipPost(uint _id) public payable {
        require(_id > 0 && _id <= records, 'The post must exist.');
        // Fetch the post to tip
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author by sending them ether
        address(_author).transfer(msg.value);
        // Increment amout of tip
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post for public and each author
        posts[_id] = _post;
        personalPosts[_post.author][_post.personalId] = _post;
        // Trigger an event
        emit PostTipped(records, _post.personalId, _post.content, _post.tipAmount, _author, _post.publicPost);
    }

    function followAccount(address payable _postMaker) public payable {
        require(msg.value >= 1, 'must pay more than one ether to subscribe');
        // Fetch the author
        address payable _author = _postMaker;
        // Pay the author by sending them ether
        address(_author).transfer(msg.value);
        followers[_author][msg.sender] = true;
        // Trigger an event
        emit AccountFollowed(_author, msg.sender, msg.value);
    }

}