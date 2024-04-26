/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/* eslint-disable @liferay/no-dynamic-require */

const fs = require('fs');
const path = require('path');

let buildSass = require('../sass/build');
let runTSC = require('../typescript/runTSC');
const createAmd2EsmExportsBridges = require('../utils/createAmd2EsmExportsBridges');
const createEsm2AmdCustomBridges = require('../utils/createEsm2AmdCustomBridges');
const createEsm2AmdExportsBridges = require('../utils/createEsm2AmdExportsBridges');
const createEsm2AmdIndexBridge = require('../utils/createEsm2AmdIndexBridge');
const createTempFile = require('../utils/createTempFile');
let expandGlobs = require('../utils/expandGlobs');
const getMergedConfig = require('../utils/getMergedConfig');
const instrument = require('../utils/instrument');
let minify = require('../utils/minify');
const parseBnd = require('../utils/parseBnd');
let runBabel = require('../utils/runBabel');
let runBridge = require('../utils/runBridge');
let runBundler = require('../utils/runBundler');
let runWebpackAsBundler = require('../utils/runWebpackAsBundler');
const setEnv = require('../utils/setEnv');
const validateConfig = require('../utils/validateConfig');
let webpack = require('./webpack');

const CWD = process.cwd();

({
	buildSass,
	expandGlobs,
	minify,
	runBabel,
	runBridge,
	runBundler,
	runTSC,
	runWebpackAsBundler,
	webpack,
} = instrument({
	buildSass,
	expandGlobs,
	minify,
	runBabel,
	runBridge,
	runBundler,
	runTSC,
	runWebpackAsBundler,
	webpack,
}));

/**
 * Main script that runs all all specified build tasks synchronously.
 *
 * Babel and liferay-npm-bundler are run unless the disable flag is set,
 * liferay-npm-bridge-generator and webpack are run if the corresponding
 * ".npmbridgerc" and "webpack.config.js" files, respectively, are
 * present.
 * `minify()` is run unless `NODE_ENV` is `development`.
 */
module.exports = async function (...args) {
	const bnd = parseBnd();
	if (bnd && bnd['Fragment-Host']) {
		throw new Error(
			'`liferay-npm-scripts build` is not compatible with OSGI fragment modules, see LPD-19872.'
		);
	}

	const config = getMergedConfig('npmscripts');

	createTempFile('npmscripts.config.json', JSON.stringify(config, null, 2), {
		autoDelete: false,
	});

	const {build: BUILD_CONFIG} = config;

	if (!BUILD_CONFIG) {
		throw new Error('npmscripts.config.js is missing required "build" key');
	}

	setEnv('production');

	validateConfig(
		BUILD_CONFIG,
		['input', 'output', 'dependencies', 'temp'],
		'liferay-npm-scripts: `build`'
	);

	const inputPathExists = fs.existsSync(BUILD_CONFIG.input);

	const pkgJson = require(path.resolve('package.json'));

	if (inputPathExists) {
		const isTypeScript = fs.existsSync('tsconfig.json');

		if (isTypeScript && BUILD_CONFIG.tsc !== false) {
			await runTSC();
		}

		if (BUILD_CONFIG.babel !== false) {
			const ignores = [];

			if (BUILD_CONFIG.babel?.ignores) {
				BUILD_CONFIG.babel.ignores.forEach((ignore) => {
					ignores.push('--ignore');
					ignores.push(ignore);
				});
			}

			runBabel(
				BUILD_CONFIG.input,
				'--out-dir',
				BUILD_CONFIG.output,
				'--source-maps',
				'--extensions',
				'.cjs,.es,.es6,.js,.jsx,.mjs,.ts,.tsx',
				...ignores
			);
		}
	}

	if (fs.existsSync('webpack.config.js')) {
		webpack(...args);
	}

	if (BUILD_CONFIG.bundler) {
		runBundler();
	}

	if (Array.isArray(BUILD_CONFIG.exports) || BUILD_CONFIG.main) {
		fs.mkdirSync(BUILD_CONFIG.output, {recursive: true});

		if (!BUILD_CONFIG.bundler) {
			const newPkgJson = {
				...pkgJson,
			};

			newPkgJson.main = 'index.js';
			delete newPkgJson.dependencies;
			delete newPkgJson.devDependencies;

			fs.writeFileSync(
				path.join(BUILD_CONFIG.output, 'package.json'),
				JSON.stringify(newPkgJson, null, '\t'),
				'utf8'
			);
		}

		await runWebpackAsBundler(CWD, BUILD_CONFIG, getMergedConfig('babel'));

		let manifest;

		try {
			manifest = require(path.resolve(
				BUILD_CONFIG.output,
				'manifest.json'
			));
		} catch (error) {
			manifest = {
				packages: {
					'/': {
						dest: {
							dir: '.',
							id: '/',
							name: pkgJson.name,
							version: pkgJson.version,
						},
						modules: {},
						src: {
							id: '/',
							name: pkgJson.name,
							version: pkgJson.version,
						},
					},
				},
			};
		}

		if (BUILD_CONFIG.main) {
			createEsm2AmdIndexBridge(CWD, BUILD_CONFIG, manifest);
		}

		createEsm2AmdExportsBridges(CWD, BUILD_CONFIG, manifest);

		createEsm2AmdCustomBridges(CWD, BUILD_CONFIG, manifest);

		fs.writeFileSync(
			path.join(BUILD_CONFIG.output, 'manifest.json'),
			JSON.stringify(manifest, null, '\t'),
			'utf8'
		);
	} else if (BUILD_CONFIG.exports) {
		// TODO: remove this once migration to webpack is done

		createAmd2EsmExportsBridges(
			CWD,
			BUILD_CONFIG.output,
			BUILD_CONFIG.exports
		);
	}

	if (fs.existsSync(path.join(CWD, '.npmbridgerc'))) {
		runBridge();
	}

	if (process.env.NODE_ENV !== 'development') {
		await minify();
	}

	if (inputPathExists) {
		buildSass(path.join(CWD, BUILD_CONFIG.input), {
			imports: BUILD_CONFIG.sassIncludePaths,
			outputDir: BUILD_CONFIG.output,
			rtl: true,
		});
	}
};
