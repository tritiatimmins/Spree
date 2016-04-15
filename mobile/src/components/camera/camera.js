var React = require('react-native');
import Camera from 'react-native-camera';

// import 
var {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  
  render: function() {
    return (
      
      <View style={styles.container}>

        <View style={[styles.header]}>
          <Camera 
            ref={ (cam) => {
              this.camera = cam;
            }}
            style = {styles.preview}
            aspect = {Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.memory}
            orientation={Camera.constants.Orientation.portrait}
            captureQuality={Camera.constants.CaptureQuality.high} // jenna
            >
          </Camera>
        </View> 
            
         <View style={styles.footer}>

          <TouchableHighlight style={styles.button} onPress={ this.takePicture }>
            <Image source={ require('./camera.png') } />
          </TouchableHighlight>
         </View> 
         
      </View>
    );
  },

  takePicture: function() {
    this.camera.capture()

      .then( (data) => {

        var temp = 'data:image/jpeg;base64,' + data; // jenna

        this.props.route.passProps.activity.image = temp; // jenna

        this.props.navigator.replace({
          name: 'activity',
          passProps: this.props.route.passProps
        });

      })
      .catch(err => console.error(err));
  }

});

var styles = StyleSheet.create({

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 30
  },

  header: {
    flex: 2
  },

  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFF5'
  },

  button: {
    borderColor: '#C5C2C7',
    backgroundColor: 'white',
    // backgroundColor: 'rgba(110, 220, 175, .8)',
    borderRadius: 10,
    borderWidth: 2,
    paddingTop: 27,
    paddingRight: 30,
    paddingBottom: 27,
    paddingLeft: 30,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
 
});