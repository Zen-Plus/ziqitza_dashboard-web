import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { createDispatchTrendAnalysisData } from './util';

const lineoptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
    }
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Job Count",
        },
      },
    ],
  },
  bezierCurve: false,
  plugins: {
    bezierCurve: false,
    datalabels: {
      display: true,
      anchor: 'end',
      font: {
        weight: 'bold',
        size: 14,
      },
    },
  },
};


function DispatchTrend({ responseData, intl }) {
 const [lineChartData, setLineChartData] = useState({ data: {}, options: {} });

  

  useEffect(() => {
    if (responseData && responseData.data) {
      const result = createDispatchTrendAnalysisData(responseData.data);
      setLineChartData(result);
    }
  }, [responseData]);

  return (
    <div className="DispatchTrendWrap Width-Full Height-Full">
      <div className="Flex Flex-Space-Between">
        <div className="DispatchTrend__Title Font--S16 Font--WB Font--Italic Opacity--50">
          {intl.formatMessage({ id: 'label.dispatchTrend' })}
        </div>
        <div className="Font--S12 Font--WB Font--Italic">
          {`${(lineChartData.fromDate && dayjs(lineChartData.fromDate).format('DD MMM YY')) || 'NA'} - ${(lineChartData.toDate && dayjs(lineChartData.toDate).format('DD MMM YY')) || 'NA'}`}
        </div>
      </div>
      <div className="Pie Mt-10" style={{ position: 'relative', width: 'calc(100% - 10px)', height: 'calc(100% - 25%)' }}>
        <Line data={lineChartData} options={lineoptions} />
      </div>
      <div className="Legend Flex Mt-10" style={{ justifyContent: 'flex-end' }}>
        <div className="Legend__Item Flex Align-Items-Center">
          <div className="Flex Flex-Direction-Column BorderRadius--Base JustifyContent--Center Legend__Color__Box" style={{ width: 16, height: 16, border: '1px solid grey' }}>
            <div style={{ borderTop: '2px solid rgba(75,192,192,1)' }}/>
          </div>
          <div className="Ml-10 Font--S12">
          {intl.formatMessage({ id: 'label.jobCount' })}
          </div>
        </div>
      </div>
    </div>
  );
}

DispatchTrend.propTypes = {
  intl: PropTypes.object.isRequired,
  filterObj: PropTypes.object.isRequired,
};

export default injectIntl(DispatchTrend);
