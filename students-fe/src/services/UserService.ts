import Keycloak from "keycloak-js";

const _kc = new (Keycloak as any)({
    "realm": "springboot-react",
    "auth-server-url": "http://localhost:8080/auth/",
    "ssl-required": "external",
    "resource": "student-ui-react",
    "public-client": true,
    "confidential-port": 0
  }
  );

const initKeycloak = (onAuthenticationCallback: any) => {
    _kc.init({
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then((authenticated: any) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            onAuthenticationCallback();
        })
        .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles: any) => roles.some((role: any) => _kc.hasRealmRole(role));

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
};

export default UserService;