const funMap=(fun,...X)=>{
    const Y=X.map(x=>{
        if(x===null)return fun(null);
        if(["number","string","boolean","bigint","undefined"].includes(typeof x))return fun(x);
        if(x instanceof Array)return x.map(n=>funMap(fun,n));
        if(ArrayBuffer.isView(x))return x.map(n=>fun(n));
        if(x instanceof Set)return new Set(funMap(fun,...[...x]));
        if(x instanceof Map)return new Map([...x].map(n=>[n[0],funMap(fun,n[1])]));
        if(x instanceof Matrix){
            return new Matrix(x.rows,x.cols,funMap(x.arr.flat(1)))
        }
        if(x instanceof ZikoMath.Complex){
            const [a,b,z,phi]=[x.a,x.b,x.z,x.phi];
            switch(fun){
                case Math.log:return complex(ln(z),phi);
                case Math.exp:return complex(e(a)*cos(b),e(a)*sin(b));
                case Math.abs:return z;
                case Math.sqrt:return complex(sqrt(z)*cos(phi/2),sqrt(z)*sin(phi/2));
                case Math.cos:return complex(cos(a)*cosh(b),-(sin(a)*sinh(b)));
                case Math.sin:return complex(sin(a)*cosh(b),cos(a)*sinh(b));
                case Math.tan:{
                    const DEN=cos(2*a)+cosh(2*b);
                    return complex(sin(2*a)/DEN,sinh(2*b)/DEN);
                }
                case Math.cosh:return complex(cosh(a)*cos(b),sinh(a)*sin(b));
                case Math.sinh:return complex(sinh(a)*cos(b),cosh(a)*sin(b));
                case Math.tanh:{
                    const DEN=cosh(2*a)+cos(2*b);
                    return complex(sinh(2*a)/DEN,sin(2*b)/DEN)
                }
                //default : return fun(x)
            }
        }
        if(x instanceof Object)return Object.fromEntries(Object.entries(x).map(n=>n=[n[0],funMap(fun,n[1])]))

    });
   return Y.length==1?Y[0]:Y; 
}
