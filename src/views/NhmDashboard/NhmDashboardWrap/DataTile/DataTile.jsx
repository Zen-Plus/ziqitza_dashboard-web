import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';

function DataTile({
  headerBgColor,
  bodyBgColor,
  headerText,
  keyOne,
  keyTwo,
  valueOne,
  valueTwo,
}) {
  return (
    <div className="DataTileWrapper">
      <div className="Head text-white" style={{ backgroundColor: headerBgColor }}>
        {headerText}
      </div>
      <div className="Flex text-white" style={{ backgroundColor: bodyBgColor }}>
        <div className="col-6 Column ColumnOne" style={{ borderColor: headerBgColor }}>
          <span className="KeyStyle">{keyOne}</span>
          <span className="ValueStyle">
            {!isNullOrUndefined(valueOne) ? valueOne : 'NA'}
          </span>
        </div>
        <div className="col-6 Column">
          <span className="KeyStyle">{keyTwo}</span>
          <span className="ValueStyle">
            {!isNullOrUndefined(valueTwo) ? valueTwo : 'NA'}
          </span>
        </div>
      </div>
    </div>
  );
}

DataTile.propTypes = {
  headerBgColor: PropTypes.string.isRequired,
  bodyBgColor: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  keyOne: PropTypes.string.isRequired,
  keyTwo: PropTypes.string.isRequired,
  valueOne: PropTypes.string.isRequired,
  valueTwo: PropTypes.string.isRequired,
};

export default DataTile;
