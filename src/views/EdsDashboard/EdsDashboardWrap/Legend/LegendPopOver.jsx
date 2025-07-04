import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import LegendRow from './Row';

function LegendPopOver({ content, placement, children }) {
  const popOverContent = content && content.map((data) => (
    <LegendRow data={data} isColor={false} />
  ));
  return (
    <div>
      <Popover
        placement={placement}
        overlayClassName="Legend__viewMore"
        arrow
        trigger="hover"
        content={(
          <>
            <div
              className="ZiqitzaEdsDashboard"
              style={{
                backgroundColor: '#fffbef',
                padding: '10px',
                boxShadow: '0 2px 14px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              {popOverContent}
            </div>
          </>
                )}
      >
        <div>
          {children}
        </div>
      </Popover>

    </div>
  );
}

LegendPopOver.defaultProps = {
  placement: 'bottomLeft',
};

LegendPopOver.propTypes = {
  content: PropTypes.array.isRequired,
  placement: PropTypes.string,
};

export default LegendPopOver;

