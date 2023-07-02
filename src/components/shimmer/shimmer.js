import React from "react";
import "./shimmer.css"; // You can define your own CSS styles for the shimmer effect

const Shimmer = () => {
  return (
    <>
      <div className="shimmer-boxes">
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
      </div>

      <div className="table-shimmercontainer">
        <table>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 3</th>
            <th>Column 3</th>
          </tr>
          <tr>
            <td class="line loading-shimmer" colspan="5'"></td>
          </tr>
          <tr>
            <td class="line loading-shimmer" colspan="5'"></td>
          </tr>
          <tr>
            <td class="line loading-shimmer" colspan="5'"></td>
          </tr>
          <tr>
            <td class="line loading-shimmer" colspan="5'"></td>
          </tr>
          <tr>
            <td class="line loading-shimmer" colspan="5'"></td>
          </tr>
          <tr>
            <td class="line loading-shimmer" colspan="5'"></td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Shimmer;
