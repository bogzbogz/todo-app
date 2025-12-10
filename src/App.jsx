import { useEffect, useState } from 'react'

const STORAGE_KEY = 'todos-app'

function App() {
  // szűrő belső állapota
  const [filter, setFilter] = useState('all') // all vagy active vagy completed
  // todo-k belső állapota
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.log(`Hiba a localstorage beolvasásakor: ${error}`)
      return []
    }
  }) // alapértelemezet belső állapot egy üres tömb, ha bekerül egy todo, akkor a tömb növekedik, ha törlünk egy todo-t, akkor pedig csökken



const [input, setInput] = useState('')

  // készítünk egy szűrt listát a belső állapotról
  const filteredTodos = todos.filter((todo) => {
    // csak az aktív, még nem teljesített todo
    if (filter === 'active') {
      return !todo.completed
    }
    // a befejezett todo
    if (filter === 'completed') {
      return todo.completed
    }
    // ha nem aktív, és nem is befejezett, akkor all (tehát mindegyik)
    return true;
  })

  // A függvény megkapja a todo id-ját, és kapcsolgatja a hozzá tartozó todo elem completed értékét
  //pl. ha a todos belső állapota completed: true volt, akkor false lesz belőle
  //    ha a todo belső állapota completed: false volt, akkor true lesz belőle
  // const toggleTodo = (id) => {
  //   setTodos((prev) => {
  //     prev.map((prevTodo) => {
  //       let newTodo;
  //       if (prevTodo.id === id) {
  //         newTodo.id = prevTodo.id,
  //         newTodo.text = prevTodo.text,
  //         newTodo.completed = !prevTodo.completed
  //       } else {
  //         newTodo = prevTodo;
  //       }

  //       return newTodo;
  //     })
  //   })
  // }

  // spread operatorral
  const toggleTodo = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((prevTodo) => !prevTodo.completed))
  }

  // a hátralévő feladatok száma - megnézzük a todos állapoton, hogy melyek azok az elemek, amelyeknél a completed kulcs false értéken van, és megszámoljuk ezeket
  const activeCount = todos.filter((todo) => !todo.completed).length


  const addTodo = () => {
const text = input.trim()
  

    if (!text) {
      return
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
      createdAt: Date.now()
    }


    setTodos((todos) => [newTodo, ...todos])

    // setTodos((todos) => [...todos, newTodo])

    setInput('')
  }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        addTodo
      }
    }


    useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      } catch (error) {
        console.log(`Hiba a localStorage írásakor: ${error}`)
      }
    }, [todos])
  

  return (
    // fő keret
    <div className='app-root'>
      {/* kártya */}
      <div className="todo-card">
        {/* kártya fejléc */}
        <header className="todo-header">
          <h1>Teendőlista</h1>
          <p className="subtitle">Egyszerű todo app</p>
        </header>
        
        {/* beviteli mező és gomb */}
        <div className="input-row">
          <input
           type="text" 
           placeholder='Új feladat hozzáadása...'
           value={input}
            onChange={(event) => setInput(event.target.value)}
             onKeyDown={handleKeyDown}/>
          <button type="button" onClick={addTodo}>Hozzáad</button>
        </div>

        {/* ---ha már van teendő listánk--- */}

        {todos.length > 0 ? (
          <>
          
        {/* szűrő sáv */}
        <div className="toolbar">
          <div className="filter">
            <button 
            type="button" 
            className={filter === 'all' ? 'black' : ''} 
            onClick={() => setFilter('all')}>
              Mind</button>


            <button 
            type="button" 
            className={filter === 'active' ? 'black' : ''} 
            onClick={() => setFilter('active')}>
              Aktív</button>


            <button 
            type="button" 
            className={filter === 'completed' ? 'black' : ''} 
            onClick={() => setFilter('completed')}>
              Kész</button>

          </div>
          <button type="button" className='clear-btn' disabled={todos.length === 0} onClick={clearCompleted}>Kész feladatok törlése</button>
        </div>

        {/* todo-k felsorolás listája */}
        <ul className="todo-list">
          {filteredTodos.map((todo) => {
            
            return <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label className="todo-item">
                <input type="checkbox" checked={todo.completed} onChange={() => {toggleTodo(todo.id)}}/>
                <span className="todo-text">{todo.text}</span>
              </label>
              <button type="button" className='delete-btn' onClick=
              {
                () => deleteTodo(todo.id)}>X</button>
            </li>
          })}
        </ul>

        {/* footer */}
        <footer>
          <span>{activeCount} feladat hátra</span>
        </footer>
        </> ) : (
          <>
             {/* ---ha még nincs teendők listánk--- */}
        <p className='empty-state'>
          Még nincs teendőd. Írj be valamit fent és nyomd meg a <strong>Hozzáad</strong> gombot!
        </p>
          </> 
        )}
      </div> 
    </div>
  )
}

export default App
