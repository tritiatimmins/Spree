var React = require('react-native');

var {
    Text,
    StyleSheet,
    View
} = React;


module.exports = React.createClass({

  render: function() {

    var notMapView = this.props.navigator.getCurrentRoutes().length > 1;

    return (
      <View  style={ styles.navbar }>
        { notMapView ?
          <Text style={ [styles.backButton, styles.headerText] } onPress={ this.back } >&lt;</Text>
          : null
        }
        <Text style={ styles.headerText }>Adventurous</Text>
      </View>
    );
  },

  back: function() {
    this.props.navigator.pop();
  }

});


var styles = StyleSheet.create ({

  navbar: {
    position: 'absolute',
    paddingTop: 30,
    paddingBottom: 10,
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2EFF5',
    borderBottomWidth: 1,
    borderBottomColor: '#C5C2C7'
    
  },

  backButton: {
    position: 'absolute',
    left: 14,
    top: 30
  },

  headerText: {
    color: 'black',
    fontSize: 24,
    // fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    letterSpacing: 1
  },

});
