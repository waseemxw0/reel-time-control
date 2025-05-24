
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const removeOption = (value: string) => {
    onChange(selected.filter(item => item !== value));
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between text-left font-normal"
      >
        <div className="flex flex-wrap gap-1">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selected.slice(0, 2).map((value) => {
              const option = options.find(opt => opt.value === value);
              return (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                >
                  {option?.label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(value);
                    }}
                  />
                </span>
              );
            })
          )}
          {selected.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{selected.length - 2} more
            </span>
          )}
        </div>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded"
                onClick={() => toggleOption(option.value)}
              >
                <div className="flex h-4 w-4 items-center justify-center border rounded">
                  {selected.includes(option.value) && (
                    <Check className="h-3 w-3 text-primary" />
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
