import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "utils/calendarUtil";
import CalendarHeader from "components/CalendarHeader";
import Sidebar from "components/Sidebar";
import Month from "components/Month";
import GlobalContext from "context/GlobalContext";
import EventModal from "components/EventModal";

export default function Home() {

  const [currenMonth, setCurrentMonth] = useState(getMonth());
  // @ts-ignore
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
   
  }, [monthIndex]);

  return (
    <>
      {
        showEventModal && (
          <EventModal />
        )}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  )
}
