export function getAppointmentsForDay(state, day) {

  if(state.days.length === 0) {
    return []
  }

  const dayObject = state.days.find(specificDay  => specificDay.name === day);
  // console.log("DAYOBJECT--------->", dayObject)

  if (!dayObject) {
    return []
  }

  const appObject = dayObject.appointments
  const mappedDays = appObject.map((id) => state.appointments[id])
 
  return mappedDays;
}



export function getInterview(state, interview) {
  if(!interview) {
    return null
  }
  
  const interviewerId = interview.interviewer
  console.log("INTERVIEWER", interviewerId)
  
  console.log("STATEINTERVIEWERS", state.interviewers)

  const tempIntID = state.interviewers[interviewerId]

  const result = {...interview, interviewer: tempIntID}
  console.log("RESULT------->", result)

  return result;

}

