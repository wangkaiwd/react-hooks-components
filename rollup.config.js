import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

const config = [{
  input: "./src/main.tsx",
  output: [
    { file: "build/antd.cjs.js", format: "cjs" },
    { file: "build/antd.es.js", format: "es" },
    {
      file: "build/antd.global.js",
      format: "iife",
      name: "Antd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "jsx"
      }
    }
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    resolve(),
    // https://github.com/rollup/rollup-plugin-commonjs/issues/407#issuecomment-527837831
    commonjs(),
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
    }),
    postcss()
  ]
},
  {
    input: "build/main.d.ts",
    output: [{ file: "build/antd.d.ts", format: "es" }],
    external: [/\.scss$/],
    plugins: [dts()]
  }
];
export default config;
