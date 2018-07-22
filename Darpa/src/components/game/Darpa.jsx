import React from 'react';
import Player from './Darpa/Player';
import Rope from './Darpa/Rope';
import Controlls from './Darpa/Controlls';

class Darpa extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      winner: false,
      controller: false,
      playerOne: {'title': 'Monster 1', 'score': '100', 'field': 'left-side', 'key': 'A'},
      playerTwo: {'title': 'Monster 2', 'score': '100', 'field': 'right-side', 'key': 'S'}
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.movePlayer);
  }

  render() {
    
    return (
      <section className='relative slow'>
        {this.state.winner && 
          <div className='p_50'>
            <p className='info-msg p_20'>The winner is: { this.state.winner }</p>
            <div className='info-btn slow block-center pointer' onClick={this.playAgain}>Play Again?</div>
          </div>
        }
        <div className='grid relative p_20'>
          <div className='col-sm_6 border-right'>
            <Player player={ this.state.playerOne } />
          </div>
          <div className='col-sm_6 border-left'>
            <Player player={ this.state.playerTwo } />
          </div>
          <Rope playerOne={ this.state.playerOne.score } playerTwo={ this.state.playerTwo.score } />
          <div className='clear'></div>
        </div>
        {this.state.error && 
          <p className='error-msg p_20'>{ this.state.error }</p>
        }
        <Controlls controller={this.state.controller} playerOne={ this.state.playerOne } playerTwo={ this.state.playerTwo } useMouse={ this.movePlayer } />
      </section>
    );
  }

  movePlayer = (ev) => {
    console.log(ev);
    const player = ev;
    const playerOne = this.state.playerOne;
    const playerTwo = this.state.playerTwo;
    if (player.code !== 'Key'+ playerOne.key && player.code !== 'Key'+ playerTwo.key)
      return this.setState({
            error: 'Please, use only "'+ playerOne.key +'" and "'+ playerTwo.key +'" keys for the game!'
          });
    if ( this.state.winner ) return this.setState({
            error: 'Game Over!'
          });
    let thisPlayerAttack = 'playerOne';
    let thisPlayer = 'playerTwo';
    if (player.code === 'Key'+ playerTwo.key) {
      thisPlayerAttack = 'playerTwo';
      thisPlayer = 'playerOne';
    }
    const setPlayer = {
      error: false,
      controller: thisPlayerAttack,
      [ thisPlayer ]: { ...this.state[ thisPlayer ], score: this.state[ thisPlayer ].score - 10 }
    };

    this.setState( setPlayer, function () { this.unMarkBtn(); } );
   
    if (setPlayer[ thisPlayer ].score <= 0) {
      this.setState({
        controller: false,
        winner: this.state[ thisPlayerAttack ].title
      });
    }
  }

  unMarkBtn = () => {
    setTimeout(() => {
      this.setState({
        controller: false
      });
    }, 700)
  }

  playAgain = () => {
    this.setState({
      winner: false,
      error: false,
      playerOne: { ...this.state.playerOne, score: 100 },
      playerTwo: { ...this.state.playerTwo, score: 100 }
    });
  }

}

export default Darpa;
