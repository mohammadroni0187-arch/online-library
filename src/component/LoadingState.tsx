import { Spinner } from "@/components/ui/spinner";

interface LoadingStateProps {
  label?: string;
}

/** Shared loading spinner used by the data driven pages. */
const LoadingState = ({ label = "Loading..." }: LoadingStateProps) => {
  return (
    <div
      role="status"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3 py-16"
    >
      <Spinner className="size-8 text-emerald-700" />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
};

export default LoadingState;
