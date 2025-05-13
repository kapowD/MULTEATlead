// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   entry: './src/index.tsx',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/',
//     assetModuleFilename: 'assets/images/[name][ext]'
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.jsx']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'assets/images/[name][ext]'
//         }
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'assets/fonts/[name][ext]'
//         }
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html'
//     }),
//     new MiniCssExtractPlugin({
//       filename: '[name].css'
//     })
//   ],
//   devServer: {
//     historyApiFallback: true,
//     hot: true,
//     static: {
//       directory: path.join(__dirname, 'public'),
//     }
//   }
// }; 