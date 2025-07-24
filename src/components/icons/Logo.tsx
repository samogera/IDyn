export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="80"
      height="32"
      {...props}
    >
      <text
        x="0"
        y="40"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="50"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        IDyn
      </text>
    </svg>
  );
}
