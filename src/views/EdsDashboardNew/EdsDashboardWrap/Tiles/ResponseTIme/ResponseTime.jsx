import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { createResponseTimeAnalysisData } from './util';
import { getFontSize } from '../DispatchTrend/util';

function formatSecond(time) {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  } else {
    ret += "00:"
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

const lineoptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  layout: {
    padding: {
      left: 10,
      right: 30,
      top: 10,
    }
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        return formatSecond(tooltipItem.yLabel);
      }
    }
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
      },
    }],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: "#242D4A"
        },
        scaleLabel: {
          display: true,
          fontColor: 'white',
          labelString: "Time",
          fontStyle: 'italic',
        },
        beginAtZero: false,
        ticks: {
          precision: 0,
          padding: 15,
          fontColor: 'white',
          fontSize: getFontSize(),
          autoSkip: true,
          autoSkipPadding: 4,
          callback(value) {
            return formatSecond(value);
          },
        },
      },
    ],
  },
  bezierCurve: false,
  plugins: {
    bezierCurve: false,
    datalabels: {
      formatter: function (value, context) {
        return formatSecond(value);
      },
      display: 'auto',
      anchor: 'end',
      color: 'white',
      font: {
        weight: 'bold',
        size: 14,
      },
    },
  },
};


function ResponseTime({ intl, responseData }) {
  const [lineChartData, setLineChartData] = useState({ data: {}, options: {} });

  useEffect(() => {
    if (responseData && responseData.data) {
      const result = createResponseTimeAnalysisData(responseData.data);
      setLineChartData(result);
    }
  }, [responseData]);

  return (
    <div className="DispatchTrendWrap Width-Full Height-Full">
      <div className="Flex Flex-Space-Between Carousel__Slide__Title__Blue">
        <div className="DispatchTrend__Title Font--S16 Font--WB Text-Decoration-UpperCase">
          {intl.formatMessage({ id: 'label.responseTime' })}
        </div>
        <div className="Font--S12 Font--Italic Text--White">
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
          {intl.formatMessage({ id: 'label.urban' })}
          </div>
        </div>
        <div className="Legend__Item Flex Align-Items-Center Ml-10">
          <div className="Flex Flex-Direction-Column BorderRadius--Base JustifyContent--Center Legend__Color__Box" style={{ width: 16, height: 16, border: '1px solid grey' }}>
            <div style={{ borderTop: '2px solid #742774' }}/>
          </div>
          <div className="Ml-10 Font--S12">
          {intl.formatMessage({ id: 'label.rural' })}
          </div>
        </div>
      </div>
    </div>
  );
}

ResponseTime.propTypes = {
  intl: PropTypes.object.isRequired,
  filterObj: PropTypes.object.isRequired,
};

export default injectIntl(ResponseTime);
