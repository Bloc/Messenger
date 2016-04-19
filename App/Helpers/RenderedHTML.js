import React, {
  Text,
  Component
} from 'react-native';

export default class RenderedHTML extends Component {
  createMarkUp() {
    return {__html: 'First &middot; Second'};
  }

  render() {
    return (
      <Text
        className='RenderedHTML'
        dangerouslySetInnerHTML={this.createMarkUp()}
      />

    );
  }
}
