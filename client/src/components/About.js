import React, { useEffect, useState } from 'react';
import aboutPic from "../images/user-image.jpg";
import profileDemo from "../images/signup.png";
import {useNavigate} from "react-router-dom"

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try{
      const res = await fetch('/about',{
        method : "GET",
        headers : {
          Accept: "application/json",
          "Content-Type" : "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
      navigate('/login')
    }
  }

  // 
  useEffect(()=>{
    // call
     callAboutPage()
     
  },[]);
  return (
    <>
      <div className='container emp-profile'>
        <form method=''>
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-img'>
                <img src={userData.name === 'Tamalika Biswas' ? aboutPic : profileDemo} alt='profile-pic'/>
              </div>
              
            </div>
            <div className='col-md-6'>
              <div className='profile-head'>
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6> 
                <p className='profile-rating mt-3 mb-5'></p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" 
                    data-toggle="tab" href="#home" role="tab">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" 
                    data-toggle="tab" href="#profile" role="tab">Timeline</a>
                  </li>
                </ul>             
              </div>
            </div>

            <div className='col-md-2'>
              {/* <input type="submit" className='profile-edit-btn' name="btnAddMore" value="Edit Profile" /> */}
            </div>
          </div>


          <div className='row'>
            {/* left side url */}
            <div className='col-md-4'>
              <div className='profile-work'>
                <p>SOCIAL MEDIA LINKS</p>
                <a href="" target="work-link">YOUTUBE</a> <br />
                <a href="" target="work-link">FACEBOOK</a> <br />
              </div>
            </div>
            {/* right side data toggle */}
            <div className='col-md-8 pl-5 about-info'>
              <div className='tab-content profile-tab' id="myTabContent">
                <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby="home-tab">
                   <div className='row'>
                      <div className="col-md-6">
                        <label >User ID</label>
                      </div>
                      <div className="col-md-6">
                        <p>34720472</p>
                      </div>
                   </div>

                   {/* <div className='row mt-3'>
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>                     
                   </div> */}
                   <div className='row'>
                      <div className="col-md-6">
                        <label >Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.name}</p>
                      </div>
                   </div>

                   <div className='row mt-3'>
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.email}</p>
                      </div>
                   </div>

                  <div className='row mt-3'>
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className="col-md-6">
                      <label>Program</label>
                    </div>
                    <div className="col-md-6">
                      <p>B.TECH</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className="col-md-6">
                      <label>DEP</label>
                    </div>
                    <div className="col-md-6">
                      <p>CSE</p>
                    </div>
                  </div>
                </div>
              </div>


                <div className='tab-pane fade' id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className='row'>
                    <div className="col-md-6">
                      <label>Roll</label>
                    </div>
                    <div className="col-md-6">
                      <p>UG/02/BTCSE/2018/072</p>
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className="col-md-6">
                      <label>REG</label>
                    </div>
                    <div className="col-md-6">
                      <p>AU/2018/02/0002798</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About