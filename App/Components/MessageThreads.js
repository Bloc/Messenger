import React from 'react-native';
import ViewMessages from './ViewMessages';
import Separator from './../Helpers/Separator';
import api from './../Lib/Api';

const {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  Image
} = React;

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 65,
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  leftCol: {
    paddingLeft: 8,
    flex: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  preview: {
    fontSize: 10,
    fontStyle: 'italic',
    paddingTop: 5,
    paddingBottom: 5,
  },
  rightCol: {
    padding: 5,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  subject: {
    fontSize: 18,
    paddingBottom: 5,
  },
});

export default class MessageThreads extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      rawData: {},
      dataSource: this.ds,
      threadId: ''
    };
  }

  componentDidMount() {
    this.fetchThread();
  }

  fetchThread() {
    api.getMessageThreads()
    .then((data) => {
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        rawData: data,
      });
    })
    .catch((error) => console.log(`error: ${error}`));
  }

  viewMessages(rowData) {
    this.props.navigator.push({
      component: ViewMessages,
      title: rowData.subject,
      passProps: {
        id: rowData.id,
      }
    });
  }

  renderRow(rowData) {
    const name = `${rowData.first_name} ${rowData.last_name}`;

    return (
      <TouchableHighlight
        underlayColor="rgba(192,192,192,1,0.6)"
        onPress={() => this.viewMessages(rowData)}>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.rightCol}>
              <Image style={styles.image} source={{uri: rowData.user_image}} />
            </View>
            <View style={styles.leftCol}>
              <Text style={styles.preview}> {rowData.preview} </Text>
              <Text style={styles.name}> {name} </Text>
              <Text style={styles.subject}> {rowData.subject} </Text>
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
}
