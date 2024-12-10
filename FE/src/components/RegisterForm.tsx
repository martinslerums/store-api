// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "./ui/button";
// import FormInput from "./FormInput";

// export default function RegisterForm() {
//   const registerSchema = z.object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     //   email: z.string().email("Invalid email address"),
//     //   password: z.string().min(6, "Password must be at least 6 characters"),
//     //   confirmPassword: z.string(),
//     //   dateOfBirth: z.string().optional(),
//     //   phoneNumber: z
//     //     .string()
//     //     .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
//     //     .optional(),
//     //   terms: z
//     //     .boolean()
//     //     .refine((val) => val, "You must accept the terms and conditions"),
//     // })
//     // .refine((data) => data.password === data.confirmPassword, {
//     //   message: "Passwords do not match",
//     //   path: ["confirmPassword"],
//   });

//   type RegisterFormValues = z.infer<typeof registerSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

//   const onSubmit = (data: RegisterFormValues) => {
//     console.log("Btn Clicked!");
//     console.log("Data: ", data);
//   };

//   return (
//     <div className="p-10">
//       <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex max-w-screen-md w-full mx-auto gap-5">
//             <FormInput
//               label="First name"
//               register={register("firstName")}
//               error={errors.firstName?.message}
//             />
//             <FormInput
//               label="Last name"
//               register={register("lastName")}
//               error={errors.firstName?.message}
//             />
//         </div>

//         {/*

//         <div>
//           <Input placeholder="Email" type="email" {...register("email")} />
//           {errors.email && <p>{errors.email.message}</p>}
//         </div>

//         <div>
//           <Input
//             placeholder="Password"
//             type="password"
//             {...register("password")}
//           />
//           {errors.password && <p>{errors.password.message}</p>}
//         </div>

//         <div>
//           <Input
//             placeholder="Confirm password"
//             type="password"
//             {...register("confirmPassword")}
//           />
//           {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
//         </div>

//         <div>
//           <label>Date of Birth</label>
//           <Input
//             placeholder="Number"
//             type="date"
//             {...register("dateOfBirth")}
//           />
//           {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
//         </div>

//         <div>
//           <Input placeholder="Number" {...register("phoneNumber")} />
//           {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
//         </div>

//         <div>
//           <label>
//             <Input type="checkbox" {...register("terms")} />
//             Accept Terms and Conditions
//           </label>
//           {errors.terms && <p>{errors.terms.message}</p>}
//         </div> */}

//         <Button type="submit">Register</Button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput"; 

import { z } from "zod";
import { Button } from "./ui/button";

const userInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email"),
});

const residentialInfoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

// const combinedSchema = userInfoSchema.and(residentialInfoSchema);

type UserInfo = z.infer<typeof userInfoSchema>;
type ResidentialInfo = z.infer<typeof residentialInfoSchema>;
type FormData = UserInfo & ResidentialInfo;

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const userInfoForm = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: formData, 
  });

  const residentialInfoForm = useForm<ResidentialInfo>({
    resolver: zodResolver(residentialInfoSchema),
    defaultValues: formData, 
  });

  const handleNext = (data: UserInfo | ResidentialInfo) => {
    setFormData((prev) => ({ ...prev, ...data })); 
    setStep((prev) => prev + 1); 
  };

  const handleFinalSubmit = (data: ResidentialInfo) => {
    const finalData = { ...formData, ...data }; 
    console.log(finalData);
  };

  return (
    <div className="p-10 mx-auto max-w-screen-lg border border-red-800">

      <div>
        <Button onClick={() => setStep(1)}>step 1</Button>
        <Button onClick={() => setStep(2)}>step 2</Button>
      </div>


      {step === 1 && (
        <form
          onSubmit={userInfoForm.handleSubmit((data) => handleNext(data))}
          className="space-y-3 border border-gray-600 rounded-md p-2"
        >
          <FormInput
            label="First name"
            register={userInfoForm.register("firstName")}
            error={userInfoForm.formState.errors.firstName?.message}
          />
          <FormInput
            label="Email"
            register={userInfoForm.register("email")}
            error={userInfoForm.formState.errors.email?.message}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      )}
      {step === 2 && (
        <form
          onSubmit={residentialInfoForm.handleSubmit((data) =>
            handleFinalSubmit(data)
          )}
          className="space-y-3"
        >
          <FormInput
            label="Address"
            register={residentialInfoForm.register("address")}
            error={residentialInfoForm.formState.errors.address?.message}
          />
          <FormInput
            label="City"
            register={residentialInfoForm.register("city")}
            error={residentialInfoForm.formState.errors.city?.message}
          />
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
