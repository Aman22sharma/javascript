import React, {Component} from 'react';
import ModeToggleButton from './ModeToggleButton'
import Listing from './Listing'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      data: [],
      mode: 'city'
    }
    this.handleMode = this.handleMode.bind(this);
    this.getData = this.getData.bind(this);
  }
  handleMode(mode) {
    this.setState({
      mode
    });
  }
 
  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.getData();
  }
 
  async getData() {
    try {
      const response = await fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities')
      const data = await response.json();

      this.setState({
        data
      });
    }
    catch(error) {
      this.setState({
        error
      });
    }
    finally {
      this.setState({
        isLoaded: false
      });
    }
  }
  render() {
    const {data, mode, isLoaded, error} = this.state;
    if(error) return <p>{error.message}</p>;
    if(isLoaded) return <p>Loading...</p>;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col col-12'>
            <h1 className='mt-5 mb-3'>Indian Geography</h1>
          </div>
          <ModeToggleButton onModeChange={this.handleMode} mode={mode} />
          <main className='col col-12'>
            <ul className='list-group mb-5'>
              <Listing
                mode={mode}
                data={data}
              />
            </ul>
          </main>
        </div>
      </div>
    );
  }
}

export default App;