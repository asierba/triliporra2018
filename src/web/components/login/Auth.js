import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    const rootUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    this.auth0 = new auth0.WebAuth({
      domain: 'trilita.eu.auth0.com',
      clientID: 'B8PZTFcd5LDXiYkaDiruHemnOp25QhOV',
      redirectUri: `${rootUrl}/callback`,
      audience: 'https://trilita.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise(resolve => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        }
      });
    });

  }

  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
