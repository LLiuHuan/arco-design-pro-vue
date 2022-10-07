const githubConfig = {
  other_uri: 'http://github.com/login/oauth/authorize',
  redirect_uri: 'https://lliuhuan.github.io/arco-design-pro-vue/',
  client_id: '',
  client_secret: '',
  access_token_uri: 'https://github.com/login/oauth/access_token',
  user_url: 'https://api.github.com/user',
};

if (import.meta.env.MODE === 'development') {
  githubConfig.redirect_uri = 'http://localhost:3200/arco-design-pro-vue/plugin/other';
  githubConfig.client_id = '';
  githubConfig.client_secret = '';
}

export default githubConfig;
