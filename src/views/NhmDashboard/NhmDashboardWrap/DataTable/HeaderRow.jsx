import React from 'react';
import PropTypes from 'prop-types';

function HeaderRow({
  headerData,
  headerBgColor,
  headerBorderColor,
}) {
  function tableHead(text) {
    return (
      <th className="ListMaster__Header__Item HeaderText" style={{ backgroundColor: headerBgColor, borderColor: headerBorderColor }}>
        {text}
      </th>
    );
  }

  return (
    <thead>
      <tr className="ListMaster__Header HeaderRow">
        {headerData.map((item) => tableHead(item))}
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  headerData: PropTypes.array.isRequired,
  headerBgColor: PropTypes.string.isRequired,
  headerBorderColor: PropTypes.string.isRequired,
};

export default HeaderRow;
