import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Logo from '../../../../components/Logo';
import DispatchInception from './DispatchInception/DispatchInception';
import SettingWrap from '../../../../components/ListUtils/SettingWrap';
import Setting from '../Settings';

function ListAction({
  selectedSettings,
  handleSubmitSetting,
  pickListData,
  dispatchInceptionData,
  intl,
}) {
  return (
    <div className="Flex Align-Items-Center">
      <div className="Ml-10">
        <Logo src="/dashboard/punjab-govt.jpg" alt="logo" width="40px" />
      </div>
      <div className="Ml-10">
        <Logo src="/dashboard/108-logo.jpg" alt="logo" width="40px" />
      </div>
      <div className="Ml-20 Font--WB Font--S20">
        108
        {' '}
        {intl.formatMessage({ id: 'label.punjabEmergencyService' })}
      </div>
      <div className="Ml-20 Box--Shadow">
        <SettingWrap
          selectedSettings={selectedSettings}
          pickListData={pickListData}
          components={{ Setting }}
          settingRestProps={{
            settingIconName: 'settings',
            defaultRefreshInterval: 5,
            defaultCarousalSpeed: 3,
          }}
          handleSubmitSetting={handleSubmitSetting}
        />
      </div>
      <div className="Ml-20  Font--WB Font--Italic Font--S20 BorderRadius--Base BG--White" style={{ flex: 1, padding: '5px 10px 5px 10px' }}>
        <DispatchInception totalDispatch={dispatchInceptionData && dispatchInceptionData.data} />
      </div>
    </div>
  );
}


ListAction.defaultProps = {
  filterObj: {},
  pickListData: {},
};

ListAction.propTypes = {
  intl: PropTypes.object.isRequired,
  selectedSettings: PropTypes.object.isRequired,
  handleSubmitSetting: PropTypes.func.isRequired,
  pickListData: PropTypes.object,
  dispatchInceptionData: PropTypes.object.isRequired,
};

export default injectIntl(ListAction);
