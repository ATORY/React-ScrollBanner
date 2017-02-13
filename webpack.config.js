module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "./dist/bundle.js",
  },
  // entry: { 
  //   index: "./src/index.tsx", 
  //   info: "./src/page/InfoPage.tsx", 
  //   main: "./src/page/MainPage.tsx",
  // },
  // output: { filename: "./dist/[name].js" },

  // Enable sourcemaps for debugging webpack's output.
  // devtool: process.env.NODE_ENV === 'production' ? "" : "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }

    ],

    // preLoaders: [
    //   // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    //   { test: /\.js$/, loader: "source-map-loader" }
    // ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  }
}

// var webpack = require('webpack');

// var isProd = (process.env.NODE_ENV === 'production');

// // Conditionally return a list of plugins to use based on the current environment.
// // Repeat this pattern for any other config key (ie: loaders, etc).
// function getPlugins() {
//   var plugins = [];

//   // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
//   // inside your code for any environment checks; UglifyJS will automatically
//   // drop any unreachable code.


//   // Conditionally add plugins for Production builds.
//   if (isProd) {
//     plugins.push(new webpack.optimize.UglifyJsPlugin());
//     plugins.push(new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify("production")
//       }
//     }));
//   }
//   // Conditionally add plugins for Development
//   else {
//     // ...
//   }
//   return plugins;
// }

// module.exports = {
//   entry: "./src/index.tsx",
//   output: {
//     filename: "./dist/bundle.js",
//   },
//   // entry: { 
//   //   index: "./src/index.tsx", 
//   //   info: "./src/page/InfoPage.tsx", 
//   //   main: "./src/page/MainPage.tsx",
//   // },
//   // output: { filename: "./dist/[name].js" },

//   // Enable sourcemaps for debugging webpack's output.
//   devtool: process.env.NODE_ENV === 'production' ? "" : "source-map",

//   resolve: {
//     // Add '.ts' and '.tsx' as resolvable extensions.
//     extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
//   },

//   module: {
//     loaders: [
//       // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
//       { test: /\.tsx?$/, loader: "ts-loader" },
//       {test: /\.less$/, loader: 'style!css!less'},

//     ],

//     // preLoaders: [
//     //   // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
//     //   { test: /\.js$/, loader: "source-map-loader" }
//     // ]
//   },

//   // When importing a module whose path matches one of the following, just
//   // assume a corresponding global variable exists and use that instead.
//   // This is important because it allows us to avoid bundling all of our
//   // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM",
//   //   'react-addons-transition-group': 'React.addons.TransitionGroup',
//   //   'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
//   //   "react-router": "ReactRouter",
//   //   "redux": "Redux",
//   //   "react-redux": "ReactRedux",
//   //   "react-router-redux": "ReactRouterRedux",
//   //   "redux-thunk": "ReduxThunk",
//   //   // "cropperjs": "Cropper",
//   //   "marked": "marked",
//   //   "highlight.js": "hljs",
//   //   // "socket.io-client": "io"
//   //   // "Trianglify": "Trianglify"
  // },
//   // plugins: [new webpack.optimize.CommonsChunkPlugin("chunk.js"), ...getPlugins()]
//   // plugins: [...getPlugins()]
// };
