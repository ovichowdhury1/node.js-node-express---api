import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  });
   const handleAddSubmit = (event) => {
       event.preventDefault();
       const name = event.target.name.value;
       const email = event.target.email.value;
       const user = {name,email};
       console.log(user);
        fetch('http://localhost:5000/users',{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const newUsers = [...users,data];
          setUsers(newUsers);
        

        })
        .catch(err => console.error(err))      
       event.target.reset();

   }
  return (
    <div className="App">
        <form onSubmit={handleAddSubmit}>
               <input type="text" name="name" id="" placeholder='name' />
               <br />
               <input type="email" name="email" id="" placeholder='email'/>
               <br />
               <button type="submit">Add User</button>
        </form>
        <h2>user: {users.length}</h2>
         {
          users.map(user => <p key={user._id}> {user.name} {user.email} </p>)
         }
    </div>
  );
}

export default App;
