//Example: Data-driven testing approach for Login API
//Used ffor demonstration of scalable test design

import { test, expect } from '@playwright/test';

const BASE_URL = "https://api.demoblaze.com";

const loginTestData = [
    { 
        description: "valid credentials", 
        username: "marija1988", 
        password: "1234", 
        expectedBody: "Auth_token",
        expectedStatus: 200
    },
    { 
        description: "wrong password", 
        username: "marija1988", 
        password: "wrongPassword", 
        expectedBody: "Wrong password.",
        expectedStatus: 200
    },
    { 
        description: "non-existing user", 
        username: "nepostojeci123", 
        password: "1234", 
        expectedBody: "User does not exist.",
        expectedStatus: 200
    },
];

test.describe('Login API - Data Driven', () => {

    for (const data of loginTestData) {
        test(`TC_API_DD - Login with ${data.description}`, async ({ request }) => {
            const password = Buffer.from(data.password).toString('base64');

            const response = await request.post(`${BASE_URL}/login`, {
                data: {
                    username: data.username,
                    password: password
                }
            });

            expect(response.status()).toBe(data.expectedStatus);

            const body = await response.text();
            expect(body).toContain(data.expectedBody);
        });
    }





  });
