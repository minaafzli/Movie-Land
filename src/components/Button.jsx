function Button({ children }) {
  return (
    <button className="bg-primary w-full md:w-auto py-3 px-4 rounded-lg text-accent text-sm hover:bg-hover transition">
      {children}
    </button>
  );
}

export default Button;
