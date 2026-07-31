import { NavLink } from "react-router";
import useTheme from '../context/ThemeContext';

const NotFound = () => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      <h3 className="text-center text-danger pt-5">Page not found. Error 404</h3>
      <NavLink to="/" className={`d-block text-center link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mt-4 ${isDarkTheme ? "link-light" : "link-dark"}`}>
        Go to home page
      </NavLink>
    </>
  )
}

export default NotFound
