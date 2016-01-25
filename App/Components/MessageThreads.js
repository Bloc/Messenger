import React from 'react-native';
// import Separator from './../Helpers/Separator';
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
});

export default class MessageThreads extends React.Component{
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      isLoading: true,
      empty: false,
      error: '',
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    console.log('hit it')
    api.getMessages()
    .then(() => {
      console.log('YOOOO');
      // this.setState({
      //    dataSource: this.ds.cloneWithRows(data),
      //    isLoading: false,
      //    empty: false,
      //  });
    })
    .catch((error) => console.log('NOOOO'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messagePlaceHolder}>Messages Are HERE!</Text>
      </View>
    );
  }
};
