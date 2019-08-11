import React from 'react';
import './App.css';
// import Playlist from './Playlist'
import { tsPropertySignature } from '@babel/types';
import axios from 'axios'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      song: ''
    }
  }


async componentDidMount(){

const CLIENT_ID = '1af7ab55e7e64df992dadf08719596ac';
const CLIENT_SECRET = '40d2b6c4973444328b30f84a871dcce9'

await axios.post({
  url: `https://accounts.spotify.com/api/token`,
  data: { // in axios data is the body request
    grant_type: 'authorization_code',
    code: req.query.code, // code I'm receiving from https://accounts.spotify.com/authorize
    redirect_uri: 'http://localhost:3000/'
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64') // client id and secret from env
  }
}
)
.then(response => {
  console.log(response)
}) 
.catch(error => {
  console.log(error)
})



  await axios.get(
    'https://api.spotify.com/v1/users/22f63oznp4huleaxulv63sjxi',
    {
    //   headers: {
    //     Authorization: 'Bearer BQAp2HbDRE3nDCTY-V0xUfDjIT--97sSVEvtVKWhmdgb-nviEPe290Tbj1JSHRk7NV9oF5DVW943CTTu3o2O8WFSS4gRVvz9Kv_cXbMllJPV4MbIjypTN9e9gwLuwrwL4ShoR8E2q7NGVEIxXwS7znwlUtemSIj_A26O43I9'
    //   }
     }
  )
  .then(response => {
    console.log(response)
  }) 
  .catch(error => {
    console.log(error)
  })
}

  render (){
    return(
    <div>
        Playlist Test

    </div>
  );
}
}
export default App;
