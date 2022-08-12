import React,{useState,useContext} from 'react'
import login from "../images/signup.png"
import { NavLink ,useNavigate} from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const loginUser = async (e) =>{
    e.preventDefault();
    const res = await fetch('/signin', {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = res.json();
    if(res.status === 400 || !data){
      window.alert("Invalid credentials");
    }else{
      dispatch({type:'USER', payload:true});
      window.alert("Login successful");
      navigate("/");
    }
  }

  return (
    <>
      <section className = "signin">
          <div className="container mt-5">
            <div className='signin-content'>
              <div className='signin-image'>
                  <figure>
                    <img src={login} alt= "AU-login-image" />
                  </figure>
                  <NavLink to="/signup" className = "signup-image-link">Create an account</NavLink>
              </div>
              <div className='signin-form'>
                <h2 className='form-title'>Sign up</h2>
                <form method ="POST" className='register-form' id ="register-form">
                  <div className='form-group'>
                    <label htmlFor='email'>
                      <i className="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input type="text" name="email" id="email" autoComplete='off' value = {email} onChange = {(e)=>setEmail(e.target.value)} placeholder="your email" />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'>
                      <i className="zmdi zmdi-lock material-icons-name"></i>
                    </label>
                    <input type="password" name="password" id="password" autoComplete='off' value ={password} onChange = {(e)=>setPassword(e.target.value)} placeholder="your password" />
                  </div>

                  <div className='form-group form-button'>
                    <input type="submit" name="signin" id="signin" className ="form-submit" value="Log in" onClick={loginUser} />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Login