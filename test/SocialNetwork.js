const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork;

    before(async() => {
        socialNetwork = await SocialNetwork.deployed();
    })

    describe('deployment', async() => {
        it('deploys succesfully', async() => {
            const address = await socialNetwork.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
        it('has a name', async() => {
            const name = await socialNetwork.name()
            assert.equal('Angels Social Network', name);
        })
    })

    describe('post', async() => {
        let first, second, third, postCount;

        before(async() => {
            first = await socialNetwork.createPost('This is my first post', true, {from: author});
            second = await socialNetwork.createPost('This is my second post', true, {from: author});
            third = await socialNetwork.createPost('This is my third post', true, {from: tipper});

            postCount = await socialNetwork.records();
        })

        it('creates public and personal posts', async() => {
            // SUCCESS
            assert.equal(3, postCount);
            const id = await third.logs[0].args.id
            const content = await third.logs[0].args.content
            const tip = await third.logs[0].args.tipAmount
            const x = await third.logs[0].args.author

            assert.equal(id.toNumber(), postCount, 'id is correct');
            assert.equal(content, 'This is my third post', 'content is correct');
            assert.equal(tip.toNumber(), 0, 'tip is correct');
            assert.equal(x, tipper, 'author is correct');

            await socialNetwork.createPost('', true, {from: author}).should.be.rejected;
        })

        it('list personal posts', async() => {
            const post = await socialNetwork.personalPosts(tipper, 1);
            const personalCounter = await socialNetwork.postPersonalCounter(tipper);
            // SUCCESS
            assert.equal(post.content, 'This is my third post', 'content is correct');
            assert.equal(post.tipAmount.toNumber(), 0, 'tip is correct');
            assert.equal(post.author, tipper, 'author is correct');
        })

        it('list posts', async() => {
            const post = await socialNetwork.posts(postCount);
            // SUCCESS
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct');
            assert.equal(post.content, 'This is my third post', 'content is correct');
            assert.equal(post.tipAmount.toNumber(), 0, 'tip is correct');
            assert.equal(post.author, tipper, 'author is correct');
        })

        it('allow user to tip posts', async() => {
            // Tip the poster
            let  oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            first = await socialNetwork.tipPost(1, {from: tipper, value: web3.utils.toWei('2', 'Ether') })
            second = await socialNetwork.tipPost(2, {from: tipper, value: web3.utils.toWei('3', 'Ether') })
            // SUCCESS
            const fst = first.logs[0].args
            assert.equal(fst.id.toNumber(), postCount, 'id is correct')
            assert.equal(fst.content, 'This is my first post', 'content is correct')
            assert.equal(fst.tipAmount, web3.utils.toWei('2', 'Ether'), 'tip is correct')
            assert.equal(fst.author, author, 'author is correct');

            const sec = second.logs[0].args
            assert.equal(sec.tipAmount, web3.utils.toWei('3', 'Ether'), 'tip is correct')

            // Check that author recieved funds
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('5', 'Ether')
            tipAmount = new web3.utils.BN(tipAmount)

            const expectedBalance = oldAuthorBalance.add(tipAmount);

            const post = await socialNetwork.personalPosts(author, 2);
            assert.equal(post.tipAmount, web3.utils.toWei('3', 'Ether'), 'personal tip is correct')

            // assert.equal(newAuthorBalance.toString(), expectedBalance.toString(), 'no equal balances');

            // FAILURE: Tries to tip a post that does not exits

            await socialNetwork.tipPost(99, {from: tipper, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
        })

    })

    describe('following', async() => {
        let postMaker;
        
        it('account followed', async() => {
            postMaker = await socialNetwork.followAccount(author, {from: tipper, value: web3.utils.toWei('1.5', 'Ether')})

            // SUCCESS
            const result = postMaker.logs[0].args
            assert.equal(author, result.postMaker);
            assert.equal(tipper, result.follower);
            assert.equal(web3.utils.toWei('1.5', 'Ether'), result.amountPaid);
        })
    })
})