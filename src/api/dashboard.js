import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchPrimaryComplaintContribution(query, userConfig = {}) {

    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}primaryComplaintContributionTile`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  export function fetchDroppedAtFacility(query, userConfig = {}) {

    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}droppedAtFacilityTile`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  export function fetchDispatchTrendAnalysis(query, userConfig = {}) {
    let _query = {};
    _query.fromDate = 1590949800000;
    _query.toDate = 1622485800000;
    // query.searchText = listState.searchText;
    // query.isPicklist = listState.isPicklist;
    // query.stateId = listState.stateId;

    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}dispatchTrendAnalysisTile`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  export function fetchTabularData(query, userConfig = {}) {

    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}tabularFormDataTile`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  export function fetchDispatchInception(query, userConfig = {}) {

    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}totalDispatch`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  export function fetchResponseTimeAnalysis(query, userConfig = {}) {
    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}responseTimeAnalysisTile`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  export function fetchOnRoadVehicleAnalysis(query, userConfig = {}) {
    return apiCall({
      url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.dashboard}onRoadVehicleAnalysisTile`,
      webApiKey: userConfig.config.webApiKey,
      query,
      token: userConfig.token,
      handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    });
  }

  