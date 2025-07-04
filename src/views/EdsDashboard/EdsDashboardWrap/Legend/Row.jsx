import React from 'react';
import PropTypes from 'prop-types';

function Row({ data, isColor }) {
  return (
    <div className="Flex Align-Items-Center Mt-10">

      {isColor
        ? <div className="Legend__Color" style={{ backgroundColor: `${data.color}` }} />
        : <div className={`${data.isHyperLink ? '' : 'Legend__Dot'}`} />}
      {data.isHyperLink
        ? (
          <div className="Font--S10 Warmblue-Text">
            {data.name}
          </div>
        )
        : (
          <div className="Ml-10 Font--S12">
            <span>
              {data.name}
            </span>
            <span className="Font--WB">
              {` - ${data.percentage}%`}
            </span>
          </div>
        )}

    </div>
  );
}

Row.defaultProps = {
  isColor: true,
  data: {},
};

Row.propTypes = {
  data: PropTypes.object,
  isColor: PropTypes.bool,
};

export default Row;
