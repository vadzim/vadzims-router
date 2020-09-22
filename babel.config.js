module.exports = {
	presets: [
		[require.resolve("@babel/preset-env"), { targets: { node: "current" } }],
	],
	plugins: [
		[require.resolve("@babel/plugin-transform-modules-commonjs"), { loose: true }],
		require.resolve("@babel/plugin-transform-strict-mode"),
		require.resolve("babel-plugin-add-module-exports"),
	],
}
