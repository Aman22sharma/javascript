import React, {Component} from 'react';
import Item from './Item';
import COUNTRIES from './Countries';

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: [],
      error: null,
      isLoading: false,
      maleSelected: false,
      femaleSelected: false
    }
    this.sort = this.sort.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.reset = this.reset.bind(this);
  }
  sort(a, b) {
    if ( a.surname < b.surname ){
      return -1;
    }
    if ( a.surname > b.surname ){
      return 1;
    }
    return 0;
  }
  removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject  = {};

    for(let i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }
  async handleCountry(event) {
    let value = String(event.target.value);
    let query = event.target.attributes.name.value;
    let url = query === 'male'
              ? `https://uinames.com/api/?region=${value}&amount=100&gender=male`
              : `https://uinames.com/api/?region=${value}&amount=100&gender=female`
    if(query === 'male') {
      this.setState({
        femaleSelected: true
      });
    } else {
      this.setState({
        maleSelected: true
      });
    }
    try {
      await fetch(url)
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error('This country does not exist.')
      })
      .then(data => this.setState({
        content: data,
        isLoading: false
      }));
    }
    catch(error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }
  reset() {
    this.setState({
      content: [],
      error: null,
      isLoading: false,
      maleSelected: false,
      femaleSelected: false
    });
    window.location.reload(true);
  }
  render() {
    const {isLoading, error, content} = this.state;

    let clonedArray = [...content];
    let removeDuplicates = this.removeDuplicates(clonedArray, 'surname');
    removeDuplicates.sort(this.sort);

    const listing = removeDuplicates.map(item => <Item content={item} />);
    const countries = COUNTRIES.map(item => <option>{item.country}</option>);

    if(error) return <p>{error.message}</p>
    if(isLoading) return <p>Loading....</p>

    return (
      <div className='app'>
        <header className='header'>
          <h1 className='title'>Find surnames in the world</h1>
          <div className='header-group'>
            <select className='select-female' disabled={this.state.femaleSelected} name='female' onChange={this.handleCountry}><option disabled selected>Find female surnames</option>{countries}</select>
            <select className='select-male' disabled={this.state.maleSelected} name='male' onChange={this.handleCountry}><option disabled selected>Find male surnames</option>{countries}</select>
            <button className='reset' onClick={this.reset}>Reset</button>
          </div>
        </header>
        {listing}
      </div>
    );
  }
}

export default App;