// import { rollup } from "rollup";

import {chromeExtension} from 'rollup-plugin-chrome-extension';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy2';
import zip from 'rollup-plugin-zip';

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
		resolve(),
		copy({
			assets: ['Readme.md', 'Changelog.md']
		}),
		zip({
			dir: 'dist'
		})
	]
};
