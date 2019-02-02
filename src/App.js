import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, S3Album } from 'aws-amplify-react';
import awsmobile from './aws-exports';
Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(awsmobile);

const listAnnouncements = `query listAnnouncements {
  listAnnouncements {
    items{
      id
      title
      description
      image
      price
    }
  }
}`

const createAnnouncement = `mutation createAnnoncement($title:String!, $description: String, $image: String!, $price: Int!) {
  createAnnouncement(input:{
    title: $title
    description: $description
    image: $image
    price: $price
  }){
    id
    title
    description
    image
    price
  }
}`

class App extends Component {
  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }

  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  announcementMutation = async () => {
    const announcementDetails = {
      title: 'Party tonight!',
      description: 'Amplify CLI rocks!',
      image: 'test.png',
      price: 12
    };

    const newEvent = await API.graphql(graphqlOperation(createAnnouncement, announcementDetails));
    alert(JSON.stringify(newEvent));
  }

  listQuery = async () => {
    console.log('listing announcement');
    const allAnnouncements = await API.graphql(graphqlOperation(listAnnouncements));
    alert(JSON.stringify(allAnnouncements));
  }

  render() {
    return (
      <div className="App">
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <button onClick={this.listQuery}>GraphQL Query</button>
        <button onClick={this.announcementMutation}>GraphQL Mutation</button>
        <S3Album level="private" path='' />
      </div>
    );
  }
}

export default App;
