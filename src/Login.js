import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    const handleClick = () => {
        axios.get(`http://localhost:3001/users/${username}/${password}`)
        .then(res => {
            if (res.data.length !== 0) {
                navigate(`/home/${res.data[0]._id}`)
            } else {
                setError(true);
            }
        }).catch(err => {
            console.log(err);
            setError(true);
        })
    }

  return (
    <div>
        <form>
            <input className="box" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username..."/>
            <input className="box" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
        </form>
        <button className="login-btn" placeholder="Login" onClick={handleClick} style={{width: "10px", height: "10px"}}/>
        {error ? (
            <div>
                <p color="red">Incorrect username or password.</p>
            </div>
        ) : null

        }
    </div>
  )
}
