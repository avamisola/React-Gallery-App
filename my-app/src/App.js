//import modules
import React, {Component} from 'react';
import apiKey from './config.js';
import axios from 'axios';
import Gallery from './components/Gallery';
import Nav from './components/Nav';
import PageNotFound from './components/PageNotFound';
import SearchForm from './components/SearchForm';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

//create container component
export default class App extends Component {
  //getting access to all props
  constructor(props) {
    super(props)
    //initialize state
    this.state = {
      query: '',
      Sun: [],
      Moon: [],
      Stars: [],
      Other: []
    }
  }

  //make API calls after component mounted
  componentDidMount() {
    this.performSearch("Sun");
    this.performSearch("Moon");
    this.performSearch("Stars");
  }

  //use axios to fetch data from flickr api and log error if unable to fetch
  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1&per_page=24`)
      .then(response => {
        this.setState({ query: query});
        if (query === 'Sun') {
          this.setState({ Sun: response.data.photos.photo });
        } else if (query === 'Moon') {
          this.setState({ Moon: response.data.photos.photo });
        } else if (query === 'Stars') {
          this.setState({ Stars: response.data.photos.photo });
        } else {
          this.setState({ Other: response.data.photos.photo });
        }
      })
      .catch(err => {
        console.error("Error fetching data", err);
      })
  }

  //pass down props and render presentation components
  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/search/Sun" />} />
            <Route path="/search/Sun" render={(props) => <Gallery data={this.state.Sun} onSearch={this.performSearch} query="Sun" {...props} />} />
            <Route path="/search/Moon" render={(props) => <Gallery data={this.state.Moon} onSearch={this.performSearch} query="Moon" {...props} />} />
            <Route path="/search/Stars" render={(props) => <Gallery data={this.state.Stars} onSearch={this.performSearch} query="Stars" {...props} />} />
            <Route path="/search/:query" render={(props) => <Gallery data={this.state.Other} onSearch={this.performSearch} query={this.state.query} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
};
