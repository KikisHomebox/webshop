module.exports = {
  extends: ['@remix-run/eslint-config', 'plugin:hydrogen/recommended'],
  rules: {
    // Disable specific hydrogen rule
    'hydrogen/prefer-image-component': 'off',

    // Disable specific ESLint core rules
    'no-useless-escape': 'off',
    'no-case-declarations': 'off',

    // Disable jsx-a11y rules
    'jsx-a11y/aria-props': 'off',
    'jsx-a11y/aria-proptypes': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    'jsx-a11y/aria-unsupported-elements': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
  },
};
