var React = require('react-native');
var Map = require('./components/map/map');
var Signin = require('./components/authentication/signin');
var Camera = require('./components/camera/camera');
var NavBar = require('./components/common/navbar');
import Activity from './components/activities/activity'; // start ES6 conversion


var {
  Navigator
} = React;

var Routes = {
  map: Map,
  signin: Signin,
  activity: Activity,
  camera: Camera
};


module.exports = React.createClass({

  renderScene: function (route, navigator) {
    var Component = Routes[route.name];
    return <Component route={route} navigator={navigator}/>;
  },

  render: function () {
    return <Navigator
      navigationBar={ <NavBar /> }
      initialRoute={{ name: 'map' }}
      renderScene={ this.renderScene }
      configureScene={ () => Navigator.SceneConfigs.FloatFromRight }
    /> 
  }

});


