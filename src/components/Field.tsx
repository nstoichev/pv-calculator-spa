import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}

export default function Field({ label, hint, htmlFor, children }: FieldProps) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={htmlFor}>
        <span>{label}</span>
        {hint ? <span className="field-hint">{hint}</span> : null}
      </label>
      {children}
    </div>
  );
}
