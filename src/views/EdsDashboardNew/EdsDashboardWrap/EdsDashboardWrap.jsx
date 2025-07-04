import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import ListAction from './ListAction';
import PrimaryComplaintContribution from './Tiles/PrimaryComplaintContribution/PrimaryComplaintContribution';
import {
  fetchPrimaryComplaintContribution as fetchPrimaryComplaintContributionApi,
  fetchDispatchTrendAnalysis as fetchDispatchTrendAnalysisApi,
  fetchDroppedAtFacility as fetchDroppedAtFacilityApi,
  fetchResponseTimeAnalysis as fetchResponseTimeAnalysisApi,
  fetchTabularData as fetchTabularDataApi,
  fetchDispatchInception as fetchDispatchInceptionApi,
  fetchOnRoadVehicleAnalysis as fetchOnRoadVehicleAnalysisApi,
} from '../../../api/dashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import DistrictMap from './Tiles/DistrictMap';
import DropAtFacility from './Tiles/DropAtFacility';
import DispatchTrend from './Tiles/DispatchTrend';
import OnRoadVehicle from './Tiles/OnRoadVehicle';
import ResponseTime from './Tiles/ResponseTIme';
import FilterWrap from '../../../components/DrawerFilterWrap/FilterWrap';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import Filter from './Filter';
import Icon from '../../../components/Icon';
import { createFilterQuery } from './Tiles/PrimaryComplaintContribution/utils';
import useService from '../../../common/hooks/useService';
import withPermissionProvider, { permissionNames } from './withPermissionProvider';
import { getProjectState, getUserProject } from '../../../common/helpers/systemConfigUtils';
import { withSystemParameterConfigProvider } from '../../../providers/withSystemParameterConfigProvider/withSystemParameterConfigProvider';
import DataCard from './/Tiles/Card';
import CallAnswered from './Tiles/CallAnswered';
import Trips from './Tiles/Trips';
import { injectIntl } from 'react-intl';


const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  pauseOnHover: false,
  cssEase: 'linear',
};

