interface IProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
}

export const Input: React.FC<IProps> = ({
  id,
  type,
  placeholder,
  label,
  ...rest
}) => {
  return (
    <>
      <label htmlFor={id} className="font-semibold text-gray-700">
        {label}
      </label>
      <input
        className="bg-gray-200 w-full  px-3 py-2 rounded border border-violet-600 outline-0"
        type={type}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};
