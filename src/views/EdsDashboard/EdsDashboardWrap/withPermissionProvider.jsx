import React from 'react';
import { cloneDeep } from '../../../common/helpers/collectionUtils';
import resources, { actions } from '../../../common/constants/resources';
import { checkPermission } from '../../../common/helpers/resource';

const { MIS } = resources;

export const permissionNames = {
  PRIMARY_COMPLAINT_TILE: {
    key: 'PRIMARY_COMPLAINT_TILE',
    isCarousal: true,
  },
  MAP_TILE: {
    key: 'MAP_TILE',
    isCarousal: false,
  },
  TABULAR_DATA_TILE: {
    key: 'TABULAR_DATA_TILE',
    isCarousal: false,
  },
  DISPATCH_TREND_ANALYSIS_TILE: {
    key: 'DISPATCH_TREND_ANALYSIS_TILE',
    isCarousal: true,
  },
  RESPONSE_TIME_ANALYSIS_TILE: {
    key: 'RESPONSE_TIME_ANALYSIS_TILE',
    isCarousal: true,
  },
  ON_ROAD_VEHICLE_ANALYSIS_TILE: {
    key: 'ON_ROAD_VEHICLE_ANALYSIS_TILE',
    isCarousal: true,
  },
  DROPPED_AT_FACILITY_TILE: {
    key: 'DROPPED_AT_FACILITY_TILE',
    isCarousal: true,
  },
};

function withPermissionProvider(Component) {
  function ComponentWithPermission(props) {
    const user = props.user;
    const userData = (user.info && user.info.data) || {};
    const userResources = cloneDeep(userData.resources);
    const permission = {};
    let carousalCount = 0;

    permissionNames && Object.keys(permissionNames).forEach((key) => {
      const hasPermission = checkPermission({
        resources: userResources,
        resourceKey: MIS.EDS_DASHBOARD[permissionNames[key].key].resourceKey,
        permissions: [actions.READ],
        forSome: true,
      });
      if (hasPermission) {
        permission[permissionNames[key].key] = true;
        if (permissionNames[key].isCarousal) {
          carousalCount += 1;
        }
      } else {
        permission[permissionNames[key].key] = false;
      }
    });
    return (
      <>
        <Component {...props} permissionData={permission} carousalCount={carousalCount} />
      </>
    );
  }

  return ComponentWithPermission;
}

export default withPermissionProvider;
