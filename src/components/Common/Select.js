const Select = (props) => {
    const name = props.inputName;
    return (
        <>
            <select type={props.type} className={`form-control ${props.className}}`}
                value={name.value} onChange={name.onValueChange}>
                {props.children}
            </select>
        </>
    );
}

export default Select;