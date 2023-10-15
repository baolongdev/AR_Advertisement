module.exports = {
    async redirects() {
      return [
        {
          source: '/posts',
          destination: '/posts/1',
          permanent: true,
        },
        {
          source: '/docs',
          destination: '/docs/getting-started/introduction',
          permanent: true,
        },
      ]
    },
  }