import React, { useRef } from 'react'
import './App.css'
import { useState } from 'react'

function Todo() {
  const [toDos, setTodos] = useState([])
  const [toDo, setTodo] = useState('')
  const input = useRef()


  function inputItem() {
    if (toDo.length === 0) {
      input.current.style.border = "1px solid red"
      input.current.focus()
    }
    else {
      setTodos([
        ...toDos,
        {
          id: Date.now(),
          text: toDo,
          completedStatus: false,
          deletedStatus: false
        }
      ])
    }
  }



  return (
    <div className='todo-container'>
      <div className='input-section'>
        <h1>Todo List</h1>
        <input type="text" ref={input} onChange={(event) => setTodo(event.target.value)} />
        <button><i class="fa-solid fa-circle-plus" onClick={() => inputItem()}></i></button>
      </div>
      <div className='items'>
        <div className='added-item'>
          <h2>Pending</h2>
          {
            toDos.map((obj) => {
              if (obj.completedStatus === false && obj.deletedStatus === false)
                return (
                  <ul>
                    <li>
                      <input type="checkbox" onClick={() => {
                        toDos.filter(obj2 => {
                          if (obj2.id === obj.id) {
                            setTodos([...toDos, (obj.completedStatus = true)])
                          }
                          return obj2
                        })
                      }} value={obj.completedStatus} name='' id='' />
                      {obj.text}
                      <span><i className="fa-solid fa-trash" style={{ color: 'red' }} onClick={() => {
                        toDos.filter((obj2) => {
                          if (obj2.id === obj.id) {
                            setTodos([...toDos, (obj.deletedStatus = true)])
                          }
                          return null
                        })
                      }}></i></span>



                    </li>
                  </ul>
                )
              return null
            }

            )}
        </div>

        <div className='completed-item'>
          <h2>Completed</h2>
          {
            toDos.map((obj) => {
              if (obj.completedStatus === true && obj.deletedStatus === false) {
                return (
                  <ul>
                    <li>
                      {obj.text}
                      <span><i className="fa-solid fa-trash" style={{ color: 'red' }} onClick={() => {
                        toDos.filter((obj2) => {
                          if (obj2.id === obj.id) {
                            setTodos([...toDos, (obj.deletedStatus = true)])
                          }
                          return null
                        }
                        )
                      }}></i></span>
                    </li>
                  </ul>
                )
              }
              return null
            })
          }
        </div>

        <div className='removed-item'>
          <h2>Removed</h2>
          {
            toDos.map((obj) => {

              if (obj.deletedStatus === true && obj.completedStatus === false) {
                return (
                  <ul>
                    <li>
                      {obj.text}
                      <span><i className="fa-solid fa-arrows-rotate" onClick={() => {
                        toDos.filter((obj2) => {
                          if (obj2.id === obj.id) {
                            setTodos([...toDos, (obj.deletedStatus = false)])
                          }
                          return null
                        })
                      }}></i></span>
                    </li>
                  </ul>
                )
              }
              return null
            })
          }


        </div>

      </div> 

    </div>
  )
}

export default Todo