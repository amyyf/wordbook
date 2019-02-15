import React, { Component } from 'react';
import { getPhonetic } from '../API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export default class Word extends Component {
  constructor (props) {
    super(props);
    this.createUrl = this.createUrl.bind(this);
    this.playPhonetic = this.playPhonetic.bind(this);
    this.phoneticRef = React.createRef();
    this.state = {
      phonetics: [],
      url: ''
      // phonetics: [
      //   {
      //     mw: 'hasten',
      //     sound: {
      //       audioUrl: 'https://media.merriam-webster.com/soundc11/h/hasten01.wav'
      //     }
      //   }
      // ]
    };
  }
  componentDidMount () {
    getPhonetic(this.props.definition.word)
      .then(phoneticData => {
        this.setState(prevState => ({ phonetics: phoneticData }));
        return phoneticData;
      })
      .then(phoneticData => this.createUrl(phoneticData));
  }

  componentWillUnmount () {
    this.setState({ phonetics: [] });
  }

  createUrl (phoneticData) {
    const audioArr = phoneticData.filter(phonetic => {
      return phonetic.hasOwnProperty('sound');
    });
    const url = audioArr[0].sound.audioUrl;
    return this.setState({ url: url });
  }

  playPhonetic () {
    const audio = this.phoneticRef.current;
    audio.play();
  }

  render () {
    const { definition } = this.props;
    console.log(this.state.phonetics.length);
    return (
      <div className='card col-lg mt-3 mt-lg-0 bg-primary text-light wordCard'>
        <div className='card-body'>
          <div className='row'>
            <h3 className='mb-0 col-auto'>{definition.word}</h3>
            <p className='card-text mb-0 col-auto'>{definition.pos}</p>
            <div className='pl-3 pr-3 phonetic' onClick={this.playPhonetic}>
              <FontAwesomeIcon icon={faVolumeUp} />
              <audio ref={this.phoneticRef} src={this.state.url} />
            </div>
            {/* follow display rules according to M-W */}
            \{this.state.phonetics.map(phonetic =>
              <p key={phonetic.mw} className='card-text mb-0 col-auto'>
                <span className='font-italic pl-3 pr-3'>{phonetic.l ? phonetic.l : null}</span>
                {phonetic.mw}
                <span className='font-italic pl-3 pr-3'>{phonetic.l2 ? phonetic.l2 : null}</span>
                {(this.state.phonetics.length > 1 && this.state.phonetics.indexOf(phonetic) < this.state.phonetics.length - 1) ? (phonetic.pun || ', ') : null}
              </p>
            )}\
          </div>
          <hr className='bg-secondary' />
          <p className='card-text'>{definition.deftext}</p>
        </div>
      </div>
    );
  }
}
