import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberItems, item) => {
    return totalNumberItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header className="header">
      <div className="header-title">
        <img
          src={logoImg}
          alt="Logo de um restaurante"
          className="header-img"
        />
        <h1 className="title">SavoryJourney</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Carrinho ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
