'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Select
      onValueChange={(value) => {
        setTheme(value as string)
      }}
      defaultValue={theme}
    >
      <SelectTrigger className="w-52">
        <SelectValue
          placeholder={`${
            theme == 'dark' ? 'Oscuro' : theme == 'light' ? 'Claro' : 'Sistema'
          }`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Claro</SelectItem>
        <SelectItem value="dark">Oscuro</SelectItem>
        <SelectItem value="system">Sistema</SelectItem>
      </SelectContent>
    </Select>
  )
}
