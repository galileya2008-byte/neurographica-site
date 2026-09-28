import { Button } from "@/components/ui/button";
import {
  INDIVIDUAL_SESSION_PATH,
  neurographicsFormatsCopy,
} from "@/lib/content/neurographics-formats";

export function NeurographicsFormatsCta() {
  return (
    <div className="mt-8 max-w-2xl">
      <p className="text-base leading-relaxed text-muted md:text-lg">
        {neurographicsFormatsCopy.guidance}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href={INDIVIDUAL_SESSION_PATH} size="lg">
          {neurographicsFormatsCopy.sessionButton}
        </Button>
        <span className="inline-flex flex-col items-stretch sm:items-start">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            disabled
            aria-disabled="true"
            title={neurographicsFormatsCopy.introHint}
            className="disabled:opacity-60"
          >
            {neurographicsFormatsCopy.introButton}
          </Button>
          <span className="mt-1.5 text-center text-xs tracking-wide text-muted sm:text-left">
            {neurographicsFormatsCopy.introHint}
          </span>
        </span>
      </div>
    </div>
  );
}
