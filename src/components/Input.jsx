function Input({type,placeholder,id}) {
    return (
        <div>
            <input type={type} placeholder={placeholder} id={id} className="text-accent pl-3 border-1 p-2 my-3 placeholder w-full border-muted bg-secondary rounded-lg"/>
        </div>
    )
}

export default Input
