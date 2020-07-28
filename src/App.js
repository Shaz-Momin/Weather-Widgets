import React from 'react';
import CityWidget from './CityWidget'
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { cities: [], city: ""}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteCityWidget = this.deleteCityWidget.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.city.length === 0) {
      return;
    }

    const newCity = {
      text: this.state.city,
      key: Date.now()
    };

    this.setState(state => ({
      cities: state.cities.concat(newCity),
      city: ''
    }));
  }

  deleteCityWidget(id) {
    console.log("Key: " + id)
    const filteredItems = this.state.cities.filter(city => city.key !== id);
    this.setState({
      cities: filteredItems
    })

  }

  handleChange(e) {
    this.setState({ city: e.target.value })
  }


  render() {
    let content = this.state.cities.map(city => (
      <div className="outerWidget" key={city.key}>
        <span className="deleteWidget" onClick={() => this.deleteCityWidget(city.key)}>&#10006;</span>
        <CityWidget cityKey={city.key} cityName={city.text} />
      </div>
    ))

    return (
      <div className="App">
        <div className="main">
          <div className="header">
            <div>Weather Widgets</div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              className="searchBar" 
              value={this.state.city}
              placeholder="Search City" 
              onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSubmit}>Add City</button>
          </form>
          <div className="content">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
