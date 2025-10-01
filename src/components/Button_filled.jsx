function Button_filled({children}) {
    return (
        <div>
             <button className='border-primary md:w-auto w-full border-2 text-accent py-3 px-4 text-sm rounded-lg cursor-pointer bg-secondary/50 hover:bg-primary'>{children}
            </button>
            
        </div>
    )
}

export default Button_filled
