module.exports = {
	extends: [
		"eslint:recommended",
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:destructuring/recommended",
		"plugin:jest-dom/recommended",
		"plugin:prettier/recommended", // let prettier handle all formatting issues
		"plugin:react/recommended",
		"plugin:security/recommended-legacy",
		"plugin:testing-library/react",
	],
	plugins: ["destructuring", "prettier", "security"],
	rules: {
		"array-callback-return": "error",
		camelcase: ["error", { properties: "always" }],
		complexity: ["error", { max: 10 }],
		"destructuring/in-params": "off",
		"handle-callback-err": ["error", "^(err|error)$"],
		"import/no-named-as-default": "error",
		"logical-assignment-operators": ["error", "always"],
		"no-case-declarations": "off",
		"no-cond-assign": ["error", "always"],
		"no-debugger": "error",
		"no-eval": "error",
		"no-floating-decimal": "error",
		"no-implicit-coercion": [
			"error",
			{ boolean: false, number: true, string: true },
		],
		"no-implicit-globals": "error",
		"no-invalid-this": "error",
		"no-nested-ternary": "error",
		"no-new": "error",
		"no-param-reassign": ["error", { props: true }],
		"no-restricted-modules": ["error", "fs", "cluster"],
		"no-shadow": "error",
		"no-shadow-restricted-names": "error",
		"no-unreachable": "error",
		"no-unused-expressions": "error",
		"no-unused-labels": "error",
		"no-useless-catch": "error",
		"no-useless-constructor": "error",
		"no-useless-escape": "error",
		"no-useless-return": "error",
		"no-var": "error",
		"no-with": "error",
		"object-shorthand": "error",
		"one-var": ["error", "never"],
		"prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
		"react/prefer-read-only-props": "error",
		"prefer-rest-params": "error",
		"prettier/prettier": "warn",
		"react-hooks/exhaustive-deps": "error",
		"react/no-danger": "error",
		"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{ allowExpressions: true },
		],
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],
		"react/react-in-jsx-scope": "off",
		"security/detect-object-injection": "off",
		"react/prop-types": "off",
		"react/jsx-props-no-spreading": ["error", { explicitSpread: "ignore" }],
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: true,
			},
		},
	],
};
