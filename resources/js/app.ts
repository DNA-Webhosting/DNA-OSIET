import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme } from './composables/useAppearance';

// Import icons config
import '..//icons/icons.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name: string): Promise<DefineComponent> => {
        const modulePages = import.meta.glob('../../Modules/*/resources/js/pages/**/*.vue', {
            eager: true
        });
        const appPages = import.meta.glob<{ default: DefineComponent }>('./pages/**/*.vue', {
            eager: true
        });

        if (name.includes('::')) {
          const [module, pagePath] = name.split('::');

          for (const path in modulePages) {
            if (path.includes(`Modules/${module}/`) && path.endsWith(`${pagePath}.vue`)) {
              return (modulePages[path] as { default: DefineComponent }).default;
            }
          }

          throw new Error(`Module page ${name} introuvable`);
        }

        for (const path in appPages) {
          if (path.endsWith(`${name}.vue`)) {
            return appPages[path].default;
          }
        }

        throw new Error(`Page ${name} introuvable`);
      },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })

        app.use(plugin)
        app.use(ZiggyVue)
        app.component('FontAwesomeIcon', FontAwesomeIcon)

        app.mount(el)
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
