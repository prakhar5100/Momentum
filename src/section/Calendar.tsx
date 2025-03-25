import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { createPopper } from "@popperjs/core";

const Calendar = () => {

  const task = useSelector((state) => state.task.tasks)

  const [events, setEvents] = useState([{
    title : '',
    date : ''
  }])

  useEffect(() => {
      const event = task.map((tsk) => ({
        'title' : tsk.title,
        'date' : tsk.deadline,
        'description' : tsk.description
      }))

      setEvents(event)
  }, [task])

  return (

    <div className='p-8'>
{
  task && 
<FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  events={events}
  eventContent={(eventInfo) => (
    <div className="inline-block bg-purple-600 text-white px-2 py-1 rounded-md text-sm w-full"
    title={eventInfo.event.extendedProps.description}>
      {eventInfo.event.title}
    </div>
  )}

  eventDidMount={(info) => {
    if (info.event.extendedProps.description) {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip-content";
      tooltip.innerHTML = info.event.extendedProps.description;
      document.body.appendChild(tooltip);

      createPopper(info.el, tooltip, {
        placement: "top",
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }]
      });

      info.el.addEventListener("mouseenter", () => tooltip.setAttribute("data-show", ""));
      info.el.addEventListener("mouseleave", () => tooltip.removeAttribute("data-show"));
    }
  }}
/>



}

    </div>

  )
}

export default Calendar
