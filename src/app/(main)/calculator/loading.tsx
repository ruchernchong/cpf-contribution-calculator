const CalculatorLoading = () => (
  <div className="flex flex-col gap-12">
    <div className="grid gap-8 md:grid-cols-2">
      <div className="h-96 w-full animate-pulse rounded-lg bg-zinc-200" />
      <div className="h-96 w-full animate-pulse rounded-lg bg-zinc-200" />
    </div>
    <div>
      <div className="mb-6 h-8 w-64 animate-pulse rounded bg-zinc-200" />
      <div className="h-80 w-full animate-pulse rounded-lg bg-zinc-200" />
    </div>
  </div>
);

export default CalculatorLoading;
