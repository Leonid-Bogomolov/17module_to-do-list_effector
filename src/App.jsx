import { useUnit } from "effector-react";
import { useState } from "react";
import { addItem, counter, increment, itemsStore, removeItem, reloadItems, fetchItems, setCounter, changeItemStatus } from "./store/store";
import './App.css'
function App() {
  const [inputName, setInputName] = useState('')
  const [count, onIncrement, setCount] = useUnit([counter, increment, setCounter])
  const [items, addListItem, removeListItem, reloadListItems, changeListStatus] = useUnit([itemsStore, addItem, removeItem, reloadItems, changeItemStatus])
  return (
    <div className="App">
      <h1>Менеджер задач</h1>
      <div className="container">
        <input className="input-add" type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />
        <button className="addBtn btn"
          onClick={() => {
            if (inputName !== '') {
            addListItem({ 
              id: count, 
              name: inputName, 
              status: false, 
            })
            setInputName('')
            onIncrement()
          }}}
        >
          Добавить задачу
        </button>
        <button className="addBtn btn"
          onClick={async () => {
            reloadListItems(await fetchItems())
            setCount(4)
          }}
        >
          Стандартные задачи
        </button>
      </div>
      {items.map(item =>                                                                             // добавляем в конец списка задач
        <div key={item.id} className={item.status ? "container itemNameReady" : "container"}>
          <div className="itemIteam">
            <div className="itemId">{item.id}</div>
            <div className="itemName">{item.name}</div>
          </div>
          <button className="readyBtn btn" onClick={() => changeListStatus(item.id)}>Готово</button>
          <button className="deleteBtn btn" onClick={() => removeListItem(item.id)}>Удалить</button>
        </div>
      )}
    </div>
  );
}
export default App;
