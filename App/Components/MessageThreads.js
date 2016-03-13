import React from 'react-native';
import ViewMessages from './ViewMessages';
import Separator from './../Helpers/Separator';
import api from './../Lib/Api';

const {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 65,
  },
  image: {
    borderRadius: 30,
    height: 60,
    marginLeft: 10,
    marginRight: 15,
    width: 60,
  },
  leftCol: {
    flex: 1,
    padding: 5,
  },
  name: {
    color: '#A9A9A9',
    fontSize: 14,
    fontStyle: 'italic',
    paddingBottom: 5,
    paddingTop: 5,
  },
  preview: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  rightCol: {
    flex: 5,
    paddingLeft: 8,
  },
  rowContainer: {
    flexDirection: 'row',
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
            <View style={styles.leftCol}>
              <Image style={styles.image} source={{uri: rowData.user_image}} />
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.preview}> {rowData.preview} </Text>
              <Text style={styles.name}> {name} </Text>
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
