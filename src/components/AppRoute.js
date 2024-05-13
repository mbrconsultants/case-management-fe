import { Navigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../context'
 export const Private = (Component) => {
      let auth = useAuthState();
    let location = useAuthDispatch();
    return auth.token ? <Component /> : <Navigate to={`${process.env.PUBLIC_URL}/login`} state={{ from: location }}  />
}
