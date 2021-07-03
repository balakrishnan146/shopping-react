const Label = (props) => {
    return <label className={`my-1 ${props.className}`}>{props.children}</label>;
}

export default Label;