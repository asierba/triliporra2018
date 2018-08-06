import * as React from "react";
import axios from "axios/index";
import MatchRow from '../match/matchRow';

export default class UserProfile extends React.Component<any,any> {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      userId: props.userId,
      editingIsEnabled: props.editingIsEnabled,
      predictionResults: { }
    }
  }

  componentWillMount() {
    const userId = this.state.userId;
    axios.get(`/api/user/${userId}`)
      .then(response => {
        const matches = response.data.properties.matches;
        const predictionResults = response.data.properties['prediction-results'];
        this.setState({matches, predictionResults});
      });
  }
  render() {
    const predictionResults = this.state.predictionResults;
    return (
      <div>
        <div className="container-fluid">
          <button type="button" className="float-right btn btn-secondary today-button" onClick={scrollToToday}>go to today</button>
          <h2>Predictions</h2>
          <div>
            <span data-id="num-guessed">{predictionResults.guessed}</span> <i className="fas guessed-prediction"></i> <span
            data-id="num-missed">{predictionResults.missed}</span> <i className="fas missed-prediction"></i>
          </div>

          {this.state.matches.map(x =>
            <MatchRow key={x.id}
                      match={x}
                      editingIsEnabled={this.state.editingIsEnabled}
                      displayPrediction={true}
                      userId={this.state.userId}/>
          )}
        </div>
      </div>
    );
  }
}

function scrollToToday() {
  function findPosition(element) {
    var curtop = 0;
    if (element.offsetParent) {
      do {
        curtop += element.offsetTop;
      } while (element = element.offsetParent);
      return [curtop];
    }
  }

  const todayMatch = document.getElementsByClassName("match-today")[0];
  if (todayMatch) {
    // @ts-ignore
    window.scroll(0,findPosition(todayMatch));
  }
}
