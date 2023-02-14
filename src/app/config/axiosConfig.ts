import { storageParser } from '@navikt/sif-common-core/lib/utils/persistence/persistence';

export default {
    withCredentials: false,
    transformResponse: storageParser,
};
