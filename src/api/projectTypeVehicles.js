import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchProjectVehicles(query, userConfig) {

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v2}${endPoints.pickLists}project-vehicle-type/`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}


export default {
  fetchProjectVehicles,
};
