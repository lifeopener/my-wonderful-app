interface B2BCurationCardProps {
  title: string;
  category: string;
  url: string;
  description?: string;
}

export function B2BCurationCard({ title, category, url, description }: B2BCurationCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#1A1A2E] border-l-4 border-[#F5A623] rounded-lg p-4 hover:opacity-80 transition-opacity min-w-[280px] max-w-[320px]"
    >
      <div className="mb-2">
        <span className="inline-block px-2 py-1 bg-[#7B61FF]/20 text-[#7B61FF] rounded text-sm">
          {category}
        </span>
      </div>
      <h4 className="text-[#F0F0F0] mb-2">{title}</h4>
      {description && (
        <p className="text-[#8A8A9A] text-sm mb-3">{description}</p>
      )}
      <div className="flex items-center text-[#F5A623] text-sm">
        <span>보러가기</span>
        <span className="ml-1">→</span>
      </div>
    </a>
  );
}
