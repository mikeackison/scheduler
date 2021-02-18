export function getAppointmentsForDay(state, day) {

  if(state.days.length === 0) {
    return []
  }

  const dayObject = state.days.find(specificDay  => specificDay.name === day);
  console.log(dayObject)

  if (!dayObject) {
    return []
  }

  const appObject = dayObject.appointments
  const mappedDays = appObject.map((id) => state.appointments[id])
 
  return mappedDays;
}

