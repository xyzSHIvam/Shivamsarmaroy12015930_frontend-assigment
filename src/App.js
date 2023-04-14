import List from "./List";
function App() {
  const items=[
    {
      text:"shivam",
    },
     {
      text:"vivek",
    },
     {
      text:"Vishal",
    },
  ]
  return (
    <div className="App">
     <List items={items}/>
    </div>
  );
}

export default App;
