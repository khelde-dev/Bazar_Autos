import { Outlet } from 'react-router-dom';
import { BodyHome } from '../Utils/Screen/Home/BodyHome';


export const Layout = () => {
  return (
    <BodyHome>
        <Outlet />
    </BodyHome>
  );
};