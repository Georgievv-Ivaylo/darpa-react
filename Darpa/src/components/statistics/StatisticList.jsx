import React from 'react';
import AnswersList from './AnswersList';

class StatisticList extends React.Component {

  render() {
    const statistics = this.props.statistic.questions;
    const questions = this.props.questions;
    const answers = this.props.answers;
    let statisticList = [];
    // if (Object.keys(statistics).length >= 1 && statistics.constructor === Object) {
    //   statisticList = Object.keys(statistics).map((statisticElKey) => {
    //     const statisticEl = statistics[statisticElKey];
    //     const question = questions.filter( question => question['name'] === statisticElKey )[0];
    //     const thisAnswers = answers.filter( answer => answer.id === question.id );
    //     return (
    //       <div key={question.id} className="box">
    //         <h4 className="title">
    //           Question:<br />
    //           {question.title}
    //         </h4>
    //         <AnswersList
    //           answers={thisAnswers} />
    //       </div>
    //     )
    //   });
    // }
    
    return (
      statisticList
    );
  }

}

export default StatisticList;