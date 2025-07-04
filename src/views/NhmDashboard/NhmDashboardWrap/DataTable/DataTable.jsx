import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';

function DataTable({
  headerData,
  headerBgColor,
  listData,
  listBgColor,
}) {
  return (
    <div className="DataTableWrapper">
      <table className="table" style={{ marginBottom: 0 }}>
        <HeaderRow
          headerData={headerData}
          headerBgColor={headerBgColor}
          headerBorderColor={listBgColor}
        />
        <ListRow
          listData={listData}
          listBgColor={listBgColor}
          listBorderColor={headerBgColor}
        />
      </table>
    </div>
  );
}

DataTable.propTypes = {
  headerData: PropTypes.array.isRequired,
  headerBgColor: PropTypes.string.isRequired,
  listData: PropTypes.array.isRequired,
  listBgColor: PropTypes.string.isRequired,
};

export default injectIntl(DataTable);
