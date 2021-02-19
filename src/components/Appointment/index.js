import React from "react";

import "components/Appointment/styles.scss";

import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  return(
    <article className="appointment">
      <Header time={props.time}  />

      {/* { (props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> } */}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && <Form onCancel={() => back(EMPTY)} />}

    </article>
  );
}

