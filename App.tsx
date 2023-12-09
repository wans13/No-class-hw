import { useState } from 'react'
import './App.css'

interface recipeProps {
  name:string;
  ingredients: string;
  instructions: string;
}

export function App() {
  const [list, setList] = useState<recipeProps[]>([{name:"Recipe 1", ingredients:"one, two, three", instructions:"do this and that"},{name:"Recipe 1", ingredients:"one, two, three", instructions:"do this and that"}])
  const [input, setInput] = useState<recipeProps>({name:"",ingredients:"",instructions:""})
  let display = "none"
  function handleCancelRecipe(){
    setInput({name:"",ingredients:"",instructions:""})
    document.getElementById("modal").style.display = "none"
    document.getElementById("notFilledIn").style.display="none" 
  }
  function handleOpenModal(){
    if (display == "none"){
      display="block"
    }
    else{
      return handleCancelRecipe()
    }
    document.getElementById("modal").style.display = display
  }
  function handleChangeName(e){
    setInput({name: e.target.value,ingredients:input.ingredients,instructions:input.instructions})
  }
  function handleChangeIngredients(e){
    setInput({name:input.name,ingredients: e.target.value,instructions:input.instructions})
  }
  function handleChangeInstructions(e){
    setInput({name:input.name,ingredients:input.ingredients,instructions: e.target.value})
  }
  function handleAddRecipe(){
    if (input.name==""||input.ingredients==""||input.instructions==""){
      document.getElementById("notFilledIn").style.display="block" 
      return;
    }
    const copy = [...list]
    copy.push(input)
    setList(copy)
    handleCancelRecipe()
  }
  function handleDeleteRecipe(index:number){
    const copy = [...list]
    copy.splice(index,1)
    setList(copy)
  }
  function truncate(text:string){
    if(text.length > 15){
      return text.slice(0,15)+"..."
    }
      return text
    
  }
  return (
    <div>
      <h1>Recipe box</h1>
      <div className='recipeBox'> 
      {list.map((recipe,index)=>{
        return <div className='recipe'>
          <h2>{truncate(recipe.name)}</h2>
          <p><b>Ingredients: </b>{truncate(recipe.ingredients)}</p>
          <p><b>Instructions: </b>{truncate(recipe.instructions)}</p>
          <button onClick={()=>{handleDeleteRecipe(index)}}>delete recipe</button>
        </div>
      })}
      </div>
      <button onClick={handleOpenModal}>Add recipe</button>
      <div id='modal' onClick={(e)=>{if(e.target==document.getElementById("modal"))handleCancelRecipe()}}>
      <div id='modalContent'>
        <h1>Add recipe</h1>
        <div className='input'>
        <h2>Recipe name: </h2>
        <input type="text" value={input.name} onChange={handleChangeName}/>
        </div>
        <div className='input'>
        <h2>Ingredients: </h2>
        <input type="text" value={input.ingredients} onChange={handleChangeIngredients}/>
        </div>
        <div className='input'>
        <h2>Instructions: </h2>
        <input type="text" value={input.instructions} onChange={handleChangeInstructions}/>
        </div>
        <div>
          <p id='notFilledIn' style={{display:"none", color:"red"}}>Please fill in all fields</p>
        <button onClick={handleAddRecipe}>add</button>
        <button onClick={handleCancelRecipe}>cancel</button>
        </div>
      </div>
      </div>
    </div>
  )
}


