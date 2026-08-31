export function IconLink({ network, href }: { network: "instagram" | "linkedin"; href: string }) {
  return (
    <a href={href} aria-label={network === "instagram" ? "Instagram" : "LinkedIn"} className="inline-flex text-ink hover:text-accent">
      {network === "instagram" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2 3.76-2 4.02 0 4.9 2.5 4.9 5.8V21h-4v-5.6c0-1.34-.02-3.07-1.9-3.07-1.9 0-2.2 1.45-2.2 2.97V21h-4z" />
        </svg>
      )}
    </a>
  );
}
