type FormInputProps = {
  label: string;
  type?: string;
  register?: any; 
  error?: string;
};

const FormInput = ({ label, type = "text", register, error }: FormInputProps) => {
  return (
    <div className="relative w-full">
      <input
        {...register}
        type={type}
        id={label}
        className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b-2 ${
          error ? "border-red-500" : "border-gray-300"
        } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 ${
          error ? "focus:border-red-500" : "focus:border-blue-600"
        } peer`}
        placeholder=" "
      />
      <label
        htmlFor={label}
        className={`absolute text-sm ${
          error ? "text-red-500" : "text-gray-500"
        } dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
