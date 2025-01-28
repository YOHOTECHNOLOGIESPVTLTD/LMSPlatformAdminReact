import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports

// import Logo from 'components/logo';
import Logo from "../../../assets/images/logo.png"
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={"/"}>
      {/* <Logo /> */}
      <img src={Logo} alt='kiaq' width={"100px"} />
    </ButtonBase>
  );
};

export default LogoSection;
