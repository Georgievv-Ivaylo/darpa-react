import React from 'react';

class Player extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      player: this.props.player || {}
    };
  }

  render() {
    const player = this.state.player;
    const score = this.props.player.score;
    const smoothTransition = (score >= 100) ? 0 : (100-score)/10 * 2;
    let setPosition = 'marginLeft';
    if (player.field === 'right-side') setPosition = 'marginRight';
    
    return (
      <div className='box'>
        <h2 className='h2'>{ player.title }</h2>
        <h3 className='h3'>{ score }</h3>
        <div className={'avatar slow '+ player.field}
          style={{[setPosition]: (100 - score - smoothTransition ) +'%'}}>
          <div className='top'></div>
          <div className='down'></div>
        </div>
      </div>
    );
  }

}

export default Player;