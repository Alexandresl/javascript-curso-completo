//const firebase = require('firebase');
// require('firebase/firestore');

import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';




export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyAwcXBm4t3obZssJN4m5zKhiV8H9KQmJBM",
            authDomain: "whatsapp-clone-9b7cc.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-9b7cc.firebaseio.com",
            projectId: "whatsapp-clone-9b7cc",
            storageBucket: "gs://whatsapp-clone-9b7cc.appspot.com",
            messagingSenderId: "765187096293"
        };
        this.init();
        this._initialized = false;

    }

    init() {
        
        if (!window._initializedFirebase) {

            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                timestampsInSnapshots: true

            });

            window._initializedFirebase = true;

        }

    }

    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

    initAuth() {

        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result => {

                    let token = result.credential.accessToken;
                    let user = result.user;
                    
                    resolve({
                        user, 
                        token
                    });

                })
                .catch(err => {

                    reject(err);
                    

                });

        });

    }

}