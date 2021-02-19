import React from "react";

import "components/Appointment/styles.scss";

import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"
import useVisualMode from "hooks/useVisualMode"

import bookInterview from "components/Application"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log("SAVE-------------->", name, interviewer)
   
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(response => transition(SHOW))

    // transition(SHOW)
   
  }

  function cancelInterview() {
    transition(DELETE)
    props.cancelInterview(props.id).then(()=> {
      transition(EMPTY);
    })

  }
  

  return(
    <article className="appointment">
      <Header time={props.time}  />

      {/* { (props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> } */}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelInterview}
        />
      )}
      {mode === SAVING && (
        <Status
        message="Saving" />
      )}

      {mode === DELETE && (
        <Status
        message="Deleting" />

      )}

      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}

    </article>
  );
}

