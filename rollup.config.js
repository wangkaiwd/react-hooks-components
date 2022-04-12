import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import React from "react";
import ReactDOM from "react-dom";

const config = {
  input: "./src/main.tsx",
  output: [
    { file: "build/antd.cjs.js", format: "cjs" },
    { file: "build/antd.es.js", format: "es" },
    { file: "build/antd.global.js", format: "iife", name: "Antd" }
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    resolve(),
    // https://github.com/rollup/rollup-plugin-commonjs/issues/407#issuecomment-527837831
    commonjs(),
    postcss(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          outDir: "build",
          declaration: true
        },
        exclude: [
          "src/**/__tests__/**",
          "src/**/*.spec.{ts,tsx}",
          "src/**/*.test.{ts,tsx}"
        ]
      }
    })
  ]
};
export default config;
