import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Breadcrumb extends Component {
  constructor (props) {
    super(props);
    this.updatePretestState = this.updatePretestState.bind(this);
    this.state = {
      pretest: false
    };
  }

  componentDidMount () {
    this.updatePretestState();
  }

  // below to change text content of breadcrumb from Exercise 0 > Pretest
  componentDidUpdate (prevProps) {
    const exercise = this.props.match.params.exercise;
    if (exercise !== prevProps.match.params.exercise) {
      this.updatePretestState();
    }
  }

  updatePretestState () {
    if (this.props.match.params.exercise === '0') {
      this.setState({ pretest: true });
    } else {
      this.setState({ pretest: false });
    }
  }

  render () {
    // single letters below indicate the presence or absence of the url variables (params) beginning with the same letter - hence are used to determine which breadcrumbs to show
    const { learning, level, section, wordset, exercise, l, s, w, e } = this.props.match.params;
    return (
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <NavLink exact to='/'>Home</NavLink>
          </li>
          {learning === 'placement' &&
            <li className='breadcrumb-item'>
              <NavLink to='/placement/1'>Placement Quiz</NavLink>
            </li>
          }
          {learning === 'placement' && level &&
            <li className='breadcrumb-item'>
              {/* no NavLink b/c don't want the user to be able to navigate through the placement quiz, but do want them to know where they are within the quiz */}
              Level {+level}
            </li>
          }
          {learning === 'learning' &&
            <li className='breadcrumb-item'>
              <NavLink exact to='/learning'>Learning</NavLink>
            </li>
          }
          {(level === 'suffixes' || level === 'prefixes') &&
            <li className='breadcrumb-item'>
              <NavLink exact to={`/learning/${level}`}>{level[0].toUpperCase() + level.slice(1)}</NavLink>
            </li>
          }
          {l &&
            <li className='breadcrumb-item'>
              <NavLink exact to={`/learning/level/${level}`}>Level {level}</NavLink>
            </li>
          }
          {s &&
            <li className='breadcrumb-item'>
              <NavLink exact to={`/learning/level/${level}/section/${section}`}>Section {section}</NavLink>
            </li>
          }
          {w && wordset !== 'review' &&
            <li className='breadcrumb-item'>
              <NavLink exact to={`/learning/level/${level}/section/${section}/wordset/${wordset}`}>Wordset {wordset}</NavLink>
            </li>
          }
          {wordset === 'review' &&
            <li className='breadcrumb-item'>
              <NavLink to={`/learning/level/${level}/section/${section}/review/`}>Review Test</NavLink>
            </li>
          }
          {e && this.state.pretest &&
            <li className='breadcrumb-item'>
              <NavLink exact to={`/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/${exercise}`}>Pretest</NavLink>
            </li>
          }
          {e && !this.state.pretest &&
            <li className='breadcrumb-item'>
              <NavLink exact to={`/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/${exercise}`}>Exercise {exercise}</NavLink>
            </li>
          }
        </ol>
      </nav>
    );
  }
}
