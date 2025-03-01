interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  onClick?: () => void;
}

export default function RadioButton({
  label,
  name,
  value,
  checked,
  onChange,
  onClick
}: RadioButtonProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        onClick={onClick}
        className="peer hidden"
      />
      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-1 border-black transition peer-checked:border-3 peer-checked:border-[#1F8394]">
        <div className="h-2.5 w-2.5 scale-0 rounded-full bg-black transition peer-checked:scale-100 peer-checked:bg-[#1F8394]" />
      </div>
      <span className="text-gray-800">{label}</span>
    </label>
  );
}
