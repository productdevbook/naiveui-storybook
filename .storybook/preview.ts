import { app } from '@storybook/vue3'
import { themes } from '@storybook/theming';
import 'uno.css'
import vueRouter from 'storybook-vue3-router'
import {
  NConfigProvider,
  NGlobalStyle,
} from 'naive-ui'
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'

import naive from 'naive-ui'
app.use(naive)
const isDark =
    typeof window !== `undefined`
        ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        : null

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', right: '🇺🇸', title: 'English' },
        { value: 'tr-TR', right: '🇹🇷', title: 'Turkce' },
        { value: 'rw-RW', right: '🇷🇼', title: 'Kinyarwanda' },
        { value: 'fr-FR', right: '🇫🇷', title: 'Français' },
        { value: 'zh-CN', right: '🇨🇳', title: '简体中文' },
        { value: 'ja-JP', right: '🇯🇵', title: '日本語' },
        { value: 'hi-IN', right: '🇮🇳', title: 'हिन्दी' },
      ],
    },
  },
}

export const parameters = {
    // layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    darkMode: {
        stylePreview: true,
        darkClass: 'dark',
        lightClass: 'light',
        current: isDark ? "dark" : "light",
    },
    previewTabs: {
        docs: {
            hidden: false,
            theme: isDark ? themes.dark : themes.light,
        }
    },
    options: {
        storySort: {
            method: 'alphabetical',
        },
    },
    backgrounds: {
        values: [
            {
                name: 'bg',
                value: '#121417',
            },
            {
                name: 'wh',
                value: '#F8F5F2',
            },
        ],
    }
}



export const decorators = [
  vueRouter(),
   (story, context) => ({
    components: { story, NConfigProvider, NGlobalStyle },
    template: `
    <NConfigProvider>
    <NGlobalStyle></NGlobalStyle>
      <story />
    </NConfigProvider>`,
    props: {
      locale: {
        type: String,
        default: 'en-US',
      },
    },
    watch: {
      locale: {
        handler() {
          // console.log(i18n.global.locale.value)
        // i18n.global.locale.value = context.globals.locale;
        // i18n.global.fallbackLocale.value = context.globals.locale;
        // language(i18n.global.t);
        //   let dir = context.globals.locale === 'ar' ? 'rtl' : 'ltr';
        //   document.querySelector('html').setAttribute('dir', dir);
        (document.querySelector('html') as HTMLElement).setAttribute('lang', context.globals.locale);
        },
        immediate: true,
      },
    },
  })
]

