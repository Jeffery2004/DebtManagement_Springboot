import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Report.css"; // 👈 Make sure this file exists

const Report = () => {
  const reportRef = useRef();

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("debt-report.pdf");
    });
  };

  return (
    <div className="report-container">
      <h1>Debt Report</h1>

      <div className="report-table-wrapper" ref={reportRef}>
        <table className="report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Principal Amount</th>
              <th>Date</th>
              <th>Total Interest</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jeffery</td>
              <td>30,000</td>
              <td>10/1/2025</td>
              <td>3,000</td>
            </tr>
            <tr>
              <td>Jeffery</td>
              <td>30,000</td>
              <td>10/1/2025</td>
              <td>3,000</td>
            </tr>
            <tr>
              <td>Jeffery</td>
              <td>30,000</td>
              <td>10/1/2025</td>
              <td>3,000</td>
            </tr>
            <tr>
              <td>Jeffery</td>
              <td>30,000</td>
              <td>10/1/2025</td>
              <td>3,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download as PDF
      </button>
    </div>
  );
};

export default Report;