function EdsDashboardWrap({
  pickListData,
  permissionData,
  carousalCount,
  user,
  intl,
  systemParameterConfigData,
}) {
  const [selectedFilters, setFilters] = useState({});
  const [selectedFilterChips, setSelectedFilterChips] = useState([]);
  const userConfig = React.useContext(UserConfigContext);
  const [carousalSetting, setCarousalSetting] = useState({
    autoplay: false,
    key: Date.now(),
  });
  const projectStateRef = useRef({ stateId: getProjectState(user.info.data) });
  const _userProject = getUserProject(user.info.data);
  const _userProjectId = _userProject && _userProject.id;
  const projectIdRef = useRef({ projectId: _userProjectId });
  const inceptionDateObject = systemParameterConfigData && systemParameterConfigData.find((value) => (value.key === 'inceptionDate'));
  const inceptionDate = inceptionDateObject && inceptionDateObject.value;

  const {
    data: primaryComplaintContributionData,
    request: primaryComplaintContributionRequest,
  } = useService({
    method: fetchPrimaryComplaintContributionApi,
    context: userConfig.userConfig,
  });

  const {
    data: dispatchTrendData,
    request: dispatchTrendRequest,
  } = useService({
    method: fetchDispatchTrendAnalysisApi,
    context: userConfig.userConfig,
  });

  const {
    data: dropAtFacilityData,
    request: dropAtFacilityRequest,
  } = useService({
    method: fetchDroppedAtFacilityApi,
    context: userConfig.userConfig,
  });

  const {
    data: responseTimeData,
    request: responseTimeRequest,
  } = useService({
    method: fetchResponseTimeAnalysisApi,
    context: userConfig.userConfig,
  });

  const {
    data: tabularData,
    request: tabularRequest,
  } = useService({
    method: fetchTabularDataApi,
    context: userConfig.userConfig,
  });
  const {
    data: dispatchInceptionData,
    request: dispatchInceptionRequest,
  } = useService({
    method: fetchDispatchInceptionApi,
    context: userConfig.userConfig,
  });

  const {
    data: onRoadVehicleData,
    request: onRoadVehicleRequest,
  } = useService({
    method: fetchOnRoadVehicleAnalysisApi,
    context: userConfig.userConfig,
  });

  const [selectedSettings, setSettings] = useState({
    carouselSetting: {
      id: 'MANUAL',
      name: 'Manual',
    },
    autoRefresh: {
      id: 'ON',
      name: 'On',
    },
    refreshInterval: '5',
  });
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentSlide, setSlide] = useState(0);
  const [mount, setMount] = useState(false);

  const isDistrictMapVisible = permissionData && permissionData[permissionNames.MAP_TILE.key];
  const isTabularDataVisible = permissionData
    && permissionData[permissionNames.TABULAR_DATA_TILE.key];
  const isPrimaryComplaintTileVisible = permissionData
    && permissionData[permissionNames.PRIMARY_COMPLAINT_TILE.key];
  const isDispatchTrendTileVisible = permissionData
    && permissionData[permissionNames.DISPATCH_TREND_ANALYSIS_TILE.key];
  const isDropAtFacilityVisible = permissionData
    && permissionData[permissionNames.DROPPED_AT_FACILITY_TILE.key];
  const isResponseTimeTileVisible = permissionData
    && permissionData[permissionNames.RESPONSE_TIME_ANALYSIS_TILE.key];
  const isOnRoadVehicleTileVisible = permissionData
    && permissionData[permissionNames.ON_ROAD_VEHICLE_ANALYSIS_TILE.key];

  function handleSubmitFilter(filters) {
    setFilters(filters);
  }

  function handleDistrictOnClick(district) {
    const _filter = { ...selectedFilters };
    if (district && !Object.keys(district).length) {
      delete _filter.district;
    } else {
      _filter.district = district;
    }
    setFilters(_filter);
  }

  function handleSubmitSetting(setting) {
    setSettings(setting);
  }

  function handlePrevClick() {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.slick.slickPrev();
    }
  }

  function handleNextClick() {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.slick.slickNext();
    }
  }
  function onChange(slideNumber) {
    setSlide(slideNumber);
  }

  useEffect(() => {
    if (carouselRef && carouselRef.current
      && selectedSettings
      && selectedSettings.carouselSetting
      && selectedSettings.carouselSetting.id === 'AUTO') {
      setCarousalSetting({
        autoplay: true,
        key: Date.now(),
        autoplaySpeed: selectedSettings.carousalSpeed * 1000,
      });
      setSlide(0);
    } else if (carouselRef && carouselRef.current) {
      setCarousalSetting({
        autoplay: false,
        key: Date.now(),
      });
    }
  }, [selectedSettings.carouselSetting, mount, selectedSettings.carousalSpeed]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (selectedSettings
      && selectedSettings.autoRefresh
      && selectedSettings.refreshInterval
      && selectedSettings.autoRefresh.id === 'ON') {
      intervalRef.current = setInterval(() => {
        const query = createFilterQuery(selectedFilters);
        tabularRequest(query);
        dispatchInceptionRequest(query);
      }, selectedSettings.refreshInterval * 60 * 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [selectedSettings.autoRefresh, selectedFilters]);

  useEffect(() => {
    const query = createFilterQuery(selectedFilters);
    setMount(true);
    if (isDispatchTrendTileVisible) {
      dispatchTrendRequest(query);
    }
    if (isPrimaryComplaintTileVisible) {
      primaryComplaintContributionRequest(query);
    }
    if (isDropAtFacilityVisible) {
      dropAtFacilityRequest(query);
    }
    if (isResponseTimeTileVisible) {
      responseTimeRequest(query);
    }
    if (isTabularDataVisible) {
      tabularRequest(query);
    }
    if (isOnRoadVehicleTileVisible) {
      onRoadVehicleRequest(query);
    }
    dispatchInceptionRequest(query);
  }, [selectedFilters]);
  const _tabularData = tabularData.data || {};
  return (
    <div className="EdsDashboard_New Height-Full" style={{ paddingTop: 10 }}>
      <div className="EdsDashboard__ListAction">
        <ListAction
          selectedSettings={selectedSettings}
          handleSubmitSetting={handleSubmitSetting}
          pickListData={pickListData}
          filterObj={selectedFilters}
        />
      </div>
      <div className="EdsDashboard__Filter">
        <FilterWrap
          selectedFilters={selectedFilters}
          pickListData={pickListData}
          components={{ Filter }}
          wrapperClassName="DashBoardFilterContainer"
          handleSubmitFilter={handleSubmitFilter}
          setSelectedFilterChips={setSelectedFilterChips}
          selectedFilterChips={selectedFilterChips}
          filterRestProps={{
            projectState: projectStateRef,
            projectIdRef: projectIdRef,
            inceptionDate: inceptionDate,
            selectedFilterIconName: 'filter-blue-selected',
            filterIconName: 'filter-blue'
          }}
        />
      </div>
      <div className="Mt-30 Flex Flex-Direction-Column" style={{ height: 'calc(100% - 90px)' }}>
        <div className="Flex" style={{ height: '60%' }}>
          <div style={{ width: 'calc(30% - 15px)' }}>
            {isDistrictMapVisible ?
              <div style={{ height: 'calc(100%)', maxHeight: 'calc(100%)' }}>
                <DistrictMap
                  filterObj={selectedFilters}
                  user={user}
                  handleDistrictOnClick={handleDistrictOnClick}
                  dispatchInceptionData={dispatchInceptionData}
                />
              </div>
              : null}
          </div>
          <div style={{ width: 'calc(70% - 15px)', marginLeft: '30px' }}>
            {isTabularDataVisible ?
              <div style={{ height: 'calc(55% - 10px)', maxHeight: 'calc(55% - 10px)' }}>
                <div className="Flex" style={{ height: '100%', maxHeight: '100%' }}>
                  <div style={{ height: '100%', flex: '1' }}>
                    <DataCard
                      iconUrl="rural.png"
                      title={intl.formatMessage({ id: 'label.avgResponseTime' })}
                      subTitle={intl.formatMessage({ id: 'label.rural' })}
                      cardStyle={{
                        border: '5px solid rgba(94,73,61,0.5)',
                        backgroundColor: '#5e493d'
                      }}
                      data={_tabularData.averageResponseTimeRural}
                      iconStyle={{
                        border: '5px solid rgba(94,73,61,0.5)',
                      }}
                    />
                  </div>
                  <div style={{ height: '100%', flex: '1' }} className="Ml-20">
                    <DataCard
                      iconUrl="urban.png"
                      title={intl.formatMessage({ id: 'label.avgResponseTime' })}
                      subTitle={intl.formatMessage({ id: 'label.urban' })}
                      cardStyle={{
                        border: '5px solid rgba(43, 48, 50, 0.5)',
                        backgroundColor: '#2b3032'
                      }}
                      data={_tabularData.averageResponseTimeUrban}
                      iconStyle={{
                        border: '5px solid rgba(43, 48, 50, 0.5)',
                      }} />
                  </div>
                  <div style={{ height: '100%', flex: '1' }} className="Ml-20">
                    <DataCard
                      iconUrl="birthInAmbulance.png"
                      title={intl.formatMessage({ id: 'label.birthInAmbulance' })}
                      cardStyle={{
                        border: '5px solid rgba(70,82,154, 0.5)',
                        backgroundColor: 'rgb(70,82,154)',
                        backgroundImage: "url('/dashboard/BgBirthInAmbulance.png')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%'
                      }}
                      data={_tabularData.totalBirthInAmbulance}
                      iconStyle={{
                        border: '5px solid rgba(70,82,154, 0.5)',
                      }} />
                  </div>
                  <div style={{ height: '100%', flex: '1' }} className="Ml-20">
                    <DataCard
                      iconUrl="emergencyServed.png"
                      title={intl.formatMessage({ id: 'label.emergencyServed' })}
                      cardStyle={{
                        border: '5px solid rgba(29,132,173, 0.5)',
                        backgroundColor: 'rgb(29,132,173)'
                      }}
                      data={_tabularData.emergencyServed}
                      iconStyle={{
                        border: '5px solid rgba(29,132,173, 0.5)',
                      }} />
                  </div>
                  <div style={{ height: '100%', flex: '1' }} className="Ml-20">
                    <DataCard
                      iconUrl="onRoadAmbulance.png"
                      title={intl.formatMessage({ id: 'label.onRoadAmbulance' })}
                      cardStyle={{
                        border: '5px solid rgba(254,150,143,0.5)',
                        backgroundColor: '#FE968F'
                      }}
                      data={_tabularData.onRoadVehicles}
                      iconStyle={{
                        border: '5px solid rgba(254,150,143,0.5)',
                      }} />
                  </div>
                </div>
              </div>
              : null}
            {isTabularDataVisible ?
              <div style={{ height: '45%' }} className="Mt-10">
                <div className="Flex" style={{ height: '100%' }}>
                  <div style={{ flex: '1' }}>
                    <CallAnswered data={_tabularData} />
                  </div>
                  <div style={{ flex: '1' }} className="Ml-20">
                    <Trips data={_tabularData} />
                  </div>
                </div>
              </div>
              : null}
          </div>
        </div>
        <div className="Dashboard__Carousel Mt-20" style={{ height: 'calc(40% - 10px)', maxHeight: 'calc(40% - 10px)', position: 'relative' }}>
          <div
            className="Flex Carousel__Action"
            style={{
              justifyContent: 'space-between', position: 'absolute', left: 0, right: 0, bottom: '5px', margin: 'auto', height: 'fit-content', zIndex: 2,
            }}
          >
            <div onClick={handlePrevClick}>
              <Icon name="backward" />
            </div>
            <div className="Carousel__Pagination">
              {carousalCount === 0 ? '0' : currentSlide + 1}
              {' '}
              of
              {' '}
              {carousalCount}
            </div>
            <div onClick={handleNextClick}>
              <Icon name="forward" />
            </div>
          </div>
          <Carousel
            key={carousalSetting.key}
            autoplay={carousalSetting.autoplay}
            rows={1}
            autoplaySpeed={carousalSetting.autoplaySpeed}
            ref={carouselRef}
            afterChange={onChange}
            {...settings}
          >
            {isPrimaryComplaintTileVisible ?
              <div className="Height-Full BorderRadius--Base Carousel_Slide" style={{ padding: '0 10px' }}>
                <PrimaryComplaintContribution
                  responseData={primaryComplaintContributionData}
                />
              </div>
              : null}
            {isDispatchTrendTileVisible ?
              <div className="Height-Full BorderRadius--Base Carousel_Slide" style={{ padding: '0 10px' }}>
                <DispatchTrend
                  responseData={dispatchTrendData}
                />
              </div>
              : null}
            {isDropAtFacilityVisible ?
              <div className="Height-Full BorderRadius--Base Carousel_Slide">
                <DropAtFacility
                  responseData={dropAtFacilityData}
                />
              </div>
              : null}
            {isResponseTimeTileVisible ?
              <div className="Height-Full BorderRadius--Base Carousel_Slide">
                <ResponseTime
                  responseData={responseTimeData}
                />
              </div>
              : null}
            {isOnRoadVehicleTileVisible ?
              <div className="Height-Full BorderRadius--Base Carousel_Slide">
                <OnRoadVehicle
                  responseData={onRoadVehicleData}
                />
              </div>
            : null}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

EdsDashboardWrap.propTypes = {
  pickListData: PropTypes.object.isRequired,
  permissionData: PropTypes.object.isRequired,
  carousalCount: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  systemParameterConfigData: PropTypes.object.isRequired,
};

export default withSystemParameterConfigProvider(withPickListProvider(withPermissionProvider(injectIntl(EdsDashboardWrap)), { version: 'v2' }));
