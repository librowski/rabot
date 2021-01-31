import * as _ from 'lodash/fp';

const escapePattern = /[_*\[\]()~`>#+-=|{}!]/g;
const replacement = '\\$&';

const parseAndTrim = _.flowRight(
    _.trim,
    _.replace(
        escapePattern,
        replacement
    ),
);

export const parseJobs = _.map(
    _.mapValues(
        (value) => _.isString(value)
            ? parseAndTrim(value)
            : value 
    ),
);