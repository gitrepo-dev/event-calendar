import React from "react";

interface contextInterface {
  Provider: any;
  Consumer: any;
  monthIndex: number,
  setMonthIndex: (index: number) => void,
  smallCalendarMonth: number,
  setSmallCalendarMonth: (index: any) => void,
  daySelected: any,
  setDaySelected: (day: any) => void,
  showEventModal: boolean,
  setShowEventModal: (params: any) => void,
  dispatchCalEvent: ({ type, payload }: any) => void,
  savedEvents: any[],
  selectedEvent: any,
  setSelectedEvent: (params: any) => void,
  setLabels: (params: any) => void,
  labels: any[],
  updateLabel: (params: any) => void,
  filteredEvents: any[],
}

// @ts-ignore
const GlobalContext:contextInterface = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => { },
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index: number) => { },
  daySelected: null,
  setDaySelected: (day: any) => { },
  showEventModal: false,
  setShowEventModal: () => { },
  dispatchCalEvent: ({ type, payload }: any) => { },
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => { },
  setLabels: () => { },
  labels: [],
  updateLabel: () => { },
  filteredEvents: [],
});

export default GlobalContext;
