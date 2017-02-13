import React, {PropTypes, Component} from "react";
import {
  Image,
  ListView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import api from '../../Lib/Api';
import moment from 'moment';
import Form from '../NewMessageForm';
// import {createContainer} from 'react-transmit';
import { resolve } from "react-resolver";


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftCol: {
    marginLeft: 15,
    marginRight: 10,
    flex: 1,
  },
  image: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  message: {
    fontSize: 14,
    paddingTop: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  middleCol: {
    marginLeft: 20,
    flex: 8,
  },
  rightCol: {
    marginTop: -9,
    paddingLeft: 80,
    flex: 4,
  },
  rowContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
});

@resolve("messageData", (props) => {
  return api.getMessagesForThread(prop.id).then(res => res);
})

export default class ViewMessage extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds,
      threadId: ''
    };
  }

  static propTypes = {
    id: PropTypes.number,
    token: PropTypes.string,
  };

  componentDidMount() {
    console.log(this.props)
    const {id} = this.props;
    this.fetchMessages(id);
  }

  fetchMessages(id) {
    api.getMessagesForThread(id)
    .then((data) => {
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
      });
    })
    .catch((error) => console.log(`fetchMessages error: ${error}`));
  }

  renderRow(rowData) {
    const name = `${rowData.user.name}`;
    const userImage = rowData.user.profile_photo;
    const time = moment(rowData.created_at, 'YYYYMMDD').fromNow();

    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.leftCol}>
            <Image style={styles.image} source={{uri: userImage}} />
          </View>
          <View style={styles.middleCol}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}> {rowData.body} </Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.message}>{time}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {id, token} = this.props;
    console.log(this.props)

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <Form id={id} token={token} />
      </View>
    );
  }
}

// export default createContainer(ViewMessage, {
//   initialVariables: {},
//   fragments: {
//     messages({id}) {
//       return api.getMessagesForThread(id).then(res => res);
//     }
//   }
// });
