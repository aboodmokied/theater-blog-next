export default function Footer() {
  return (
    <footer className="border-t border-surface-border/70 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-right sm:px-6 lg:px-8">
        <p className="font-display text-base font-extrabold text-foreground">
          مجلس <span className="text-gold">ديجيتال</span>
        </p>
        <p className="text-sm text-muted-2">
          © {new Date().getFullYear()} مجلس ديجيتال. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
