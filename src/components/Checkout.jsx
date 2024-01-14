import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideChekout();
  }

  function handleFinish() {
    userProgressCtx.hideChekout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@test.com }

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Cancelar
      </Button>
      <Button>Enviar Pedido</Button>
    </>
  );

  if (isSending) {
    actions = <span>Enviando pedido...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
        className="success"
      >
        <h2>Feito!</h2>
        <p>Seu pedido foi enviado com sucesso.</p>
        <p>Enviaremos o retorno com mais detalhes via email.</p>
        <div className="modal-actions">
          <Button onClick={handleFinish}>Entendido</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={handleClose}
      className="modal-form"
    >
      <form onSubmit={handleSubmit}>
        <h2>Informe seus dados</h2>
        <p className="form-total-price">
          Total a pagar: {currencyFormatter.format(cartTotal)}
        </p>
        <Input label="Nome Completo" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Rua" type="text" id="street" />
        <div className="control-row">
          <Input label="CEP" type="text" id="postal-code" />
          <Input label="Cidade" type="text" id="city" />
        </div>
        {error && <Error title="Erro ao enviar o pedido." message={error} />}
        <div className="modal-actions form-actions">{actions}</div>
      </form>
    </Modal>
  );
}
