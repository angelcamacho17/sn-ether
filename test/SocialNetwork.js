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
        let result, postCount;

        before(async() => {
            result = await socialNetwork.createPost('This is my first post', {from: author});
            postCount = await socialNetwork.postCount();
        })

        it('creates posts', async() => {
            // SUCCESS
            assert.equal(1, postCount);
            const id = await result.logs[0].args.id
            const content = await result.logs[0].args.content
            const tip = await result.logs[0].args.tipAmount
            const x = await result.logs[0].args.author

            assert.equal(id.toNumber(), postCount, 'id is correct');
            assert.equal(content, 'This is my first post', 'content is correct');
            assert.equal(tip.toNumber(), 0, 'tip is correct');
            assert.equal(x, author, 'author is correct');

            await socialNetwork.createPost('', {from: author}).should.be.rejected;
        })

        it('list posts', async() => {
            const post = await socialNetwork.posts(postCount);
            // SUCCESS
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct');
            assert.equal(post.content, 'This is my first post', 'content is correct');
            assert.equal(post.tipAmount.toNumber(), 0, 'tip is correct');
            assert.equal(post.author, author, 'author is correct');
        })

        it('allow user to tip posts', async() => {
            // Tip the poster
            let  oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await socialNetwork.tipPost(postCount, {from: tipper, value: web3.utils.toWei('1', 'Ether') })
            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, 'This is my first post', 'content is correct')
            assert.equal(event.tipAmount, web3.utils.toWei('1', 'Ether'), 'tip is correct')
            assert.equal(event.author, author, 'author is correct');

            // Check that author recieved funds
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('1', 'Ether')
            tipAmount = new web3.utils.BN(tipAmount)

            const expectedBalance = oldAuthorBalance.add(tipAmount);

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

            // FAILURE: Tries to tip a post that does not exits

            await socialNetwork.tipPost(99, {from: tipper, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
        })
    })
})