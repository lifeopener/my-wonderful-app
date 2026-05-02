export function InsightCard() {
  return (
    <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#F5A623]/10 rounded-[20px] p-5 border border-[#7B61FF]/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#7B61FF] rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-[#F0F0F0] mb-1">오늘의 인사이트</h4>
          <p className="text-[#8A8A9A] text-sm">기술주 변동성이 확대되고 있어요. 분산 투자 전략을 재점검해보세요.</p>
        </div>
      </div>
    </div>
  );
}
