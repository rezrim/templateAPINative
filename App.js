import React from 'react';
import { Container, Form, H1, Item, Label, Input, Header, Content, Button, Card, CardItem, Body, Text, Left, Right, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
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
      //Fetch Update
    }else{
      setAction("")
      dataNull()
    }
  }

  const showData = () => {
   console.log("Fetch Show Data")
  }

  const saveData = () => {
    console.log("Save Data")
  }

  const updateData = () => {
    console.log("Update Data")
  }

  const deleteData = (id) => {
    console.log("Delete Data")
  }

  const dataNull = () => {
    setJudul("")
    setDeskripsi("")
  }

  React.useEffect(()=>{
    console.log("Auto Play")
  },[])

  return (
    <ScrollView style={{flex:1}}>

      <Container>
        <Header>
          <Text>CRUD API</Text>
        </Header>

        <Content>  

    { !modal ? ( 
       
        <Card>
          <CardItem header bordered>
            <Text>ID Data</Text>
          </CardItem>

          <CardItem>
            <Body>
              <H1>Judul Data</H1>
              <Text>Deskripsi Data</Text>
            </Body>
          </CardItem>

          <CardItem footer bordered>
            <Left>
              <Button danger onPress={() => deleteData(1)}><Text>Hapus</Text></Button>
            </Left>
            <Right>
              <Button info onPress={()=> modalClick("edit")}><Text>Edit</Text></Button>
            </Right>
          </CardItem>
        </Card>
        
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
          <Text>+</Text>
        </Fab>
        
      </Container>
    </ScrollView>
  );
}

export default App;