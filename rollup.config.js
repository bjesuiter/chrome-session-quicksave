// import { rollup } from "rollup";
// https://www.npmjs.com/package/rollup-plugin-chrome-extension
import {chromeExtension} from 'rollup-plugin-chrome-extension';

// https://www.npmjs.com/package/rollup-plugin-postcss
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
// https://www.npmjs.com/package/rollup-plugin-empty-dir
import {emptyDir} from 'rollup-plugin-empty-dir';
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
		postcss({
			plugins: []
		}),
		typescript(),
		resolve(),
		emptyDir(),
		copy({
			assets: ['Readme.md', 'Changelog.md']
		}),
		zip({
			dir: 'dist'
		})
	]
};
