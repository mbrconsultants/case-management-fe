import React from "react";
import "./CourtRoster.css";

const CourtRoster = () => {
  // Define the table data
  const data = [
    [
      "1",
      "2/12/19",
      "FHC/ABJ/CS/317/2016 \n Hon. Justice Reuben. O. \n Nwajiobi V. NJC & 20rs.",
      "Federal High Court 1, \n Abuja, Col 4",
      "Itoro Ekpo \n Chidinma Onuoha and \n Shehu Abdullahi",
      "C. A. Ajuya, \n (SAN) & CO.",
      "30/01/2020",
    ],
    [
      "2",
      "4/12/19",
      "Charge No. G/35/2018 \n C.O.P.V. Lawrence \n Adebayo Jegede",
      "Chief Magistrate, \n Court Igbosere, \n Lagos",
      "",
      "DPC Attorneys \n Solicitors",
      "",
    ],
    [
      "3",
      "9/12/19",
      "FHC/ABJ/CS/39/2019 \n The Board of \n Incorporated Trustees of \n Malcom Omirhobo \n Foundation V. NJC & \n 5 Ors.",
      "Federal High Court \n 9, Abuja",
      "Anthony Chukwu, \n Mercedes and \n Ahmed Fili",
      "S. H. Garun \n Gabbas SAN \n & CO",
      "",
    ],
  ];

  return (
    <table border="1">
      <colgroup>
        <col style={{ width: "150px" }} />
        <col style={{ width: "200px" }} />
        <col style={{ width: "300px" }} />
        <col style={{ width: "250px" }} />
        <col style={{ width: "300px" }} />
        <col style={{ width: "200px" }} />
        <col style={{ width: "150px" }} />
      </colgroup>
      <thead>
        <tr>
          <th>S/N</th>
          <th>DATE</th>
          <th>CASE</th>
          <th>COURT</th>
          <th>COUNSEL</th>
          <th>EXTERNAL SOLICITOR</th>
          <th>NEXT ADJOURNED DATE</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourtRoster;
