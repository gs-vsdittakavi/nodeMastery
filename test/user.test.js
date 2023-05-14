const request = require('supertest');
const app = require('../expressServer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

// in unit testing we will not call actual mongo DB to save records
//we wil mock it or fake it

describe('test /user and its apis', () => {

    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
    });


    describe('POST /register', () => {

        it('should register a new user', async () => {

            const userData = {
                email: 'test@example.com',
                name: 'Test User',
                password: 'password'
            }

            //supertest

            const response = await request(app).post('/user/register').send(userData).expect(201);

            const res= JSON.parse(response.text);
            expect(res.message).toBe('User registered successfully!');

            // Verify the user details

            const {email, name} = res.data;
            expect(email).toBe(userData.email);
            expect(name).toBe(userData.name);

            // verify if the user is saved in the database

            const savedUser = await User.findOne({email: userData.email});
            expect(savedUser).toBeTruthy();
            expect(await bcrypt.compare(userData.password, savedUser.password)).toBe(true);

        });

        it('should return an error if failed to create user', async () => {
            
            // simulate a faulre in saving the user
            jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('Failed to create user!'));

            const userData = {
                email: 'test@example.com',
                name: 'Test User',
                password: 'password'
            }

            const response = await request(app).post('/user/register').send(userData).expect(500);

            const res= JSON.parse(response.text);
            expect(res.message).toBe('Failed to create user!');

        });


        it('should return an error if failed to encrypt', async () => {
            
            // simulate a faulre in saving the user
            jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error('Encryption failed'));

            const userData = {
                email: 'test@example.com',
                name: 'Test User',
                password: 'password'
            }

            const response = await request(app).post('/user/register').send(userData).expect(500);

            const res= JSON.parse(response.text);
            expect(res.message).toBe('Internal server error');

        });

    })

    // describe('POST /login', () => {


    // })


})
