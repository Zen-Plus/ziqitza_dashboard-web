
export const primaryComplaintConfig = {
};

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
  '#545775',
];

export function calculatePercentage(value, total, decimal = 2) {
  const percentage = (value / total) * 100;
  const result = parseFloat(percentage).toFixed(decimal);
  return result;
}

export function createDroppedAtFacilityData (values = []) {
  const _values = { ...values};
  const _data = _values.casesDroppedAtFacilityTileData || [];
  const _toDate = values.toDate;
  const _fromDate = values.fromDate;
  const totalCount = _data.reduce((sum, item) => sum + item.jobCount, 0);
 
  const _updatedData = _data.map((item, index) => ({
    ...item, name: item.droppedAtFacilityName, color: chartColors[index],
    percentage: calculatePercentage(item.jobCount, totalCount, 2),
  }));


  const result = {};
  result.labels = [ ..._updatedData.map((item) => item.name)];
  result.datasets = [{
    data: [ ..._updatedData.map((item) => item.jobCount)],
    backgroundColor: [ ..._updatedData.map((item) => item.color)],
    borderWidth: 0,
    datalabels: {
      color: 'black'
    }
  }];

  
  result.legend = _updatedData;
  result.toDate = _toDate;
  result.fromDate = _fromDate;
  
  return result;
}

export default {
  createDroppedAtFacilityData,
};
