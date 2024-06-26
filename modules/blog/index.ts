import { defineNuxtModule } from '@nuxt/kit'
import { join } from 'path'
import type { Nuxt } from '@nuxt/schema'
import { createResolver, installModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module - in this case a local modal
    name: 'blog-module',
    // The key in `nuxt.config` that holds the
    configKey: 'blog-module',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.9.0',
    },
  },
  async setup(options: any, nuxt: Nuxt) {
    // Auto register components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: join(__dirname, 'components'),
      })
    })

    // Auto register composables
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(__dirname, './composables'))
    })

    // Auto register pages
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        name: 'blog',
        path: '/blog',
        file: resolve(__dirname, './pages/blog.vue'),
      })
    })

    const { resolve } = createResolver(import.meta.url)
    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolve('./components/**/*.{vue,mjs,ts}'),
            resolve('./*.{mjs,js,ts}')
          ]
        }
      }
    })
  },
})
