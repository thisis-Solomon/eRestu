import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCxt = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);

  const { progress, hideCart, showCheckout } = progressCtx;

  function handleCloseCart() {
    hideCart();
  }

  function handleToCheckout() {
    showCheckout();
  }

  const cartTotal = cartCxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <Modal
      className="cart"
      open={progress == "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCxt.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCxt.addItem(item)}
            onDecrease={() => cartCxt.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>

        {cartCxt.items.length > 0 && (
          <Button onClick={handleToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
