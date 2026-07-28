const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="
      w-full
      rounded-xl
      bg-violet-600
      py-3
      font-semibold
      transition
      hover:bg-violet-500
      active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
};

export default Button;