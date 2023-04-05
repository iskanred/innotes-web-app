import { c as create_ssr_component, e as escape } from './index-0aa569f6.js';
import { b as base } from './paths-6ab807e2.js';

const css = {
  code: "header.svelte-5v768q{text-align:center;background-color:#dedddd;padding:10px}nav.svelte-5v768q{height:100%;width:100%;display:flex;justify-content:space-between}a.svelte-5v768q{font-size:36pt;font-weight:bold;margin-left:10px;margin-right:10px}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header class="svelte-5v768q"><nav class="svelte-5v768q"><a href="${escape(base, true) + "/"}" class="svelte-5v768q">Innotes</a>
        <a href="${escape(base, true) + "/notes/"}" class="svelte-5v768q">My Notes</a>
        <a href="${escape(base, true) + "/about/"}" class="svelte-5v768q">About</a>
        <a href="${escape(base, true) + "/auth/"}" class="svelte-5v768q">Log in</a></nav></header>

${slots.default ? slots.default({}) : ``}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-22f96204.js.map
