export interface TextInputProps {
    id: string;
    field: string;
    value: string;
    onChange: (model: { value: string; error: string; touched: boolean; field: string }) => void;
    required?: boolean;
    maxLength?: number;
    type?: string;
    label?: string;
    placeholder?: string;
    inputClass?: string;
    error?: string; // ✅ ADD THIS LINE
  }
  