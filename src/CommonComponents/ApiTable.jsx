import React from "react";
import { FaFilter } from "react-icons/fa"; // Import the filter icon

function ApiTable() {
  return (
    <div className="w-full h-full">
      <p>APi table</p>
      <table>
        <thead>
          <tr className="text-center">
            <th>
              <span className="flex justify-between">
                name
                <FaFilter />
              </span>
            </th>
            <th>
              <span className="flex justify-between">
                age
                <FaFilter />
              </span>
            </th>
            <th>
              <span className="flex justify-between">
                roll
                <FaFilter />
              </span>
            </th>
            <th>
              <span className="flex justify-between">
                year
                <FaFilter />
              </span>
            </th>
            <th>
              <span>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Paras</td>
            <td>24</td>
            <td>16</td>
            <td>2000</td>
            <td>2000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ApiTable;
