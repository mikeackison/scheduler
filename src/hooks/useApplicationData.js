import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotsRemaining({ ...state, appointments });

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => setState({ ...state, appointments, days }));
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = spotsRemaining({ ...state, appointments });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function spotsRemaining(state) {
    const days = state.days.map((dayObj) => {
      let availableSpots = 0;
      let newDayObj = { ...dayObj };
      newDayObj.appointments.forEach((numID) => {
        if (!state.appointments[numID].interview) {
          availableSpots++;
        }
      });

      newDayObj.spots = availableSpots;
      return newDayObj;
    });

    return days;
  }

  return { setDay, deleteInterview, bookInterview, state };
}
