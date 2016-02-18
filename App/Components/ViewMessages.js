import React from 'react-native';
import api from './../Lib/Api';

let {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  PropTypes,
  ListView,
  Image,
} = React;

export default class ViewMessage extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      rawData: {},
      dataSource: this.ds,
      threadId: ''
    }
  }

  static propTypes = {
    id: PropTypes.number,
  };

  componentDidMount() {
    let {id} = this.props
    this.fetchMessages(id);
  }

  fetchMessages(id) {
    api.getMessagesForThread(id)
    .then((data) => {
      console.log(data);
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        rawData: data,
      });
    })
    .catch((error) => console.log(`fetchMessages error: ${error}`));
  }

  renderRow(rowData) {
    let name = `${rowData.first_name} ${rowData.last_name}`

    return (
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
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={() => this.renderRow(this)} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
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
