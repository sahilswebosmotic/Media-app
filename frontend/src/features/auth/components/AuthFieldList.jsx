import FormInput from "@components/ui/FormInput";

const AuthFieldList = ({ fields, register, errors }) => {
    return fields.map((field) => (
        <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            register={register}
            error={errors?.[field.name]}
        />
    ));
};

export default AuthFieldList;
