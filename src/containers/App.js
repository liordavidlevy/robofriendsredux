import React, { Component, useEffect, useState } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { ErrorBoundery } from './ErrorBoundery';
import { increaseCount, requestRobots, setSearchField } from '../actions';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
    count: state.changeCount.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
    onIncreaseCount: () => dispatch(increaseCount())
  }
}

const App = (props) => {

  useEffect(() => {
    props.onRequestRobots();
  }, []);

  const { isPending, onSearchChange, searchField, robots, count, onIncreaseCount } = props;

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField?.toLowerCase());
  });

  return isPending ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <button onClick={onIncreaseCount}>מספר נוכחי {count}</button>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundery>
            <CardList robots={filteredRobots} />
          </ErrorBoundery>
        </Scroll>
      </div>
    );

}

// class App extends Component {

//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users => this.props.onSearchChange(users));
//   }

//   render() {
//     const filteredRobots = robots.filter(robot => {
//       return robot.name.toLowerCase().includes(searchField.toLowerCase());
//     });

//     return !robots.length ?
//       <h1>Loading</h1> :
//       (
//         <div className='tc'>
//           <h1 className='f1'>RoboFriends</h1>
//           <button onClick={() => setCount(count + 1)}>Click Me {count}</button>
//           <SearchBox searchChange={onSearchChange} />
//           <Scroll>
//             <ErrorBoundery>
//               <CardList robots={filteredRobots} />
//             </ErrorBoundery>
//           </Scroll>
//         </div>
//       );
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(App);