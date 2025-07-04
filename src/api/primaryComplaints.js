import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchPrimaryComplaints(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  query.emergencyServices = listState.emergencyServices;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.primaryComplaints}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchPrimaryComplaints,
};
