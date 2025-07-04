import React, { useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SubHeader from './SubHeader';
import Header from './Header';
import DataCard from './DataCard';
import DataTable from './DataTable';
import {
  nhmDashboardTiles as nhmDashboardTilesApi,
  vehicleEquipmentCount as vehicleEquipmentCountApi,
} from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import useService from '../../../common/hooks/useService';
import DataTile from './DataTile';
import { convertMillsToHHMMSS } from '../../../common/helpers/collectionUtils';
import LoaderWithOverLay from '../../../components/Loader';
import { getActualData } from './util';

function NhmDashboardWrap({ intl }) {
  const userConfig = useContext(UserConfigContext);

  const {
    data: nhmDashboardTilesData,
    request: nhmDashboardTilesRequest,
    loading: nhmDashboardTilesloading,
  } = useService({
    method: nhmDashboardTilesApi,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  const {
    data: vehicleEquipmentCountData,
    request: vehicleEquipmentCountRequest,
    loading: vehicleEquipmentCountloading,
  } = useService({
    method: vehicleEquipmentCountApi,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  useEffect(() => {
    nhmDashboardTilesRequest();
    vehicleEquipmentCountRequest();
  }, []);

  return (
    <div className="NhmDashboardWrapper">
      {nhmDashboardTilesloading && vehicleEquipmentCountloading &&
        (<LoaderWithOverLay />)
      }
      <Header />
      <SubHeader isDateRangeVisible={true} />
      <div className="Pl-12 Pr-12">
        <div
          className="row d-flex flex-wrap Mt-20"
          style={{ alignItems: 'stretch', zIndex: 1 }}
        >
          <div className="col-sm-6 col-md-4 col-lg-3">
            <DataCard
              title={intl.formatMessage({ id: 'label.totalAmbulance' })}
              value={nhmDashboardTilesData.totalAmbulance}
              bgColor="#00C0EF"
              iconName="white-ambulance"
              iconBgColor="#009ABF"
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <DataCard
              title={intl.formatMessage({ id: 'label.onRoadOffRoadLive' })}
              value={`
                ${nhmDashboardTilesData.onRoadCount || 'NA'}
                /
                ${nhmDashboardTilesData.offRoadCount || 'NA'}
              `}
              bgColor="#00A65A"
              iconName="white-ambulance"
              iconBgColor="#008548"
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <DataCard
              title={intl.formatMessage({ id: 'label.avgResponseUrbanRural' })}
              value={`
                ${convertMillsToHHMMSS(nhmDashboardTilesData.avgUrbanResponseTime)}
                /
                ${convertMillsToHHMMSS(nhmDashboardTilesData.avgRuralResponseTime)}
              `}
              bgColor="#001F3F"
              iconName="clock"
              iconBgColor="#001932"
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <DataCard
              title={intl.formatMessage({ id: 'label.avgKmsPerTrip' })}
              value={nhmDashboardTilesData.avgTripKm}
              bgColor="#3D9970"
              iconName="white-ambulance"
              iconBgColor="#317B5A"
            />
          </div>
        </div>
        <div
          className="row d-flex flex-wrap Mt-20"
          style={{ alignItems: 'stretch', zIndex: 1 }}
        >
          <div className="col-sm-12 col-md-6 col-lg-4">
            <DataTile
              headerBgColor="#e237d5"
              bodyBgColor="#f763ea"
              headerText={intl.formatMessage({ id: 'label.today' })}
              keyOne={intl.formatMessage({ id: 'label.totalCalls' })}
              keyTwo={intl.formatMessage({ id: 'label.caseAssigned' })}
              valueOne={nhmDashboardTilesData.dailyCalls}
              valueTwo={nhmDashboardTilesData.dailyJobCreated}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <DataTile
              headerBgColor="#06a5a3"
              bodyBgColor="#02cfce"
              headerText={intl.formatMessage({ id: 'label.mtd' })}
              keyOne={intl.formatMessage({ id: 'label.totalCalls' })}
              keyTwo={intl.formatMessage({ id: 'label.caseAssigned' })}
              valueOne={nhmDashboardTilesData.monthlyCalls}
              valueTwo={nhmDashboardTilesData.monthlyJobCreated}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <DataTile
              headerBgColor="#0d719b"
              bodyBgColor="#068dc0"
              headerText={intl.formatMessage({ id: 'label.launchToDate' })}
              keyOne={intl.formatMessage({ id: 'label.totalCalls' })}
              keyTwo={intl.formatMessage({ id: 'label.caseAssigned' })}
              valueOne={nhmDashboardTilesData.totalCalls}
              valueTwo={nhmDashboardTilesData.totalJobCreated}
            />
          </div>
        </div>
        <div
          className="row d-flex flex-wrap Mt-20"
          style={{ alignItems: 'stretch', zIndex: 1 }}
        >
          <div className="col-sm-12 col-md-6 col-lg-4">
            <DataTable
              headerData={[
                intl.formatMessage({ id: 'label.totalAbandonedCalls' }),
                intl.formatMessage({ id: 'label.callBackMadeIn5Min' }),
                intl.formatMessage({ id: 'label.callBacksMadeWithinThreshold' })
              ]}
              headerBgColor="#e28e54"
              listData={[
                nhmDashboardTilesData.val,
                nhmDashboardTilesData.val,
                nhmDashboardTilesData.val
              ]}
              listBgColor="#fcb98b"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <DataTable
              headerData={[
                intl.formatMessage({ id: 'label.totalCasesServed' }),
                intl.formatMessage({ id: 'label.totalFeedbackTaken' }),
                intl.formatMessage({ id: 'label.feedbackTakenAboveRating3' })
              ]}
              headerBgColor="#5067e2"
              listData={[
                nhmDashboardTilesData.monthlyJobAvailed,
                nhmDashboardTilesData.monthlyFeedbackTaken,
                nhmDashboardTilesData.monthlyFeedbackAbove3
              ]}
              listBgColor="#7486ed"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <DataTable
              headerData={[
                intl.formatMessage({ id: 'label.totalEquipments' }),
                intl.formatMessage({ id: 'label.equipmentsWorking' }),
                intl.formatMessage({ id: 'label.equipmentsNotWorking' })
              ]}
              headerBgColor="#f06d64"
              listData={[
                vehicleEquipmentCountData.totalCount,
                vehicleEquipmentCountData.workingCount,
                vehicleEquipmentCountData.nonWorkingCount
              ]}
              listBgColor="#ff968f"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

NhmDashboardWrap.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(NhmDashboardWrap);
