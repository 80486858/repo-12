/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

export type BuildType = 'bundler2' | 'customElement' | 'themeSpritemap';

export default interface LiferayJson {
	build?: {
		options?: BuildConfig;
		type?: BuildType;
	};
	deploy?: {
		path?: string;
	};
	start?: {
		port?: number;
	};
}

export type BuildConfig = Bundler2BuildConfig | CustomElementBuildConfig;

export type Bundler2BuildConfig = {};

export interface CustomElementBuildConfig {
	externals: {[bareIdentifier: string]: string} | string[];
	htmlElementName?: string;
	portletCategoryName?: string;
}
