import dayjs from "dayjs";

export function createResponseTimeAnalysisData(values) {
    const _values = {...values};
    const _data = _values.responseTimeLineChartTileData || [];
    const _toDate = values.toDate;
    const _fromDate = values.fromDate;
    const dataAvgRuralTime = _data.map((item) => Math.floor(parseInt(item.avgResponseTimeRural, 10) /1000));
    const dataAvgUrbanTime = _data.map((item) => Math.floor(parseInt(item.avgResponseTimeUrban, 10) /1000));

    const result = {};
    result.labels = _data.map((item) => dayjs(item.dialerCallDate).format('DD-MM-YY'));
    result.datasets = [
      {
        label: "Urban Response Time",
        data: [ ...dataAvgUrbanTime ],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0,
      },
    {
      label: "Rural Response Time",
      data: [ ...dataAvgRuralTime ],
      fill: false,
      borderColor: "#742774",
      lineTension: 0,
    },
  ];
  
    result.toDate = _toDate;
    result.fromDate = _fromDate;
    return result;
  }

export default {
    createResponseTimeAnalysisData,
};