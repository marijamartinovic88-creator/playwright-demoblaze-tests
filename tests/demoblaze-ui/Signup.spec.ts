import { BasePage } from '../../pages/BasePage';
import { SignUpPage } from '../../pages/SignUpPage';
import { test, expect } from './BaseTest';




test('TC_01 - User can signup with new valid credentials', async ({ signUpPage, homePage }) => {
    await homePage.homePageLoaded();
    await homePage.openSignup();
    await signUpPage.assertSignUpSuccess();
    await signUpPage.signUp( 'testuser_' + Date.now(),
                            'test1234');
    
});


test('TC_02 - User cannot signup with existing username', async ({ signUpPage, homePage }) => {
    await homePage.homePageLoaded();
    await homePage.openSignup();
    await signUpPage.acceptDialogWithMessage('This user already exist.');
    await signUpPage.signUp('marija1988', '1234');

});



test('TC_03 - User cannot signup both fields empty', async ({ signUpPage, homePage }) => {

    await homePage.homePageLoaded();
    await homePage.openSignup();
     await signUpPage.acceptDialogWithMessage('Please fill out Username and Password.');
     await signUpPage.signUp('' , '');

});


test('TC_04 - Empty username only', async ({ signUpPage, homePage }) => {
    await homePage.homePageLoaded();
    await homePage.openSignup();
    await signUpPage.acceptDialogWithMessage('Please fill out Username and Password.');
    await signUpPage.signUp('' , '1234');

});


