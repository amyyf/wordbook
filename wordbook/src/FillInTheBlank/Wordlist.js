import React, { Component } from 'react';

export default class Wordlist extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  render () {
    const { wordlist, correct } = this.props;
    return (
      <fieldset onChange={this.changeHandler} className='form-group'>
        <legend>Word list</legend>
        {wordlist.map(word =>
          <div className='form-check form-check-inline'>
            <input type='radio' value={word} name='wordlist' id={word} required checked={word === correct}/>
            <label key={word} for={word} className='btn btn-outline-primary'>
              {word}
            </label>
          </div>
        )}
      </fieldset>
    );
  }
}