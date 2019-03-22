import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPhonetic } from '../API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export default class Word extends Component {
  constructor (props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
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

  // componentWillUnmount () {
  //   this.setState({ phonetics: [] });
  // }

  createMarkup (text) {
    return { __html: text };
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
    console.log(definition);
    return (
      <div className='card col-lg mt-3 mt-lg-0 bg-primary text-light wordCard'>
        <div className='card-body'>
          <div className='row'>
            <h3 className='mb-0 col-auto'>{definition.word}</h3>
            <p className='card-text mb-0 col-auto'>{definition.pos}</p>
            <button className='pl-3 pr-3 phonetic' onClick={this.playPhonetic} type='button'>
              <FontAwesomeIcon icon={faVolumeUp} />
              <audio ref={this.phoneticRef} src={this.state.url} />
            </button>
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
          <p className='card-text' dangerouslySetInnerHTML={this.createMarkup(definition.deftext)} />
          {definition.suffix &&
            <Link to='/learning/suffixes' target='_blank' className='dark-bg-link' dangerouslySetInnerHTML={this.createMarkup(definition.suffix)} />
          }
          {definition.prefix &&
            <Link to='/learning/prefixes' target='_blank' className='dark-bg-link' dangerouslySetInnerHTML={this.createMarkup(definition.prefix)} />
          }
        </div>
      </div>
    );
  }
}
