

function Button({disabled, handleClick, children}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default Button;