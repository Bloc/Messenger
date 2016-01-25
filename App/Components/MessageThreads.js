import React from 'react-native';
import Separator from './../Helpers/Separator';
import api from './../Lib/Api';

let {
  View,
  StyleSheet,
  Text,
  ListView,
} = React;

let styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 65,
  },
  messagePlaceHolder: {
    height: 500,
    fontSize: 20,
    marginTop: 65,
  },
  rowContainer: {
    padding: 10,
  },
  message: {
    flex: 2,
    fontSize: 22,
    padding: 15,
  },
});

export default class MessageThreads extends React.Component{
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      isLoading: true,
      data: '',
      empty: false,
      error: '',
    }
  }

  componentDidMount() {
    this.fetchFakeData();
  }

  fetchFakeData() {
    let data = api.fakeIt();

    this.setState({
      data: data.items,
      dataSource: this.ds.cloneWithRows(data.items),
      isLoading: false,
      empty: false,
     });
  }

  fetchMessages() {
    // TODO: add when fake data works
    api.getMessages()
    .catch((error) => console.log('NOOOO'));
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.message}> {rowData.subject} </Text>
        </View>
        <Separator />
      </View>
    );
  }

  stopHere() {
    debugger;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messagePlaceHolder}>Messages Are HERE!</Text>
      </View>
    );
  }
};
