import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {fa} from 'vuetify/iconsets/fa'
import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
    theme:{

    },
    icons:{
        defaultSet: 'fa',
        sets:{
            fa
        }
    },
    components,
    directives
});

createApp(App).use(vuetify).mount('#app')
