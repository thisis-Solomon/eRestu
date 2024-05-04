import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Inputs";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCxt = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { progress, hideCart } = userProgressCtx;
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    hideCart();
  }

  function handleFinishOrdering() {
    hideCart();
    cartCxt.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    const orders = {
      items: cartCxt.items,
      customer: customerData,
    };

    console.log(orders);

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orders }),
    });

    // sendRequest(JSON.stringify(orders));
  }

  let actions = (
    <>
      <Button onClick={handleCloseCheckout} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending the orders</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={progress === "checkout"}
        onClose={progress === "checkout" ? handleCloseCheckout : null}
      >
        <h2>Success!</h2>
        <p>Your order was submited successfully.</p>
        <p>We will get back to shortly via call by one of our team</p>

        <p className="modal-actions">
          <Button onClick={handleFinishOrdering}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={progress === "checkout"}
      onClose={progress === "checkout" ? handleCloseCheckout : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input type="text" label="Full Name" id="name" />
        <Input type="email" label="E-Mail" id="email" />
        <Input type="Street" label="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          {error && (
            <Error title="Failed to send the orders" message={error.message} />
          )}
          {actions}
        </p>
      </form>
    </Modal>
  );
}
