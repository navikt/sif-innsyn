const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                API_URL: '${process.env.API_URL}',
                LOGIN_URL: '${process.env.LOGIN_URL}',
                PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
                UTILGJENGELIG: '${process.env.UTILGJENGELIG}',
                MELLOMLAGRING: '${process.env.MELLOMLAGRING}',
                SYKDOM_I_FAMILIEN_INFO_URL: '${process.env.SYKDOM_I_FAMILIEN_INFO_URL}',
                SAKBEHANDLINGSTID_INFO_URL: '${process.env.SAKBEHANDLINGSTID_INFO_URL}',
                REGELVERK_INFO_URL: '${process.env.REGELVERK_INFO_URL}',
                KLAGE_INFO_URL: '${process.env.KLAGE_INFO_URL}'
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
