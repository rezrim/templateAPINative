import React from 'react';
import { Container, Form, H1, Item, Label, Input, Header, Content, Button, Card, CardItem, Body, Text, Left, Right, Fab, Icon } from 'native-base';
import {View, ScrollView} from 'react-native'

function App(props) {
  const [action,setAction] = React.useState("")
  const [modal,setModal]= React.useState(false)
  const [data,setData]= React.useState([])
  const [judul,setJudul]= React.useState("")
  const [deskripsi,setDeskripsi]= React.useState("")
  const [userId,setUserId]= React.useState("1")
  const [id,setId]= React.useState("")
  const [dataDetail, setDataDetail] = React.useState([])

  const modalClick = (val="", valId="") => {
    setModal(!modal)
    setAction(val)
    if(val==="add"){
      dataNull()
      setAction("add")
    }else if(val==="edit"){
      setAction("edit")
      setId(valId)
      fetch('https://jsonplaceholder.typicode.com/posts/'+valId)
      .then(res => res.json())
      .then(val => {
        setJudul(val[1].title)
        setDeskripsi(val[1].body)
        setDataDetail(val)
      })
    }else{
      setAction("")
      dataNull()
    }
  }

  const showData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(val => setData(val))
  }

  const saveData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts',{
      method:'POST',
      body:{
        title:judul,
        body:deskripsi,
        userId
      },
      headers:{
        "Content-type":"application/json; charset=UTF-8",
      }
    })
    .then(res => res.json())
    .then(val => console.log(val))
    .then(() => {
      setModal(false)
      dataNull()
    })
  }

  const updateData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/'+id,{
      method:'PUT',
      body:{
        id,
        title:judul,
        body:deskripsi,
        userId
      },
      headers:{
        "Content-type":"application/json; charset=UTF-8",
      }
    })
    .then(res => res.json())
    .then(val => console.log(val))
    .then(() => {
      setModal(false)
      dataNull()
    })
  }

  const deleteData = (id) => {
    fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(val => console.log(val))
  }

  const dataNull = () => {
    setJudul("")
    setDeskripsi("")
  }

  React.useEffect(()=>{
    showData()
  },[])

  return (
    <ScrollView style={{flex:1}}>

      <Container>
        <Header>
          <Text>CRUD API</Text>
        </Header>

        <Content>  

    { !modal ? ( 
        data.map((val, i) => (
        <Card key={i}>
          <CardItem header bordered>
            <Text>{val.id}</Text>
          </CardItem>

          <CardItem>
            <Body>
              <H1>{val.title}</H1>
              <Text>{val.body}</Text>
            </Body>
          </CardItem>

          <CardItem footer bordered>
            <Left>
              <Button danger onPress={() => deleteData(val.id)}><Text>Hapus</Text></Button>
            </Left>
            <Right>
              <Button info onPress={()=> modalClick("edit")}><Text>Edit</Text></Button>
            </Right>
          </CardItem>
        </Card>
        ))
    ):(

        <Card>
          <CardItem header bordered>
            <Text>{action==="edit" && "Edit" } {action==="add" && "Add" } Data</Text>
          </CardItem>

          <CardItem>
            <Body>
              <Form style={{width:'100%'}}>
                <Item stackedLabel>
                  <Label>Judul Pos</Label>
                  <Input style={{marginTop:10}} value={judul} onChangeText={(val) => setJudul(val)}/>
                </Item>
                <Item stackedLabel>
                  <Label>Deskripsi</Label>
                  <Input style={{marginTop:10}} value={deskripsi} onChangeText={(val) => setDeskripsi(val)}/>
                </Item>
                <Item stackedLabel last>
                  <Label>User ID</Label>
                  <Input style={{marginTop:10}} value={userId} onChangeText={(val) => setUserId(val)}/>
                </Item>
              </Form>
            </Body>
          </CardItem>

          <CardItem footer bordered>
              <Button primary onPress={action==="edit" ? updateData : saveData}><Text>Simpan</Text></Button>
              <Button danger onPress={()=> modalClick("")}><Text>Cancel</Text></Button>
          </CardItem>
        </Card>
       
    )}

        </Content>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={()=> modalClick("add")}>
          <Icon name="share" />
        </Fab>

      </Container>
    </ScrollView>
  );
}

export default App;