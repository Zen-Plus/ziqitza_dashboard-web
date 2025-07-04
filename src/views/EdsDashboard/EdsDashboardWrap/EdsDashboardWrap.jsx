import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import ListAction from './ListAction';
import PrimaryComplaintContribution from './Tiles/PrimaryComplaintContribution/PrimaryComplaintContribution';
import TabularData from './Tiles/TabularData';
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

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  cssEase: 'linear',
};

function EdsDashboardWrap({
  pickListData,
  permissionData,
  carousalCount,
  user,
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

  return (
    <div className="EdsDashboard Mt-10 Height-Full">
      <div className="EdsDashboard__ListAction">
        <ListAction
          selectedSettings={selectedSettings}
          handleSubmitSetting={handleSubmitSetting}
          pickListData={pickListData}
          filterObj={selectedFilters}
          dispatchInceptionData={dispatchInceptionData}
        />
      </div>
      <div className="EdsDashboard__Filter">
        <FilterWrap
          selectedFilters={selectedFilters}
          pickListData={pickListData}
          components={{ Filter }}
          handleSubmitFilter={handleSubmitFilter}
          setSelectedFilterChips={setSelectedFilterChips}
          selectedFilterChips={selectedFilterChips}
          filterRestProps={{ 
            projectState: projectStateRef,
            projectIdRef: projectIdRef,
            inceptionDate: inceptionDate,
            selectedFilterIconName: 'filter-selected',
            filterIconName: 'filter'
          }}
        />
      </div>
      <div className="Mt-30 Flex" style={{ height: 'calc(100% - 70px)' }}>
        {isDistrictMapVisible || isTabularDataVisible
          ? (
            <div className="Flex Flex-Direction-Column Height-Full " style={{ width: '37%', marginRight: '3%', maxHeight: '100%' }}>
              { isDistrictMapVisible
                ? (
                  <div style={{ height: 'calc(50% - 15px)', maxHeight: 'calc(50% - 15px)' }}>
                    <DistrictMap
                      filterObj={selectedFilters}
                      user={user}
                      handleDistrictOnClick={handleDistrictOnClick}
                    />
                  </div>
                ) : null}
              {isTabularDataVisible
                ? (
                  <div style={{ height: 'calc(50% - 15px)', maxHeight: 'calc(50% - 15px)', marginTop: 30, zIndex: 1 }}>
                    <TabularData
                      data={tabularData}
                    />
                  </div>
                )
                : null}
            </div>
          ) : null}
        <div className="Flex Dashboard__Carousel Flex-Direction-Column Flex-Space-Between" style={{ width: `${isDistrictMapVisible || isTabularDataVisible ? '60%' : '100%'}`, height: '100%', position: 'relative' }}>
          <div
            className="Flex Carousel__Action"
            style={{
              justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', height: 'fit-content', zIndex: 2,
            }}
          >
            <div onClick={handlePrevClick}>
              <Icon name="previous" />
            </div>
            <div className="Carousel__Pagination">
              {carousalCount === 0 ? '0' : currentSlide + 1}
              {' '}
              of
              {' '}
              {Math.ceil(carousalCount / 2)}
            </div>
            <div onClick={handleNextClick}>
              <Icon name="next" />
            </div>
          </div>
          {!!carousalCount && (
          <Carousel
            key={carousalSetting.key}
            autoplay={carousalSetting.autoplay}
            rows={2}
            autoplaySpeed={carousalSetting.autoplaySpeed}
            ref={carouselRef}
            afterChange={onChange}
            {...settings}
          >
            {
              isPrimaryComplaintTileVisible
                ? (
                  <div className="Height-Full BorderRadius--Base BG--White">
                    <PrimaryComplaintContribution
                      responseData={primaryComplaintContributionData}
                    />
                  </div>
                ) : null
            }
            {
              isDispatchTrendTileVisible
                ? (
                  <div className="Height-Full BorderRadius--Base BG--White">
                    <DispatchTrend
                      responseData={dispatchTrendData}
                    />
                  </div>
                )
                : null
            }
            {
              isDropAtFacilityVisible
                ? (
                  <div className="Height-Full BorderRadius--Base BG--White">
                    <DropAtFacility
                      responseData={dropAtFacilityData}
                    />
                  </div>
                )
                : null
            }
            {
              isResponseTimeTileVisible
                ? (
                  <div className="Height-Full BorderRadius--Base BG--White">
                    <ResponseTime
                      responseData={responseTimeData}
                    />
                  </div>
                )
                : null
            }
            {
              isOnRoadVehicleTileVisible
                ? (
                  <div className="Height-Full BorderRadius--Base BG--White">
                    <OnRoadVehicle
                      responseData={onRoadVehicleData}
                    />
                  </div>
                )
                : null
            }
          </Carousel>
          )}
        </div>
      </div>

    </div>
  );
}

EdsDashboardWrap.propTypes = {
  pickListData: PropTypes.object.isRequired,
  permissionData: PropTypes.object.isRequired,
  carousalCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  systemParameterConfigData: PropTypes.object.isRequired,
};

export default withSystemParameterConfigProvider(withPickListProvider(withPermissionProvider(EdsDashboardWrap), { version: 'v2' }));
