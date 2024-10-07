import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

interface ChartThreeState {
  series: { name: string; data: number[] }[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
  },
  colors: ['#008080', '#FF7F50'],
  xaxis: {
    categories: ['Exact Match / Acceptable differences', 'Mismatch Data'],
  },
  plotOptions: {
    bar: {
      horizontal: true, // Set this to true for horizontal bars
      endingShape: 'rounded',
      columnWidth: '50%',
    },
  },
  legend: {
    show: false,
    position: 'bottom',
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 900,
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

const InvMatchedDataPage: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [{ name: 'Value', data: [34920, 950] }], // Initial value-wise data
  });
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('value'); // State to manage dropdown value
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleGoClick = () => {
    console.log('From Date:', startDate);
    console.log('To Date:', endDate);
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setViewType(value);
    if (value === 'value') {
      // Count series
      setState({ series: [{ name: 'Value', data: [34920, 950] }] });
    } else {
      // Amount series
      setState({ series: [{ name: 'Count', data: [602510100, 18609950] }] });
    }
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">Invoice Matched Data </h5>
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
          <option value="value">Count</option>
          <option value="count">Amount</option>
        </select>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={state.series} type="bar" height={400} />
        </div>
      </div>

 
    </div>
  );
};

export default InvMatchedDataPage;
