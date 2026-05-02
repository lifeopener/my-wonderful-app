import { ReactNode } from 'react';

interface OptionButtonProps {
  isSelected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: string | ReactNode;
  layout?: 'vertical' | 'horizontal';
  rightElement?: ReactNode;
}

/**
 * @description 파트너 설정 화면 등에서 사용되는 선택 가능한(Selectable) 다목적 버튼 컴포넌트입니다.
 * @ai_context Encapsulates the complex Tailwind logic for selected/unselected states (Amber highlights). Supports both 'vertical' and 'horizontal' layouts. Use this for any toggleable or selectable list item.
 */
export function OptionButton({ 
  isSelected, 
  onClick, 
  title, 
  description, 
  icon, 
  layout = 'vertical',
  rightElement 
}: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-[#1A1A2E] rounded-lg border transition-all flex text-left
        ${layout === 'horizontal' ? 'flex-row items-center gap-3 p-4' : 'flex-col p-4'}
        ${isSelected ? 'border-[#F5A623] bg-[#F5A623]/10' : 'border-white/10 hover:border-white/20'}
      `}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className="flex-1">
        <div className="text-[#F0F0F0] text-sm mb-1">{title}</div>
        {description && <div className="text-[#8A8A9A] text-xs">{description}</div>}
      </div>
      {rightElement}
    </button>
  );
}
