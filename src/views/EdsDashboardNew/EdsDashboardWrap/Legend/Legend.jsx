import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import LegendRow from './Row';
import LegendPopOver from './LegendPopOver';

function Legend({ data, length }) {
  const legendData = data.slice(0, length);
  const viewMoreData = data.slice(length, data.length);

  const viewMoreLegendData = viewMoreData.map((item) => {
    if (item.popupContent && item.popupContent.length) {
      return (
        <LegendPopOver content={item.popupContent} placement={item.popupPlacement}>
          <LegendRow key={item.name} data={item} isColor={!!item.color} />
        </LegendPopOver>
      );
    }

    return <LegendRow key={item.name} data={item} />;
  });

  return (
    <div className="Dashboard__Legend">
      {
        legendData.map((item) => {
          if (item.popupContent && item.popupContent.length) {
            return (
              <LegendPopOver content={item.popupContent} placement={item.popupPlacement}>
                <LegendRow key={item.name} data={item} isColor={!!item.color} />
              </LegendPopOver>
            );
          }
          return <LegendRow key={item.name} data={item} />;
        })
      }
      {data.length > length
        && (
        <Popover
          placement="bottomLeft"
          overlayClassName="Legend__viewMore"
          arrow
          trigger="hover"
          content={(
            <>
              <div
                style={{
                  backgroundColor: '#fffbef',
                  padding: '10px',
                  boxShadow: '0 2px 14px 0 rgba(0, 0, 0, 0.1)',
                }}
              >
                {viewMoreLegendData}
              </div>
            </>
          )}
        >
          <div className="Mt-10 Font--S12 Warmblue-Text">
            View more
          </div>
        </Popover>
        )}
    </div>
  );
}

Legend.defaultProps = {
  length: 5,
  data: [],
};

Legend.propTypes = {
  data: PropTypes.array,
  length: PropTypes.number,
};

export default Legend;
