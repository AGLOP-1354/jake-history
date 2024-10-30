const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  mode: 'production',
  entry: './src/ckeditor.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ckeditor.js',
    library: 'ClassicEditor',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { injectType: 'singletonStyleTag' } },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                },
                minify: true
              })
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/, // SVG 및 이미지 파일 처리 추가
        use: ['raw-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx','.js', '.jsx', '.json', '.css'] // CSS 확장자 추가
  }
};
