import auth0 from "auth0-js"
import AuthConfig from './AuthConfig';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: AuthConfig.domain,
      audience: `https://${AuthConfig.domain}/userinfo`,
      clientID: AuthConfig.clientId,
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    console.log("is authenticated", new Date().getTime(), this.expiresAt)
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }



  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000/home',
      clientID: AuthConfig.clientId,
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;