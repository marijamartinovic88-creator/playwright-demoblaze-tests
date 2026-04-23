import { APIRequestContext } from '@playwright/test';

const BASE_URL = "https://api.demoblaze.com";

export async function getAuthToken(request: APIRequestContext): Promise<string> {
    const password = Buffer.from("1234").toString("base64");
    const loginResponse = await request.post(`${BASE_URL}/login`, {
        data: { username: "marija1988", password: password }
    });
    const loginBody = await loginResponse.text();
    return loginBody.replace("Auth_token: ", "").replace(/"/g, "").trim();
}
