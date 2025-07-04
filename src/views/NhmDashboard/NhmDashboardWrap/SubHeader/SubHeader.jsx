import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ButtonCustom } from '../../../../components/Button';
import Logo from '../../../../components/Logo';
import { injectIntl } from 'react-intl';

function SubHeader({ isDateRangeVisible, intl }) {

  return (
    <div className="SubHeaderWrapper container">
      <div className="SubHeader">
        <div className="row flex justify-content-between align-items-center">
          <div className="d-flex justify-content-md-start col-sm-2 justify-content-center col-12 mb-2 mb-sm-0">
            <Logo src="/upNhmDashboard/zhl-logo.png" className="img img-responsive" style={{ borderRadius: 10 }} />
          </div>
          <div className="text-white font-weight-bold Font--S20 Font--WB text-center col-sm-6 col-12">
            {intl.formatMessage({ id: 'label.upAdvanceLifeSupportAmbulanceServices' })}
          </div>
          <div className="d-flex col-sm-4 col-12 mt-2 mt-sm-0" style={{ justifyContent: 'space-around'}}>
            <div>
              <ButtonCustom className="Box--Shadow Font--S18" onClick={() => {}} labelText={intl.formatMessage({ id: 'label.invenotry' })} type="link" />
            </div>
            <div>
              <ButtonCustom className="Box--Shadow Font--S18" onClick={() => {}} labelText={intl.formatMessage({ id: 'label.mis' })} type="link" />
            </div>
          </div>
        </div>
        {isDateRangeVisible && (
          <div>
            <div className="Divider mt-2 mt-sm-1" />
            <div className="row d-flex justify-content-end align-items-center text-white font-weight-bold Font--S18">
              <div className="col-12 d-flex justify-content-end mt-2 mt-sm-1">
                {moment().startOf('month').format('DD MMMM YYYY')}
                {' '}
                {intl.formatMessage({ id: 'label.toTillDate' })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SubHeader.defaultProps = {
  isDateRangeVisible: false,
};

SubHeader.propTypes = {
  isDateRangeVisible: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SubHeader);

