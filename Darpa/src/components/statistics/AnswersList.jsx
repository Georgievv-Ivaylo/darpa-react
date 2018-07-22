import React from 'react';

class AnswersList extends React.Component {

  render() {
    const questions = this.props.questions;
    const answers = this.props.answers;
    console.log('answers::  ', answers)
    let questionsList = {};
    if (questions) {
      questionsList = questions.map((question, id) => {
          let answerMsg = 'Not Answered!';
          let answer = '';
          if (answers[question.name]) {
            answer = answers[question.name];
            if ( answer.constructor === Array ) {
              answer = answer.join(',');
              answerMsg = 'Answers:';
            } else {
              answerMsg = 'Answer:';
            }

            if (question.answers.constructor !== Array) {
              answer = question.answers.map((thisAnswer, id) => {
                if ((answers[question.name].constructor !== Array &&
                      answers[question.name] !== thisAnswer.id) ||
                    (answers[question.name].constructor === Array &&
                      answers[question.name].indexOf(thisAnswer.id) <= -1)) return '';
                return thisAnswer.title +'\n';
              });
            } else if (!answer && answers[question.name]) {
              answer = answers[question.name];
            }
          }
          return (
            <div key={id} className="box">
              <h4 className="title">
                Question:<br />
                {question.title}
              </h4>
              <div className='field-grid_2'>{answerMsg}
              { answer && <div className='color_1' dangerouslySetInnerHTML={{__html: answer}} /> }</div>
            </div>
          )
        }
      );
    }
    
    return (
        questionsList
    );
  }

}

export default AnswersList;