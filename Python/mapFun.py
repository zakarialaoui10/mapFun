def mapFun(fun,x):
    if isinstance(x,(int,float,complex,str,bool)):return fun(x)
    if isinstance(x,list):return list(map(lambda n:mapFun(fun,n),x))
    if isinstance(x,range):return list(map(lambda n:mapFun(fun,n),x))
    if isinstance(x,tuple):return tuple(map(lambda n:mapFun(fun,n),x))
    if isinstance(x,set):return set(map(lambda n:mapFun(fun,n),x))
    if isinstance(x,frozenset):return frozenset(map(lambda n:mapFun(fun,n),x))
    if isinstance(x,dict):return dict(map(lambda n:(n[0],mapFun(fun,n[1])),x.items()))
    return 0
def mapfun(fun,*y):
    z=list(map(lambda n:mapFun(fun,n),y))
    if len(z)<2:return z[0]
    return z
