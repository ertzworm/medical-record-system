import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
const sampleAPI = `http://localhost:3001/api/users/`;
console.log(url);
console.log(sampleAPI);

function isSearched(searchTerm){
  return function(list){
    return !searchTerm ||
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.author.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


class App extends Component {
  
  constructor(props){
    super(props);

    //Sets the states for this app
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }
  
  setSearchTopstories(result){
    this.setState ({ result });
  }

  fetchSearchTopstories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  //For Search
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: Object.assign({}, this.state.result, {hits: updatedHits})
    });
  }

  render() {
    const {searchTerm, result } = this.state

    if(!result){
      return null;
    }
    return (
      <div className="page">
          <div className="interactions">

            <Search 
              onChange = {this.onSearchChange}
            >

             Search
            </Search>
          </div>

        <Table 
          list = {result.hits}
          pattern = {searchTerm}
        />

      </div>
    );
  }
}


//Class Search
class Search extends Component{
  render(){
    const {value, onChange, children} = this.props;
    /*
      This can also be done by:

      const value = this.props.value;
      const onChange = this.props.onChange;
    */
    
    return(
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}



//Class Table
class Table extends Component{
  render(){
    const {list, pattern} = this.props;
    return(
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span>
              <a href={item.url}> {item.title} </a>
            </span>

            <span> {item.author} </span>
            <span> {item.num_comments} </span>
            <span> {item.points} </span>
            <span> {item.objectID} </span>
            
          </div>
        )}
      </div>
    );
  }
}

//Class Button
class Button extends Component{
  render(){
    const{
      onClick,
      className,
      children,
    } = this.props;

    return (
      <button
        onClick = {onClick}
        className = {className}
        type = "button"
      >
      
        {children}
      </button>
    );
  }

  
}

export default App;
