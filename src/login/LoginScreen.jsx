import React, { useContext } from 'react';
import '../App.scss';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

function LoginScreen({ history }) {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    const lastPath = localStorage.getItem('lastPath') || '/';
    //? Diferencia entre psuh y replace...
    //? replace no guarda la historia de navegacion, no permite ir ATRAS
    //history.push("/");

    const action = {
      type: types.login,
      payload: { name: 'Cristian' },
    };
    dispatch(action);
    history.replace(lastPath);
  };
  return (
    <div className='home'>
      <div className='button' onClick={handleLogin}>
        Iniciar sesión
      </div>
    </div>
  );
}

export default LoginScreen;
