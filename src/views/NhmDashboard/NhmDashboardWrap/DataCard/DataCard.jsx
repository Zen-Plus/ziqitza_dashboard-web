import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon/Icon';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';

function DataCard({
  title, iconName, value, bgColor, wrapClassName, iconBgColor,
}) {
  return (
    <div className={`DataCardWrapper ${wrapClassName}`} style={{ backgroundColor: bgColor }}>
      <div className="DataCard Flex">
        <div className="Flex AlignItems--Center Icon" style={{ backgroundColor: iconBgColor, padding: '5px 0px 5px 5px' }}>
          <Icon name={iconName} />
        </div>
        <div className="Flex Flex-Direction-Column Ml-10 Text-Decoration-UpperCase" style={{ justifyContent: 'space-around', padding: '10px 5px' }}>
          <div className="DataCard__Title text-white Font--S16 Break-All">
            {title}
          </div>
          <div className="DataCard__Value text-white Font--WB Break-All">
            {!isNullOrUndefined(value) ? value : 'NA'}
          </div>
        </div>
      </div>
    </div>
  );
}

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  wrapClassName: PropTypes.string.isRequired,
  iconBgColor: PropTypes.string.isRequired,
};

export default DataCard;

