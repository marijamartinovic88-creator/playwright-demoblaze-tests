import { test, expect } from '@playwright/test';
import { getAuthToken } from './utils/apiHelper';

const BASE_URL = "https://api.demoblaze.com";

test.describe('Cart API', () => {

    test('TC_API_CART_01 - Add product to cart', async ({ request }) => {
        const token = await getAuthToken(request);

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

    test('TC_API_CART_02 - View cart', async ({ request }) => {
        const token = await getAuthToken(request);

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

        const hasProduct = body.Items.some((item: any) => item.prod_id === 1);
        expect(hasProduct).toBe(true);
    });

    test('TC_API_CART_03 - View cart without token', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/viewcart`, {
            data: {
                cookie: "",
                flag: false
            }
        });

        console.log("Status:", response.status());
        console.log("Body:", await response.text());
    });

});
