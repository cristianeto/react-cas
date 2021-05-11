import React from 'react';
import '../App.scss';

function LoginScreen({ onLogin }) {
  return (
    <div className='home'>
      <div className='button' onClick={onLogin}>
        Iniciar sesión
      </div>
    </div>
  );
}

export default LoginScreen;
