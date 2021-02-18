import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList"

import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "../helpers/selectors.js"


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
    
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  // const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState({...state, days})

  // console.log(state.day);

  const schedule = dailyAppointments.map(appointment =>
    // return is implicit - can remove curly braces, return and parenthsis
    <Appointment key={appointment.id} {...appointment} />

  );



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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
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

