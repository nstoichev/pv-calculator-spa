interface RadioCardOption<T extends string> {
  value: T;
  label: string;
}

interface RadioCardGroupProps<T extends string> {
  name: string;
  value: T;
  onChange: (next: T) => void;
  options: ReadonlyArray<RadioCardOption<T>>;
  ariaLabel?: string;
}

export default function RadioCardGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  ariaLabel,
}: RadioCardGroupProps<T>) {
  return (
    <div className="radio-group" role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const isActive = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={`radio-card${isActive ? ' is-active' : ''}`}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={isActive}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
