import { test, expect } from '@playwright/test';

const BASE_URL = "https://api.demoblaze.com";


test.describe('Signup API', () => { test('TC_API_SINGUP_01 - Sign up with new user', async ({ request }) => {

    const password = Buffer.from('test1234').toString('base64');

    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: 'testuser_' + Date.now(),
            password: password
        },
    });

    expect(response.status()).toBe(200);

    const body = await response.text();
   
   expect(body.trim()).toBe('""');
    });
});




test('TC_API_SIGNUP_02 - Sign up with existinng user', async ({ request }) => {
    const password = Buffer.from('test1234').toString('base64');

    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: 'marija1988',
            password: password
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.errorMessage).toContain('This user already exist.');

});



test('TC_API_SIGNUP_03 - Should return error for empty username and password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: "",
            password: ""
        }
    });

     const body = await response.text();

    console.log('Status:', response.status());
    console.log('Body:', body);

//TODO: Should return 400 after backend fix

    expect(response.status()).toBe(500);

    expect(body).toContain('Internal Server Error');

});


test('TC_API_SIGNUP_04 - Should return error when username and password are null', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: null,
            password: null
        }
    });

    const body = await response.text();

     console.log('Status:', response.status());
    console.log('Body:', body);

//TODO: Should return 400 after backend fix

     expect(response.status()).toBe(500);

    expect(body).toContain('Internal Server Error');

});


test('TC_API_SIGNUP_05 - Should return error when username and password are missing', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
        data: {}
    });

    const body = await response.text();

     console.log('Status:', response.status());
    console.log('Body:', body);

    //TODO: Should return 400 after backend fix
    //Current behavior: returns 200 with error message

    expect(response.status()).toBe(200);

    expect(body).toContain('Bad parameter');

});


