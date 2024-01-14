import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <div className="container-img">
          <img
            src={`http://localhost:3000/${meal.image}`}
            alt={meal.name}
            className="meal-img"
          />
        </div>
        <div className="meal-info">
          <h3 className="name">{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <div className="button-add-cart">
            <Button onClick={handleAddMealToCart}>Adicionar ao carrinho</Button>
          </div>
        </div>
      </article>
    </li>
  );
}
