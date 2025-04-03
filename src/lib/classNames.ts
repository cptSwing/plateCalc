export default (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");
