import React, { useContext, useState } from "react";
import GlobalContext from "context/GlobalContext";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {

  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  }: any = useContext(GlobalContext);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [states, setStates] = useState({
    title: '' || selectedEvent ? selectedEvent.title : "",
    description: '' || selectedEvent ? selectedEvent.description : "",
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  })



  const validation = (name: string, value: any) => {
    switch (name) {
      case 'title':
        if (!value) setErrors((prevErr: any) => ({ ...prevErr, title: 'This field is required.' }))
        else if (value.length < 3) setErrors((prevErr: any) => ({ ...prevErr, title: 'Min 3 character long.' }))
        else setErrors((prevErr: any) => ({ ...prevErr, title: '' }))
        break;
      case 'description':
        if (!value) setErrors((prevErr: any) => ({ ...prevErr, description: 'This field is required.' }))
        else if (value.length < 3) setErrors((prevErr: any) => ({ ...prevErr, description: 'Min 3 character long.' }))
        else setErrors((prevErr: any) => ({ ...prevErr, description: '' }))
        break;
      default:
        break;
    }
  }

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target
    validation(name, value)
    setStates({
      ...states,
      [name]: value
    })
  }


  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!states.title) setErrors((prevErr: any) => ({ ...prevErr, title: 'This field is required.' }))
    if (!states.description) setErrors((prevErr: any) => ({ ...prevErr, description: 'This field is required.' }))
    else if(!errors.title && !errors.description) {
      const calendarEvent = {
        ...states,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }

      setShowEventModal(false);
    }
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-red-600 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 gap-5">
            <div></div>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={states.title}
                required

                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={handleChange}
              />
              <p className="text-red-600 text-xs">{errors.title}</p>
            </div>
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <div>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={states.description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={handleChange}
              />
              <p className="text-red-600 text-xs">{errors.description}</p>
            </div>
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  style={{ backgroundColor: `${lblClass}` }}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`${((errors.title || errors.description) || (!states.title || !states.description)) ? 'bg-gray-400 cursor-no-drop px-6 py-2 rounded text-white' : 'bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'}`}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
