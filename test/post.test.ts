const request = require('supertest');
const app = require('../expressServer');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Post = require('../model/post');

describe('Post routes',() => {

    let token;

    beforeEach(async () => {

        await User.deleteMany({});
        await Post.deleteMany({});



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
        await Post.deleteMany({});
    });

    

    describe('POST /createPost', () => {

        const post = {
            title: 'Test Post',
            content: 'This is a test post'
        };

        it('should create a new post', async () => {
            
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

            const savedPost = await Post.findById(response.body.data._id);

            expect(savedPost).toBeTruthy();
            expect(savedPost.title).toBe(post.title);
            expect(savedPost.content).toBe(post.content);
            expect(savedPost.author.toString()).toBe(response.body.data.author);
        });


        it('should return an error if failed to save post', async () => {

            jest.spyOn(Post.prototype, 'save').mockRejectedValueOnce(new Error('Failed to save'));

            const response = await request(app)
            .post('/post/createPost')
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(500);

            expect(response.body.message).toEqual('Failed to save!');
            // expect(response.body.data).toBe('Failed to save');

        });


        it('should return an error if authentication failed', async () => {

            const response = await request(app)
            .post('/post/createPost')
            .send(post)
            .expect(401);

            expect(response.body.message).toEqual('Authentication failed');

        });

    });


    describe('GET /getPosts', () => {



        it('should fetch all posts', async () => {

            const postData = [
                {
                    id: 1,
                    title: 'Post 1',
                    content: 'Post 1 content',
                    author: 'sfkjsflsfs'
                },
                {
                    id: 2,
                    title: 'Post 2',
                    content: 'Post 2 content',
                    author: 'rerjkehrjke'
                }
            ]

            jest.spyOn(Post, 'find').mockResolvedValueOnce(postData);

            const response = await request(app).get('/post/getPosts');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Fetched posts successfully!');
            expect(response.body.data[0].title).toBe(postData[0].title);

        })

    });

});