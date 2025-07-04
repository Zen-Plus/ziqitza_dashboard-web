import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import Legends from '../../Legend';
import Chart from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { createDroppedAtFacilityData } from './utils';
import dayjs from 'dayjs';

Chart.plugins.register(ChartDataLabels);

const pieoptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,

  },
  cutoutPercentage: 70,
  aspectRatio: 1,
  tooltips: {
    enabled: true,
  },
  plugins: {
    datalabels: {
      display: true,
   },
  },
};

function DropAtFacility({ intl, responseData }) {
   const [pieChartData, setPieChartData] = useState({ data: {}, options: {} });
  

  useEffect(() => {
    if (responseData && responseData.data) {
      const result = createDroppedAtFacilityData(responseData.data);
      setPieChartData(result)
    }
  }, [responseData]);

  return (
    <div className="Dashboard_Primary_Complaint Width-Full Height-Full">
      <div className="Flex Primary_Complaint__Title Flex-Space-Between" style={{ alignItems: 'baseline' }}>
       <div className="Font--S16 Font--WB Font--Italic Opacity--50">
          {intl.formatMessage({ id: 'label.droppedAtFacility'})}
         </div>
         <div className="Font--S12 Font--WB Font--Italic">
         {`${(pieChartData.fromDate && dayjs(pieChartData.fromDate).format('DD MMM YY')) || 'NA'} - ${(pieChartData.toDate && dayjs(pieChartData.toDate).format('DD MMM YY')) || 'NA'}`}
         </div>
      </div>
      <div className="Flex Height-Full Align-Items-Center"  style={{ height: 'calc(90%)' }}>
      <div className="Pie" style={{ position: 'relative', width: 'calc(100% - 40%)', height: 'calc(100% - 20%)' }}>
        <Doughnut
          data={pieChartData}
          options={pieoptions}
        />
      </div>
      <div>
        <Legends data={pieChartData.legend || []}  length={6}/>
        </div>
      </div>
    </div>
  );
}

DropAtFacility.defaultProps = {
  filterObj: {},
};

DropAtFacility.propTypes = {
  intl: PropTypes.object.isRequired,
  filterObj: PropTypes.object,
  autoRefresh: PropTypes.object.isRequired,
};


export default injectIntl(DropAtFacility);
