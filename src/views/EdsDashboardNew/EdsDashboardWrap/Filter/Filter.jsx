import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import SelectDrop from '../../../../components/SelectDrop';
import DateRangePicker from '../../../../components/DateRangePicker';
import { DistrictsContext, withDistrictsProvider } from '../../../../providers/withDistrictProvider';
import { PrimaryComplaintsContext, withPrimaryComplaintsProvider } from '../../../../providers/withPrimaryComplaintsProvider';
import withProvider from '../../../../common/hocs/withProvider/withProvider';
import Scrollbar from '../../../../components/Scrollbar';
import { ProjectVehiclesContext, withProjectVehiclesProvider } from '../../../../providers/withProjectVehicles';

const primaryComplaintQuery = {
  emergencyServices: 4,
}

const dateRangeType = [
  {
    id: 'LAST_1_WEEK',
    name: 'Last 1 week',
  },
  {
    id: 'LAST_15_DAYS',
    name: 'Last 15 days',
  },
  {
    id: 'LAST_1_MONTH',
    name: 'Last 1 month',
  },
  {
    id: 'CUSTOMIZED_DATE_RANGE',
    name: 'Custom',
  },
];

const SelectDistrict = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedDistrictsList',
  loadMoreActionKey: 'getGeographicalRestrictedDistrictsListLoadMore',
  context: DistrictsContext,
  contextProvider: withDistrictsProvider,
  stateKey: 'districts',
}, SelectDrop);

const SelectChiefComplaint = withProvider({
  getResourcesActionKey: 'getPrimaryComplaintsList',
  loadMoreActionKey: 'getPrimaryComplaintsListLoadMore',
  context: PrimaryComplaintsContext,
  contextProvider: withPrimaryComplaintsProvider,
  stateKey: 'primaryComplaints',
}, SelectDrop);

const SelectErvType = withProvider({
  getResourcesActionKey: 'getProjectVehiclesList',
  loadMoreActionKey: 'getProjectVehiclesListLoadMore',
  context: ProjectVehiclesContext,
  contextProvider: withProjectVehiclesProvider,
  stateKey: 'projectVehicles',
}, SelectDrop);


const fieldNames = {
  DISTRICT: 'district',
  DATE_RANGE_TYPE: 'dateRangeType',
  DATE_RANGE: 'dateRange',
  CHIEF_COMPLAINT: 'chiefComplaint',
  ERV_TYPE: 'ervType',
};


