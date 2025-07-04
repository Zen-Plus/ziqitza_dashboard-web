import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import dayjs from 'dayjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import Legends from '../../Legend';
import { createPrimaryComplaintData } from './utils';

Chart.plugins.register(ChartDataLabels);


const pieoptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,

  },
  aspectRatio: 1,
  plugins: {
    datalabels: {
      anchor: 'middle',
      display: 'auto',
    },
  },
};

function PrimaryComplaintContribution({ responseData, intl }) {
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    if (responseData) {
      const result = createPrimaryComplaintData(responseData.data);
      setPieChartData(result);
    }
  }, [responseData]);

  return (
    <div className="Dashboard_Primary_Complaint Width-Full Height-Full" style={{ background: '#141D38'}}>
      <div className="Flex Primary_Complaint__Title Flex-Space-Between Carousel__Slide__Title__Green AlignItems--Center">
        <div className="Font--S16 Font--WB Text-Decoration-UpperCase">
          {intl.formatMessage({ id: 'label.chiefComplaints' })}
        </div>
        <div className="Font--S12 Font--Italic Text--White">
          {`${(pieChartData.fromDate && dayjs(pieChartData.fromDate).format('DD MMM YY')) || 'NA'} - ${(pieChartData.toDate && dayjs(pieChartData.toDate).format('DD MMM YY')) || 'NA'}`}
        </div>
      </div>
      <div className="Flex Height-Full Align-Items-Center" style={{ height: 'calc(100% - 40px)' }}>
        <div className="Pie" style={{ position: 'relative', width: 'calc(100% - 40%)', height: 'calc(100% - 30%)' }}>
          <Pie
            data={pieChartData}
            options={pieoptions}
          />
        </div>
        <div className="Text--White">
          <Legends data={pieChartData.legend || []} length={5} />
        </div>
      </div>
    </div>
  );
}

PrimaryComplaintContribution.defaultProps = {
  filterObj: {},
};

PrimaryComplaintContribution.propTypes = {
  intl: PropTypes.object.isRequired,
  filterObj: PropTypes.object,
};


export default React.memo(injectIntl(PrimaryComplaintContribution));
