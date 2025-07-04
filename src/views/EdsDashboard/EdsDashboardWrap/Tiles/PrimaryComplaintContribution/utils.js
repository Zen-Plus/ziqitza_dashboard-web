import moment from 'moment';

const chartColors = [
  '#889bf9',
  '#a4e7ff',
  '#f6cfe0',
  '#336699',
  '#99CCFF',
  '#999933',
  '#666699',
  '#CC9933',
  '#006666',
  '#3399FF',
  '#993300',
  '#CCCC99',
  '#666666',
  '#FFCC66',
  '#6699CC',
  '#663366',
  '#9999CC',
  '#CCCCCC',
  '#669999',
  '#CCCC66',
  '#CC6600',
  '#9999FF',
  '#0066CC',
  '#99CCCC',
  '#999999',
  '#FFCC00',
  '#009999',
  '#99CC33',
  '#FF9900',
  '#999966',
  '#66CCCC',
  '#339966',
  '#CCCC33',
  '#003f5c',
  '#665191',
  '#a05195',
  '#d45087',
  '#2f4b7c',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
  '#EF6F6C',
  '#465775',
  '#56E39F',
  '#59C9A5',
  '#5B6C5D',
  '#0A2342',
  '#2CA58D',
  '#84BC9C',
  '#CBA328',
  '#F46197',
  '#DBCFB0',
];
export function calculatePercentage(value, total, decimal = 2) {
  let result = 0;
  if (total > 0) {
    const percentage = (value / total) * 100;
    result = Number(parseFloat(percentage).toFixed(decimal));
  }
  return result;
}
const convertNullToBlankString = (val) => (val || '');

function compareValues(key, order = 'ASC') {
  return function innerSort(firstValue, secondValue) {
    if (!firstValue.hasOwnProperty(key) || !secondValue.hasOwnProperty(key)) {
      return 0;
    }

    const updatedFirstValue = (typeof firstValue[key] === 'string')
      ? firstValue[key].toUpperCase() : convertNullToBlankString(firstValue[key]);
    const updatedSecondValue = (typeof secondValue[key] === 'string')
      ? secondValue[key].toUpperCase() : convertNullToBlankString(secondValue[key]);

    let comparison = 0;
    if (updatedFirstValue > updatedSecondValue) {
      comparison = 1;
    } else if (updatedFirstValue < updatedSecondValue) {
      comparison = -1;
    }
    return (
      (order === 'DESC') ? (comparison * -1) : comparison
    );
  };
}

export function createPrimaryComplaintData(values = {}) {
  const _values = {...values};
  const _data = _values && _values.primaryComplaintContributionTileData || [];
  const _toDate = _values && _values.toDate;
  const _fromDate = _values && _values.fromDate;
  const totalJob = _data.reduce((sum, item) => sum + item.jobCount, 0);
  const _updatedData = _data.map((item, index) => ({
    ...item, percentage: calculatePercentage(item.jobCount, totalJob, 2), name: item.primaryComplaintName, color: chartColors[index],
  }));
  const noContribution = [];
  const otherCategory = [];
  const displayData = [];

  _updatedData.map((item) => {
    if (parseFloat(item.percentage) === 0) {
      noContribution.push(item);
    } else if (parseFloat(item.percentage) < 2) {
      otherCategory.push(item);
    } else {
      displayData.push(item);
    }
  });

  const pieData = [...displayData.map((item) => item.jobCount)];

  const otherSum = otherCategory.reduce((sum, item) => sum + item.jobCount, 0);

  if (otherSum > 0) {
    pieData.push(otherSum);
  }

  const result = {};
  result.labels = [...displayData.map((item) => item.primaryComplaintName), 'Others'];
  result.datasets = [{
    data: [...pieData],
    backgroundColor: [...displayData.map((item) => item.color), '#545775'],
    borderWidth: 0,
    datalabels: {
      color: 'black',
    },
  }];


  if (otherCategory && otherCategory.length) {
    const other = {
      popupContent: otherCategory,
      popupPlacement: 'leftTop',
      name: 'Others',
      color: '#545775',
      percentage: calculatePercentage(otherSum, totalJob, 2),
    };
    displayData.push(other);
  }
  if (noContribution && noContribution.length) {
    const noContri = {
      popupContent: noContribution,
      popupPlacement: 'leftTop',
      isHyperLink: true,
      percentage: 0,
      name: 'No Contribution',
    };
    displayData.push(noContri);
  }
  const legendData = displayData.sort(compareValues('percentage', 'DESC'));
  result.legend = legendData;
  result.toDate = _toDate;
  result.fromDate = _fromDate;
  return result;
}

export function createFilterQuery(values = {}) {
  const _values = {};
  if (values.district && values.district.id) {
    _values.district = values.district.id;
  }
  if (values.dateRangeType && values.dateRangeType.id) {
    if (values.dateRangeType.id === 'LAST_1_WEEK') {
      _values.fromDate = moment().subtract(7, 'days').startOf('day').valueOf();
      _values.toDate = moment().endOf('day').valueOf();
    } else if (values.dateRangeType.id === 'LAST_15_DAYS') {
      _values.fromDate = moment().subtract(15, 'days').startOf('day').valueOf();
      _values.toDate = moment().endOf('day').valueOf();
    } else if (values.dateRangeType.id === 'LAST_1_MONTH') {
      _values.fromDate = moment().subtract(1, 'month').startOf('day').valueOf();
      _values.toDate = moment().endOf('day').valueOf();
    } else if (values.dateRangeType.id === 'CUSTOMIZED_DATE_RANGE' && values.dateRange[0] && values.dateRange[1]) {
      _values.toDate = moment(values.dateRange[1]).endOf('day').valueOf();
      _values.fromDate = moment(values.dateRange[0]).startOf('day').valueOf();
    }
  }

  if (values.chiefComplaint && values.chiefComplaint.length) {
    _values.primaryComplaints = values.chiefComplaint.map((item) => item.id);
  }

  if (values.ervType && values.ervType.length) {
    _values.vehicleTypes = values.ervType.map((item) => item.id);
  }

  return _values;
}

export function createTabularData(values) {
  const _values = { ...values };
  return _values;
}


export default {};
