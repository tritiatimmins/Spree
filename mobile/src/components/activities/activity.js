'use strict';
import Categories from './categories';
var _ = require('underscore');

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TextInput,
  ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  DeviceEventEmitter,
  Dimensions
} from 'react-native';


export default class Activity extends Component {

  constructor(props) {

    super(props);

    // explicit binding required in ES6...
    this.renderListRow = this.renderListRow.bind(this);
    this.showCategoryList = this.showCategoryList.bind(this);
    this.updateActivity = this.updateActivity.bind(this);
    this.save = this.save.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.KeyboardWillHide = this.KeyboardWillHide.bind(this);
    
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = ds.cloneWithRows( Categories.getCategories() );

    this.isNew = this.props.route.passProps.isNew;
    
    this.state = {
      activity: this.props.route.passProps.activity,
      visibleHeight: Dimensions.get('window').height,
      showList: false
    };
  }

  componentWillMount() {
    this.listenerShowKeyboard = DeviceEventEmitter.addListener( 'keyboardWillShow', this.keyboardWillShow );
    this.listenerHideKeyboard = DeviceEventEmitter.addListener( 'KeyboardWillHide', this.KeyboardWillHide );
  }

  componentWillUnmount() {
    this.listenerShowKeyboard.remove();
    this.listenerHideKeyboard.remove();
  }


  render() {
    return (

      <View style={styles.container, { height: this.state.visibleHeight } } >

        <Image style={styles.image}
          source = {{ uri: this.state.activity.image }}
        />

        <View style={styles.footer} >

          <View style={styles.titleBar}>
            <TouchableHighlight style={styles.categoryButton}
              disabled={ !this.isNew }
              onPress={ this.showCategoryList }>
              <Image source={ Categories.getIcon(this.state.activity.category) } />
            </TouchableHighlight>
            <TextInput
              style={ styles.titleText }
              editable={ this.isNew }
              placeholder={ 'please add a category and title...' }
              onChangeText={ (text) => this.updateActivity({ title: text }) }
              value = { this.state.activity.title }
            />
          </View>

          { this.state.showList ? <ListView
            dataSource={this.dataSource}
            renderRow={ this.renderListRow }
            style={ styles.list }
          /> : null }

          { this.state.showList ? null : <TextInput
            style={ styles.description }
            multiline={true}
            maxLength={300}
            editable={ this.isNew }
            placeholder={'What makes this place so special?'}
            onChangeText={ (text) => this.updateActivity({ description: text }) }
            value = { this.state.activity.description }
          />}

          { this.isNew ? <TouchableHighlight
            style={ styles.saveButton }
            onPress={ this.save }
            underlayColor='gray' >
              <Text style={ styles.saveButtonText }>Save</Text>
            </TouchableHighlight>
          : null }

        </View>
      </View>
    );
  }


  renderListRow(rowData) {
    return <TouchableOpacity style={styles.listRow} onPress={ () => this.setCategory(rowData.category) }>
             <Image source={ rowData.icon } />
             <Text style={styles.listRowText} >
               { rowData.category }
             </Text>
           </TouchableOpacity>
  }


  // setState must replace ENTIRE element (can't set properties etc.)
  updateActivity( newValue ) {
    this.setState({
      activity: _.extend( this.state.activity, newValue )
    });
  }

  
  showCategoryList() {
    this.setState({ showList: true });
  }


  setCategory(name) {
    this.updateActivity({ category: name });
    this.setState({ showList: false });
  }


  save() {
    this.props.navigator.popToTop();
    this.props.route.passProps.initiateSave( this.state.activity );
  }


  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({ visibleHeight: newSize });
  }


  KeyboardWillHide(e) {
    this.setState({ visibleHeight: Dimensions.get('window').height });
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    // paddingTop: 30,
  },

  image: {
    flex: 3,
    resizeMode: 'cover'
  },

  footer: {
    flex: 2,
    backgroundColor: '#F2EFF5'
  },

  titleBar: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#6E73EE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

  categoryButton: {
    width: 30,
    height: 29,
    overflow: 'hidden',
    margin: 2
  },

  titleText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  description: {
    flex: 3,
    fontSize: 18,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C5C2C7',
    borderRadius: 3,
    padding: 8,
    marginTop: 8,
    margin: 4,
    marginBottom: 0, 
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  list: {
    flex: 8
  },

  listRow: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  listRowText: {
    flex: 1,
    fontSize: 20,
    marginLeft: 8
  },

  saveButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C5C2C7',
    borderRadius: 2,
    marginBottom: 8,
    marginTop: 8,
    marginRight: 60,
    marginLeft: 60,
    // margin: 40,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    backgroundColor: '#6E73EE',
    // backgroundColor: 'rgba(110, 220, 175, 0.5)'
  },

  saveButtonText: {
    flex: 1,
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }

});
