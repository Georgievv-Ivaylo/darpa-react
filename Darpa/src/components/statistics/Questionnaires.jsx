import React from 'react';
import StatisticList from './StatisticList';

class Questionnaires extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setQuestionnaire();
  }

  render() {
    const statistics = this.state.statistics || {};
    const questionnaires = this.state.questionnaires || [];
    const questions = this.state.questions || [];
    const answers = this.state.answers || [];
    let statisticsList = [];

    if (Object.keys(statistics).length >= 1 && statistics.constructor === Object) {
      statisticsList = Object.keys(statistics).map((statisticElKey) => {
        const statisticEl = statistics[statisticElKey];
        const questionnaire = questionnaires.filter( questionnaire => questionnaire['id'] === statisticElKey )[0];
        
        return (
          <div key={questionnaire.id} className="box">
            <h4 className="section-title">
              Questionnaire:<br />
              {questionnaire.title}
            </h4>
            <StatisticList
              statistic={statisticEl}
              questions={questions}
              answers={answers} />
          </div>
        )
      });
    }
    
    return (
      <section className="list-grid">
        <h2 className="section-title">Statistics</h2>
        {this.state.statistics && statisticsList}
      </section>
    );
  }

  setQuestionnaire = () => {
    fetch('/data/get/questionnaires/statistics')
    .then(data => data.json())
    .then(
      (data) => {
        // if (data.errorMsg) return this.setState({'otherErrors': data.errorMsg});
        this.setState({
          statistics: data.statistics,
          questionnaires: data.questionnaires,
          questions: data.questions,
          answers: data.answers
        });
      },
      (error) => {}
    )
  }

}

export default Questionnaires;