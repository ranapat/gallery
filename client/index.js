/**
 * Main file
 *
 * Includes app and handles production env
 * Adds promise-polyfill fallback
 */

import './promise-polyfill'
import { app } from './app'

if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

app.$mount('#app')
