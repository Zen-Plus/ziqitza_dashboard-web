import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function Trips({ intl, data }) {
    return (
        <div className="Trips__Card__Wrap Height-Full">
        <div className="Trips__Card Height-Full">
            <div className="Font--WB Text-Decoration-UpperCase Trips_Heading" >{intl.formatMessage({ id: 'label.trips' })}</div>
            <div className="Avg_Trips__Data">
            <div className="Value Font--WB">
                    {data.averageTripsPerAmbulancePerDay || 'NA'}
                </div>
                <div className="Heading Mt-10">
                    {intl.formatMessage({ id: 'label.avgTrips' })}
                </div>
                <div className="Heading">
                    {intl.formatMessage({ id: 'label.ambulanceDay' })}
                </div>
            </div>
            <div className="Avg_Trip_Time__Data">
            <div className="Value Font--WB">
                    {data.averageTripTime || 'NA'}
                </div>
                <div className="Heading Mt-20">
                    {intl.formatMessage({ id: 'label.avgTripTime' })}
                </div>
            </div>
        </div>
        </div>
    )
}

Trips.defaultProps = {
    data: {},
};

Trips.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object,
}

export default injectIntl(Trips);

