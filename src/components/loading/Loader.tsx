import { cn } from "@/utils/cn";
import { Spinner } from "./Spinner";

interface LoaderProps {
  message?: string;
  className?: string;
  /** Fills the viewport — used by route-level `loading.tsx` files. */
  fullScreen?: boolean;
}

/** Centred spinner + message for page and panel loading states. */
export function Loader({
  message = "Loading",
  className,
  fullScreen = false,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-muted",
        fullScreen ? "min-h-[60vh]" : "py-16",
        className,
      )}
    >
      <Spinner size="lg" className="text-brand" label={message} />
      <p className="font-sans text-body-sm tracking-[0.2em] uppercase">
        {message}
      </p>
    </div>
  );
}
