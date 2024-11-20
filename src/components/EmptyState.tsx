import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const EmptyState = ({
  title,
  subtitle,
  actionLink = '/',
  actionTarget = 'Back to Homepage',
}: {
  title: string;
  subtitle?: string;
  actionTarget?: string;
  actionLink?: string;
}) => {
  return (
    <div className="relative py-16 max-w-4xl mx-auto flex flex-col justify-center items-center gap-8 text-center">
      <div className="text-center space-y-4">
        <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {title}
        </h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <img
        src="/undraw_empty_re_opql.svg"
        alt="Empty data"
        loading="lazy"
        width="auto"
        height={200}
        className="w-auto h-[200px]"
      />

      <Button asChild>
        <Link to={actionLink}>{actionTarget}</Link>
      </Button>
    </div>
  );
};
