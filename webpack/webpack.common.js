module.exports = resolve => ({
  entry: {
    'ng2-hal': ['./src']
  },

  output: {
    path: resolve('dist')
  },

  stats: {
    children: false,
    chunks: false,
    colors: true,
    hash: false,
    timings: true,
    version: false
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        include: [
          resolve('src'),
          resolve('test')
        ],
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  useBabel: true,
                  useCache: true
                }
              },
              { loader: 'tslint-loader' }
            ]
          },
          {
            test: /\.js$/,
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
});

