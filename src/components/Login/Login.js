import React from 'react';
import './Login.css';

class Login extends React.Component{
  render(){
    return <main role="main">
      <header role="banner">
        <h1>Dream Walker</h1>
        <h2>just imagine.</h2>
      </header>
      <section>
      <div>
        <fieldset>
          <input type="password"></input>
        </fieldset>
      </div>
      <div className="login-panel">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>0</button>
      </div>

      </section>
    </main>
  }
}

export default Login;
