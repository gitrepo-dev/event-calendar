import React from "react";
import Day from "./Day";
export default function Month({ month }:any) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row:any, i:number) => (
        <React.Fragment key={i}>
          {row.map((day:any, idx:number) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
