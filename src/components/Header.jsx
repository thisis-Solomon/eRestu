import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const ctxCart = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { showCart } = userProgressCtx;

  function showCartHandler() {
    showCart();
    console.log("Clicked from header")
  }

  const totalCartItems = ctxCart.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} />
        <h1>e-Restu</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCartHandler}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
