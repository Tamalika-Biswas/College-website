import React ,{useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signup from "../images/AU-campus.jpg";

const Signup = () => {
  const navigate = useNavigate()
  const [user,setUser] =useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });

  let name,value;

  const handleInputs = (e)=>{
    // console.log(e);
    name= e.target.name ;
    value= e.target.value ;
    setUser({...user, [name]:value})
  }

const PostData = async(e)=>{
  e.preventDefault();
  const {name,email,phone,work,password,cpassword} = user;
  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name, email, phone, work, password, cpassword
    })
  });
  const data = await res.json();
  if(data.status === 422 || !data){
    window.alert("Invalid Registration");
    console.log("registration failed");
  }
  else {
    if(email.endsWith("adamasuniversity.ac.in")){
      window.alert("Registration Successful");
     console.log("Registration Successful");
    navigate("/login");
    }else{
      window.alert("Invalid Email");
      console.log("Invalid Email");
      
    }
    
  }
}


  return (
    <>
      <section className = "signup">
        <div className="container mt-5">
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Sign up</h2>
              <form method="POST" className='register-form' id ="register-form">
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className="zmdi zmdi-account-circle material-icons-name"></i>
                  </label>
                  <input type="text" name="name" id="name" autoComplete='off' value={user.name} onChange={handleInputs} placeholder="your name" />
                 </div>

                 <div className='form-group'>
                  <label htmlFor='email'>
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off' value={user.email} onChange={handleInputs} placeholder="your email" />
                 </div>

                 <div className='form-group'>
                  <label htmlFor='phone'>
                    <i className="zmdi zmdi-smartphone-iphone material-icons-name"></i>
                  </label>
                  <input type="text" name="phone" id="phone" autoComplete='off'  value={user.phone}  onChange={handleInputs} pattern="\d{10}" maxlength = "10" placeholder="your phone number" />
                 </div>

                 <div className='form-group'>
                  <label htmlFor='work'>
                    <i className="zmdi zmdi-card-travel material-icons-name"></i>
                  </label>
                  <input type="text" name="work" id="work" autoComplete='off' value={user.work} onChange={handleInputs} placeholder="your profession" />
                 </div>

                 <div className='form-group'>
                  <label htmlFor='password'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off' value={user.password} onChange={handleInputs} placeholder="your password" />
                 </div>

                 <div className='form-group'>
                  <label htmlFor='cpassword'>
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="cpassword" id="cpassword" autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder="confirm your cpassword" />
                 </div>

                 <div className='form-group form-button'>
                  <input type="submit" name="signup" id="signup" className ="form-submit" value="register" onClick={PostData} />
                 </div>

              </form>
            </div>

            <div className='signup-image'>
                  <figure>
                    <img src={signup} alt= "AU-signup-image" />
                  </figure>
                  <NavLink to="/login" className = "signup-image-link">I am already registered</NavLink>
            </div>
              
          </div>
        </div>
      </section>
    </>
  ) ;
}

export default Signup;