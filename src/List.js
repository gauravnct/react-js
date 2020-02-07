import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {checkUserLoggedIn} from './Utils.js';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
	NavLink,
	useRouteMatch,
	Link
  } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";

function UserList(props) {
    
    const [datalist, setDataList] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')

    useEffect( () => {
        axios.get("http://192.168.100.7/api/register.php?action=userslist&srckeyword="+searchKeyword)
        .then(res => {
            console.log(res)
            setDataList(res.data.data.user_detail);
        })
        .catch(err => {
            console.log(err)
        }) 
    },[searchKeyword])

    if(!checkUserLoggedIn()){
        return <Redirect to='/login' />
    }

    return (
        <div>
            <input type="text" onChange={e=>setSearchKeyword(e.target.value)} placeholder="Search by keyword" />
            <Helmet>
                <meta charSet="utf-8" />
                <title>List</title>
                <meta name="keywords" content="List" />
                <meta name="description" content="List" />
            </Helmet>            
            <ul>
                {
                    datalist.map(data => <li key={data.id}>{data.email_address}</li>)
                }
            </ul>
        </div>
    );
}

export default UserList;