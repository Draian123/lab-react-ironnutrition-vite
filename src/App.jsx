import { useState } from 'react'
import './App.css'
import foods from './foods.json'
import FoodBox from './components/FoodBox';
import { Divider, Input, Row, Button, Card, Col } from 'antd';
import { v4 as uuidv4 } from 'uuid';

let foodsWithId = foods.map(food => {
  food.id = uuidv4()
  return food
})

function App() {
  const [foodsState, setfoodsState] = useState(foodsWithId)
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [calories, setCalories] = useState(0)
  const [servings, setServings] = useState(0)
  const [search, setSearch] = useState("")

  function handleCreateFood(event){
    event.preventDefault()
    setfoodsState(prevContacts => {
      return [...prevContacts, {name, image, calories, servings, id: uuidv4()}]
    })
    setName('')
    setImage('')
    setCalories(0)
    setServings(0)
    }

  function handleDelete(id){
    let index = foodsState.findIndex(element => element.id === id);
    let foodsStateCopy = [...foodsState]
    foodsStateCopy.splice(index, 1)
    setfoodsState(foodsStateCopy)
  }  


  return (
    <div className="App">
      {/* Display Add Food component here */}
      <form>
      <Divider>Add Food Entry</Divider>

      <label>Name</label>
      <Input value={name} type="text" onChange={event => setName(event.target.value)} />

      <label>Image</label>
      {/* render antd <Input /> type="text" here */}
      <Input value={image} type="text" onChange={event => setImage(event.target.value)} />

      <label>Calories</label>
      {/* render antd <Input /> type="number" here */}
      <Input value={calories} type="number" onChange={event => setCalories(event.target.value)} />

      <label>Servings</label>
      {/* render antd <Input /> type="number" here */}
      <Input value={servings} type="number" onChange={event => setServings(event.target.value)} />

      <button type="submit" onClick={handleCreateFood}>Create</button>
    </form>

      <Button> Hide Form / Add New Food </Button>

      {/* Display Search component here */}
      <Divider>Search</Divider>

      <label>Search</label>
      <Input value={search} type="text" onChange={event => setSearch(event.target.value)} />

      <Divider>Food List</Divider>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
        {/* Render the list of Food Box components here */}
        {foodsState
          .filter(food => {
          if (search === "") return foodsState
          return food.name.toLowerCase().includes(search.toLowerCase())
          })
        .map(food =>{
          return <FoodBox food={food} key={food.id} handleDelete={handleDelete}/>
        })}
      </Row>
    </div>
  )
}

export default App
