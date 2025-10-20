import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// Configuration des alias pour les modules
const moduleAliases = readdirSync('./Modules').reduce((acc, moduleName) => {
    acc[`@/${moduleName}`] = resolve(__dirname, `Modules/${moduleName}/resources/js`);
    return acc;
}, {});

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.ts',
                // Les entrées des modules seront ajoutées dynamiquement ici
            ],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),
    ],
    resolve: {
        alias: {
            ...moduleAliases,
            '@': resolve(__dirname, 'resources/js'),
        },
    },
});
