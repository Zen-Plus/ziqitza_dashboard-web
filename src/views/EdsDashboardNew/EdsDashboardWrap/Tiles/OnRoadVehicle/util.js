import dayjs from "dayjs";

export function createOnRoadVehicleAnalysisData(values) {
    const _values = {...values};
    const _data = _values.onRoadVehicleLineChartTileData || [];
    const _toDate = values.toDate;
    const _fromDate = values.fromDate;


    const result = {};
    result.labels = [..._data.map((item) => dayjs(item.onRoadDate).format('DD-MM-YY'))];
    result.datasets = [{
        data: [..._data.map((item) => Number(item.vehicleCount))],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0,
    }];

    result.toDate = _toDate;
    result.fromDate = _fromDate;
    return result;
};
export function getFontSize () {
    if(typeof window !== 'undefined') {
        const _width = window.innerWidth;
        const _size = _width / 100 > 18 ? 18 : _width / 100;
        return _size; 
    }
    return 12;
}

export default {
    createOnRoadVehicleAnalysisData,
    getFontSize,
};