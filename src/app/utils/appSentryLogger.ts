import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { APPLICATION_KEY } from '../App';

const appSentryLogger = getSentryLoggerForApp(APPLICATION_KEY, ['sif-innsyn.dev.nav.no/dist/js'], [/401/]);

export default appSentryLogger;
