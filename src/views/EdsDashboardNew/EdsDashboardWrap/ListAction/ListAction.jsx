import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Logo from '../../../../components/Logo';
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
    <div className="Flex Align-Items-Center" style={{ justifyContent: 'space-between'}}>
      <div className="Flex">
      <div className="Ml-10" style={{ marginTop: '3px' }}>
        <Logo src="/dashboard/punjab-govt_trans.png" alt="logo" width="40px" />
      </div>
      <div className="Ml-10">
        <Logo src="/dashboard/108-logo_trans.png" alt="logo" width="40px" />
      </div>
      </div>
      <div className="Font--WB Text--White Text-Decoration-UpperCase" style={{ fontSize: '1.875rem' }}>
        108
        {' '}
        {intl.formatMessage({ id: 'label.punjabEmergencyService' })}
      </div>
      <div className="" style={{ marginRight: 10 }}>
        <SettingWrap
          selectedSettings={selectedSettings}
          pickListData={pickListData}
          components={{ Setting }}
          settingRestProps={{
            settingIconName: 'setting-blue',
            defaultRefreshInterval: 5,
            defaultCarousalSpeed: 3,
          }}
          placement="bottomRight"
          handleSubmitSetting={handleSubmitSetting}
        />
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
