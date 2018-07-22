import React from 'react';

class Controlls extends React.Component {

  render() {
    const controller = this.props.controller;
    
    return (
      <div className='grid_2'>
        <div className={'left-side slow info-btn pointer'+ ((controller === 'playerOne') ? ' active' : '')}
          data-key={ this.props.playerOne.key }
          onClick={this.handelClick}>
          Press
          <br/>
          { this.props.playerOne.key }
        </div>
        <div className={'right-side slow info-btn pointer'+ ((controller === 'playerTwo') ? ' active' : '')}
          data-key={ this.props.playerTwo.key }
          onClick={this.handelClick}>
          Press
          <br/>
          { this.props.playerTwo.key }
        </div>
        <div className='clear'></div>
      </div>
    );
  }

  handelClick = (ev) => {
    this.props.useMouse({ code: 'Key'+ ev.target.getAttribute('data-key') })
  }
}

export default Controlls;