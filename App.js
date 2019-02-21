/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    articleList: []
  };

  componentDidMount() {
    this.fetchArticleList();
  }

  fetchArticleList = async () => {
    try {
      const response = await fetch('http://localhost:8080/article').then(res => res.json());
      if (response.success) {
        this.setState({ articleList: response.result });
      }
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  };

  renderItem = ({ index, item }) => (
    <View style={styles.articleCell}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.articleList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 88
  },
  articleCell: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  title: {
    fontSize: 16,
    color: '#333'
  },
  desc: {
    fontSize: 14,
    color: '#666'
  }
});
