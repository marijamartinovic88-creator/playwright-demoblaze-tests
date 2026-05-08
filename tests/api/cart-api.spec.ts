import { test, expect } from '@playwright/test';
import { getAuthToken } from './utils/apiHelper';

const BASE_URL = "https://api.demoblaze.com";

test.describe('Cart API', () => {

    test('TC_API_CART - Add and view cart', async ({ request }) => {
  const token = await getAuthToken(request);

  // 1️⃣ ADD TO CART
  const addResponse = await request.post(`${BASE_URL}/addtocart`, {
    data: {
      id: Date.now().toString(),
      cookie: token,
      prod_id: 1,
      flag: false
    }
  });

  console.log('Add status:', addResponse.status());

  const addBody = await addResponse.text();
  console.log('Add Body:', addBody);

  expect(addResponse.status()).toBe(200);

  // 2️⃣ VIEW CART
  const viewResponse = await request.post(`${BASE_URL}/viewcart`, {
    data: {
      cookie: token,
      flag: false
    }
  });

  console.log('View status:', viewResponse.status());

  

  expect(viewResponse.status()).toBe(200);

  const body = await viewResponse.json();

  console.log('Body:', body);


  expect(body.Items).toBeTruthy();
  expect(body.Items.length).toBeGreaterThan(0);

  const hasProduct = body.Items.some((item: any) => item.prod_id === 1);
  expect(hasProduct).toBe(true);
   });



   // BUG / SECURITY ISSUE:
   // API returns status 200 OK and cart Items even when no authentication token/cookie is provided.
   // Expected behavior: API should return 401 Unauthorized.
   

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
