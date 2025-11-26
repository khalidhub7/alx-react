// NOTE: revision file — simple and complete

// 1) Persistent mutable value
const ref = useRef(0);

// 2) DOM element access
<input ref={ref} />;

// 3) Mutable value without re-render
countRef.current += 1;

// 4) Track previous value
const prev = useRef();
useEffect(() => {
  prev.current = value;
}, [value]);

// 5) Timers / async handles
const timerRef = useRef();
timerRef.current = setTimeout(() => {}, 1000);

// 6) Stable objects/functions
const configRef = useRef({ theme: "dark" });

// 7) Measure DOM element
const elRef = useRef();
elRef.current.getBoundingClientRect();

// 8) Imperative handle
useImperativeHandle(ref, () => ({
  highlight: () => console.log("highlight"),
}));

// 9) Do NOT update UI with refs → use state instead
