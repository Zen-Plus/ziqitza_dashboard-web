import dayjs from "dayjs";

export function createDispatchTrendAnalysisData(values) {
    const _values = {...values};
    const _data = _values.dispatchTrendLineChartTileData || [];
    const _toDate = values.toDate;
    const _fromDate = values.fromDate;


    const result = {};
    result.labels = [..._data.map((item) => dayjs(item.dialerCallDate).format('DD-MM-YY'))];
    result.datasets = [{
        data: [..._data.map((item) => item.jobCount)],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0,
    }];

    result.toDate = _toDate;
    result.fromDate = _fromDate;
    return result;
};

export default {
    createDispatchTrendAnalysisData,
};