function asmModule($a,$b,$c){'use asm';
var a=new $a.Int8Array($c);
var b=new $a.Uint8Array($c);
var c=new $a.Int16Array($c);
var d=new $a.Uint16Array($c);
var e=new $a.Int32Array($c);
var f=new $a.Uint32Array($c);
var g=new $a.Float32Array($c);
var h=new $a.Float64Array($c);
var i=$a.Math.imul;
var j=$a.Math.fround;
var $d=$a.Math.acos;
var $e=$a.Math.asin;
var $f=$a.Math.atan;
var $g=$a.Math.cos;
var $h=$a.Math.sin;
var $i=$a.Math.tan;
var $j=$a.Math.exp;
var $k=$a.Math.log;
var $l=$a.Math.ceil;
var $m=$a.Math.floor;
var $n=$a.Math.sqrt;
var $o=$a.Math.abs;
var $p=$a.Math.min;
var $q=$a.Math.max;
var $r=$a.Math.atan2;
var $s=$a.Math.pow;
var $t=$a.Math.clz32;
function $u(k){
k=k|0;
var l=j(0),m=0.;
k=(a[0]|0,2+(a[0]|0)|0,a[k>>0]|0,-4-(a[0]|0)|0,a[0]=1,3+(a[0]=1)|0,a[k>>0]=1,4+(a[k>>0]=1)|0);
k=(b[0]|0,2+(b[0]|0)|0,b[k>>0]|0,-4-(b[0]|0)|0);
k=(c[0]|0,2+(c[0]|0)|0,c[k>>1]|0,-4-(c[0]|0)|0,c[0]=1,3+(c[0]=1)|0,c[k>>1]=1,4+(c[k>>1]=1)|0);
k=(d[0]|0,2+(d[0]|0)|0,d[k>>1]|0,-4-(d[0]|0)|0);
k=(e[0]|0,2+(e[0]|0)|0,e[k>>2]|0,-4-(e[0]|0)|0,e[0]=1,3+(e[0]=1)|0,e[k>>2]=1,4+(e[k>>2]=1)|0);
k=(e[0]|0,2+(e[0]|0)|0,e[k>>2]|0,-4-(e[0]|0)|0);
l=(+g[0],2.+ +g[0],+g[k>>2],-4.1+ +g[0],g[0]=j(1),j(j(3)+(g[0]=j(1))),g[k>>2]=j(1.4),j(j(4.4)+(g[k>>2]=j(1))));
m=(+h[0],2.1+ +h[0],+h[k>>3],-4.9+ +h[0]);
a[k+1>>0]=1;
k=a[k+1>>0]|0;
m=$l(+g[0]);
m=$m(+g[0]);
m=$n(+g[0]);
m=$o(+g[0]);
a[0]=(k,($v()|0)+1|0);
k=4+(a[0]=(k,($v()|0)+1|0))|0;
a[0]=k+1;
c[0]=k+1;
e[0]=k+1;
h[0]=h[0];
h[0]=+g[0];
g[0]=j(+h[0]);
g[0]=g[0];
k=a[100000000>>0]|0;
k=b[100000000>>0]|0;
k=c[100000000>>1]|0;
k=d[100000000>>1]|0;
k=e[100000000>>2]|0;
k=e[100000000>>2]|0;
l=j(g[100000000>>2]);
m=+h[100000000>>3];
}
function $v(){
return 1;
}
return $u;
}
