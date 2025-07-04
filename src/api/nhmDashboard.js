import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function nhmDashboardTiles(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}data-tiles`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function vehicleEquipmentCount(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.equipmentAccessories}vehicle-equipment-count`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
