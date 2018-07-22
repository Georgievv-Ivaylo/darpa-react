import React from 'react';

class Rope extends React.Component {

  render() {
    const playerOne = (60 - this.props.playerOne / 2) - (60-this.props.playerOne / 2)/10 * 2;
    const playerTwo = (60 - this.props.playerTwo / 2) - (60-this.props.playerTwo / 2)/10 * 2;
    
    return (
      <div className='rope slow' style={{
        left: playerOne +'%',
        right: playerTwo +'%'
      }}></div>
    );
  }

}

export default Rope;