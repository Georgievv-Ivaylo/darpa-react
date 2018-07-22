import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

class UserLogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: ''
    }
  }
  
  render() {
    return (
      <section className="form-grid">
        {!this.state.welcome &&
          <form className="form"> 
              <div className="field-grid">
                <input
                  type="text"
                  name="username"
                  placeholder="Username..."
                  autoFocus
                  className="field"
                  ref={(field) => { this.fieldUsername = field; }}
                  onKeyUp={this.handleChange}
                />
                {this.state.usernameError && <p className="error-msg">{ this.state.usernameError }</p>}
              </div>
              <div className="field-grid">
                <input
                  type="password"
                  name="password"
                  placeholder="Password..."
                  className="field"
                  ref={(field) => { this.fieldPassword = field; }}
                  onKeyUp={this.handleChange}
                />
                {this.state.passwordError && <p className="error-msg">{ this.state.passwordError }</p>}
              </div>
              <div className="btn_2 slow" onClick={this.checkData}>Log In</div>
              {this.state.otherErrors && <p className="error-msg">{ this.state.otherErrors }</p>}
              <div className="clear"></div>
          </form>
        }
        {this.state.welcome && <p className="info-msg">{ this.state.welcome }</p>}
      </section>
    );
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});

    if (e.keyCode === 13 && e.target.name === 'username') {
      const isValid = this.fieldValidation([ e.target ]);

      if (!isValid) return;
      this.fieldPassword.focus();
    } else if (e.keyCode === 13) {
      const isValid = this.fieldValidation([ this.fieldUsername, this.fieldPassword ]);

      if (!isValid) return;
      this.checkUser();
    }
  }

  checkData = () => {

    const isValid = this.fieldValidation([ this.fieldUsername, this.fieldPassword ]);

    if (!isValid) return;
    this.checkUser();
  }

  fieldValidation = (fields) => {
    
    let isValid = true;

    fields.map( (thisEl) => {
      if (thisEl.value.length <= 4) {
        isValid = false;
        return this.setState({[thisEl.name +'Error']: 'This field requires at least 5 symbols!'});
      } else {
        return this.setState({[thisEl.name +'Error']: ''});
      }
    } );

    return isValid;
  }

  checkUser = () => {
    
    this.setState({'otherErrors': ''});

    fetch('/data/post/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username': this.fieldUsername.value, 'password': this.fieldPassword.value})
    })
    .then(response => response.json())
    .then(
      (data) => {
        if (data.errorMsg) return this.setState({'otherErrors': data.errorMsg});
        console.log(data.userData)
        this.setState({'welcome': data.successMsg});
        this.props.actions.set(data.userData);
        setTimeout(() => { this.props.history.goBack(); }, 3000);
        // dispatch(actions.set(data.userData));
      },
      (error) => {}
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(UserLogIn);
