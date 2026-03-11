import FormInput from "@components/ui/FormInput";

export default function AuthFieldList ({ fields, register, errors }) {
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


