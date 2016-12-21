(def nil (fn () ()))

(def + (fn (x y)
       (add x y)))

(def - (fn (x y)
       (sub x y)))

(def * (fn (x y)
       (mult x y)))

(def / (fn (x y)
       (div x y)))

(def % (fn (x y)
       (mod x y)))

(def ! (fn (n)
       (not n)))

(def = (fn (x y)
       (eq x y)))

(def || (fn (x y)
        (or x y)))

(def fib (fn (n)
         (if (or (eq n 0) (eq n 1))
         (n)
         (add (fib (sub n 1)) (fib (sub n 2)))
)))
