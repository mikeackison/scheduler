import React from "react"

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => 
    // return is implicit - can remove curly braces, return and parenthsis
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