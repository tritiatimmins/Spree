var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  MapView
} = React;


var Map = require('./components/map/map');
var Signin = require('./components/authentication/signin');
var Activities = require('./components/activities/activities');
var Camera = require('./components/camera/camera');


//define our routes
var Routes = {
  //key can be anything: value must be a component
  map: Map,
  signin: Signin,
  activities: Activities,
  camera: Camera
};


//add <Signin /> before closing view tag to see sign in 
module.exports = React.createClass({

  //always called with an instance of the navigator
  //pass navigator into the component being rendered by the navigator
  renderScene: function (route, navigator){
    var Component = Routes[route.name]; //ROUTES['signin'] => would return the sign in component
    return <Component route={route} navigator={navigator} />;
  },

  render: function () {
    return (
      <View style={styles.container}>  

        <Map/>
          
         <Navigator
         style={styles.container}
         //determines what first component is when navigator is first rendered
         initialRoute={{name: 'map'}}
         //contains functionality that tells the navigator how to render at any given time
         renderScene={this.renderScene}
         //how newly rendered components will appear to the user / LIKE AN ANIMATION
         configureScene={()=> {return Navigator.SceneConfigs.FloatFromRight;} }
          /> 
          
      </View>  
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});