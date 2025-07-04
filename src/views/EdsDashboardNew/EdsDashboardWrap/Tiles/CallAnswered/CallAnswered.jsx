import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function CallAnswered({ intl, data }) {
    return (
        <div className="ClassAnswered__Card__Wrap Height-Full">
        <div className="ClassAnswered__Card Height-Full">
            <div className="ClassAnswered__Data">
                <div className="Heading Font--WB Text-Decoration-UpperCase">
                    {intl.formatMessage({ id: 'label.callsAnswered' })}
                </div>
                <div className="Value Mt-10 Font--WB">
                    {data.numberOfCalls || 'NA'}
                </div>
            </div>
        </div>
        </div>
    )
}

CallAnswered.defaultProps = {
    data: {},
};

CallAnswered.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object,
}

export default injectIntl(CallAnswered);

