const config = {
  base: "/react-storybook",
  publicPath: "/react-storybook/",
  exportStatic: {}, // Export all routes as HTML directory structure to avoid 404 when refreshing the page
  chainWebpack (memo) {
    memo.plugins.delete("copy");
  },
  mode: "site",
  title: "React Practice",
  favicon: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg",
  logo: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg",
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
