import React, { useEffect, useState } from 'react';
import './profile.css';
import { useStateValue } from '../../utility/stateprovider';
import axios from "../../utility/axios";
import profile from "../../assets/Images/User.png";
import {useNavigate, useParams} from 'react-router-dom'



const Profile = () => {
  let params = useParams();
  const [userData, setUserData] = useState({});
  const [{ user }, dispatch] = useStateValue();
  const [form, setForm] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setForm(event.target.files[0]);
    profileChange();
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // console.log(user);

  }, [navigate]);

  useEffect(() => {
    // const id = { userId:user.user.id };
    console.log("params.id",params.id)
    // console.log("id",id)
    // console.log("user.token",user.token)
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `/api/users/userinfo/${params.id}`
          // ,{
          //   userId: user.user.id,
          // },
          // {
          //   headers: {
          //     'x-auth-token': user.token
          //   }
          // }

        );
        const data = response.data.data;
        // console.log("response",response)
      //  console.log("data",data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  //  console.log(form);
  }, [form]);

  const profileChange = () => {
   // console.log(form);
    const fetchData = () => { 
      const response = axios.get(`api/users/profilepicture`,[form,user.user['id']]);
      console.log(response);
    }
    fetchData();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="profile-picture">
            <img className='avatar'
              width="300px"
              src={userData.image_url != null ? userData.image_url : profile }
              alt="Profile Picture"
            />
          <form id="myForm" encType="multipart/form-data">
          <input type="file" name="profile" onChange={handleChange} />
        </form>
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-info">
            <div className="row">
              {Object.keys(userData).map((key) => (
                <div className="col-md-4" key={key}>
                  <strong>{key}</strong>
                  <p>{userData[key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
