const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                API_URL: '${process.env.API_URL}',
                LOGIN_URL: '${process.env.LOGIN_URL}',
                PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
                SYKDOM_I_FAMILIEN_INFO_URL: '${process.env.SYKDOM_I_FAMILIEN_INFO_URL}',
                SAKBEHANDLINGSTID_INFO_URL: '${process.env.SAKBEHANDLINGSTID_INFO_URL}',
                REGELVERK_INFO_URL: '${process.env.REGELVERK_INFO_URL}',
                ETTERSENDING_PLEIEPENGER_URL: '${process.env.ETTERSENDING_PLEIEPENGER_URL}',
                PLEIEPENGER_URL: '${process.env.PLEIEPENGER_URL}',
                PP_MELLOMLAGRING_API_URL: '${process.env.PP_MELLOMLAGRING_API_URL}',
                PP_ENDRING_MELLOMLAGRING_API_URL: '${process.env.PP_ENDRING_MELLOMLAGRING_API_URL}',
                KLAGE_INFO_URL: '${process.env.KLAGE_INFO_URL}',
                DITT_NAV_URL: '${process.env.DITT_NAV_URL}',
                ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: '${process.env.ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL}',
                APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
                APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
                USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
