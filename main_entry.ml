#mod_use home/apapacy/projects/bucklescript-addons/bindings/bs-promise/src/bs_promise.mli
open Bs_promise

let	()	=		for	i	=	0	to	10	do
  Js.log	(Fib.fib	i)
done
