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

;; fibonacci
(def fib (fn (n)
  (do
    (def _fib (fn (n a b)
      (if (gt n 0) (_fib (sub n 1) b (add a b)) (a))))
    (_fib n 0 1))
))
