import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';

let {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  PropTypes,
  ListView,
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
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        rawData: data,
      });
    })
    .catch((error) => console.log(`fetchMessages error: ${error}`));
  }

  renderRow(rowData) {
    let name = `${rowData.user.name}`

    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.leftCol}>
            <Text style={styles.message}> {rowData.body} </Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <Separator />
      </View>
    );
  }

  render() {
    let {id} = this.props

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    textAlign: 'right',
  },
  message: {
    fontSize: 14,
    paddingBottom: 5,
  },
  leftCol: {
    paddingLeft: 8,
    flex: 5,
  },
  rightCol: {
    paddingRight: 5,
    flex: 1,
  },
});
