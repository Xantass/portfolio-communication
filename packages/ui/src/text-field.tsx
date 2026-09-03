export function TextField({
  as,
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  error,
  rows = 4,
}: {
  as: "input" | "textarea";
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}) {
  const fieldClass =
    "w-full bg-transparent border-0 border-b border-contact-line text-[17px] text-bg font-sans outline-none py-[10px] px-[2px] placeholder:text-bg/50";
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} rows={rows} className={`${fieldClass} resize-none`} />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} className={fieldClass} />
      )}
      {error ? (
        <p className="text-[13px] text-blush" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
