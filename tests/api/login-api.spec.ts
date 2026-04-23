import { test, expect } from '@playwright/test';

const BASE_URL = "https://api.demoblaze.com";


test.describe('Login API', () => { test('TC_API_LOGIN_01 - Log in with valid credentials', async ({ request }) => {
 const password = Buffer.from('1234').toString('base64');

    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            username: 'marija1988',
            password: password
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

     console.log('Status:', response.text());
    console.log('Body:', body);


    expect(body).toContain("Auth_token");
});
    




//Should return error for innvalid password

test("TC_API_LOGIN_02 - Log in with invalid password", async ({ request }) => {

    const wrongPassword = Buffer.from('wrongPassword').toString('base64');

    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            username: 'marija1988',
            password:  wrongPassword
        }
    });

    const body = await response.json();
     console.log('Body:', body);

     //TODO: Should return 401/400 after backend fix
     //Current behavior: returns 200 with errorMessage (BUG)

     expect(response.status()).toBe(200);

    expect(body.errorMessage).toContain('Wrong password.');
});



test("TC_API_LOGIN_03 - Should return error for non-existing user ", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            username: "!$&§$%",
            password: "$$$$$"
        }
    });

     const body = await response.json();
   console.log("Body:", body);

//TODO: Should return 401/400 after backend fix
//Current behavior: returns 200 with errorMessage (BUG)

   expect(response.status()).toBe(200);

     expect(body.errorMessage).toContain('User does not exist.');
});


});





