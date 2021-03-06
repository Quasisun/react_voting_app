import React from 'react';
import DishStore from '../stores/DishStore';
import DishActions from '../actions/DishActions';

class Dish extends React.Component {
  constructor(props) {
    super(props);
    this.state = DishStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DishStore.listen(this.onChange);
    DishActions.getDish(this.props.params.id);

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  componentWillUnmount() {
    DishStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    // Fetch new charachter data when URL path changes
    if (prevProps.params.id !== this.props.params.id) {
      DishActions.getDish(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='profile-img'>
          <a className='magnific-popup' href={'http://www.thecheesecakefactory.com' + this.state.image}>
            <img src={'http://www.thecheesecakefactory.com' + this.state.image} style={{"width":256, "height":256}} />
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2><strong>{this.state.name}</strong></h2>
          <h4 className='lead'>Description: <strong>{this.state.description}</strong></h4>
          <button className='btn btn-transparent'
                  onClick={DishActions.report.bind(this, this.state.characterId)}
                  disabled={this.state.isReported}>
            {this.state.isReported ? 'Reported' : 'Report Dish'}
          </button>
        </div>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.winLossRatio}</span>Winning Percentage</li>
            <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
            <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Dish;