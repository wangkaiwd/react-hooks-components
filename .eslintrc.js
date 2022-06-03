module.exports = {
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    "testing-library/no-node-access": 'off',
    "testing-library/no-container": 'off',
    "react-hooks/exhaustive-deps": 'off',
    "testing-library/render-result-naming-convention": 'off',
    "testing-library/no-unnecessary-act": 'off'
  }
};
