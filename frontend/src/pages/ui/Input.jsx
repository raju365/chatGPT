const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="
      w-full
      rounded-xl
      border
      border-zinc-700
      bg-zinc-900
      px-4
      py-3
      text-white
      placeholder:text-zinc-500
      outline-none
      transition
      focus:border-violet-500
      "
    />
  );
};

export default Input;