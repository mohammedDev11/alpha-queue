import React from "react";

type PageIntroProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

const PageIntro = ({
  title,
  description,
  actions,
  className = "",
}: PageIntroProps) => {
  return (
    <div
      className={`mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end ${className}`}
    >
      <div className="min-w-0">
        <h1 className="title-xl">{title}</h1>

        {description && <p className="paragraph mt-2">{description}</p>}
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
};

export default PageIntro;
