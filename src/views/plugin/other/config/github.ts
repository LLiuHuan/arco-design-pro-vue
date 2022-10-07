const githubConfig = {
  other_uri: 'http://github.com/login/oauth/authorize',
  redirect_uri: 'https://lliuhuan.github.io/arco-design-pro-vue/',
  client_id: '513f24d4d31cdc73f2c8',
  client_secret: 'c4d176cfebaa2c76529f70ab67f6d2b35a5a2115',
  access_token_uri: 'https://github.com/login/oauth/access_token',
  user_url: 'https://api.github.com/user',
};

if (import.meta.env.MODE === 'development') {
  githubConfig.redirect_uri = 'http://localhost:3200/arco-design-pro-vue/plugin/other';
  githubConfig.client_id = '0b90b86c3cf927529066';
  githubConfig.client_secret = '8b89c1766146f4b5ac488d3edb81a8824f293556';
}

export default githubConfig;
