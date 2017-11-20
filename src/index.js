import React from 'react';
import ReactDOM from 'react-dom';
import Movie from "./Movie";
import {DebounceInput} from 'react-debounce-input';


// function sum(a, b) {
//     return a+b;
// }
//
// const sumES = (a, b) => a+b;
//
// const user = {
//     email: 'John Doe',
//     age: 25
// };
//
// let {email, age} = user;
//
// class HelloWorld extends React.Component {
//     state = {
//         counter: 0
//     };
//
//     onCounterChange = (isDecrement) => {
//         let { counter } = this.state;
//         if (isDecrement) {
//             counter--;
//         } else {
//             counter++;
//         }
//         this.setState({counter});
//     };
//     render() {
//         const {user, age} = this.props;
//         return (
//             <div className="wrapper">
//                 <h1>Hello {user} and i'm {age}</h1>
//                 <hr/>
//                 <br/>
//
//                 <h2> {this.state.counter}</h2>
//                 <button onClick={this.onCounterChange.bind(this, false)}>Increment</button>
//                 <button onClick={this.onCounterChange.bind(this, true)}>Decrement</button>
//             </div>
//
//         )
//     }
// }

// Promise.resolve(1)
//     .then((vienas) => vienas+1)
//     .then((du) = du +1)
// ;

class MovieSearch extends React.Component {
    state = {
        movie: {},
        searchInput: '',
        loading: true
    };
    componentWillMount() {
        this.onRequest();
    }

    onUserInput = (e) => {
        let previous = this.state.searchInput;
        let replaced = this.replaceNotLetters(e.target.value);
        if (previous !== replaced)
            this.onRequest(replaced);
    };

    replaceNotLetters = (value) => {
        let replaced = value.replace(/[^A-Za-z]/g, '');
        this.setState({searchInput: replaced });
        return replaced;
    };

    onRequest = (value = 'fast') => {
        this.setState({loading: true});
        fetch(`http://www.omdbapi.com/?t=${value}&apikey=fc935341`)
            .then(response => response.json())
            .then(json => this.setState({movie: json, loading: false}));
    };

    render()  {
        return (
            <div>
                <h1>Movies</h1>
                {this.state.loading ? <h4 >Loading...</h4> : null}
                <Movie {...this.state.movie}/>
                    <DebounceInput debounceTimeout={150} type="text" onChange={this.onUserInput} value={this.state.searchInput}/>
            </div>
        )
    }
}

ReactDOM.render(<MovieSearch user="John Doe" age={25}/>, document.getElementById('root'));