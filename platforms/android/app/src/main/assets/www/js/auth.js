// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        'signInSuccessWithAuthResult': function (authResult, redirectUrl) {
            // console.log("signed in");
            if (window.opener) {
                // The widget has been opened in a popup, so close the window
                // and return false to not redirect the opener.
                window.close();
                return false;
            } else {
                // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
                return true;
            }
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInFlow: 'popup',
    signInSuccessUrl: "/home.html",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
ui.start('#firebaseui-auth-container', uiConfig);
function signUserOut() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
    });
}
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         document.getElementById('appNavigator').pushPage('tabbar.html', {
//             data: {
//                 title: 'SmartSound'
//             }
//         }).then(function () {
//             setTimeout(loadData, 1000);
//             logMsg("Loading data");
//         }).catch(function (err) {
//             logMsg("Error: problem pushing page: " + err);
//         });
//     }
// });
/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
// var handleSignedInUser = function(user) {
//     document.getElementById('user-signed-in').style.display = 'block';
//     document.getElementById('user-signed-out').style.display = 'none';
//     document.getElementById('name').textContent = user.displayName;
//     document.getElementById('email').textContent = user.email;
//     document.getElementById('phone').textContent = user.phoneNumber;
//     if (user.photoURL) {
//         var photoURL = user.photoURL;
//         // Append size to the photo URL for Google hosted images to avoid requesting
//         // the image with its original resolution (using more bandwidth than needed)
//         // when it is going to be presented in smaller size.
//         if ((photoURL.indexOf('googleusercontent.com') != -1) ||
//             (photoURL.indexOf('ggpht.com') != -1)) {
//             photoURL = photoURL + '?sz=' +
//                 document.getElementById('photo').clientHeight;
//         }
//         document.getElementById('photo').src = photoURL;
//         document.getElementById('photo').style.display = 'block';
//     } else {
//         document.getElementById('photo').style.display = 'none';
//     }
// };
//
//
// /**
//  * Displays the UI for a signed out user.
//  */
// var handleSignedOutUser = function() {
//     document.getElementById('user-signed-in').style.display = 'none';
//     document.getElementById('user-signed-out').style.display = 'block';
//     ui.start('#firebaseui-container', getUiConfig());
// };
//
// // Listen to change in auth state so it displays the correct UI for when
// // the user is signed in or not.
// firebase.auth().onAuthStateChanged(function(user) {
//     document.getElementById('loading').style.display = 'none';
//     document.getElementById('loaded').style.display = 'block';
//     user ? handleSignedInUser(user) : handleSignedOutUser();
// });
//
// /**
//  * Deletes the user's account.
//  */
// var deleteAccount = function() {
//     firebase.auth().currentUser.delete().catch(function(error) {
//         if (error.code == 'auth/requires-recent-login') {
//             // The user's credential is too old. She needs to sign in again.
//             firebase.auth().signOut().then(function() {
//                 // The timeout allows the message to be displayed after the UI has
//                 // changed to the signed out state.
//                 setTimeout(function() {
//                     alert('Please sign in again to delete your account.');
//                 }, 1);
//             });
//         }
//     });
// };
//
//
// /**
//  * Handles when the user changes the reCAPTCHA or email signInMethod config.
//  */
// function handleConfigChange() {
//     var newRecaptchaValue = document.querySelector(
//         'input[name="recaptcha"]:checked').value;
//     var newEmailSignInMethodValue = document.querySelector(
//         'input[name="emailSignInMethod"]:checked').value;
//     location.replace(
//         location.pathname + '#recaptcha=' + newRecaptchaValue +
//         '&emailSignInMethod=' + newEmailSignInMethodValue);
//
//     // Reset the inline widget so the config changes are reflected.
//     ui.reset();
//     ui.start('#firebaseui-container', getUiConfig());
// }
//
/**
 * Initializes the app.
 */
// var initApp = function() {
//     document.getElementById('sign-in-with-redirect').addEventListener(
//         'click', signInWithRedirect);
//     document.getElementById('sign-in-with-popup').addEventListener(
//         'click', signInWithPopup);
//     document.getElementById('sign-out').addEventListener('click', function() {
//         firebase.auth().signOut();
//     });
//     document.getElementById('delete-account').addEventListener(
//         'click', function() {
//             deleteAccount();
//         });
//
//     document.getElementById('recaptcha-normal').addEventListener(
//         'change', handleConfigChange);
//     document.getElementById('recaptcha-invisible').addEventListener(
//         'change', handleConfigChange);
//     // Check the selected reCAPTCHA mode.
//     document.querySelector(
//         'input[name="recaptcha"][value="' + getRecaptchaMode() + '"]')
//         .checked = true;
//
//     document.getElementById('email-signInMethod-password').addEventListener(
//         'change', handleConfigChange);
//     document.getElementById('email-signInMethod-emailLink').addEventListener(
//         'change', handleConfigChange);
//     // Check the selected email signInMethod mode.
//     document.querySelector(
//         'input[name="emailSignInMethod"][value="' + getEmailSignInMethod() + '"]')
//         .checked = true;
// };

// window.addEventListener('load', initApp);