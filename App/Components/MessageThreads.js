import React from 'react-native';
import ViewMessage from './ViewMessage';
import Separator from './../Helpers/Separator';
import api from './../Lib/Api';

let {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  Image
} = React;

let styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 65,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  preview: {
    fontSize: 10,
    fontStyle: 'italic',
    paddingTop: 5,
    paddingBottom: 5,
  },
  subject: {
    fontSize: 18,
    paddingBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  leftCol: {
    paddingLeft: 8,
    flex: 5,
  },
  rightCol: {
    padding: 5,
    flex: 1,
  },
});

export default class MessageThreads extends React.Component{
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      rawData: {},
      dataSource: this.ds,
      threadId: ''
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    api.getMessages()
    .then((data) => {
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        rawData: data,
      });
    })
    .catch((error) => console.log(`error: ${error}`));
  }

  viewMessage(rowData) {
    let name = `${rowData.first_name} ${rowData.last_name}`

    this.props.navigator.push({
      component: ViewMessage,
      title: rowData.subject,
      passProps: {
        id: rowData.id,
        title: name,
        userImage: rowData.userImage,
      }
    });
  }

  renderRow(rowData) {
    let name = `${rowData.first_name} ${rowData.last_name}`

    return (
      <TouchableHighlight
          underlayColor='rgba(192,192,192,1,0.6)'
          onPress={this.viewMessage.bind(this, rowData)} >
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.leftCol}>
              <Text style={styles.preview}> {rowData.preview} </Text>
              <Text style={styles.name}> {name} </Text>
              <Text style={styles.subject}> {rowData.subject} </Text>
            </View>
            <View style={styles.rightCol}>
              <Image style={{width: 60, height: 60}} source={{uri: rowData.user_image}} />
            </View>
          </View>
          <Separator />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
};
