import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const sampleReportData = [
    { id: 1, documentNumber: 'GR001', postingDate: '01/10/2024', quantity: 100, status: 'Posted', supplier: 'Supplier A', totalValue: 5000 },
    { id: 2, documentNumber: 'GR002', postingDate: '05/10/2024', quantity: 200, status: 'Pending', supplier: 'Supplier B', totalValue: 10000 },
    { id: 3, documentNumber: 'GR003', postingDate: '09/10/2024', quantity: 150, status: 'Posted', supplier: 'Supplier A', totalValue: 7500 },
    { id: 4, documentNumber: 'GR004', postingDate: '12/10/2024', quantity: 50, status: 'Posted', supplier: 'Supplier C', totalValue: 2500 },
    { id: 5, documentNumber: 'GR005', postingDate: '15/10/2024', quantity: 300, status: 'Pending', supplier: 'Supplier D', totalValue: 15000 },
    { id: 6, documentNumber: 'GR006', postingDate: '18/10/2024', quantity: 120, status: 'Posted', supplier: 'Supplier B', totalValue: 6000 },
    { id: 7, documentNumber: 'GR007', postingDate: '22/10/2024', quantity: 75, status: 'Pending', supplier: 'Supplier C', totalValue: 3750 },
    { id: 8, documentNumber: 'GR008', postingDate: '25/10/2024', quantity: 90, status: 'Posted', supplier: 'Supplier D', totalValue: 4500 },
    { id: 9, documentNumber: 'GR009', postingDate: '28/10/2024', quantity: 60, status: 'Pending', supplier: 'Supplier A', totalValue: 3000 },
    { id: 10, documentNumber: 'GR010', postingDate: '30/10/2024', quantity: 110, status: 'Posted', supplier: 'Supplier B', totalValue: 5500 },
    { id: 11, documentNumber: 'GR011', postingDate: '02/11/2024', quantity: 125, status: 'Pending', supplier: 'Supplier E', totalValue: 6250 },
    { id: 12, documentNumber: 'GR012', postingDate: '06/11/2024', quantity: 80, status: 'Posted', supplier: 'Supplier F', totalValue: 4000 },
    { id: 13, documentNumber: 'GR013', postingDate: '10/11/2024', quantity: 145, status: 'Pending', supplier: 'Supplier G', totalValue: 7250 },
    { id: 14, documentNumber: 'GR014', postingDate: '14/11/2024', quantity: 95, status: 'Posted', supplier: 'Supplier H', totalValue: 4750 },
    { id: 15, documentNumber: 'GR015', postingDate: '17/11/2024', quantity: 260, status: 'Pending', supplier: 'Supplier I', totalValue: 13000 },
    { id: 16, documentNumber: 'GR016', postingDate: '21/11/2024', quantity: 115, status: 'Posted', supplier: 'Supplier J', totalValue: 5750 },
    { id: 17, documentNumber: 'GR017', postingDate: '25/11/2024', quantity: 90, status: 'Pending', supplier: 'Supplier K', totalValue: 4500 },
    { id: 18, documentNumber: 'GR018', postingDate: '29/11/2024', quantity: 130, status: 'Posted', supplier: 'Supplier L', totalValue: 6500 },
    { id: 19, documentNumber: 'GR019', postingDate: '02/12/2024', quantity: 55, status: 'Pending', supplier: 'Supplier M', totalValue: 2750 },
    { id: 20, documentNumber: 'GR020', postingDate: '06/12/2024', quantity: 100, status: 'Posted', supplier: 'Supplier N', totalValue: 5000 },
    { id: 21, documentNumber: 'GR021', postingDate: '10/12/2024', quantity: 215, status: 'Pending', supplier: 'Supplier O', totalValue: 10750 },
    { id: 22, documentNumber: 'GR022', postingDate: '14/12/2024', quantity: 135, status: 'Posted', supplier: 'Supplier P', totalValue: 6750 },
    { id: 23, documentNumber: 'GR023', postingDate: '18/12/2024', quantity: 185, status: 'Pending', supplier: 'Supplier Q', totalValue: 9250 },
    { id: 24, documentNumber: 'GR024', postingDate: '22/12/2024', quantity: 77, status: 'Posted', supplier: 'Supplier R', totalValue: 3850 },
    { id: 25, documentNumber: 'GR025', postingDate: '26/12/2024', quantity: 210, status: 'Pending', supplier: 'Supplier S', totalValue: 10500 },
    { id: 26, documentNumber: 'GR026', postingDate: '30/12/2024', quantity: 140, status: 'Posted', supplier: 'Supplier T', totalValue: 7000 },
    { id: 27, documentNumber: 'GR027', postingDate: '03/01/2025', quantity: 60, status: 'Pending', supplier: 'Supplier U', totalValue: 3000 },
    { id: 28, documentNumber: 'GR028', postingDate: '07/01/2025', quantity: 160, status: 'Posted', supplier: 'Supplier V', totalValue: 8000 },
    { id: 29, documentNumber: 'GR029', postingDate: '11/01/2025', quantity: 130, status: 'Pending', supplier: 'Supplier W', totalValue: 6500 },
    { id: 30, documentNumber: 'GR030', postingDate: '15/01/2025', quantity: 90, status: 'Posted', supplier: 'Supplier X', totalValue: 4500 },
    { id: 31, documentNumber: 'GR031', postingDate: '19/01/2025', quantity: 210, status: 'Pending', supplier: 'Supplier Y', totalValue: 10500 },
    { id: 32, documentNumber: 'GR032', postingDate: '23/01/2025', quantity: 175, status: 'Posted', supplier: 'Supplier Z', totalValue: 8750 },
    { id: 33, documentNumber: 'GR033', postingDate: '27/01/2025', quantity: 225, status: 'Pending', supplier: 'Supplier A', totalValue: 11250 },
    { id: 34, documentNumber: 'GR034', postingDate: '01/02/2025', quantity: 140, status: 'Posted', supplier: 'Supplier B', totalValue: 7000 },
    { id: 35, documentNumber: 'GR035', postingDate: '05/02/2025', quantity: 95, status: 'Pending', supplier: 'Supplier C', totalValue: 4750 },
    { id: 36, documentNumber: 'GR036', postingDate: '09/02/2025', quantity: 210, status: 'Posted', supplier: 'Supplier D', totalValue: 10500 },
    { id: 37, documentNumber: 'GR037', postingDate: '13/02/2025', quantity: 175, status: 'Pending', supplier: 'Supplier E', totalValue: 8750 },
    { id: 38, documentNumber: 'GR038', postingDate: '17/02/2025', quantity: 80, status: 'Posted', supplier: 'Supplier F', totalValue: 4000 },
    { id: 39, documentNumber: 'GR039', postingDate: '21/02/2025', quantity: 115, status: 'Pending', supplier: 'Supplier G', totalValue: 5750 },
    { id: 40, documentNumber: 'GR040', postingDate: '25/02/2025', quantity: 90, status: 'Posted', supplier: 'Supplier H', totalValue: 4500 },
    { id: 41, documentNumber: 'GR041', postingDate: '01/03/2025', quantity: 135, status: 'Pending', supplier: 'Supplier I', totalValue: 6750 },
    { id: 42, documentNumber: 'GR042', postingDate: '05/03/2025', quantity: 150, status: 'Posted', supplier: 'Supplier J', totalValue: 7500 },
    { id: 43, documentNumber: 'GR043', postingDate: '10/03/2025', quantity: 200, status: 'Pending', supplier: 'Supplier K', totalValue: 10000 },
    { id: 44, documentNumber: 'GR044', postingDate: '15/03/2025', quantity: 170, status: 'Posted', supplier: 'Supplier L', totalValue: 8500 },
    { id: 45, documentNumber: 'GR045', postingDate: '20/03/2025', quantity: 140, status: 'Pending', supplier: 'Supplier M', totalValue: 7000 },
    { id: 46, documentNumber: 'GR046', postingDate: '25/03/2025', quantity: 80, status: 'Posted', supplier: 'Supplier N', totalValue: 4000 },
    { id: 47, documentNumber: 'GR047', postingDate: '30/03/2025', quantity: 110, status: 'Pending', supplier: 'Supplier O', totalValue: 5500 },
    { id: 48, documentNumber: 'GR048', postingDate: '04/04/2025', quantity: 95, status: 'Posted', supplier: 'Supplier P', totalValue: 4750 },
    { id: 49, documentNumber: 'GR049', postingDate: '09/04/2025', quantity: 85, status: 'Pending', supplier: 'Supplier Q', totalValue: 4250 },
    { id: 50, documentNumber: 'GR050', postingDate: '14/04/2025', quantity: 150, status: 'Posted', supplier: 'Supplier R', totalValue: 7500 },
  ];
  

