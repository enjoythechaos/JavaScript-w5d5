Function.prototype.myBind = function (context) {
  var fn = this;
  return (function() {
    fn.apply(context);
  });
};

function tellMeThis() {
  console.log(this);
}

var cat = {
  name: "gizmo"
};


var tellBound = tellMeThis.myBind(cat);
tellBound();
tellMeThis();
