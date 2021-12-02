/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : any) {

    const karmaConfig = getKarmaConfig(karma, {
        entry: 'test/index.ts',
        basePath: __dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karma.set(karmaConfig);
}
