'use strict';

const outputModule = process.env.OUTPUT_MODULE;

const options = {
  presets: [
    ['@babel/preset-env',  {modules: outputModule || false}], '@babel/preset-react'
  ],
  plugins: [
    '@babel/proposal-object-rest-spread', '@babel/proposal-class-properties'
  ],
};

module.exports = options;