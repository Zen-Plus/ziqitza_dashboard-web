import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function DispatchInception({ totalDispatch, intl }) {

  return (
    <marquee>
      {intl.formatMessage({ id: 'label.noOfDispatchFromInception' })}
      {' '}
      {totalDispatch !== null ? totalDispatch :  'NA'}
    </marquee>
  );
}

DispatchInception.propTypes = {
  totalDispatch: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
};
export default injectIntl(DispatchInception);
