import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
	//main.js call on all pages
	{
		input: '_dev/js/main/main.js',
		output: {
			file: 'dist/js/main-bundle.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			sourcemap: true
		},
		plugins: [
			resolve(), // tells Rollup how to find date-fns in node_modules
			commonjs(), // converts date-fns to ES modules
			production && terser() // minify, but only in production
		]
	},
	// specifics scripts
	{
		input: '_dev/js/specific/specific-for-test.js',
		output: {
			file: 'dist/js/specific/specific-for-test.js',
			format: 'iife',
			sourcemap: true
		},
		plugins: [
			resolve(),
			commonjs(),
			production && terser()
		]
	}];
