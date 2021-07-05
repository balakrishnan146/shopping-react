import useInput from '../../hooks/use-input';
import Input from '../Common/Input';
import Label from '../Common/Label';
import Constants from '../Common/Constants';
import { post } from '../Common/Http';

const AddProduct = () => {
    const productName = useInput(['required']);
    const imgURL = useInput(['required']);
    const price = useInput(['required', 'min']);
    const stock = useInput(['required', 'min']);
    const discount = useInput(['discount']);
    const description = useInput([]);

    function isFormValid() {
        return productName.isValid && imgURL.isValid && price.isValid && stock.isValid && description.isValid;
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const reqObj = {
            productName: productName.value,
            imgURL: imgURL.value,
            price: +price.value,
            stock: +stock.value,
            discount: +discount.value,
            description: description.value,
        }
        await post(`${Constants.BASE_URL}products.json`, reqObj);
    }

    return (
        <>
            <form className='col-8 offset-2'>
                <div className='row my-1'>
                    <Label className='col-4'>Product Name</Label>
                    <Input type='text' className='col-8' inputName={productName} />
                </div>
                <div className='row my-1'>
                    <Label className='col-4'>Image URL</Label>
                    <Input className='col-8' type='url' inputName={imgURL} />
                </div>
                <div className='row my-1'>
                    <Label className='col-4'>Price</Label>
                    <Input className='col-8' type='number' inputName={price} />
                </div>
                <div className='row my-1'>
                    <Label className='col-4'>Stock</Label>
                    <Input className='col-8' type='number' inputName={stock} />
                </div>
                <div className='row my-1'>
                    <Label className='col-4'>Discount</Label>
                    <Input className='col-8' type='number' inputName={discount} />
                </div>
                <div className='row my-1'>
                    <Label className='col-4'>Description</Label>
                    <Input className='col-8 form-control' rows='3' type='number' inputName={description} />
                </div>
                <div className='row'>
                    <button className='btn btn-success m-3' type='submit'
                        disabled={!isFormValid()} onClick={onSubmit}>Submit</button>
                </div>
            </form>
        </>
    );
}

export default AddProduct;