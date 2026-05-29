import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface RollLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> {
  href: string;
  className?: string;
  external?: boolean;
  children: ReactNode;
}

function shouldUseNextLink(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function nativeAnchorRel(
  href: string,
  external: boolean | undefined
): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return {};
  }
  const isHttp = /^https?:\/\//i.test(href);
  if (isHttp || external) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}

function mergeClasses(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export default function RollLink({
  href,
  className,
  external,
  children,
  ...rest
}: RollLinkProps) {
  const textLabel =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : null;

  const rollClasses = mergeClasses("roll-link", className);
  const passthroughClasses = mergeClasses("roll-link-passthrough", className);

  if (textLabel === null) {
    if (shouldUseNextLink(href)) {
      return (
        <Link href={href} className={passthroughClasses} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={passthroughClasses}
        {...nativeAnchorRel(href, external)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const inner = (
    <span className="roll-link-track">
      <span className="roll-link-line">{textLabel}</span>
      <span className="roll-link-line" aria-hidden="true">
        {textLabel}
      </span>
    </span>
  );

  if (shouldUseNextLink(href)) {
    return (
      <Link href={href} className={rollClasses} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={rollClasses}
      {...nativeAnchorRel(href, external)}
      {...rest}
    >
      {inner}
    </a>
  );
}
