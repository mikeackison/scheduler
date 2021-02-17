import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {

  // const showAppointment = () => {
  //   if(props.interview) {
  //     return <Show/>
  //   } else{ <Empty/>
  //   }
  // }
  
  /* ({props.interview}) ? <Show/> : <Empty/> */

  return(
    <article>
      <Header time={props.time}  />
      { (props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty /> }
      
    </article>
  );
}