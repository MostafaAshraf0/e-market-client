import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from './ui/button';

interface AddToCartProps {
    productId: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId }) => {
    const handleAddToCart = async () => {
        try {
            const token = Cookies.get('userId');
            if (!token) {
                throw new Error('User not authenticated');
            }

            const userId = token;
            const payload = { userId, productId, quantity: 1 };

            console.log('Adding to cart with payload:', payload);

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, payload);
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding product to cart');
        }
    };

    return (
        <Button variant="destructive" onClick={handleAddToCart}>Add to Cart</Button>
    );
};

export default AddToCart;
