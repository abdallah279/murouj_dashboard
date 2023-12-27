import { createI18n } from "vue-i18n";
import en from '@/i18n/lang/en.json'
import ar from '@/i18n/lang/ar.json'

const messages = {
    en,
    ar,
};

const i18n = createI18n({
    locale: "ar",
    messages,
});

export default i18n