import { createVuePlugin } from 'vite-plugin-vue2';
import Inspector from "vite-plugin-vue-inspector";
import { svgBuilder } from '../src/plugin/svgBuilder'; 
import legacy from "@vitejs/plugin-legacy";
import path from 'path';
export default () => {
	return [
        svgBuilder(path.resolve(process.cwd(), 'src/assets/svg') + '/'),
		createVuePlugin(),
        Inspector({
            vue: 2,
        }),
		legacy({
			targets:['chrome 52'],  // 需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills:['regenerator-runtime/runtime'] // 面向IE11时需要此插件
        }),
	];
};
