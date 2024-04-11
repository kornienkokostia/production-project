import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    redirects: path.resolve(__dirname, '_redirects'),
    buildRedirects: path.resolve(__dirname, 'build/_redirects'),
    favIcon: path.resolve(__dirname, 'public/favicon.svg'),
    buildFavIcon: path.resolve(__dirname, 'build/favicon.svg'),
  };

  const mode = env.mode || 'development';
  const PORT = env.port || 3000;
  const apiUrl = env.apiUrl || mode === 'development' ? 'http://localhost:8000' : 'https://iblog-server.onrender.com/';

  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl,
  });

  return config;
};
