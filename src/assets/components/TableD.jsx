import React from "react";

function TableD({ result }) {
  return (
    <>
      <td className="p-2 border text-center">{result.referenceDate}</td>
      <td className="p-2 border text-center">
        {result.benchmark1.toFixed(1)}%
      </td>
      <td className="p-2 border text-center">
        {result.benchmark2.toFixed(1)}%
      </td>
    </>
  );
}

export default TableD;
