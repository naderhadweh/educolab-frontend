module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Desactiva la verificación de PropTypes (puedes habilitarla si la necesitas)
    'react/react-in-jsx-scope': 'off', // Desactiva la verificación de React en el ámbito para React 17+
    'no-console': 'warn', // Advierte sobre el uso de console.log
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }], // Reporta variables no utilizadas
    'no-undef': 'error', // Reporta variables no definidas
    'semi': ['error', 'always'], // Exige el uso de punto y coma al final de las declaraciones
    'quotes': ['error', 'single'], // Utiliza comillas simples en lugar de dobles
    'indent': ['error', 2], // Utiliza una sangría de 2 espacios
    // Agrega más reglas según tus necesidades
    'arrow-spacing': ['error', { before: true, after: true }], // Espacios alrededor de las flechas en funciones arrow
    'object-curly-spacing': ['error', 'always'], // Espacios en las llaves de los objetos
    'comma-dangle': ['error', 'always-multiline'], // Coma al final en objetos y arrays multilinea
    'array-bracket-spacing': ['error', 'always'], // Espacios en los corchetes de arrays

    // Mejora de buenas prácticas y prevención de errores
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-undef': 'error',
    'no-console': 'warn',
    'no-extra-semi': 'error', // Evita puntos y coma innecesarios
    'eqeqeq': 'error', // Utiliza === y !== en lugar de == y !=
    'prefer-const': 'error', // Utiliza const en lugar de let cuando sea posible
    'no-var': 'error', // Evita el uso de var, utiliza let o const
    'curly': ['error', 'multi-line'], // Asegúrate de que los bloques en las estructuras de control tengan llaves

    // React y JSX
    'react/prop-types': 'off', // Desactiva la verificación de PropTypes (puedes habilitarla si la necesitas)
    'react/react-in-jsx-scope': 'off', // Desactiva la verificación de React en el ámbito para React 17+
    'react/jsx-uses-react': 'off', // Desactiva la advertencia sobre la importación de React para JSX (React 17+)
    'react/jsx-uses-vars': 'error',
  },
};
