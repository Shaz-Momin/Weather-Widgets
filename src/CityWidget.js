import React from 'react'
import { render } from '@testing-library/react'


class CityWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiKey: "a699c2e376e4574de23448fa88c36604",
            base: "api.openweathermap.org/data/2.5/weather?",
            city: this.props.cityName,
            temp: 0,
            high: 0,
            low: 0,
            mainText: "",
            desc: "",
            iconUrl: "",
            intervalId: ""
        }
    }

    componentDidMount() {
        this.getData();
        
        // Refresh data every 5 seconds
        this.intervalId = setInterval(this.getData.bind(this), 5000);
    }

    getData() {
        let apiUrl = `${this.state.base}q=${this.state.city}&units=imperial&appid=${this.state.apiKey}`
        //console.log(apiUrl);

        fetch("https://" + apiUrl)
        .then(res =>  res.json())
        .then(
            (result) => {
                //console.log(result.weather[0].main)
                if (Object.keys(result).length !== 2) {
                    this.setState({
                        temp: Math.round(result.main.temp),
                        mainText: result.weather[0].main,
                        desc: result.weather[0].description,
                        high: Math.round(result.main.temp_max),
                        low: Math.round(result.main.temp_min),
                        iconUrl: "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"
                    });
                } else {
                    this.setState({
                        mainText: "Please enter a valid city name"
                    })
                }
            },
            (error) => {
                console.log("Error: " + error)
            }
        )
    }
    componentWillUnmount() {

        // stop getData() from continuing to run even after unmounting this component
        clearInterval(this.intervalId);
    }


    render() {
        return (
            <div className="cityWidget">
                <div className="cityName">{(this.state.city).toUpperCase()}</div>
                <img src={this.state.iconUrl} alt={this.state.description} />
                <div className="allTemps">
                    <div className="high"> 
                        <span>&#11014;</span>
                        {this.state.high}
                    </div>
                    <div className="tempDeg">
                        <div className="temp">{this.state.temp}</div>
                        <div className="degree">°F</div>
                    </div>
                    <div className="low"> 
                        <span>&#11015;</span>
                        {this.state.low}
                    </div>
                </div>
                
                <div className="mainText">{this.state.mainText}</div>
            </div>
        )
    } 
}


export default CityWidget