const manifest = {
	appDir: "_app",
	appPath: "innotes-web-app/_app",
	assets: new Set([".nojekyll"]),
	mimeTypes: {},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.93d3e205.js","imports":["_app/immutable/entry/start.93d3e205.js","_app/immutable/chunks/index.dada67a2.js","_app/immutable/chunks/singletons.615a2c91.js","_app/immutable/chunks/paths.4618a0f0.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.263e2800.js","imports":["_app/immutable/entry/app.263e2800.js","_app/immutable/chunks/index.dada67a2.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-7dd3c20d.js'),
			() => import('./chunks/1-0cdc32ee.js'),
			() => import('./chunks/2-81f315c2.js'),
			() => import('./chunks/3-f65df50c.js'),
			() => import('./chunks/4-209aed1b.js'),
			() => import('./chunks/5-f1894185.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/notes",
				pattern: /^\/notes\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set(["/innotes-web-app/","/innotes-web-app/notes/","/innotes-web-app/about/","/innotes-web-app/auth/"]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
