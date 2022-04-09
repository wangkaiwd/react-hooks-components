module.exports = {
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    "testing-library/no-node-access": 0,
    "testing-library/no-container": 0,
    "react-hooks/exhaustive-deps": 0,
    "testing-library/render-result-naming-convention": 0
  }
};
