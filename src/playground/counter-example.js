class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    //console.log('componentDidMount');
    try{
      //console.log('try')
      const count = parseInt(localStorage.getItem('count'), 10);
      if(!isNaN(count)) {
        //console.log('NaN false')
        this.setState(() => ({ count }));
      }
    }catch(e) {
      //console.log('catch e: ' + e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate')
    if(prevState.count !== this.state.count) {
      //console.log("TrueAfUp")
      localStorage.setItem('count', this.state.count);
    }
  }
  
  handleAddOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  handleMinusOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }
  
  handleReset() {
    this.setState(() => {
      return {
        count: 0
      };
    });
  }
  
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));