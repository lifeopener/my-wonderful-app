interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full shadow-[0_4px_20px_rgba(245,166,35,0.4)] hover:shadow-[0_6px_30px_rgba(245,166,35,0.6)] transition-all active:scale-90 flex items-center justify-center z-10"
    >
      <svg className="w-8 h-8 text-[#0A0A12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>
  );
}
