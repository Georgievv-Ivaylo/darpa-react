import React from 'react';

class SelectQuestionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: '',
      questionnaires: []
    }
  }

  componentDidMount() {
    fetch('/data/get/questionnaire/questionnaires')
    .then(res => res.json())
    .then(
      (result) => {
        return this.setState({questionnaires: result});
      },
      (error) => {}
    )
  }
  
  render() {
    const questionnaires = this.state.questionnaires;
    return (
      <section className="form-grid">
          <form className="form"> 
            <div className="field-grid">
              <select
                name="questionnaire"
                className="field"
                autoFocus
                onChange={this.handleChange}
              >
                <option value=''>Select Questionnaire</option>
                {questionnaires && questionnaires.map(
                  (questionnaire) => {
                    return <option key={questionnaire.id} value={questionnaire.id}>{questionnaire.title}</option>;
                  }
                )}
              </select>
              {this.state.questionnaireError && <p className="error-msg">{ this.state.questionnaireError }</p>}
            </div>
            <div className="btn_2 slow" onClick={this.checkData}>Get It</div>
            {this.state.otherErrors && <p className="error-msg">{ this.state.otherErrors }</p>}
            <div className="clear"></div>
          </form>
      </section>
    );
  }

  handleChange = (e) => {
    const field = e.target;
    this.setState({[field.name]: field.value, [field.name +'Error']: ''});
  }

  checkData = () => {
    if (this.state.questionnaire) {
      this.props.updateQuestionnaire(this.state.questionnaire);
    } else {
      this.setState({questionnaireError: 'Please, select Questionnaire.'});
    }
  }
}

export default SelectQuestionnaire;
