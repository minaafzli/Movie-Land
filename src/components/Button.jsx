function Button({children}) {
    return (
        <div>
            <button className='bg-primary  py-3 px-4 rounded-lg cursor-pointer text-accent text-sm hover:bg-hover'>{children}
            </button>
            
        </div>
    )
}

export default Button
