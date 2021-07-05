const Alert = (props) => {
    return (
        <span className={`alert alert-${props.type} ${props.className}`} role='alert'>
            {props.children}
        </span>);
}

export default Alert;