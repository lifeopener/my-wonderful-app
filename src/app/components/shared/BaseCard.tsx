import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  title?: string;
  rightElement?: ReactNode;
  className?: string;
}

/**
 * @description 모든 대시보드 카드의 기반이 되는 레이아웃 래퍼(Wrapper) 컴포넌트. 배경, 패딩, 테두리를 통일합니다.
 * @ai_context Always use this component instead of raw `div` tags when creating a new card-like section to maintain UI consistency across the app. You can pass custom Tailwind classes via `className` prop.
 */
export function BaseCard({ children, title, rightElement, className = '' }: BaseCardProps) {
  return (
    <div className={`bg-[#1A1A2E] rounded-[20px] p-5 mb-4 border border-white/5 ${className}`}>
      {(title || rightElement) && (
        <div className="flex items-center justify-between mb-3">
          {title && <h3 className="text-[#F0F0F0]">{title}</h3>}
          {rightElement}
        </div>
      )}
      {children}
    </div>
  );
}
