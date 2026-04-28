import { test, expect } from '@playwright/test';

const BASE_URL = "https://api.demoblaze.com";

test.describe('Products API', () => {

    test('TC_API_PRODUCT_01 - Get all products', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/entries`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.Items).toBeTruthy();
        expect(body.Items.length).toBeGreaterThan(0);

        // verify structure and data types of the first product
        const firstProduct = body.Items[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('title');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('cat');
        expect(typeof firstProduct.id).toBe('number');
        expect(typeof firstProduct.title).toBe('string');
        expect(typeof firstProduct.price).toBe('number');
    });

    test('TC_API_PRODUCT_02 - Get product by id', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/view`, {
            data: { id: "1" }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(1);
        expect(body.title).toBe("Samsung galaxy s6");
        expect(body.price).toBe(360.0);
        expect(body.cat).toBe("phone");
        expect(body.price).toBeGreaterThan(0);
        expect(body.img).toContain('.jpg');
    });

    test('TC_API_PRODUCT_03 - Get product with non-existing id', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/view`, {
            data: { id: "99999" }
        });

        // TODO: should return 404 after backend fix
        // current behavior: returns 200 with empty body
        console.log("Status:", response.status());
        console.log("Body:", await response.text());
    });

    test('TC_API_PRODUCT_04 - Get product with empty id', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/view`, {
            data: { id: "" }
        });

        // TODO: should return 400 after backend fix
        // current behavior: returns 500 Internnal Server Error

        const body = await response.text();

        expect(response.status()).toBe(500);
        expect(body).toContain('Internal Server Error');


        console.log("Status:", response.status());
        console.log("Body:", await response.text());
    });

});
