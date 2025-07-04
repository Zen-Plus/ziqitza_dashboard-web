import React from 'react';
import { cloneDeep } from '../../../../../../../common/helpers/collectionUtils';

function withDistrictMapProvider(Component) {
  function ComponentWithDistricts(props) {
    const user = props.user || {};
    const userData = (user && user.info && user.info.data) || {};
    const userAssignedDistricts = cloneDeep(userData.userAssignedDistricts);

    return (<Component userAssignedDistricts={userAssignedDistricts} {...props} />);
  }
  return ComponentWithDistricts;
}

export default withDistrictMapProvider;

