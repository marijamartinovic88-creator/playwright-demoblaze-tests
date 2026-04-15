import { test, expect } from '@playwright/test';

const BASE_URL = "https://api.demoblaze.com";


test("TC_API_01 - Sign up sa novim korisnikom", async ({ request }) => {
    const password = Buffer.from("test1234").toString("base64");

    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: "testuser_" + Date.now(),
            password: password
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.text();
   
   expect(body.trim()).toBe('""');
});

test("TC_API_02 - Sign up sa postojećim korisnikom", async ({ request }) => {
    const password = Buffer.from("test1234").toString("base64");

    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: "marija1988",
            password: password
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("This user already exist.");
});

test("TC_API_03 - Sign up sa praznim poljima", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
            username: "",
            password: ""
        }
    });

    expect(response.status()).toBe(500);

    const body = await response.text();
    expect(body).toContain("Internal Server Error");
});









test("TC_API_04 - Login sa ispravnim kredencijalima", async ({ request }) => {
    const password = Buffer.from("1234").toString("base64");

    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            username: "marija1988",
            password: password
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("Auth_token");
    
});


test("TC_API_05 - Login sa pogrešnom lozinkom", async ({ request }) => {
    const wrongPassword = Buffer.from("wrongPassword").toString("base64");

    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            username: "marija1988",
            password:  wrongPassword
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.text();
     console.log("Body:", body);

    expect(body).toContain("Wrong password");
});

test("TC_API_06 - Login sa praznim poljima", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            username: "",
            password: ""
        }
    });

    expect(response.status()).toBe(500);

    const body = await response.text();
   // console.log("Body:", body);

     expect(body).toContain("Internal Server Error");
});



test("TC_API_07 - Dohvati sve proizvode", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/entries`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.Items).toBeTruthy();
    expect(body.Items.length).toBeGreaterThan(0);
});

test("TC_API_08 - Provjeri detalje proizvoda", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/view`, {
        data: {
            id: "1"
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.title).toBe("Samsung galaxy s6");
    expect(body.price).toBe(360.0);
    expect(body.cat).toBe("phone");
});




test("TC_API_09 - Dodaj proizvod u korpu", async ({ request }) => {
    const password = Buffer.from("1234").toString("base64");

    const loginResponse = await request.post(`${BASE_URL}/login`, {
        data: { username: "marija1988", password: password }
    });
    const loginBody = await loginResponse.text();
    const token = loginBody.replace("Auth_token: ", "").replace(/"/g, "").trim();

    const response = await request.post(`${BASE_URL}/addtocart`, {
        data: {
            id: "dr5ghbnjk",
            cookie: token,
            prod_id: 1,
            flag: false
        }
    });

    expect(response.status()).toBe(200);
});


test("TC_API_10 - Provjeri korpu", async ({ request }) => {
    const password = Buffer.from("1234").toString("base64");

    const loginResponse = await request.post(`${BASE_URL}/login`, {
        data: { username: "marija1988", password: password }
    });
    const loginBody = await loginResponse.text();
    const token = loginBody.replace("Auth_token: ", "").replace(/"/g, "").trim();

    const response = await request.post(`${BASE_URL}/viewcart`, {
        data: {
            cookie: token,
            flag: false
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.Items).toBeTruthy();
    expect(body.Items.length).toBeGreaterThan(0);
    expect(body.Items[0].prod_id).toBe(1);
});




