import React,{ useState } from 'react';
import { PropTypes } from 'prop-types';
import withDistrictMapProvider from './withDistrictMapProvider';
import { injectIntl } from 'react-intl';
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const PUNJAB_JSON = require('./punjab.json');

const PROJECTION_CONFIG = {
  scale: 3500,
  center: [78.9629, 22.5937]
};

function DistrictMap({ handleDistrictOnClick, filterObj, userAssignedDistricts, intl, dispatchInceptionData }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const selectedDistrict = (filterObj && filterObj.district) || {};

  function handleDistrictSelect(district) {
    if (district.id === selectedDistrict.id) {
      handleDistrictOnClick({});
      return;
    }
    handleDistrictOnClick(district);
  }

  const dispatchCount = dispatchInceptionData && dispatchInceptionData.data !== null ? dispatchInceptionData.data :'NA';

  return (
    <>
      <div className="DistrictMap Flex Flex-Direction-Column BorderRadius--Base  Width-Full Height-Full" style={{ position: 'relative', background: '#1c2540' }}>
        <div className="Heading Text--White Font--WB" style={{ fontStyle: 'italic' }}>
          <marquee> <span>{intl.formatMessage({ id: 'label.noOfDispatch' })}</span> <span style={{ fontWeight: 'normal' }}> {intl.formatMessage({ id: 'label.fromInception' })} </span> <span className="InceptionCount Font--S20" style={{ fontWeight: 'normal' }}>{ dispatchCount || 'NA' }</span></marquee>
        </div>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap data-tip="" projectionConfig={PROJECTION_CONFIG} >
          <Geographies geography={PUNJAB_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const _index = userAssignedDistricts && userAssignedDistricts.findIndex((item) => item.code === geo.properties.code);
                if(_index === -1) {
                  return
                }
                return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(userAssignedDistricts[_index].name);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={() => handleDistrictSelect(userAssignedDistricts[_index])}
                  style={{
                    default: {
                      fill: (userAssignedDistricts[_index ].id === selectedDistrict.id && 'blue') || geo.properties.color || 'green',
                      strokeWidth: '2px',
                      stroke: 'black',
                      outline: "none"
                    },
                    hover: {
                      fill: (userAssignedDistricts[_index ].id === selectedDistrict.id && 'blue') || "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "blue",
                      outline: "none"
                    }
                  }}
                />
              )})
            }
          </Geographies>
      </ComposableMap>
      </div>
    </>
  );
}

DistrictMap.defaultProps = {
  userAssignedDistricts: [],
};

DistrictMap.propTypes = {
  handleDistrictOnClick: PropTypes.func.isRequired,
  filterObj: PropTypes.object.isRequired,
  dispatchInceptionData: PropTypes.object.isRequired,
  userAssignedDistricts: PropTypes.array,
};
export default withDistrictMapProvider(injectIntl(DistrictMap));
