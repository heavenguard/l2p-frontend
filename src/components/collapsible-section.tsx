import { ChevronDown, ChevronRight } from "lucide-react"

interface CollapsibleSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  required?: boolean
}

export function CollapsibleSection({ title, icon, children, isOpen, onToggle, required }: CollapsibleSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold text-left">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
        </div>
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
      {isOpen && <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-200">{children}</div>}
    </div>
  )
}