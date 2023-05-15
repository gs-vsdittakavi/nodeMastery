const request = require('supertest');
const app = require('../expressServer');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Post = require('../model/post');

describe('Post routes',() => {

    let token;

    beforeEach(async () => {

        await User.deleteMany({});


        const user = new User({
            email: 'test@example.com',
            name: 'Test User',
            password: 'password'
        });

        await user.save();

        //genereate the token for user

        token = jwt.sign({email: user.email, id: user._id}, '10x_academy_node_mastery');

        //we can try using nock library to mock the token
    })
    
    afterAll(async () => {
        await User.deleteMany({});
    });

    

    describe('POST /createPost', () => {

        it('should create a new post', async () => {
            const post = {
                title: 'Test Post',
                content: 'This is a test post'
            };

            const response = await request(app)
            .post('/post/createPost')
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(201);


            expect(response.body.message).toBe('record saved successfully!');
            expect(response.body.data.title).toBe(post.title);
            expect(response.body.data.content).toBe(post.content);
            expect(response.body.data.author).toBeDefined();

            //verify if the post is saved in DB
            

        });

    });

});