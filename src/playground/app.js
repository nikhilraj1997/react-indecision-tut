/*babel src\app.js --out-file public\scripts\app.js --presets=env,react --watch
src\app.js doesn't exist*/

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
        //console.log("IndecisionApp.constructor(): " + "this: " + this + "props: " + props);
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({ options }));
            }
        }catch(e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('ComponentWillUnmount');
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
        //console.log("IndecisionApp.handleDeleteOption(): Successful");
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick() {
        alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
        //console.log("IndecisionApp.handlePick(): Successful");
    }

    handleAddOption(option) {
        //console.log("IndecisionApp.handleAddOption(): " + option);
        if(!option) {
            return 'Enter valid value to add item'
        }
        else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    }

    render() {
        const subtitle = 'Put your subtitle here!!';

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick} />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption} />
                <AddOption
                    handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

const Header = (props) => {
    //console.log("Header: " + props);
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    //console.log("Action: " + props);
    return (
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>
                What Should I do?
            </button>
        </div>
    );
};

const Options = (props) => {
    //console.log("Options: " + props);
    return (
        <div>
            <button onClick={props.handleDeleteOptions}> Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => (
                    <Option  
                        key={option} 
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption} />
                ))
            }
        </div>
    );
};

const Option = (props) => {
    //console.log("Option: " + props);
    return (
        <div>
            {props.optionText}
            <button 
            onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }}>
                remove
            </button>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
        //console.log("AddOption.constructor(): " + props);
    }

    handleAddOption(e) {
        e.preventDefault();
        //console.log("AddOption.handleAddOption(): event: " + e);
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        //console.log("AddOption.handleAddOption(): " + "option: " + "error: " + error);
        this.setState(() => ({error}));

        if(!error) {
            e.target.elements.option.value = '';
        }
    }
    
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));