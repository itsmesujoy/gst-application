import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF'],
  labels: [
    'Inward EWB not posted in ERP',
    'Matched data',
    'Goods Invoices / Challans posted in ERP without corresponding inward EWB',
  ],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 450,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const InwardEwb: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [650, 35870, 21], 
  });
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('value'); 
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleGoClick = () => {
    console.log('From Date:', startDate);
    console.log('To Date:', endDate);
  };

  
  const handleDataPointSelection = (event: any, chartContext: any, { dataPointIndex }: any) => {
    console.log(dataPointIndex);
    if (dataPointIndex === 1) {
     
      
      navigate('/InwardEWB/matched-data');
    } else if (dataPointIndex === 0) {
      navigate('/InwardEWB/unmatched-data');
    }
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setViewType(value);
    if (value === 'value') {
  
      setState({ series: [650, 35870, 21] });
    } else {
     
      setState({ series: [9500500, 621120050, 932150] });
    }
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">Inward EWB</h5>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-black dark:text-white">From Date</label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full py-1 pl-3 pr-8 text-sm font-medium bg-transparent outline-none border border-gray-300 dark:border-strokedark rounded"
                placeholderText="Select From Date"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-black dark:text-white">To Date</label>
            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full py-1 pl-3 pr-8 text-sm font-medium bg-transparent outline-none border border-gray-300 dark:border-strokedark rounded"
                placeholderText="Select To Date"
              />
            </div>
          </div>
          <div className="mt-4 ml-5">
            <button
              onClick={handleGoClick}
              className="bg-primary text-white font-medium py-1 px-2 rounded hover:bg-primary-dark"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium text-black dark:text-white mr-4">View Type</label>
        <select
          className="border border-gray-300 dark:border-strokedark rounded px-2 py-1"
          value={viewType}
          onChange={handleViewChange}
        >
          <option value="value">Value Wise</option>
          <option value="count">Count Wise</option>
        </select>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{ 
              ...options, 
              chart: { 
                ...options.chart, 
                events: { 
                  dataPointSelection: handleDataPointSelection 
                } 
              }
            }}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Inward EWB not posted in ERP</span>
              <span>{viewType === 'value' ? 650 : 9500500}</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Matched data</span>
              <span>{viewType === 'value' ? 35870 : 621120050}</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Goods Invoices / Challans posted in ERP without corresponding inward EWB</span>
              <span>{viewType === 'value' ? 21 : 932150}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InwardEwb;
