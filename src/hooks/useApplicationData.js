import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}

});

 function bookInterview(id, interview) {
  // console.log("ID, INTERVIEW--------->", id, interview);

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/${id}`, { interview }).then(response => setState({ ...state, appointments }))
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
      setState({ ...state, appointments })
    })

};

const setDay = day => setState(prev => ({ ...prev, day }));

useEffect(() => {
  const daysURL = `/api/days`
  const appointmentsURL = `/api/appointments`
  const interviewersURL = `/api/interviewers`
  Promise.all([
    axios.get(daysURL),
    axios.get(appointmentsURL),
    axios.get(interviewersURL)
  ]).then((all) => {
    // console.log(all[2].data)
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  })
}, [])

return {setDay, deleteInterview, bookInterview, state}
}