// Pagination settings
const rowsPerPage = 10;
const MatchedReportPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedDocumentNumber, setSelectedDocumentNumber] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
  
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const handleFilter = () => {
      setCurrentPage(1); // Reset to the first page when applying filters
    };
  
    const filterData = () => {
      return sampleReportData.filter((data) => {
        const postingDate = new Date(data.postingDate.split('/').reverse().join('/'));
  
        const supplierMatch = selectedSupplier ? data.supplier === selectedSupplier : true;
        const documentNumberMatch = selectedDocumentNumber ? data.documentNumber === selectedDocumentNumber : true;
        const startDateMatch = startDate ? postingDate >= startDate : true;
        const endDateMatch = endDate ? postingDate <= endDate : true;
  
        return supplierMatch && documentNumberMatch && startDateMatch && endDateMatch;
      });
    };
  
    const filteredData = filterData();
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  
    const uniqueSuppliers = [...new Set(sampleReportData.map((data) => data.supplier))];
    const uniqueDocumentNumbers = [...new Set(sampleReportData.map((data) => data.documentNumber))];
  
    return (
      <div className="container ">
        <h2 className="text-2xl font-bold mb-6 text-center"> EWB Exact-Match Report</h2>
  
        {/* Filter Bar */}
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Supplier Filter */}
          <div>
            <label className="block text-gray-700">Supplier</label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="w-full py-1 px-2 border border-gray-300 rounded"
            >
              <option value="">All Suppliers</option>
              {uniqueSuppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>
  
          {/* Document Number Filter */}
          <div>
            <label className="block text-gray-700">Document Number</label>
            <select
              value={selectedDocumentNumber}
              onChange={(e) => setSelectedDocumentNumber(e.target.value)}
              className="w-full py-1 px-2 border border-gray-300 rounded"
            >
              <option value="">All Document Numbers</option>
              {uniqueDocumentNumbers.map((docNum) => (
                <option key={docNum} value={docNum}>
                  {docNum}
                </option>
              ))}
            </select>
          </div>
  
          {/* From Date Filter */}
          <div>
            <label className="block text-gray-700">From Date</label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                 className="w-full py-1 px-2 border border-gray-300 rounded"
                placeholderText="Select From Date"
              />
            </div>
          </div>
  
          {/* To Date Filter */}
          <div>
            <label className="block text-gray-700">To Date</label>
            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                   className="w-full py-1 px-2 border border-gray-300 rounded"
                placeholderText="Select To Date"
              />
            </div>
          </div>
        </div>
  
        {/* Submit Filter Button */}
        <div className="px-2">
          <button
            onClick={handleFilter}
            className="px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        </div>
  
        {/* Data Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Document Number</th>
              <th className="py-2 px-4 text-left">Posting Date</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Supplier</th>
              <th className="py-2 px-4 text-left">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((data) => (
                <tr key={data.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4">{data.documentNumber}</td>
                  <td className="py-2 px-4">{data.postingDate}</td>
                  <td className="py-2 px-4">{data.quantity}</td>
                  <td className="py-2 px-4">{data.status}</td>
                  <td className="py-2 px-4">{data.supplier}</td>
                  <td className="py-2 px-4">{data.totalValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
  
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-blue-400`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default MatchedReportPage;
