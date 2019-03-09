import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';
import TableOfContents from '../TableOfContents';
import FixList from '../FixList';

export default class LearningPage extends Component {
  constructor (props) {
    super(props);
    this.toggleToC = this.toggleToC.bind(this);
    this.state = {
      showToC: true
    };
  }

  toggleToC () {
    this.setState((prevState) => ({ showToC: !prevState.showToC }));
  }

  render () {
    return (
      <React.Fragment>
        <Route exact path='/learning/:fixType' render={({ match }) => <FixList
          fixType={match.params.fixType}
        />}
        />
        {/* <Route path='/learning/suffixes' component={FixList} /> */}
        {this.state.showToC &&
          <Route
            exact path='/learning/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?'
            component={TableOfContents}
          />
        }
        <Route
          path='/learning/level/:level/section/:section/wordset/:wordset/exercise/:exercise'
          render={({ match }) => <ExercisePage
            level={match.params.level}
            section={match.params.section}
            wordset={match.params.wordset}
            exercise={match.params.exercise}
            toggleToC={this.toggleToC}
          />}
        />
        {/* if review test */}
        <Route
          path='/learning/level/:level/section/:section/review/:review'
          render={({ match }) => <ExercisePage
            level={match.params.level}
            section={match.params.section}
            review={match.params.review}
            toggleToC={this.toggleToC}
          />}
        />
        <footer className='d-flex justify-content-end align-items-end mt-3'>
          <p className='pb-0 pr-3 text-muted footer-text'>Phonetics and audio provided by Merriam-Webster Inc.</p>
          <div className='mw-logo'>
            <img src='http://localhost:3000/MWLogo_LightBG.png' alt='Merriam-Webster logo' />
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
