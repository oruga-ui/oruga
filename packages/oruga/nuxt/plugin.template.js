import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'

Vue.use(Oruga, <%= JSON.stringify(options, null, 2) %>)