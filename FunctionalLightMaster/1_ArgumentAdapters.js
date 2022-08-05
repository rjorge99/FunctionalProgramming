const unary = (fn) => (arg) => fn(arg);
const flip =
    (fn) =>
    (arg1, arg2, ...args) =>
        fn(arg2, arg1, ...args);
const reverseArgs =
    (fn) =>
    (...args) =>
        fn(...args.reverse());
const apply = (fn) => (args) => fn(...args);
const unapply =
    (fn) =>
    (...args) =>
        fn(args);
const not =
    (fn) =>
    (...args) =>
        !fn(...args);
const when =
    (fn) =>
    (predicate) =>
    (...args) => {
        if (predicate(...args)) return fn(...args);
    };
