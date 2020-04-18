// import { rollup } from "rollup";

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {chromeExtension} from 'rollup-plugin-chrome-extension';

export default {
	input: 'src/manifest.json',
	output: {
		dir: 'dist',
		format: 'esm',
	},
	plugins: [
		// always put chromeExtension() before other plugins
		chromeExtension(),
		// the plugins below are optional
		resolve(),
		commonjs(),
	],
};
