import useCartStore from "@/stores/cartStore";
import { CiShoppingCart } from "react-icons/ci";

type AddItemCartProps = {
  id: string;
};

const AddItemCart = ({id}: AddItemCartProps) => {

  const { addItemToCart} = useCartStore()

  const handleAddToCart = () => {
    console.log("handleAddToCart CLICKED!")
    addItemToCart(id)
  }
  
  return (
    <div>
      <button className="flex" onClick={handleAddToCart}>
        <span className="text-base">Pievienot Grozam</span> | <CiShoppingCart size={26} />
      </button>
    </div>
  )
}

export default AddItemCart