import {useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBeer } from 'react-icons/fa';
import './Rate.css'

export default function Rate() {

    const [bar, setBar] = useState({});
    const [usersBars, setUsersBars] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    const navigate = useNavigate();
    const { id, longitude, latitude, user_id } = useParams();

    const handleChange = (val) => {
        setRating(val);
        /*
        axios.post(`http://localhost:3001/bars/update/` + bar._id, {
            "hotness": val,
            "location": bar.location,
            "id": bar.id,
            "users": bar.users
        });
        */
        let hasSeen = false;
        let i = 0;
        while (i < usersBars.length) {
            if (usersBars[i] === bar._id) {
                hasSeen = true;
                break;
            }
            i++;
        }

        if (hasSeen) {
            const newBars = [...usersBars];
            newBars[i + 1] = val;
            const hot = ((bar.hotness * bar.users) - usersBars[i + 1] + val) / bar.users
            setUsersBars(newBars);
            axios.post(`http://localhost:3001/users/update/` + user_id, {
                "bars": newBars
            });
            axios.post(`http://localhost:3001/bars/update/` + bar._id, {
                "hotness": hot,
                "location": bar.location,
                "id": bar.id,
                "users": bar.users
            });
        } else {
            const newBars = [...usersBars, bar._id, val]
            setUsersBars(newBars);
            axios.post(`http://localhost:3001/users/update/` + user_id, {
                "bars": newBars
            });
            
            const newUser = bar.users + 1;
            const hot = (bar.hotness + val) / newUser;
            axios.post(`http://localhost:3001/bars/update/` + bar._id, {
                "hotness": hot,
                "location": bar.location,
                "id": bar.id,
                "users": newUser
            });
            

        }
        
        
    }


    useEffect(() => {
        
        let isCancelled = false;
        axios.get(`http://localhost:3001/bars/poi/` + id)
        .then(res => {
            if (!isCancelled) {
                if (res.data.length !== 0) {
                    setBar(res.data[0]);
                    setLoading(false);
                }
                else {
                    axios.post(`http://localhost:3001/bars/add`, {
                        "hotness": 0,
                        "location": [Number(longitude), Number(latitude)],
                        "id": id,
                        "users": 0,
                    })
                    setLoading(false);
                }
            }
        })
        axios.get(`http://localhost:3001/users/${user_id}`)
        .then(res => {
            if (!isCancelled) {
                if (usersBars === null) {
                    setUsersBars(res.data.bars);
                }
            }
            
        });
        

        return () => {
            isCancelled = true;
        };
        
    }, [isLoading, bar, usersBars])

  return (!isLoading ? (
    <div>
        <h1 className="hotness">{bar.hotness}</h1>

        {
            [ ...Array(5)].map((beer, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>
                        <input 
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleChange(ratingValue)}
                        
                        />
                        <FaBeer 
                        className="beer"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "e4e5e9"}
                        size={100}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        />

                       
                    </label>
                );
            }) 
        }
        <div className="rectangle"></div>
        
        <h1 className="based">Based on {bar.users} {bar.users === 1 ? "user" : "users"}</h1> 
    </div> 
  ) : null);
}