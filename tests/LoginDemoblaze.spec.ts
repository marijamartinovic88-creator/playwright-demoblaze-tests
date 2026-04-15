import { LoginPage } from '../pages/LoginPage';
import { test, expect } from './BaseTest';
//Uvozimo proširenu test funkciju iz BaseTest




//  U argumente test funkcije prosledjujemo objekte onih pages stranica koje koristimo u testu

  test('TC_01 - valid user can log in on Demoblaze', async ({ loginPage, homePage }) => {
    await homePage.openLogIn();
    await loginPage.login("marija1988", "1234");
    await loginPage.assertLoggedInSuccess();
     });

  test('TC_2 - login shows error with invalid creddentials on Demoblaze', async ({ homePage, loginPage}) => {
    await homePage.openLogIn();
    await loginPage.acceptDialogWithMessage("User does not exist.");
    await loginPage.login("marija19888", "12345");
   });




   