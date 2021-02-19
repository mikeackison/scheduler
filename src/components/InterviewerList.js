import React from "react"

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const temporaryPropsInterviewers = []

  const interviewers = temporaryPropsInterviewers.map(interviewer => 
  // temporarlily set ^^^^^^^^^ <props.inteviewers> to an empty array  on INTERVIEW LIST
   
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={ (event) => props.onChange(interviewer.id)} 
        />

  );
  
    return (
  
      <section className={"interviewers"}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
    );
  }