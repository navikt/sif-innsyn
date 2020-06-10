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
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
