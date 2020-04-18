// import { rollup } from "rollup";

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {chromeExtension} from 'rollup-plugin-chrome-extension';
import copy from 'rollup-plugin-copy2';
import zip from 'rollup-plugin-zip';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/manifest.json',
	output: {
		dir: 'build',
		format: 'esm'
	},
	plugins: [
		// always put chromeExtension() before other plugins
		chromeExtension(),
		typescript(),
		// the plugins below are optional
		resolve(),
		commonjs(),
		copy({
			assets: ['Readme.md', 'Changelog.md']
		}),
		zip({
			dir: 'dist'
		})
	]
};
