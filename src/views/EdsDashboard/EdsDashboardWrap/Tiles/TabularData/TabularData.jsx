import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import dayjs from 'dayjs';
import Icon from '../../../../../components/Icon';
import { createTabularData } from '../PrimaryComplaintContribution/utils';

function TabularData({ intl, data }) {
  const [tabularData, setTabularData] = useState({});

  useEffect(() => {
    if (data && data.data) {
      const result = createTabularData(data.data);
      setTabularData(result);
    }
  }, [data]);
  return (
    <div className="TabularData BorderRadius--Base BG--White">
      <div className="TextAlign--Right Font--WB Font--Italic Font--S12">
        {`${(tabularData.fromDate && dayjs(tabularData.fromDate).format('DD MMM YY')) || 'NA'} - ${(tabularData.toDate && dayjs(tabularData.toDate).format('DD MMM YY')) || 'NA'}`}
      </div>
      <div className="Flex Flex-Space-Between Mt-4">
        <div className="TabularData--Item Bg-Color--LightGreen BorderRadius--Base" style={{ width: 'calc(50% - 4px)' }}>
          <Icon name="ambulance" />
          <div className="Flex Flex-Space-Between">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.noOfCalls' })}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.numberOfCalls !== null ? tabularData.numberOfCalls  : 'NA'}
            </div>
          </div>
          <div className="Flex Flex-Space-Between Mt-5">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.totalDispatch' })}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.totalDispatch !== null ? tabularData.totalDispatch  : 'NA'}
            </div>
          </div>
        </div>

        <div className="TabularData--Item Align-Items-Center Bg-Color--LightPink BorderRadius--Base" style={{ width: 'calc(50% - 4px)' }}>
          <Icon name="sand-timer" />
          <div className="Flex Flex-Space-Between">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.avgResponseTime' })}
              {` (${intl.formatMessage({ id: 'label.rural' })})`}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.averageResponseTimeRural !== null ? tabularData.averageResponseTimeRural : 'NA'}
            </div>
          </div>
          <div className="Flex Flex-Space-Between  Mt-5">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.avgResponseTime' })}
              {` (${intl.formatMessage({ id: 'label.urban' })})`}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.averageResponseTimeUrban !== null ? tabularData.averageResponseTimeUrban : 'NA'}
            </div>
          </div>
        </div>
      </div>
      <div className="Flex Flex-Space-Between Mt-4">
        <div className="TabularData--Item Bg-Color--LightGreen BorderRadius--Base " style={{ width: 'calc(50% - 4px)' }}>
          <Icon name="pins" />
          <div className="Flex Flex-Space-Between">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.avgTripsAmbulanceDay' })}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.averageTripsPerAmbulancePerDay !== null ? tabularData.averageTripsPerAmbulancePerDay : 'NA'}
            </div>
          </div>
          <div className="Flex Flex-Space-Between  Mt-5">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.avgTripTime' })}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.averageTripTime !== null ? tabularData.averageTripTime : 'NA'}
            </div>
          </div>
        </div>
        <div className="TabularData--Item Bg-Color--LightPink BorderRadius--Base" style={{ width: 'calc(50% - 4px)' }}>
          <Icon name="road" />
          <div className="Flex Flex-Space-Between">
            <div className="Font--S12">
              {intl.formatMessage({ id: 'label.onRoadVehicle' })}
            </div>
            <div className="Font--S14 Font--WB">
              {tabularData.onRoadVehicles !== null ? tabularData.onRoadVehicles : 'NA'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabularData.propTypes = {
  intl: PropTypes.object.isRequired,
  filterObj: PropTypes.object.isRequired,
};

export default injectIntl(TabularData);
