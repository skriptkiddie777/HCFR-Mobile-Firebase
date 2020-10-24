/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

var config = {
    apiKey: "AIzaSyC7Z8MMdzJTmeh1mPZt1Ln3wq9DdJbFiSU",
    authDomain: "hcfr-guide.firebaseapp.com",
    databaseURL: "https://hcfr-guide.firebaseio.com",
    projectId: "hcfr-guide",
    storageBucket: "hcfr-guide.appspot.com",
    messagingSenderId: "394617753192",
    appId: "1:394617753192:web:7d925f4fed1d2c24c9b5dd",
    measurementId: "G-RTTK2HRLYB"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID = 'YOUR_OAUTH_CLIENT_ID';
