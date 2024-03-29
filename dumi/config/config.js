const path = require("path");
const logo = "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg";
const projectRoot = path.resolve(__dirname, "../../");
const config = {
  base: "/react-hooks-components",
  publicPath: "/react-hooks-components/",
  exportStatic: {}, // Export all routes as HTML directory structure to avoid 404 when refreshing the page
  chainWebpack (memo) {
    memo.plugins.delete("copy");
  },
  mode: "site",
  resolve: {
    includes: [path.resolve(__dirname, "../docs"), path.resolve(projectRoot, "src")],
    previewLangs: []
  },
  title: "React Practice",
  favicon: logo,
  logo,
  menus: {
    "/": [
      {
        title: "Home",
        path: "/index"
      },
      {
        title: "Record",
        path: "/record"
      }
    ]
  }
};
export default config;