function EdsDashboardFilter({
  onClickCancel,
  onFilterSubmit,
  intl,
  selectedFilters,
  projectState,
  projectIdRef,
  inceptionDate,
}) {
  const [filters, setFilters] = useState(selectedFilters);
  const [dates, setDates] = useState(selectedFilters.dateRange);
  const inceptionTimestamp = inceptionDate && inceptionDate * 1;

  function disabledDate(current) {
    if (!dates || dates.length === 0) {
      return (moment(inceptionTimestamp) > current
        || moment().endOf('day') < moment(current).endOf('day'));
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 31;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 31;
    return (moment(inceptionTimestamp) > current
      || moment().endOf('day') < moment(current).endOf('day')) || tooEarly || tooLate;
  }

  const onSelect = (data, key) => {
    const _filter = { ...filters };
    if (key === fieldNames.DATE_RANGE_TYPE && data.id === 'CUSTOMIZED_DATE_RANGE') {
      const minDate = moment(inceptionTimestamp).valueOf() > moment().subtract(31, 'days').valueOf()
      ? moment(inceptionTimestamp) : moment().subtract(31, 'days');
      _filter[fieldNames.DATE_RANGE] = [minDate , moment()];
      setDates([minDate, moment()]);
    }
    _filter[key] = data;
    setFilters({
      ..._filter,
    });
  };

  const onResetPressed = () => {
    setFilters({});
  };

  const onApply = () => {
    if (Object.keys(filters).length) {
      onFilterSubmit(filters, true);
    } else {
      onFilterSubmit(filters, false);
    }
  };

  function handleCalendarChange(value) {
    setDates(value);
  }

  return (
    <Scrollbar style={{ height: 'calc(100% - 60px)' }}>
    <div className="ZiqitzaEdsDashboard">
      <div className="EdsDashboardFilter Dashboard__Filter">
        <div onClick={() => onClickCancel()} style={{ position: 'fixed', right: '393px', top: '55px' }}>
          <Icon name="filter-close" />
        </div>
        <div className=" Flex Flex-Space-Between Align-Items-Center Font--S20 Font--WB">
          <div className="Font--S20 Font--WB">
            {intl.formatMessage({ id: 'label.filter' })}
          </div>
          <Button
            type="plain"
            onClick={onResetPressed}
            className="Button-Width"
          >
            <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
              <Icon name="rotate-counterClockWise" />
            </span>
            <span
              className="Font--WB Font--S16 Matterhorn-Text"
              style={{ letterSpacing: '0.2px' }}
            >
              {intl.formatMessage({ id: 'label.reset' })}
            </span>
          </Button>
        </div>
        <div className="Flex Mt-20" style={{ flexWrap: 'wrap' }}>
          <div>
            <SelectDrop
              id="Date Range"
              labelText={intl.formatMessage({ id: 'label.dateWithIn' })}
              dropListValues={dateRangeType}
              selectedItem={filters.dateRangeType}
              onChangeSelect={(data) => onSelect(data, fieldNames.DATE_RANGE_TYPE)}
            />
          </div>
          {
            filters && filters.dateRangeType && filters.dateRangeType.id === 'CUSTOMIZED_DATE_RANGE'
                ? (
                <div style={{ marginBottom: '20px' }}>
                    <DateRangePicker
                    labelText={intl.formatMessage({ id: 'label.dateRange' })}
                    value={dates}
                    onChange={(data) => onSelect(data, fieldNames.DATE_RANGE)}
                    disabledDate={disabledDate}
                    onCalendarChange={handleCalendarChange}
                    style={{ width: '360px' }}
                    format="DD MMM YYYY"
                    />
                </div>
                ) : null
            }
          <div>
            <SelectDistrict
              id="DistrictSelect"
              labelText={intl.formatMessage({ id: 'label.district' })}
              selectedItem={filters.district}
              query={projectState && projectState.current}
              onChangeSelect={(data) => onSelect(data, fieldNames.DISTRICT)}
            />
          </div>
          <div className="">
            <SelectChiefComplaint
              labelText={intl.formatMessage({ id: 'label.chiefComplaint' })}
              id="Chief Complaint"
              multi
              query={primaryComplaintQuery}
              onChangeSelect={(data) => onSelect(data, fieldNames.CHIEF_COMPLAINT)}
              selectedItems={filters.chiefComplaint}
            />
          </div>
          <div>
            <SelectErvType
              labelText={intl.formatMessage({ id: 'label.ervType' })}
              id="ErvType"
              multi
              isSearchEnable={false}
              query={projectIdRef && projectIdRef.current}
              onChangeSelect={(data) => onSelect(data, fieldNames.ERV_TYPE)}
              selectedItems={filters.ervType}
            />
          </div>
        </div>
        <div className="Flex Mt-20" style={{ justifyContent: 'space-between' }}>
          <div className="Flex" />
          <div className="Flex">
            <Button
              type="link"
              className="Button-Width Button-Label-Cancel"
              onClick={() => onClickCancel()}
            >
              <span style={{ verticalAlign: 'middle', marginRight: 9 }}>
                <Icon name="cross-red" />
              </span>
              <span className="Font--WB Font--S16" style={{ letterSpacing: '0.2px' }}>
                {intl.formatMessage({ id: 'label.cancel' })}
              </span>
            </Button>
            <Button
              type="plain"
              className="Ml-18 Button-Width"
              onClick={onApply}
            >
              <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
                <Icon name="check" />
              </span>
              <span
                className="Font--WB Font--S16 Matterhorn-Text"
                style={{ letterSpacing: '0.2px' }}
              >
                {intl.formatMessage({ id: 'label.apply' })}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
      </Scrollbar>
  );
}

EdsDashboardFilter.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
  projectState: PropTypes.object.isRequired,
  projectIdRef: PropTypes.object.isRequired,
};

export default injectIntl(EdsDashboardFilter);
