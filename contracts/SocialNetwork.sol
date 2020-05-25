pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public records = 0;
    mapping(uint => Post) public posts;
    mapping(address => mapping(uint => Post)) public personalPosts;
    Post public myPost;
    mapping(address => uint) public postPersonalCounter;

    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address payable author;
        bool publicPost;
    }

    event PostCreated (
        uint id,
        string content,
        uint tipAmount,
        address author,
        bool publicPost
    );

    event PostTipped (
        uint id,
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
        // Create the post
        Post memory _post = Post(records, _content, 0, msg.sender, _publicPost);
        posts[records] = _post;
        // Create the post for each author
        postPersonalCounter[msg.sender] = postPersonalCounter[msg.sender] + 1;
        personalPosts[msg.sender][postPersonalCounter[msg.sender]] = Post(records, _content, 0, msg.sender, _publicPost);
        // Emit post created
        emit PostCreated(records, _content, 0, msg.sender, _publicPost);
    }

    function tipPost(uint _id) public payable {
        require(_id > 0 && _id <= records, 'The post must exist.');
        // Fetch the post to tip
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author by sendin them ether
        address(_author).transfer(msg.value);
        // Increment amout of tip
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit PostTipped(records, _post.content, _post.tipAmount, _author, _post.publicPost);
    }
}