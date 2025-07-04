import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { createOnRoadVehicleAnalysisData } from './util';
import { getFontSize } from '../DispatchTrend/util';

const lineoptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  layout: {
    padding: 10
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: true,
        color: "#242D4A"
      },
      ticks: {
          autoSkip: false,
          minRotation: 10,
          fontColor: 'white',
          fontSize: getFontSize(),
          autoSkip: true,
          autoSkipPadding: 4,
      }
    }],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: "#242D4A"
        },
        scaleLabel: {
          display: true,
          labelString: "Veh. Count",
          fontColor: 'white',
          fontStyle: 'italic',
        },
        ticks: {
          precision: 0,
          fontColor: 'white',
          fontSize: getFontSize(),
          autoSkip: true,
          autoSkipPadding: 4,
        }
      },
    ],
  },
  bezierCurve: false,
  plugins: {
    bezierCurve: false,
    datalabels: {
      display: true,
      anchor: 'end',
      color: 'white',
      font: {
        weight: 'bold',
        size: 14,
      },
    },
  },
};


function OnRoadVehicle({ responseData, intl }) {
 const [lineChartData, setLineChartData] = useState({ data: {}, options: {} });

  useEffect(() => {
    if (responseData && responseData.data) {
      const result = createOnRoadVehicleAnalysisData(responseData.data);
      setLineChartData(result);
    }
  }, [responseData]);

  return (
    <div className="OnRoadVehicle Width-Full Height-Full">
      <div className="Flex Flex-Space-Between Carousel__Slide__Title__Blue">
        <div className="OnRoadVehicle__Title Font--S16 Text-Decoration-UpperCase Font--WB">
          {intl.formatMessage({ id: 'label.onRoadVehicle' })}
        </div>
        <div className="Font--S12 Text--White Font--Italic">
          {`${(lineChartData.fromDate && dayjs(lineChartData.fromDate).format('DD MMM YY')) || 'NA'} - ${(lineChartData.toDate && dayjs(lineChartData.toDate).format('DD MMM YY')) || 'NA'}`}
        </div>
      </div>
      <div className="Pie Mt-10" style={{ position: 'relative', width: 'calc(100% - 10px)', height: 'calc(100% - 80px)' }}>
        <Line data={lineChartData} options={lineoptions} />
      </div>
      <div className="Legend Flex Mt-10" style={{ justifyContent: 'flex-end', marginRight: 20 }}>
        <div className="Legend__Item Flex Align-Items-Center">
          <div className="Flex Flex-Direction-Column BorderRadius--Base JustifyContent--Center Legend__Color__Box" style={{ width: 16, height: 16, border: '1px solid grey' }}>
            <div style={{ borderTop: '2px solid rgba(75,192,192,1)' }}/>
          </div>
          <div className="Ml-10 Font--S12">
          {intl.formatMessage({ id: 'label.vehicleCount' })}
          </div>
        </div>
      </div>
    </div>
  );
}

OnRoadVehicle.propTypes = {
  intl: PropTypes.object.isRequired,
  filterObj: PropTypes.object.isRequired,
};

export default injectIntl(OnRoadVehicle);
