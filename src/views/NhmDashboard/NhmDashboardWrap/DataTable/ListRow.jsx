import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';

function ListRow({
  listData,
  listBgColor,
  listBorderColor,
}) {
  function tableRow(text) {
    return (
      <td className="ListMaster__Row__Item ListText" style={{ backgroundColor: listBgColor, borderColor: listBorderColor }}>
        {!isNullOrUndefined(text) ? text : 'NA'}
      </td>
    );
  }

  return (
    <tr className="ListMaster__Row ListRow">
      {listData.map((item) => tableRow(item))}
    </tr>
  );
}

ListRow.propTypes = {
  listData: PropTypes.array.isRequired,
  listBgColor: PropTypes.string.isRequired,
  listBorderColor: PropTypes.string.isRequired,
};

export default ListRow;
