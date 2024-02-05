import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Inputs";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCxt = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { progress, hideCart } = userProgressCtx;

  const cartTotal = cartCxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    hideCart();
  }

  return (
    <Modal
      open={progress === "checkout"}
      onClose={progress === "checkout" ? handleCloseCheckout : null}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input type="text" label="Full Name" id="full-name" />
        <Input type="email" label="E-Mail" id="email" />
        <Input type="Street" label="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button onClick={handleCloseCheckout} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
