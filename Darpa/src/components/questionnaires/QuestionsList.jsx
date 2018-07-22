import React from 'react';
import { Checkbox, Radio, FieldText } from '../form/Fields';

class QuestionsList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    const questions = this.props.questions;
    let questionsList = {};
    if (questions) {
      let fieldComponents = {
        'Checkbox': Checkbox,
        'Radio': Radio,
        'Text': FieldText
      };
      questionsList = questions.map((question, id) => {
          const ComponentName = fieldComponents[question.type];
          return (
            <div key={id} className={'box id_'+ question.id + (this.state.connectedTo && this.state.connectedTo['is_connected_'+ question.id] ? ' ignore' : '')}>
              <h4 className="title">{question.title}</h4>
              {question.type === 'Text' &&
                <ComponentName key={question.name}
                  fieldName={question.name}
                  fieldData={question}
                  setter={this.state['form_text_'+ question.name] || ''}
                  fieldHandler={this.fieldHandler} />
              }
              {question.answers.map((answer, id) => {
                  const fieldType = (( question.type !== 'Mixed' ) ?
                                      question.type :
                                      answer.type);
                  const ComponentName = fieldComponents[fieldType];
                  return (
                    <ComponentName key={id}
                      fieldName={question.name}
                      fieldData={answer}
                      setter={this.state['form_'+ fieldType.toLowerCase() +'_'+ question.name]}
                      fieldHandler={this.fieldHandler} />
                  )
                }
              )}

            </div>
          )
        }
      );
      questionsList.push(
        <div key='submit' className='btn_2' onClick={this.submitForm}>Done</div>
      );
    }
    
    return (
        questionsList
    );
  }

  fieldHandler = (e) => {
    
    const field = e.target;
    const setterName = 'form_'+ field.getAttribute("type") +'_'+ field.name;
    let setter = this.state[setterName];
    let connectedTo = this.state.connectedTo || {};
    if (field.getAttribute("type") === 'checkbox') {
      setter = this.state[setterName] || [];
      const index = setter.indexOf(field.value);
      if (index >= 0) {
        setter.splice(index, 1);
      } else {
        setter.push(field.value);
      }
    } else {
      setter = field.value;
    }

    const question = this.props.questions.filter( question => question.name === field.name )[0];
    if (question.answers && question.answers.constructor === Array) {
      const answer = question.answers.filter( answer => answer.id === field.value )[0];
      if (!answer) return this.setState({ [setterName]: setter });
      if (answer.connectedQuestions.length >= 1) {
        answer.connectedQuestions.map( connectedQuestionId => {
          return connectedTo['is_connected_'+ connectedQuestionId] = true;
        });
      } else {
        if (setter.constructor !== Array || setter.indexOf(field.value) <= -1) {
          question.answers.map( answer => answer.connectedQuestions.map(
            connectedQuestionId => connectedTo['is_connected_'+ connectedQuestionId] = false
          ));
        }
      }
    }

    this.setState({ [setterName]: setter, connectedTo });
  }

  submitForm = () => {
    
    let formData = {};
    for (const state in this.state) {
      if (state.indexOf('form_') <= -1) continue;
      const fieldName = state.split('_').splice(2).join('_');
      const fieldVal = this.state[state];
      if (!formData[fieldName]) {
        formData[fieldName] = fieldVal;
      } else {
        if (fieldVal.constructor === Array) {
          formData[fieldName] = [formData[fieldName]];
          fieldVal.map( thisVal => formData[fieldName].push(thisVal) );
        } else {
          formData[fieldName].push(fieldVal);
        }
      }
    }

    formData['questionnaire_id'] = this.props.questionnaire_id;
    fetch('/data/post/questionnaire/questionnaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(
      (data) => {
        this.props.setAnswers(data);
      },
      (error) => {}
    );
  }

}

export default QuestionsList;