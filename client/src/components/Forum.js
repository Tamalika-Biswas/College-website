import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({name:"", email:"", message:""});
  const userContact = async () => {
    try{
      const res = await fetch('/getdata',{
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();
      setUserData(data);

      localStorage.setItem('message',JSON.stringify(userData.message));

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
      navigate('/login')
    }
  }

  const handleInputs =(e)=>{
    const name= e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]:value});
  }

  //send the data to backend
  const contactForm = async (e)=>{
    e.preventDefault();
    const {name, email, phone, message} = userData;
    localStorage.setItem('message',userData.message);
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });
    const data = await res.json();
    if(!data){
      console.log("message not sent");
    }else{
        alert ("message sent");
        setUserData({...userData, message: ""});
    }
  }

  useEffect(()=>{
    userContact();
    
  },[]);


  return (
    <>
      <div className='contact_info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
              {/* phone number */}
              <div className='contact_info_item d-flex justify-content-start align-items-center'>
                <img src="" alt="phone"/>
                <div className='contact_info_content'>
                  <div className='contact_info_tilte'>
                    phone
                  </div> 
                  <div className='contact_info_text'>
                    +91 000000000
                  </div>
                </div>
              </div>
              {/* email */}
              <div className='contact_info_item d-flex justify-content-start align-items-center'>
                <img src="" alt="email"/>
                <div className='contact_info_content'>
                  <div className='contact_info_tilte'>
                    Email
                  </div> 
                  <div className='contact_info_text'>
                    email@email.com
                  </div>
                </div>
              </div>

              <div className='contact_info_item d-flex justify-content-start align-items-center'>
                <img src="" alt="phone"/>
                <div className='contact_info_content'>
                  <div className='contact_info_tilte'>
                    Address
                  </div> 
                  <div className='contact_info_text'>
                    adamas, barasat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact form */} 
      <div className='contact_form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact_form_container py-5'>
                <div className='contact_form_title'>
                  Start a Discussion
                </div>
                <form mehtod = "POST" id="contact_form">
                  <div className='contact_form_name d-flex justify-content-between align-items-between'>
                    <input type="text" id="contact_form_name" 
                    className='contact_form_name input_field' 
                    name= "name" value = {userData.name} onChange ={handleInputs} placeholder='Your Name' required='true'/>

                    <input type="text" id="contact_form_email" 
                    className='contact_form_email input_field' 
                    name= "email" value = {userData.email} onChange ={handleInputs} placeholder='Your Email' required='true'/>

                    <input type="number" id="contact_form_phone" 
                    className='contact_form_phone input_field' 
                    name= "phone" value = {userData.phone} onChange ={handleInputs} placeholder='Your Phone Number' required='true'/>
                  </div>
                  <div className='contact_form_text mt-4'>
                    <textarea className='text_field contact_form_message'
                     name= "message" value = {userData.message} onChange ={handleInputs} formtarget="textData"  placeholder="Message" id="" cols="" rows=''></textarea>
                  </div>
                  {/* <div className='contact_form_button'>
                    <button type="submit" onClick = {contactForm} className='button contact_submit_button'>Send Message</button>
                  </div> */}
                  <div className='contact_form_button'>
                    <button type="submit" onClick = {contactForm} formtarget="textData" className='button contact_submit_button'>Send Message</button>
                  </div>
                </form>
                <div>
                    <p id = "forum-message">{localStorage.getItem('message')}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact