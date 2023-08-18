export const oidcConfig = {
    authority: 'https://localhost:5001',
    client_id: 'bff',
    redirect_uri: 'http://localhost:4200/auth-callback',
    client_secret: 'secret',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:4200/home',
    scope: 'api_pm openid profile',
  };
