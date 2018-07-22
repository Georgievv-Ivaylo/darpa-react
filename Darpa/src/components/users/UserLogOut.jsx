import React from 'react';
import { connect } from 'react-redux';
// import * as actions from './actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video_url: props.url || ''
    }
  }
  
  render() {
    console.log('Props: ', this.props)
    return (
      <section className="form-grid">
        <div className="btn_2 slow" onClick={this.logOut}>Log Out</div>
      </section>
    );
  }
}

export default connect()(Form);
