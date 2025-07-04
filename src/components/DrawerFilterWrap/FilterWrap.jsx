import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Button from '../Button';
import Drawer from '../Drawer';

function FilterWrap({
  isFetching,
  components,
  selectedFilters,
  handleSubmitFilter,
  wrapperClassName,
  pickListData,
  selectedFilterNav,
  handleNavSwitch,
  placement,
  drawerWidth,
  filterRestProps,
  selectedFilterChips: selectedFilterChip,
  setSelectedFilterChips: setSelectedFilterChip,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedFilterChips, setSelectedFilterChips] = useState(selectedFilterChip);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedFilters).length) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [selectedFilters]);

  function handleFilterSubmit(data, isApplied, selectedChips = []) {
    setIsDropDownVisible(false);
    setIsFilterApplied(isApplied);
    setSelectedFilterChips(selectedChips);
    setSelectedFilterChip(selectedChips);
    handleSubmitFilter(data);
  }
  return (
    <div className="EdsDashboardFilterWrap">
      <div className={isDropDownVisible ? 'overlay' : ''} />
      <Button
        style={{ background: 'transparent', width: '40px' }}
        onClick={() => {
          setIsDropDownVisible(!isDropDownVisible);
        }}
        disabled={isFetching}
      >
        <Icon
          name={isFilterApplied
            ? filterRestProps.selectedFilterIconName : filterRestProps.filterIconName}
        />
      </Button>
      <Drawer
        visible={isDropDownVisible}
        width={drawerWidth}
        closable={false}
        placement={placement}
        className={`EdsDashboardDrawerFilter ${wrapperClassName}`}
        overlayClassName={`${placement === 'bottomRight' ? 'EdsDashboardListFilter-Position-right' : 'EdsDashboardListFilter-Position-left'}`}
      >
        {isDropDownVisible
          ? (
            <components.Filter
              onClickCancel={() => setIsDropDownVisible(false)}
              selectedFilters={selectedFilters}
              selectedFilterChips={selectedFilterChips}
              pickListData={pickListData}
              onFilterSubmit={handleFilterSubmit}
              handleNavSwitch={handleNavSwitch}
              selectedFilterNav={selectedFilterNav}
              {...filterRestProps}
            />
          ) : <></>}

      </Drawer>
    </div>
  );
}

FilterWrap.defaultProps = {
  components: {},
  handleSubmitFilter: () => { },
  isFetching: false,
  pickListData: {},
  wrapperClassName: '',
  selectedFilterNav: '',
  handleNavSwitch: () => { },
  placement: 'right',
  drawerWidth: 400,
  filterRestProps: {
    selectedFilterIconName: 'filter-selected',
    filterIconName: 'filter',
    selectedFilterChips: [],
    setSelectedFilterChips: () => { },
  },
  selectedFilterChips: [],
  setSelectedFilterChips: () => { },
};

FilterWrap.propTypes = {
  components: PropTypes.object,
  handleSubmitFilter: PropTypes.func,
  isFetching: PropTypes.bool,
  selectedFilters: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
  wrapperClassName: PropTypes.string,
  selectedFilterNav: PropTypes.string,
  handleNavSwitch: PropTypes.func,
  placement: PropTypes.string,
  drawerWidth: PropTypes.number,
  filterRestProps: PropTypes.object,
  selectedFilterChips: PropTypes.array,
  setSelectedFilterChips: PropTypes.func,
};

export default FilterWrap;
