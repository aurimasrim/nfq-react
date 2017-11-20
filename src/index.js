import React from 'react';
import ReactDOM from 'react-dom';
import Movie from "./Movie";


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
        movie: {}
    };
    componentWillMount() {
        this.onRequest();
    }

    onUserInput = (e) => {
       this.onRequest(e.target.value);
    };

    onRequest = (value = 'fast') => {
        // console.log(e.target.value);

        fetch(`http://www.omdbapi.com/?t=${value}&apikey=969a0dc3`)
            .then(response => response.json())
            .then(json => this.setState({movie: json}));
    };

    render()  {
        return (
            <div>
                <h1>Movies</h1>
                <Movie {...this.state.movie}/>
                <input type="text" onChange={this.onUserInput}/>
            </div>
        )
    }
}

ReactDOM.render(<MovieSearch user="John Doe" age={25}/>, document.getElementById('root'));