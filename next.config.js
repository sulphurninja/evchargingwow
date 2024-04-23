const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  env: {
    "ACCESS_TOKEN_SECRET": "erufgyuvbsyudfybvisukfbvu6e6j5rte7ghi4eih76wiyrw7y7ihye7hg4yieyni7ynegynrie47g",
    "REFRESH_TOKEN_SECRET": "fby54uh54uhto4euiot5hh7th47t5h54yt74ith54th74fjkbhjdfkhkjdbvgdhdbdfhkbj",
  },
};

module.exports = nextConfig;
