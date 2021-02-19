import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList"

import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors.js"





export default function Application(props) {

 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}

  });

  const interviewers = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day)
  // const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState({...state, days})

  // console.log(state.day);


  function bookInterview(id, interview) {
    console.log("ID, INTERVIEW--------->", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState({
    //   ...state,
    //   appointments
    // });
  
  return axios.put(`/api/appointments/${id}`, {interview}).then(response => setState({...state, appointments}))
  }
  
  function deleteInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   return axios.delete(`/api/appointments/${id}`) 
   .then(() => {
     setState({...state, appointments})
   })

  };

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={deleteInterview}
      />
    );
  });
  
  useEffect(() => {
    const daysURL = `/api/days`
    const appointmentsURL = `/api/appointments`
    const interviewersURL = `/api/interviewers`
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      // console.log(all)
      console.log(all[2].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />




      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}

        {schedule}
        <Appointment key="last" time="5pm" />


      </section>
    </main>
  );
}

