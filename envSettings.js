const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const API_URL = process.env.API_URL;
    const K9_BRUKERDIALOG_API_URL = process.env.K9_BRUKERDIALOG_API_URL;
    const FRONTEND_API_PATH = process.env.FRONTEND_API_PATH;
    const PUBLIC_PATH = process.env.PUBLIC_PATH;
    const MELLOMLAGRING_PATH = process.env.MELLOMLAGRING_PATH;
    const LOGIN_URL = process.env.LOGIN_URL;
    const SYKDOM_I_FAMILIEN_INFO_URL = process.env.SYKDOM_I_FAMILIEN_INFO_URL;
    const SAKBEHANDLINGSTID_INFO_URL = process.env.SAKBEHANDLINGSTID_INFO_URL;
    const REGELVERK_INFO_URL = process.env.REGELVERK_INFO_URL;
    const KLAGE_INFO_URL = process.env.KLAGE_INFO_URL;
    const ETTERSENDING_PLEIEPENGER_URL = process.env.ETTERSENDING_PLEIEPENGER_URL;
    const PLEIEPENGER_URL = process.env.PLEIEPENGER_URL;
    const PP_MELLOMLAGRING_API_URL = process.env.PP_MELLOMLAGRING_API_URL;
    const MIN_SIDE_URL = process.env.MIN_SIDE_URL;
    const ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL = process.env.ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL;
    const APPSTATUS_PROJECT_ID = process.env.APPSTATUS_PROJECT_ID;
    const APPSTATUS_DATASET = process.env.APPSTATUS_DATASET;
    const USE_AMPLITUDE = process.env.USE_AMPLITUDE;
    const ENDRINGSDIALOG = process.env.ENDRINGSDIALOG;
    const ENDRINGSDIALOG_URL = process.env.ENDRINGSDIALOG_URL;

    const appSettings = `
     window.appSettings = {
         API_URL: '${API_URL}',
         K9_BRUKERDIALOG_API_URL: '${K9_BRUKERDIALOG_API_URL}',
         FRONTEND_API_PATH: '${FRONTEND_API_PATH}',
         MELLOMLAGRING_PATH: '${MELLOMLAGRING_PATH}',
         SYKDOM_I_FAMILIEN_INFO_URL: '${SYKDOM_I_FAMILIEN_INFO_URL}',
         SAKBEHANDLINGSTID_INFO_URL: '${SAKBEHANDLINGSTID_INFO_URL}',
         REGELVERK_INFO_URL: '${REGELVERK_INFO_URL}',
         KLAGE_INFO_URL: '${KLAGE_INFO_URL}',
         ETTERSENDING_PLEIEPENGER_URL: '${ETTERSENDING_PLEIEPENGER_URL}',
         PLEIEPENGER_URL: '${PLEIEPENGER_URL}',
         PP_MELLOMLAGRING_API_URL: '${PP_MELLOMLAGRING_API_URL}',
         MIN_SIDE_URL: '${MIN_SIDE_URL}',
         ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: '${ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL}',
         PUBLIC_PATH: '${PUBLIC_PATH}',
         LOGIN_URL: '${LOGIN_URL}',
         APPSTATUS_PROJECT_ID: '${APPSTATUS_PROJECT_ID}',
         APPSTATUS_DATASET: '${APPSTATUS_DATASET}',
         USE_AMPLITUDE: '${USE_AMPLITUDE}',
         ENDRINGSDIALOG: '${ENDRINGSDIALOG}',
         ENDRINGSDIALOG_URL: '${ENDRINGSDIALOG_URL}',
     };`
        .trim()
        .replace(/ /g, '');

    try {
        return appSettings;
    } catch (e) {
        console.error(e);
    }
};

module.exports = envSettings;
