import React, { useState, useEffect } from 'react'
import './styles.css'

import { Card } from '../../components/Card'

export function Home() {
  //here we just store the name of the student that's being typed real time
  const [studentName, setStudentName ] = useState('Matthew') 

  //here we will store all the students that we're added
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: ''})

  function handleAddStudent() {
    
    // we create the object with the information about the new student
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    // here we will put the new student inside the state array of students
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    //everything in here are the actions that we want to be executed

    fetch('https://api.github.com/users/0xREALaldc')
      .then(response => response.json())
      .then(data => {
        setUser( {
          name: data.name, 
          avatar: data.avatar_url,
      })
      })
      .catch(error => console.error(error))

  }, [students])

  return (
    <div className="container">

      <header>
        <h1>Attendence list</h1>

        <div>
          <strong>{ user.name }</strong>
          <img src={ user.avatar } alt="Profile photo" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Type your name..." 
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Add
      </button>
      { // we use curly braces when we want to use or interact with a variable inside the 'return' in a JSX
        
        //we're going to iterate through the students array showing all the students
        students.map(student => (
          <Card 
            key={ student.time }
            name={ student.name } 
            time={ student.time } 
          />
        ))
      }
    </div>
  )
}