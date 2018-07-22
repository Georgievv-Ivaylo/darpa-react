import React from 'react';
import QuestionsList from './QuestionsList';
import AnswersList from './AnswersList';

class Questionnaire extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentWillMount() {
    this.setQuestionnaire(this.props.questionnaireId);
  }

  componentWillReceiveProps(nextProps) {
    this.setQuestionnaire(nextProps.questionnaireId);
  }

  render() {
    const questions = this.state.questions;
    
    return (
      <section className="list-grid">
        {this.state.otherErrors && <p className="error-msg">{ this.state.otherErrors }</p>}
        {this.state.title && <h2 className="section-title">{ this.state.title }</h2>}
        {!this.state.answers &&
          questions &&
          <QuestionsList
            questions={questions}
            questionnaire_id={this.state.questionnaire_id}
            setAnswers={this.setAnswers} />}
        {this.state.answers &&
          <AnswersList questions={questions} answers={this.state.answers} />}
      </section>
    );
  }

  setQuestionnaire = (questionnaireId) => {
    fetch('/data/get/questionnaire/full-questionnaire?id='+ questionnaireId)
    .then(data => data.json())
    .then(
      (data) => {
        if (data.errorMsg) return this.setState({'otherErrors': data.errorMsg});
        this.setState({
          questions: data.questions,
          title: data.title,
          questionnaire_id: data.id,
          answers: false
        });
      },
      (error) => {}
    )
  }

  setAnswers = (answers) => {
    this.setState({ answers: answers });
  }

}

export default Questionnaire;