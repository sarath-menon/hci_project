export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-6 pt-4 pb-24">{children}</div>;
}
