const AddProduct = () => {
    const onSubmit = (event) =>{
        console.log(event);
    }
    return (
        <>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId={productName}>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={onSubmit}>Submit</Button>
                </Form.Row>
            </Form>
        </>
    );
}

export default AddProduct;