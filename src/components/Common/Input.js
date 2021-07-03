import './Input.css';

const Input = (props) => {
    console.log(props);
    const name = props.inputName;
    return (
        <>
            {
                props.rows > 0 ?
                    <textarea rows={props.rows} type={props.type} className={`form-control ${props.className} ${name.hasError && 'error'}`}
                        value={name.value} onChange={name.onValueChange} />
                    :
                    <input type={props.type} className={`form-control ${props.className} ${name.hasError && 'error'}`}
                        value={name.value} onChange={name.onValueChange} />
            }
        </>
    );
}

export default Input;