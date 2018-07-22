import React from 'react';
import SelectQuestionnaire from '../questionnaires/SelectQuestionnaire';
import Questionnaire from '../questionnaires/Questionnaire';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionnaireId: '',
    }
  }
  
  render() {
    return (
      <div>
        <SelectQuestionnaire updateQuestionnaire={this.updateQuestionnaire} />
        {this.state.questionnaireId && <Questionnaire questionnaireId={this.state.questionnaireId} />}
      </div>
    );
  }

  updateQuestionnaire = (newQuestionnaire) => {
    if (newQuestionnaire) this.setState({questionnaireId: newQuestionnaire});
  }
}

export default View;
