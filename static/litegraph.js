var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(v, c, q) {
  v != Array.prototype && v != Object.prototype && (v[c] = q.value);
};
$jscomp.getGlobal = function(v) {
  return "undefined" != typeof window && window === v ? v : "undefined" != typeof global && null != global ? global : v;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(v, c, q, m) {
  if (c) {
    q = $jscomp.global;
    v = v.split(".");
    for (m = 0; m < v.length - 1; m++) {
      var g = v[m];
      g in q || (q[g] = {});
      q = q[g];
    }
    v = v[v.length - 1];
    m = q[v];
    c = c(m);
    c != m && null != c && $jscomp.defineProperty(q, v, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.prototype.fill", function(v) {
  return v ? v : function(c, q, m) {
    var g = this.length || 0;
    0 > q && (q = Math.max(0, g + q));
    if (null == m || m > g) {
      m = g;
    }
    m = Number(m);
    0 > m && (m = Math.max(0, g + m));
    for (q = Number(q || 0); q < m; q++) {
      this[q] = c;
    }
    return this;
  };
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var v = 0;
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + v++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var v = $jscomp.global.Symbol.iterator;
  v || (v = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[v] && $jscomp.defineProperty(Array.prototype, v, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(v) {
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < v.length ? {done:!1, value:v[c++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(v) {
  $jscomp.initSymbolIterator();
  v = {next:v};
  v[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return v;
};
$jscomp.iteratorFromArray = function(v, c) {
  $jscomp.initSymbolIterator();
  v instanceof String && (v += "");
  var q = 0, m = {next:function() {
    if (q < v.length) {
      var g = q++;
      return {value:c(g, v[g]), done:!1};
    }
    m.next = function() {
      return {done:!0, value:void 0};
    };
    return m.next();
  }};
  m[Symbol.iterator] = function() {
    return m;
  };
  return m;
};
$jscomp.polyfill("Array.prototype.values", function(v) {
  return v ? v : function() {
    return $jscomp.iteratorFromArray(this, function(c, q) {
      return q;
    });
  };
}, "es8", "es3");
$jscomp.polyfill("Array.prototype.keys", function(v) {
  return v ? v : function() {
    return $jscomp.iteratorFromArray(this, function(c) {
      return c;
    });
  };
}, "es6", "es3");
$jscomp.owns = function(v, c) {
  return Object.prototype.hasOwnProperty.call(v, c);
};
$jscomp.polyfill("Object.values", function(v) {
  return v ? v : function(c) {
    var q = [], m;
    for (m in c) {
      $jscomp.owns(c, m) && q.push(c[m]);
    }
    return q;
  };
}, "es8", "es3");
(function(v) {
  function c(a) {
    e.debug && console.log("Graph created");
    this.list_of_graphcanvas = null;
    this.clear();
    a && this.configure(a);
  }
  function q(a, b, d, h, f, e) {
    this.id = a;
    this.type = b;
    this.origin_id = d;
    this.origin_slot = h;
    this.target_id = f;
    this.target_slot = e;
    this._data = null;
    this._pos = new Float32Array(2);
  }
  function m(a) {
    this._ctor(a);
  }
  function g(a) {
    this._ctor(a);
  }
  function r(a, b) {
    this.offset = new Float32Array([0, 0]);
    this.scale = 1;
    this.max_scale = 10;
    this.min_scale = 0.1;
    this.onredraw = null;
    this.enabled = !0;
    this.last_mouse = [0, 0];
    this.element = null;
    this.visible_area = new Float32Array(4);
    a && (this.element = a, b || this.bindEvents(a));
  }
  function l(a, b, d) {
    d = d || {};
    this.background_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=";
    a && a.constructor === String && (a = document.querySelector(a));
    this.ds = new r;
    this.zoom_modify_alpha = !0;
    this.title_text_font = "" + e.NODE_TEXT_SIZE + "px Arial";
    this.inner_text_font = "normal " + e.NODE_SUBTEXT_SIZE + "px Arial";
    this.node_title_color = e.NODE_TITLE_COLOR;
    this.default_link_color = e.LINK_COLOR;
    this.default_connection_color = {input_off:"#778", input_on:"#7F7", output_off:"#778", output_on:"#7F7"};
    this.highquality_render = !0;
    this.use_gradients = !1;
    this.editor_alpha = 1;
    this.pause_rendering = !1;
    this.clear_background = !0;
    this.read_only = !1;
    this.render_only_selected = !0;
    this.live_mode = !1;
    this.allow_searchbox = this.allow_interaction = this.allow_dragnodes = this.allow_dragcanvas = this.show_info = !0;
    this.drag_mode = this.allow_reconnect_links = !1;
    this.filter = this.dragging_rectangle = null;
    this.always_render_background = !1;
    this.render_canvas_border = this.render_shadows = !0;
    this.render_connections_shadows = !1;
    this.render_connections_border = !0;
    this.render_connection_arrows = this.render_curved_connections = !1;
    this.render_collapsed_slots = !0;
    this.render_execution_order = !1;
    this.render_link_tooltip = this.render_title_colored = !0;
    this.links_render_mode = e.SPLINE_LINK;
    this.canvas_mouse = [0, 0];
    this.onSelectionChange = this.onNodeMoved = this.onDrawLinkTooltip = this.onDrawOverlay = this.onDrawForeground = this.onDrawBackground = this.onMouse = this.onSearchBoxSelection = this.onSearchBox = null;
    this.connections_width = 3;
    this.round_radius = 8;
    this.over_link_center = this.node_widget = this.current_node = null;
    this.last_mouse_position = [0, 0];
    this.visible_area = this.ds.visible_area;
    this.visible_links = [];
    b && b.attachCanvas(this);
    this.setCanvas(a);
    this.clear();
    d.skip_render || this.startRendering();
    this.autoresize = d.autoresize;
    this.canvasOptions = d;
  }
  function C(a, b) {
    return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
  }
  function y(a, b, d, h, f, e) {
    return d < a && d + f > a && h < b && h + e > b ? !0 : !1;
  }
  function w(a, b) {
    var d = a[0] + a[2], h = a[1] + a[3], f = b[1] + b[3];
    return a[0] > b[0] + b[2] || a[1] > f || d < b[0] || h < b[1] ? !1 : !0;
  }
  function E(a, b) {
    function d(a) {
      var d = parseInt(e.style.top);
      e.style.top = (d + a.deltaY * b.scroll_speed).toFixed() + "px";
      a.preventDefault();
      return !0;
    }
    this.options = b = b || {};
    var h = this;
    b.parentMenu && (b.parentMenu.constructor !== this.constructor ? (console.error("parentMenu must be of class ContextMenu, ignoring it"), b.parentMenu = null) : (this.parentMenu = b.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
    var f = null;
    b.event && (f = b.event.constructor.name);
    "MouseEvent" !== f && "CustomEvent" !== f && "PointerEvent" !== f && (console.error("Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it."), b.event = null);
    var e = document.createElement("div");
    e.className = "litegraph litecontextmenu litemenubar-panel";
    b.className && (e.className += " " + b.className);
    e.style.minWidth = 100;
    e.style.minHeight = 100;
    e.style.pointerEvents = "none";
    setTimeout(function() {
      e.style.pointerEvents = "auto";
    }, 100);
    e.addEventListener("mouseup", function(a) {
      a.preventDefault();
      return !0;
    }, !0);
    e.addEventListener("contextmenu", function(a) {
      if (2 != a.button) {
        return !1;
      }
      a.preventDefault();
      return !1;
    }, !0);
    e.addEventListener("mousedown", function(a) {
      if (2 == a.button) {
        return h.close(), a.preventDefault(), !0;
      }
    }, !0);
    b.scroll_speed || (b.scroll_speed = 0.1);
    e.addEventListener("wheel", d, !0);
    e.addEventListener("mousewheel", d, !0);
    this.root = e;
    b.title && (f = document.createElement("div"), f.className = "litemenu-title", f.innerHTML = b.title, e.appendChild(f));
    f = 0;
    for (var c in a) {
      var k = a.constructor == Array ? a[c] : c;
      null != k && k.constructor !== String && (k = void 0 === k.content ? String(k) : k.content);
      this.addItem(k, a[c], b);
      f++;
    }
    e.addEventListener("mouseleave", function(a) {
      h.lock || (e.closing_timer && clearTimeout(e.closing_timer), e.closing_timer = setTimeout(h.close.bind(h, a), 500));
    });
    e.addEventListener("mouseenter", function(a) {
      e.closing_timer && clearTimeout(e.closing_timer);
    });
    a = document;
    b.event && (a = b.event.target.ownerDocument);
    a || (a = document);
    a.fullscreenElement ? a.fullscreenElement.appendChild(e) : a.body.appendChild(e);
    c = b.left || 0;
    a = b.top || 0;
    b.event && (c = b.event.clientX - 10, a = b.event.clientY - 10, b.title && (a -= 20), b.parentMenu && (c = b.parentMenu.root.getBoundingClientRect(), c = c.left + c.width), f = document.body.getBoundingClientRect(), k = e.getBoundingClientRect(), 0 == f.height && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), f.width && c > f.width - k.width - 10 && (c = f.width - k.width - 10), f.height && a > f.height - k.height - 10 && (a = f.height - k.height - 
    10));
    e.style.left = c + "px";
    e.style.top = a + "px";
    b.scale && (e.style.transform = "scale(" + b.scale + ")");
  }
  function z(a) {
    this.points = a;
    this.nearest = this.selected = -1;
    this.size = null;
    this.must_update = !0;
    this.margin = 5;
  }
  var e = v.LiteGraph = {VERSION:0.4, CANVAS_GRID_SIZE:10, NODE_TITLE_HEIGHT:30, NODE_TITLE_TEXT_Y:20, NODE_SLOT_HEIGHT:20, NODE_WIDGET_HEIGHT:20, NODE_WIDTH:140, NODE_MIN_WIDTH:50, NODE_COLLAPSED_RADIUS:10, NODE_COLLAPSED_WIDTH:80, NODE_TITLE_COLOR:"#999", NODE_TEXT_SIZE:14, NODE_TEXT_COLOR:"#AAA", NODE_SUBTEXT_SIZE:12, NODE_DEFAULT_COLOR:"#333", NODE_DEFAULT_BGCOLOR:"rgba(53, 53, 53, 0.6)", NODE_DEFAULT_BOXCOLOR:"#666", NODE_DEFAULT_SHAPE:"box", DEFAULT_SHADOW_COLOR:"rgba(0,0,0,0.5)", DEFAULT_GROUP_FONT:24, 
  WIDGET_BGCOLOR:"rgba(34, 34, 34, 0.8)", WIDGET_OUTLINE_COLOR:"#666", WIDGET_TEXT_COLOR:"#DDD", WIDGET_SECONDARY_TEXT_COLOR:"#999", LINK_COLOR:"#9A9", EVENT_LINK_COLOR:"#A86", CONNECTING_LINK_COLOR:"#AFA", MAX_NUMBER_OF_NODES:1000, DEFAULT_POSITION:[100, 100], VALID_SHAPES:["default", "box", "round", "card"], BOX_SHAPE:1, ROUND_SHAPE:2, CIRCLE_SHAPE:3, CARD_SHAPE:4, ARROW_SHAPE:5, INPUT:1, OUTPUT:2, EVENT:-1, ACTION:-1, ALWAYS:0, ON_EVENT:1, NEVER:2, ON_TRIGGER:3, UP:1, DOWN:2, LEFT:3, RIGHT:4, 
  CENTER:5, STRAIGHT_LINK:0, LINEAR_LINK:1, SPLINE_LINK:2, NORMAL_TITLE:0, NO_TITLE:1, TRANSPARENT_TITLE:2, AUTOHIDE_TITLE:3, proxy:null, node_images_path:"", debug:!1, catch_exceptions:!0, throw_errors:!0, allow_scripts:!1, registered_node_types:{}, node_types_by_file_extension:{}, Nodes:{}, searchbox_extras:{}, registerNodeType:function(a, b) {
    if (!b.prototype) {
      throw "Cannot register a simple object, it must be a class with a prototype";
    }
    b.type = a;
    e.debug && console.log("Node registered: " + a);
    a.split("/");
    var d = b.name, h = a.lastIndexOf("/");
    b.category = a.substr(0, h);
    b.title || (b.title = d);
    if (b.prototype) {
      for (var f in m.prototype) {
        b.prototype[f] || (b.prototype[f] = m.prototype[f]);
      }
    }
    if (h = this.registered_node_types[a]) {
      console.log("replacing node type: " + a);
    } else {
      if (Object.hasOwnProperty(b.prototype, "shape") || Object.defineProperty(b.prototype, "shape", {set:function(a) {
        switch(a) {
          case "default":
            delete this._shape;
            break;
          case "box":
            this._shape = e.BOX_SHAPE;
            break;
          case "round":
            this._shape = e.ROUND_SHAPE;
            break;
          case "circle":
            this._shape = e.CIRCLE_SHAPE;
            break;
          case "card":
            this._shape = e.CARD_SHAPE;
            break;
          default:
            this._shape = a;
        }
      }, get:function(a) {
        return this._shape;
      }, enumerable:!0, configurable:!0}), b.prototype.onPropertyChange && console.warn("LiteGraph node class " + a + " has onPropertyChange method, it must be called onPropertyChanged with d at the end"), b.supported_extensions) {
        for (f in b.supported_extensions) {
          var x = b.supported_extensions[f];
          x && x.constructor === String && (this.node_types_by_file_extension[x.toLowerCase()] = b);
        }
      }
    }
    this.registered_node_types[a] = b;
    b.constructor.name && (this.Nodes[d] = b);
    if (e.onNodeTypeRegistered) {
      e.onNodeTypeRegistered(a, b);
    }
    if (h && e.onNodeTypeReplaced) {
      e.onNodeTypeReplaced(a, b, h);
    }
  }, unregisterNodeType:function(a) {
    var b = a.constructor === String ? this.registered_node_types[a] : a;
    if (!b) {
      throw "node type not found: " + a;
    }
    delete this.registered_node_types[b.type];
    b.constructor.name && delete this.Nodes[b.constructor.name];
  }, wrapFunctionAsNode:function(a, b, d, h, f) {
    for (var x = Array(b.length), c = "", k = e.getParameterNames(b), n = 0; n < k.length; ++n) {
      c += "this.addInput('" + k[n] + "'," + (d && d[n] ? "'" + d[n] + "'" : "0") + ");\n";
    }
    c += "this.addOutput('out'," + (h ? "'" + h + "'" : 0) + ");\n";
    f && (c += "this.properties = " + JSON.stringify(f) + ";\n");
    d = Function(c);
    d.title = a.split("/").pop();
    d.desc = "Generated from " + b.name;
    d.prototype.onExecute = function() {
      for (var a = 0; a < x.length; ++a) {
        x[a] = this.getInputData(a);
      }
      a = b.apply(this, x);
      this.setOutputData(0, a);
    };
    this.registerNodeType(a, d);
  }, addNodeMethod:function(a, b) {
    m.prototype[a] = b;
    for (var d in this.registered_node_types) {
      var h = this.registered_node_types[d];
      h.prototype[a] && (h.prototype["_" + a] = h.prototype[a]);
      h.prototype[a] = b;
    }
  }, createNode:function(a, b, d) {
    var h = this.registered_node_types[a];
    if (!h) {
      return e.debug && console.log('GraphNode type "' + a + '" not registered.'), null;
    }
    b = b || h.title || a;
    var f = null;
    if (e.catch_exceptions) {
      try {
        f = new h(b);
      } catch (G) {
        return console.error(G), null;
      }
    } else {
      f = new h(b);
    }
    f.type = a;
    !f.title && b && (f.title = b);
    f.properties || (f.properties = {});
    f.properties_info || (f.properties_info = []);
    f.flags || (f.flags = {});
    f.size || (f.size = f.computeSize());
    f.pos || (f.pos = e.DEFAULT_POSITION.concat());
    f.mode || (f.mode = e.ALWAYS);
    if (d) {
      for (var x in d) {
        f[x] = d[x];
      }
    }
    return f;
  }, getNodeType:function(a) {
    return this.registered_node_types[a];
  }, getNodeTypesInCategory:function(a, b) {
    var d = [], h;
    for (h in this.registered_node_types) {
      var f = this.registered_node_types[h];
      b && f.filter && f.filter != b || ("" == a ? null == f.category && d.push(f) : f.category == a && d.push(f));
    }
    return d;
  }, getNodeTypesCategories:function(a) {
    var b = {"":1}, d;
    for (d in this.registered_node_types) {
      var h = this.registered_node_types[d];
      !h.category || h.skip_list || a && h.filter != a || (b[h.category] = 1);
    }
    a = [];
    for (d in b) {
      a.push(d);
    }
    return a;
  }, reloadNodes:function(a) {
    var b = document.getElementsByTagName("script"), d = [], h;
    for (h in b) {
      d.push(b[h]);
    }
    b = document.getElementsByTagName("head")[0];
    a = document.location.href + a;
    for (h in d) {
      var f = d[h].src;
      if (f && f.substr(0, a.length) == a) {
        try {
          e.debug && console.log("Reloading: " + f);
          var x = document.createElement("script");
          x.type = "text/javascript";
          x.src = f;
          b.appendChild(x);
          b.removeChild(d[h]);
        } catch (G) {
          if (e.throw_errors) {
            throw G;
          }
          e.debug && console.log("Error while reloading " + f);
        }
      }
    }
    e.debug && console.log("Nodes reloaded");
  }, cloneObject:function(a, b) {
    if (null == a) {
      return null;
    }
    a = JSON.parse(JSON.stringify(a));
    if (!b) {
      return a;
    }
    for (var d in a) {
      b[d] = a[d];
    }
    return b;
  }, isValidConnection:function(a, b) {
    if (!a || !b || a == b || a == e.EVENT && b == e.ACTION) {
      return !0;
    }
    a = String(a);
    b = String(b);
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (-1 == a.indexOf(",") && -1 == b.indexOf(",")) {
      return a == b;
    }
    a = a.split(",");
    b = b.split(",");
    for (var d = 0; d < a.length; ++d) {
      for (var h = 0; h < b.length; ++h) {
        if (a[d] == b[h]) {
          return !0;
        }
      }
    }
    return !1;
  }, registerSearchboxExtra:function(a, b, d) {
    this.searchbox_extras[b.toLowerCase()] = {type:a, desc:b, data:d};
  }, fetchFile:function(a, b, d, h) {
    if (!a) {
      return null;
    }
    b = b || "text";
    if (a.constructor === String) {
      return "http" == a.substr(0, 4) && e.proxy && (a = e.proxy + a.substr(a.indexOf(":") + 3)), fetch(a).then(function(a) {
        if (!a.ok) {
          throw Error("File not found");
        }
        if ("arraybuffer" == b) {
          return a.arrayBuffer();
        }
        if ("text" == b || "string" == b) {
          return a.text();
        }
        if ("json" == b) {
          return a.json();
        }
        if ("blob" == b) {
          return a.blob();
        }
      }).then(function(a) {
        d && d(a);
      }).catch(function(b) {
        console.error("error fetching file:", a);
        h && h(b);
      });
    }
    if (a.constructor === File || a.constructor === Blob) {
      var f = new FileReader;
      f.onload = function(a) {
        a = a.target.result;
        "json" == b && (a = JSON.parse(a));
        d && d(a);
      };
      if ("arraybuffer" == b) {
        return f.readAsArrayBuffer(a);
      }
      if ("text" == b || "json" == b) {
        return f.readAsText(a);
      }
      if ("blob" == b) {
        return f.readAsBinaryString(a);
      }
    }
    return null;
  }};
  e.getTime = "undefined" != typeof performance ? performance.now.bind(performance) : "undefined" != typeof Date && Date.now ? Date.now.bind(Date) : "undefined" != typeof process ? function() {
    var a = process.hrtime();
    return 0.001 * a[0] + 1e-6 * a[1];
  } : function() {
    return (new Date).getTime();
  };
  v.LGraph = e.LGraph = c;
  c.supported_types = ["number", "string", "boolean"];
  c.prototype.getSupportedTypes = function() {
    return this.supported_types || c.supported_types;
  };
  c.STATUS_STOPPED = 1;
  c.STATUS_RUNNING = 2;
  c.prototype.clear = function() {
    this.stop();
    this.status = c.STATUS_STOPPED;
    this.last_link_id = this.last_node_id = 0;
    this._version = -1;
    if (this._nodes) {
      for (var a = 0; a < this._nodes.length; ++a) {
        var b = this._nodes[a];
        if (b.onRemoved) {
          b.onRemoved();
        }
      }
    }
    this._nodes = [];
    this._nodes_by_id = {};
    this._nodes_in_order = [];
    this._nodes_executable = null;
    this._groups = [];
    this.links = {};
    this.iteration = 0;
    this.config = {};
    this.vars = {};
    this.fixedtime = this.runningtime = this.globaltime = 0;
    this.elapsed_time = this.fixedtime_lapse = 0.01;
    this.starttime = this.last_update_time = 0;
    this.catch_errors = !0;
    this.inputs = {};
    this.outputs = {};
    this.change();
    this.sendActionToCanvas("clear");
  };
  c.prototype.attachCanvas = function(a) {
    if (a.constructor != l) {
      throw "attachCanvas expects a LGraphCanvas instance";
    }
    a.graph && a.graph != this && a.graph.detachCanvas(a);
    a.graph = this;
    this.list_of_graphcanvas || (this.list_of_graphcanvas = []);
    this.list_of_graphcanvas.push(a);
  };
  c.prototype.detachCanvas = function(a) {
    if (this.list_of_graphcanvas) {
      var b = this.list_of_graphcanvas.indexOf(a);
      -1 != b && (a.graph = null, this.list_of_graphcanvas.splice(b, 1));
    }
  };
  c.prototype.start = function(a) {
    if (this.status != c.STATUS_RUNNING) {
      this.status = c.STATUS_RUNNING;
      if (this.onPlayEvent) {
        this.onPlayEvent();
      }
      this.sendEventToAllNodes("onStart");
      this.last_update_time = this.starttime = e.getTime();
      a = a || 0;
      var b = this;
      if (0 == a && "undefined" != typeof window && window.requestAnimationFrame) {
        var d = function() {
          if (-1 == b.execution_timer_id) {
            window.requestAnimationFrame(d);
            if (b.onBeforeStep) {
              b.onBeforeStep();
            }
            b.runStep(1, !this.catch_errors);
            if (b.onAfterStep) {
              b.onAfterStep();
            }
          }
        };
        this.execution_timer_id = -1;
        d();
      } else {
        this.execution_timer_id = setInterval(function() {
          if (b.onBeforeStep) {
            b.onBeforeStep();
          }
          b.runStep(1, !this.catch_errors);
          if (b.onAfterStep) {
            b.onAfterStep();
          }
        }, a);
      }
    }
  };
  c.prototype.stop = function() {
    if (this.status != c.STATUS_STOPPED) {
      this.status = c.STATUS_STOPPED;
      if (this.onStopEvent) {
        this.onStopEvent();
      }
      null != this.execution_timer_id && (-1 != this.execution_timer_id && clearInterval(this.execution_timer_id), this.execution_timer_id = null);
      this.sendEventToAllNodes("onStop");
    }
  };
  c.prototype.runStep = function(a, b, d) {
    a = a || 1;
    var h = e.getTime();
    this.globaltime = 0.001 * (h - this.starttime);
    var f = this._nodes_executable ? this._nodes_executable : this._nodes;
    if (f) {
      d = d || f.length;
      if (b) {
        for (var x = 0; x < a; x++) {
          for (var c = 0; c < d; ++c) {
            var k = f[c];
            if (k.mode == e.ALWAYS && k.onExecute) {
              k.onExecute();
            }
          }
          this.fixedtime += this.fixedtime_lapse;
          if (this.onExecuteStep) {
            this.onExecuteStep();
          }
        }
        if (this.onAfterExecute) {
          this.onAfterExecute();
        }
      } else {
        try {
          for (x = 0; x < a; x++) {
            for (c = 0; c < d; ++c) {
              if (k = f[c], k.mode == e.ALWAYS && k.onExecute) {
                k.onExecute();
              }
            }
            this.fixedtime += this.fixedtime_lapse;
            if (this.onExecuteStep) {
              this.onExecuteStep();
            }
          }
          if (this.onAfterExecute) {
            this.onAfterExecute();
          }
          this.errors_in_execution = !1;
        } catch (J) {
          this.errors_in_execution = !0;
          if (e.throw_errors) {
            throw J;
          }
          e.debug && console.log("Error during execution: " + J);
          this.stop();
        }
      }
      a = e.getTime();
      h = a - h;
      0 == h && (h = 1);
      this.execution_time = 0.001 * h;
      this.globaltime += 0.001 * h;
      this.iteration += 1;
      this.elapsed_time = 0.001 * (a - this.last_update_time);
      this.last_update_time = a;
    }
  };
  c.prototype.updateExecutionOrder = function() {
    this._nodes_in_order = this.computeExecutionOrder(!1);
    this._nodes_executable = [];
    for (var a = 0; a < this._nodes_in_order.length; ++a) {
      this._nodes_in_order[a].onExecute && this._nodes_executable.push(this._nodes_in_order[a]);
    }
  };
  c.prototype.computeExecutionOrder = function(a, b) {
    for (var d = [], h = [], f = {}, x = {}, c = {}, k = 0, n = this._nodes.length; k < n; ++k) {
      var p = this._nodes[k];
      if (!a || p.onExecute) {
        f[p.id] = p;
        var l = 0;
        if (p.inputs) {
          for (var t = 0, g = p.inputs.length; t < g; t++) {
            p.inputs[t] && null != p.inputs[t].link && (l += 1);
          }
        }
        0 == l ? (h.push(p), b && (p._level = 1)) : (b && (p._level = 0), c[p.id] = l);
      }
    }
    for (; 0 != h.length;) {
      if (p = h.shift(), d.push(p), delete f[p.id], p.outputs) {
        for (k = 0; k < p.outputs.length; k++) {
          if (a = p.outputs[k], null != a && null != a.links && 0 != a.links.length) {
            for (t = 0; t < a.links.length; t++) {
              (n = this.links[a.links[t]]) && !x[n.id] && (l = this.getNodeById(n.target_id), null == l ? x[n.id] = !0 : (b && (!l._level || l._level <= p._level) && (l._level = p._level + 1), x[n.id] = !0, --c[l.id], 0 == c[l.id] && h.push(l)));
            }
          }
        }
      }
    }
    for (k in f) {
      d.push(f[k]);
    }
    d.length != this._nodes.length && e.debug && console.warn("something went wrong, nodes missing");
    n = d.length;
    for (k = 0; k < n; ++k) {
      d[k].order = k;
    }
    d = d.sort(function(a, b) {
      var d = a.constructor.priority || a.priority || 0, f = b.constructor.priority || b.priority || 0;
      return d == f ? a.order - b.order : d - f;
    });
    for (k = 0; k < n; ++k) {
      d[k].order = k;
    }
    return d;
  };
  c.prototype.getAncestors = function(a) {
    for (var b = [], d = [a], h = {}; d.length;) {
      var f = d.shift();
      if (f.inputs) {
        h[f.id] || f == a || (h[f.id] = !0, b.push(f));
        for (var e = 0; e < f.inputs.length; ++e) {
          var c = f.getInputNode(e);
          c && -1 == b.indexOf(c) && d.push(c);
        }
      }
    }
    b.sort(function(a, b) {
      return a.order - b.order;
    });
    return b;
  };
  c.prototype.arrange = function(a) {
    a = a || 100;
    for (var b = this.computeExecutionOrder(!1, !0), d = [], h = 0; h < b.length; ++h) {
      var f = b[h], x = f._level || 1;
      d[x] || (d[x] = []);
      d[x].push(f);
    }
    b = a;
    for (h = 0; h < d.length; ++h) {
      if (x = d[h]) {
        for (var c = 100, k = a + e.NODE_TITLE_HEIGHT, n = 0; n < x.length; ++n) {
          f = x[n], f.pos[0] = b, f.pos[1] = k, f.size[0] > c && (c = f.size[0]), k += f.size[1] + a + e.NODE_TITLE_HEIGHT;
        }
        b += c + a;
      }
    }
    this.setDirtyCanvas(!0, !0);
  };
  c.prototype.getTime = function() {
    return this.globaltime;
  };
  c.prototype.getFixedTime = function() {
    return this.fixedtime;
  };
  c.prototype.getElapsedTime = function() {
    return this.elapsed_time;
  };
  c.prototype.sendEventToAllNodes = function(a, b, d) {
    d = d || e.ALWAYS;
    var h = this._nodes_in_order ? this._nodes_in_order : this._nodes;
    if (h) {
      for (var f = 0, x = h.length; f < x; ++f) {
        var c = h[f];
        if (c.constructor === e.Subgraph && "onExecute" != a) {
          c.mode == d && c.sendEventToAllNodes(a, b, d);
        } else {
          if (c[a] && c.mode == d) {
            if (void 0 === b) {
              c[a]();
            } else {
              if (b && b.constructor === Array) {
                c[a].apply(c, b);
              } else {
                c[a](b);
              }
            }
          }
        }
      }
    }
  };
  c.prototype.sendActionToCanvas = function(a, b) {
    if (this.list_of_graphcanvas) {
      for (var d = 0; d < this.list_of_graphcanvas.length; ++d) {
        var h = this.list_of_graphcanvas[d];
        h[a] && h[a].apply(h, b);
      }
    }
  };
  c.prototype.add = function(a, b) {
    if (a) {
      if (console.log("-> Adding node", a), a.constructor === g) {
        this._groups.push(a), this.setDirtyCanvas(!0), this.change(), a.graph = this, this._version++;
      } else {
        -1 != a.id && null != this._nodes_by_id[a.id] && (console.warn("LiteGraph: there is already a node with this ID, changing it"), a.id = ++this.last_node_id);
        if (this._nodes.length >= e.MAX_NUMBER_OF_NODES) {
          throw "LiteGraph: max number of nodes in a graph reached";
        }
        null == a.id || -1 == a.id ? a.id = ++this.last_node_id : this.last_node_id < a.id && (this.last_node_id = a.id);
        a.graph = this;
        this._version++;
        this._nodes.push(a);
        this._nodes_by_id[a.id] = a;
        if (a.onAdded) {
          a.onAdded(this);
        }
        this.config.align_to_grid && a.alignToGrid();
        b || this.updateExecutionOrder();
        if (this.onNodeAdded) {
          this.onNodeAdded(a);
        }
        this.setDirtyCanvas(!0);
        this.change();
        return a;
      }
    }
  };
  c.prototype.remove = function(a) {
    if (a.constructor === e.LGraphGroup) {
      var b = this._groups.indexOf(a);
      -1 != b && this._groups.splice(b, 1);
      a.graph = null;
      this._version++;
      this.setDirtyCanvas(!0, !0);
      this.change();
    } else {
      if (null != this._nodes_by_id[a.id] && !a.ignore_remove) {
        if (a.inputs) {
          for (b = 0; b < a.inputs.length; b++) {
            var d = a.inputs[b];
            null != d.link && a.disconnectInput(b);
          }
        }
        if (a.outputs) {
          for (b = 0; b < a.outputs.length; b++) {
            d = a.outputs[b], null != d.links && d.links.length && a.disconnectOutput(b);
          }
        }
        if (a.onRemoved) {
          a.onRemoved();
        }
        a.graph = null;
        this._version++;
        if (this.list_of_graphcanvas) {
          for (b = 0; b < this.list_of_graphcanvas.length; ++b) {
            d = this.list_of_graphcanvas[b], d.selected_nodes[a.id] && delete d.selected_nodes[a.id], d.node_dragged == a && (d.node_dragged = null);
          }
        }
        b = this._nodes.indexOf(a);
        -1 != b && this._nodes.splice(b, 1);
        delete this._nodes_by_id[a.id];
        if (this.onNodeRemoved) {
          this.onNodeRemoved(a);
        }
        this.setDirtyCanvas(!0, !0);
        this.change();
        this.updateExecutionOrder();
      }
    }
  };
  c.prototype.getNodeById = function(a) {
    return null == a ? null : this._nodes_by_id[a];
  };
  c.prototype.findNodesByClass = function(a, b) {
    b = b || [];
    for (var d = b.length = 0, h = this._nodes.length; d < h; ++d) {
      this._nodes[d].constructor === a && b.push(this._nodes[d]);
    }
    return b;
  };
  c.prototype.findNodesByType = function(a, b) {
    a = a.toLowerCase();
    b = b || [];
    for (var d = b.length = 0, h = this._nodes.length; d < h; ++d) {
      this._nodes[d].type.toLowerCase() == a && b.push(this._nodes[d]);
    }
    return b;
  };
  c.prototype.findNodeByTitle = function(a) {
    for (var b = 0, d = this._nodes.length; b < d; ++b) {
      if (this._nodes[b].title == a) {
        return this._nodes[b];
      }
    }
    return null;
  };
  c.prototype.findNodesByTitle = function(a) {
    for (var b = [], d = 0, h = this._nodes.length; d < h; ++d) {
      this._nodes[d].title == a && b.push(this._nodes[d]);
    }
    return b;
  };
  c.prototype.getNodeOnPos = function(a, b, d, h) {
    d = d || this._nodes;
    for (var f = d.length - 1; 0 <= f; f--) {
      var e = d[f];
      if (e.isPointInside(a, b, h)) {
        return e;
      }
    }
    return null;
  };
  c.prototype.getGroupOnPos = function(a, b) {
    for (var d = this._groups.length - 1; 0 <= d; d--) {
      var h = this._groups[d];
      if (h.isPointInside(a, b, 2, !0)) {
        return h;
      }
    }
    return null;
  };
  c.prototype.checkNodeTypes = function() {
    for (var a = 0; a < this._nodes.length; a++) {
      var b = this._nodes[a];
      if (b.constructor != e.registered_node_types[b.type]) {
        console.log("node being replaced by newer version: " + b.type);
        var d = e.createNode(b.type);
        this._nodes[a] = d;
        d.configure(b.serialize());
        d.graph = this;
        this._nodes_by_id[d.id] = d;
        b.inputs && (d.inputs = b.inputs.concat());
        b.outputs && (d.outputs = b.outputs.concat());
      }
    }
    this.updateExecutionOrder();
  };
  c.prototype.onAction = function(a, b) {
    this._input_nodes = this.findNodesByClass(e.GraphInput, this._input_nodes);
    for (var d = 0; d < this._input_nodes.length; ++d) {
      var h = this._input_nodes[d];
      if (h.properties.name == a) {
        h.onAction(a, b);
        break;
      }
    }
  };
  c.prototype.trigger = function(a, b) {
    if (this.onTrigger) {
      this.onTrigger(a, b);
    }
  };
  c.prototype.addInput = function(a, b, d) {
    if (!this.inputs[a]) {
      this.inputs[a] = {name:a, type:b, value:d};
      this._version++;
      if (this.onInputAdded) {
        this.onInputAdded(a, b);
      }
      if (this.onInputsOutputsChange) {
        this.onInputsOutputsChange();
      }
    }
  };
  c.prototype.setInputData = function(a, b) {
    if (a = this.inputs[a]) {
      a.value = b;
    }
  };
  c.prototype.getInputData = function(a) {
    return (a = this.inputs[a]) ? a.value : null;
  };
  c.prototype.renameInput = function(a, b) {
    if (b != a) {
      if (!this.inputs[a]) {
        return !1;
      }
      if (this.inputs[b]) {
        return console.error("there is already one input with that name"), !1;
      }
      this.inputs[b] = this.inputs[a];
      delete this.inputs[a];
      this._version++;
      if (this.onInputRenamed) {
        this.onInputRenamed(a, b);
      }
      if (this.onInputsOutputsChange) {
        this.onInputsOutputsChange();
      }
    }
  };
  c.prototype.changeInputType = function(a, b) {
    if (!this.inputs[a]) {
      return !1;
    }
    if (!this.inputs[a].type || String(this.inputs[a].type).toLowerCase() != String(b).toLowerCase()) {
      if (this.inputs[a].type = b, this._version++, this.onInputTypeChanged) {
        this.onInputTypeChanged(a, b);
      }
    }
  };
  c.prototype.removeInput = function(a) {
    if (!this.inputs[a]) {
      return !1;
    }
    delete this.inputs[a];
    this._version++;
    if (this.onInputRemoved) {
      this.onInputRemoved(a);
    }
    if (this.onInputsOutputsChange) {
      this.onInputsOutputsChange();
    }
    return !0;
  };
  c.prototype.addOutput = function(a, b, d) {
    this.outputs[a] = {name:a, type:b, value:d};
    this._version++;
    if (this.onOutputAdded) {
      this.onOutputAdded(a, b);
    }
    if (this.onInputsOutputsChange) {
      this.onInputsOutputsChange();
    }
  };
  c.prototype.setOutputData = function(a, b) {
    if (a = this.outputs[a]) {
      a.value = b;
    }
  };
  c.prototype.getOutputData = function(a) {
    return (a = this.outputs[a]) ? a.value : null;
  };
  c.prototype.renameOutput = function(a, b) {
    if (!this.outputs[a]) {
      return !1;
    }
    if (this.outputs[b]) {
      return console.error("there is already one output with that name"), !1;
    }
    this.outputs[b] = this.outputs[a];
    delete this.outputs[a];
    this._version++;
    if (this.onOutputRenamed) {
      this.onOutputRenamed(a, b);
    }
    if (this.onInputsOutputsChange) {
      this.onInputsOutputsChange();
    }
  };
  c.prototype.changeOutputType = function(a, b) {
    if (!this.outputs[a]) {
      return !1;
    }
    if (!this.outputs[a].type || String(this.outputs[a].type).toLowerCase() != String(b).toLowerCase()) {
      if (this.outputs[a].type = b, this._version++, this.onOutputTypeChanged) {
        this.onOutputTypeChanged(a, b);
      }
    }
  };
  c.prototype.removeOutput = function(a) {
    if (!this.outputs[a]) {
      return !1;
    }
    delete this.outputs[a];
    this._version++;
    if (this.onOutputRemoved) {
      this.onOutputRemoved(a);
    }
    if (this.onInputsOutputsChange) {
      this.onInputsOutputsChange();
    }
    return !0;
  };
  c.prototype.triggerInput = function(a, b) {
    a = this.findNodesByTitle(a);
    for (var d = 0; d < a.length; ++d) {
      a[d].onTrigger(b);
    }
  };
  c.prototype.setCallback = function(a, b) {
    a = this.findNodesByTitle(a);
    for (var d = 0; d < a.length; ++d) {
      a[d].setTrigger(b);
    }
  };
  c.prototype.connectionChange = function(a, b) {
    this.updateExecutionOrder();
    if (this.onConnectionChange) {
      this.onConnectionChange(a);
    }
    this._version++;
    this.sendActionToCanvas("onConnectionChange");
  };
  c.prototype.isLive = function() {
    if (!this.list_of_graphcanvas) {
      return !1;
    }
    for (var a = 0; a < this.list_of_graphcanvas.length; ++a) {
      if (this.list_of_graphcanvas[a].live_mode) {
        return !0;
      }
    }
    return !1;
  };
  c.prototype.clearTriggeredSlots = function() {
    for (var a in this.links) {
      var b = this.links[a];
      b && b._last_time && (b._last_time = 0);
    }
  };
  c.prototype.change = function() {
    e.debug && console.log("Graph changed");
    this.sendActionToCanvas("setDirty", [!0, !0]);
    if (this.on_change) {
      this.on_change(this);
    }
  };
  c.prototype.setDirtyCanvas = function(a, b) {
    this.sendActionToCanvas("setDirty", [a, b]);
  };
  c.prototype.removeLink = function(a) {
    if (a = this.links[a]) {
      var b = this.getNodeById(a.target_id);
      b && b.disconnectInput(a.target_slot);
    }
  };
  c.prototype.serialize = function() {
    for (var a = [], b = 0, d = this._nodes.length; b < d; ++b) {
      a.push(this._nodes[b].serialize());
    }
    d = [];
    for (b in this.links) {
      var h = this.links[b];
      if (!h.serialize) {
        console.warn("weird LLink bug, link info is not a LLink but a regular object");
        var f = new q;
        for (b in h) {
          f[b] = h[b];
        }
        h = this.links[b] = f;
      }
      d.push(h.serialize());
    }
    h = [];
    for (b = 0; b < this._groups.length; ++b) {
      h.push(this._groups[b].serialize());
    }
    return {last_node_id:this.last_node_id, last_link_id:this.last_link_id, nodes:a, links:d, groups:h, config:this.config, version:e.VERSION};
  };
  c.prototype.configure = function(a, b) {
    if (a) {
      b || this.clear();
      b = a.nodes;
      if (a.links && a.links.constructor === Array) {
        for (var d = [], h = 0; h < a.links.length; ++h) {
          var f = a.links[h];
          if (f) {
            var c = new q;
            c.configure(f);
            d[c.id] = c;
          } else {
            console.warn("serialized graph link data contains errors, skipping.");
          }
        }
        a.links = d;
      }
      for (h in a) {
        "nodes" != h && "groups" != h && (this[h] = a[h]);
      }
      d = !1;
      this._nodes = [];
      if (b) {
        h = 0;
        for (f = b.length; h < f; ++h) {
          c = b[h];
          var k = e.createNode(c.type, c.title);
          k || (e.debug && console.log("Node not found or has errors: " + c.type), k = new m, k.last_serialization = c, d = k.has_errors = !0);
          k.id = c.id;
          this.add(k, !0);
        }
        h = 0;
        for (f = b.length; h < f; ++h) {
          c = b[h], (k = this.getNodeById(c.id)) && k.configure(c);
        }
      }
      this._groups.length = 0;
      if (a.groups) {
        for (h = 0; h < a.groups.length; ++h) {
          b = new e.LGraphGroup, b.configure(a.groups[h]), this.add(b);
        }
      }
      this.updateExecutionOrder();
      this._version++;
      this.setDirtyCanvas(!0, !0);
      return d;
    }
  };
  c.prototype.load = function(a) {
    var b = this, d = new XMLHttpRequest;
    d.open("GET", a, !0);
    d.send(null);
    d.onload = function(a) {
      200 !== d.status ? console.error("Error loading graph:", d.status, d.response) : (a = JSON.parse(d.response), b.configure(a));
    };
    d.onerror = function(a) {
      console.error("Error loading graph:", a);
    };
  };
  c.prototype.onNodeTrace = function(a, b, d) {
  };
  q.prototype.configure = function(a) {
    a.constructor === Array ? (this.id = a[0], this.origin_id = a[1], this.origin_slot = a[2], this.target_id = a[3], this.target_slot = a[4], this.type = a[5]) : (this.id = a.id, this.type = a.type, this.origin_id = a.origin_id, this.origin_slot = a.origin_slot, this.target_id = a.target_id, this.target_slot = a.target_slot);
  };
  q.prototype.serialize = function() {
    return [this.id, this.origin_id, this.origin_slot, this.target_id, this.target_slot, this.type];
  };
  e.LLink = q;
  v.LGraphNode = e.LGraphNode = m;
  m.prototype._ctor = function(a) {
    this.title = a || "Unnamed";
    this.size = [e.NODE_WIDTH, 60];
    this.graph = null;
    this._pos = new Float32Array(10, 10);
    Object.defineProperty(this, "pos", {set:function(a) {
      !a || 2 > a.length || (this._pos[0] = a[0], this._pos[1] = a[1]);
    }, get:function() {
      return this._pos;
    }, enumerable:!0});
    this.id = -1;
    this.type = null;
    this.inputs = [];
    this.outputs = [];
    this.connections = [];
    this.properties = {};
    this.properties_info = [];
    this.flags = {};
  };
  m.prototype.configure = function(a) {
    this.graph && this.graph._version++;
    for (var b in a) {
      if ("properties" == b) {
        for (var d in a.properties) {
          if (this.properties[d] = a.properties[d], this.onPropertyChanged) {
            this.onPropertyChanged(d, a.properties[d]);
          }
        }
      } else {
        null != a[b] && ("object" == typeof a[b] ? this[b] && this[b].configure ? this[b].configure(a[b]) : this[b] = e.cloneObject(a[b], this[b]) : this[b] = a[b]);
      }
    }
    a.title || (this.title = this.constructor.title);
    if (this.onConnectionsChange) {
      if (this.inputs) {
        for (d = 0; d < this.inputs.length; ++d) {
          b = this.inputs[d];
          var h = this.graph ? this.graph.links[b.link] : null;
          this.onConnectionsChange(e.INPUT, d, !0, h, b);
        }
      }
      if (this.outputs) {
        for (d = 0; d < this.outputs.length; ++d) {
          var f = this.outputs[d];
          if (f.links) {
            for (b = 0; b < f.links.length; ++b) {
              h = this.graph ? this.graph.links[f.links[b]] : null, this.onConnectionsChange(e.OUTPUT, d, !0, h, f);
            }
          }
        }
      }
    }
    if (this.widgets) {
      for (d = 0; d < this.widgets.length; ++d) {
        (b = this.widgets[d]) && b.options && b.options.property && this.properties[b.options.property] && (b.value = JSON.parse(JSON.stringify(this.properties[b.options.property])));
      }
      if (a.widgets_values) {
        for (d = 0; d < a.widgets_values.length; ++d) {
          this.widgets[d] && (this.widgets[d].value = a.widgets_values[d]);
        }
      }
    }
    if (this.onConfigure) {
      this.onConfigure(a);
    }
  };
  m.prototype.serialize = function() {
    var a = {id:this.id, type:this.type, pos:this.pos, size:this.size, flags:e.cloneObject(this.flags), order:this.order, mode:this.mode};
    if (this.constructor === m && this.last_serialization) {
      return this.last_serialization;
    }
    this.inputs && (a.inputs = this.inputs);
    if (this.outputs) {
      for (var b = 0; b < this.outputs.length; b++) {
        delete this.outputs[b]._data;
      }
      a.outputs = this.outputs;
    }
    this.title && this.title != this.constructor.title && (a.title = this.title);
    this.properties && (a.properties = e.cloneObject(this.properties));
    if (this.widgets && this.serialize_widgets) {
      for (a.widgets_values = [], b = 0; b < this.widgets.length; ++b) {
        a.widgets_values[b] = this.widgets[b] ? this.widgets[b].value : null;
      }
    }
    a.type || (a.type = this.constructor.type);
    this.color && (a.color = this.color);
    this.bgcolor && (a.bgcolor = this.bgcolor);
    this.boxcolor && (a.boxcolor = this.boxcolor);
    this.shape && (a.shape = this.shape);
    this.onSerialize && this.onSerialize(a) && console.warn("node onSerialize shouldnt return anything, data should be stored in the object pass in the first parameter");
    return a;
  };
  m.prototype.clone = function() {
    var a = e.createNode(this.type);
    if (!a) {
      return null;
    }
    var b = e.cloneObject(this.serialize());
    if (b.inputs) {
      for (var d = 0; d < b.inputs.length; ++d) {
        b.inputs[d].link = null;
      }
    }
    if (b.outputs) {
      for (d = 0; d < b.outputs.length; ++d) {
        b.outputs[d].links && (b.outputs[d].links.length = 0);
      }
    }
    delete b.id;
    a.configure(b);
    return a;
  };
  m.prototype.toString = function() {
    return JSON.stringify(this.serialize());
  };
  m.prototype.getTitle = function() {
    return this.title || this.constructor.title;
  };
  m.prototype.setProperty = function(a, b) {
    this.properties || (this.properties = {});
    if (b !== this.properties[a]) {
      var d = this.properties[a];
      this.properties[a] = b;
      this.onPropertyChanged && !1 === this.onPropertyChanged(a, b, d) && (this.properties[a] = d);
      if (this.widgets) {
        for (d = 0; d < this.widgets.length; ++d) {
          var h = this.widgets[d];
          if (h && h.options.property == a) {
            h.value = b;
            break;
          }
        }
      }
    }
  };
  m.prototype.setOutputData = function(a, b) {
    if (this.outputs && !(-1 == a || a >= this.outputs.length)) {
      var d = this.outputs[a];
      if (d && (d._data = b, this.outputs[a].links)) {
        for (d = 0; d < this.outputs[a].links.length; d++) {
          var h = this.graph.links[this.outputs[a].links[d]];
          h && (h.data = b);
        }
      }
    }
  };
  m.prototype.setOutputDataType = function(a, b) {
    if (this.outputs && !(-1 == a || a >= this.outputs.length)) {
      var d = this.outputs[a];
      if (d && (d.type = b, this.outputs[a].links)) {
        for (d = 0; d < this.outputs[a].links.length; d++) {
          this.graph.links[this.outputs[a].links[d]].type = b;
        }
      }
    }
  };
  m.prototype.getInputData = function(a, b) {
    if (this.inputs && !(a >= this.inputs.length || null == this.inputs[a].link)) {
      a = this.graph.links[this.inputs[a].link];
      if (!a) {
        return null;
      }
      if (!b) {
        return a.data;
      }
      b = this.graph.getNodeById(a.origin_id);
      if (!b) {
        return a.data;
      }
      if (b.updateOutputData) {
        b.updateOutputData(a.origin_slot);
      } else {
        if (b.onExecute) {
          b.onExecute();
        }
      }
      return a.data;
    }
  };
  m.prototype.getInputDataType = function(a) {
    if (!this.inputs || a >= this.inputs.length || null == this.inputs[a].link) {
      return null;
    }
    a = this.graph.links[this.inputs[a].link];
    if (!a) {
      return null;
    }
    var b = this.graph.getNodeById(a.origin_id);
    return b ? (a = b.outputs[a.origin_slot]) ? a.type : null : a.type;
  };
  m.prototype.getInputDataByName = function(a, b) {
    a = this.findInputSlot(a);
    return -1 == a ? null : this.getInputData(a, b);
  };
  m.prototype.isInputConnected = function(a) {
    return this.inputs ? a < this.inputs.length && null != this.inputs[a].link : !1;
  };
  m.prototype.getInputInfo = function(a) {
    return this.inputs ? a < this.inputs.length ? this.inputs[a] : null : null;
  };
  m.prototype.getInputNode = function(a) {
    if (!this.inputs || a >= this.inputs.length) {
      return null;
    }
    a = this.inputs[a];
    return a && null !== a.link ? (a = this.graph.links[a.link]) ? this.graph.getNodeById(a.origin_id) : null : null;
  };
  m.prototype.getInputOrProperty = function(a) {
    if (!this.inputs || !this.inputs.length) {
      return this.properties ? this.properties[a] : null;
    }
    for (var b = 0, d = this.inputs.length; b < d; ++b) {
      var h = this.inputs[b];
      if (a == h.name && null != h.link && (h = this.graph.links[h.link])) {
        return h.data;
      }
    }
    return this.properties[a];
  };
  m.prototype.getOutputData = function(a) {
    return !this.outputs || a >= this.outputs.length ? null : this.outputs[a]._data;
  };
  m.prototype.getOutputInfo = function(a) {
    return this.outputs ? a < this.outputs.length ? this.outputs[a] : null : null;
  };
  m.prototype.isOutputConnected = function(a) {
    return this.outputs ? a < this.outputs.length && this.outputs[a].links && this.outputs[a].links.length : !1;
  };
  m.prototype.isAnyOutputConnected = function() {
    if (!this.outputs) {
      return !1;
    }
    for (var a = 0; a < this.outputs.length; ++a) {
      if (this.outputs[a].links && this.outputs[a].links.length) {
        return !0;
      }
    }
    return !1;
  };
  m.prototype.getOutputNodes = function(a) {
    if (!this.outputs || 0 == this.outputs.length || a >= this.outputs.length) {
      return null;
    }
    a = this.outputs[a];
    if (!a.links || 0 == a.links.length) {
      return null;
    }
    for (var b = [], d = 0; d < a.links.length; d++) {
      var h = this.graph.links[a.links[d]];
      h && (h = this.graph.getNodeById(h.target_id)) && b.push(h);
    }
    return b;
  };
  m.prototype.trigger = function(a, b) {
    if (this.outputs && this.outputs.length) {
      this.graph && (this.graph._last_trigger_time = e.getTime());
      for (var d = 0; d < this.outputs.length; ++d) {
        var h = this.outputs[d];
        !h || h.type !== e.EVENT || a && h.name != a || this.triggerSlot(d, b);
      }
    }
  };
  m.prototype.triggerSlot = function(a, b, d) {
    if (this.outputs && (a = this.outputs[a]) && (a = a.links) && a.length) {
      this.graph && (this.graph._last_trigger_time = e.getTime());
      for (var h = 0; h < a.length; ++h) {
        var f = a[h];
        if (null == d || d == f) {
          var c = this.graph.links[a[h]];
          if (c && (c._last_time = e.getTime(), f = this.graph.getNodeById(c.target_id))) {
            if (c = f.inputs[c.target_slot], f.onAction) {
              f.onAction(c.name, b);
            } else {
              if (f.mode === e.ON_TRIGGER && f.onExecute) {
                f.onExecute(b);
              }
            }
          }
        }
      }
    }
  };
  m.prototype.clearTriggeredSlot = function(a, b) {
    if (this.outputs && (a = this.outputs[a]) && (a = a.links) && a.length) {
      for (var d = 0; d < a.length; ++d) {
        var h = a[d];
        if (null == b || b == h) {
          if (h = this.graph.links[a[d]]) {
            h._last_time = 0;
          }
        }
      }
    }
  };
  m.prototype.addProperty = function(a, b, d, h) {
    d = {name:a, type:d, default_value:b};
    if (h) {
      for (var f in h) {
        d[f] = h[f];
      }
    }
    this.properties_info || (this.properties_info = []);
    this.properties_info.push(d);
    this.properties || (this.properties = {});
    this.properties[a] = b;
    return d;
  };
  m.prototype.addOutput = function(a, b, d) {
    a = {name:a, type:b, links:null};
    if (d) {
      for (var h in d) {
        a[h] = d[h];
      }
    }
    this.outputs || (this.outputs = []);
    this.outputs.push(a);
    if (this.onOutputAdded) {
      this.onOutputAdded(a);
    }
    this.size = this.computeSize();
    this.setDirtyCanvas(!0, !0);
    return a;
  };
  m.prototype.addOutputs = function(a) {
    for (var b = 0; b < a.length; ++b) {
      var d = a[b], h = {name:d[0], type:d[1], link:null};
      if (a[2]) {
        for (var f in d[2]) {
          h[f] = d[2][f];
        }
      }
      this.outputs || (this.outputs = []);
      this.outputs.push(h);
      if (this.onOutputAdded) {
        this.onOutputAdded(h);
      }
    }
    this.size = this.computeSize();
    this.setDirtyCanvas(!0, !0);
  };
  m.prototype.removeOutput = function(a) {
    this.disconnectOutput(a);
    this.outputs.splice(a, 1);
    for (var b = a; b < this.outputs.length; ++b) {
      if (this.outputs[b] && this.outputs[b].links) {
        for (var d = this.outputs[b].links, h = 0; h < d.length; ++h) {
          var f = this.graph.links[d[h]];
          f && --f.origin_slot;
        }
      }
    }
    this.size = this.computeSize();
    if (this.onOutputRemoved) {
      this.onOutputRemoved(a);
    }
    this.setDirtyCanvas(!0, !0);
  };
  m.prototype.addInput = function(a, b, d) {
    a = {name:a, type:b || 0, link:null};
    if (d) {
      for (var h in d) {
        a[h] = d[h];
      }
    }
    this.inputs || (this.inputs = []);
    this.inputs.push(a);
    this.size = this.computeSize();
    if (this.onInputAdded) {
      this.onInputAdded(a);
    }
    this.setDirtyCanvas(!0, !0);
    return a;
  };
  m.prototype.addInputs = function(a) {
    for (var b = 0; b < a.length; ++b) {
      var d = a[b], h = {name:d[0], type:d[1], link:null};
      if (a[2]) {
        for (var f in d[2]) {
          h[f] = d[2][f];
        }
      }
      this.inputs || (this.inputs = []);
      this.inputs.push(h);
      if (this.onInputAdded) {
        this.onInputAdded(h);
      }
    }
    this.size = this.computeSize();
    this.setDirtyCanvas(!0, !0);
  };
  m.prototype.removeInput = function(a) {
    this.disconnectInput(a);
    this.inputs.splice(a, 1);
    for (var b = a; b < this.inputs.length; ++b) {
      if (this.inputs[b]) {
        var d = this.graph.links[this.inputs[b].link];
        d && --d.target_slot;
      }
    }
    this.size = this.computeSize();
    if (this.onInputRemoved) {
      this.onInputRemoved(a);
    }
    this.setDirtyCanvas(!0, !0);
  };
  m.prototype.addConnection = function(a, b, d, h) {
    a = {name:a, type:b, pos:d, direction:h, links:null};
    this.connections.push(a);
    return a;
  };
  m.prototype.computeSize = function(a, b) {
    function d(a) {
      return a ? h * a.length * 0.6 : 0;
    }
    if (this.constructor.size) {
      return this.constructor.size.concat();
    }
    a = Math.max(this.inputs ? this.inputs.length : 1, this.outputs ? this.outputs.length : 1);
    b = b || new Float32Array([0, 0]);
    a = Math.max(a, 1);
    var h = e.NODE_TEXT_SIZE;
    b[1] = (this.constructor.slot_start_y || 0) + a * e.NODE_SLOT_HEIGHT;
    a = 0;
    if (this.widgets && this.widgets.length) {
      var f = 0;
      this.widgets && this.widgets.forEach(function(a) {
        f += e.NODE_WIDGET_HEIGHT * a.options.heightScale;
      });
      a = f + e.NODE_WIDGET_HEIGHT;
    }
    b[1] = this.widgets_up ? Math.max(b[1], a) : null != this.widgets_start_y ? Math.max(b[1], a + this.widgets_start_y) : b[1] + a;
    a = d(this.title);
    var c = 0, k = 0;
    if (this.inputs) {
      for (var n = 0, p = this.inputs.length; n < p; ++n) {
        var l = this.inputs[n];
        l = l.label || l.name || "";
        l = d(l);
        c < l && (c = l);
      }
    }
    if (this.outputs) {
      for (n = 0, p = this.outputs.length; n < p; ++n) {
        l = this.outputs[n], l = l.label || l.name || "", l = d(l), k < l && (k = l);
      }
    }
    b[0] = Math.max(c + k + 10, a);
    b[0] = Math.max(b[0], e.NODE_WIDTH);
    this.widgets && this.widgets.length && (b[0] = Math.max(b[0], 1.5 * e.NODE_WIDTH));
    if (this.onResize) {
      this.onResize(b);
    }
    this.constructor.min_height && b[1] < this.constructor.min_height && (b[1] = this.constructor.min_height);
    b[1] += 6;
    return b;
  };
  m.prototype.getPropertyInfo = function(a) {
    var b = null;
    if (this.properties_info) {
      for (var d = 0; d < this.properties_info.length; ++d) {
        if (this.properties_info[d].name == a) {
          b = this.properties_info[d];
          break;
        }
      }
    }
    this.constructor["@" + a] && (b = this.constructor["@" + a]);
    this.onGetPropertyInfo && (b = this.onGetPropertyInfo(a));
    b || (b = {});
    b.type || (b.type = typeof this.properties[a]);
    return b;
  };
  m.prototype.addWidget = function(a, b, d, h, f) {
    this.widgets || (this.widgets = []);
    !f && h && h.constructor === Object && (f = h, h = null);
    f && f.constructor === String && (f = {property:f});
    h && h.constructor === String && (f || (f = {}), f.property = h, h = null);
    h && h.constructor !== Function && (console.warn("addWidget: callback must be a function"), h = null);
    b = {type:a.toLowerCase(), name:b, value:d, callback:h, options:f || {}};
    void 0 !== b.options.y && (b.y = b.options.y);
    b.options.heightScale = 1;
    switch(b.type) {
      case "textarea":
        b.options.heightScale = 4;
        b.options.wrapText = !0;
        break;
      case "fatButton":
        b.options.heightScale = 2;
    }
    h || b.options.callback || b.options.property || console.warn("LiteGraph addWidget(...) without a callback or property assigned");
    if ("combo" == a && !b.options.values) {
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    }
    this.widgets.push(b);
    this.size = this.computeSize();
    return b;
  };
  m.prototype.addCustomWidget = function(a) {
    this.widgets || (this.widgets = []);
    this.widgets.push(a);
    return a;
  };
  m.prototype.getBounding = function(a) {
    a = a || new Float32Array(4);
    a[0] = this.pos[0] - 4;
    a[1] = this.pos[1] - e.NODE_TITLE_HEIGHT;
    a[2] = this.size[0] + 4;
    a[3] = this.size[1] + e.NODE_TITLE_HEIGHT;
    if (this.onBounding) {
      this.onBounding(a);
    }
    return a;
  };
  m.prototype.isPointInside = function(a, b, d, h) {
    d = d || 0;
    var f = this.graph && this.graph.isLive() ? 0 : e.NODE_TITLE_HEIGHT;
    h && (f = 0);
    if (this.flags && this.flags.collapsed) {
      if (y(a, b, this.pos[0] - d, this.pos[1] - e.NODE_TITLE_HEIGHT - d, (this._collapsed_width || e.NODE_COLLAPSED_WIDTH) + 2 * d, e.NODE_TITLE_HEIGHT + 2 * d)) {
        return !0;
      }
    } else {
      if (this.pos[0] - 4 - d < a && this.pos[0] + this.size[0] + 4 + d > a && this.pos[1] - f - d < b && this.pos[1] + this.size[1] + d > b) {
        return !0;
      }
    }
    return !1;
  };
  m.prototype.getSlotInPosition = function(a, b) {
    var d = new Float32Array(2);
    if (this.inputs) {
      for (var h = 0, f = this.inputs.length; h < f; ++h) {
        var e = this.inputs[h];
        this.getConnectionPos(!0, h, d);
        if (y(a, b, d[0] - 10, d[1] - 5, 20, 10)) {
          return {input:e, slot:h, link_pos:d};
        }
      }
    }
    if (this.outputs) {
      for (h = 0, f = this.outputs.length; h < f; ++h) {
        if (e = this.outputs[h], this.getConnectionPos(!1, h, d), y(a, b, d[0] - 10, d[1] - 5, 20, 10)) {
          return {output:e, slot:h, link_pos:d};
        }
      }
    }
    return null;
  };
  m.prototype.findInputSlot = function(a) {
    if (!this.inputs) {
      return -1;
    }
    for (var b = 0, d = this.inputs.length; b < d; ++b) {
      if (a == this.inputs[b].name) {
        return b;
      }
    }
    return -1;
  };
  m.prototype.findOutputSlot = function(a) {
    if (!this.outputs) {
      return -1;
    }
    for (var b = 0, d = this.outputs.length; b < d; ++b) {
      if (a == this.outputs[b].name) {
        return b;
      }
    }
    return -1;
  };
  m.prototype.connect = function(a, b, d) {
    d = d || 0;
    if (!this.graph) {
      return console.log("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them."), null;
    }
    if (a.constructor === String) {
      if (a = this.findOutputSlot(a), -1 == a) {
        return e.debug && console.log("Connect: Error, no slot of name " + a), null;
      }
    } else {
      if (!this.outputs || a >= this.outputs.length) {
        return e.debug && console.log("Connect: Error, slot number not found"), null;
      }
    }
    b && b.constructor === Number && (b = this.graph.getNodeById(b));
    if (!b) {
      throw "target node is null";
    }
    if (b == this) {
      return null;
    }
    if (d.constructor === String) {
      if (d = b.findInputSlot(d), -1 == d) {
        return e.debug && console.log("Connect: Error, no slot of name " + d), null;
      }
    } else {
      if (d === e.EVENT) {
        return null;
      }
      if (!b.inputs || d >= b.inputs.length) {
        return e.debug && console.log("Connect: Error, slot number not found"), null;
      }
    }
    null != b.inputs[d].link && b.disconnectInput(d);
    var h = this.outputs[a];
    if (b.onConnectInput && !1 === b.onConnectInput(d, h.type, h, this, a)) {
      return null;
    }
    var f = b.inputs[d], c = null;
    if (e.isValidConnection(h.type, f.type)) {
      c = new q(++this.graph.last_link_id, f.type, this.id, a, b.id, d);
      this.graph.links[c.id] = c;
      null == h.links && (h.links = []);
      h.links.push(c.id);
      b.inputs[d].link = c.id;
      this.graph && this.graph._version++;
      if (this.onConnectionsChange) {
        this.onConnectionsChange(e.OUTPUT, a, !0, c, h);
      }
      if (b.onConnectionsChange) {
        b.onConnectionsChange(e.INPUT, d, !0, c, f);
      }
      this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(e.INPUT, b, d, this, a), this.graph.onNodeConnectionChange(e.OUTPUT, this, a, b, d));
    }
    this.setDirtyCanvas(!1, !0);
    this.graph.connectionChange(this, c);
    return c;
  };
  m.prototype.disconnectOutput = function(a, b) {
    if (a.constructor === String) {
      if (a = this.findOutputSlot(a), -1 == a) {
        return e.debug && console.log("Connect: Error, no slot of name " + a), !1;
      }
    } else {
      if (!this.outputs || a >= this.outputs.length) {
        return e.debug && console.log("Connect: Error, slot number not found"), !1;
      }
    }
    var d = this.outputs[a];
    if (!d || !d.links || 0 == d.links.length) {
      return !1;
    }
    if (b) {
      b.constructor === Number && (b = this.graph.getNodeById(b));
      if (!b) {
        throw "Target Node not found";
      }
      for (var h = 0, f = d.links.length; h < f; h++) {
        var c = d.links[h], k = this.graph.links[c];
        if (k.target_id == b.id) {
          d.links.splice(h, 1);
          var n = b.inputs[k.target_slot];
          n.link = null;
          delete this.graph.links[c];
          this.graph && this.graph._version++;
          if (b.onConnectionsChange) {
            b.onConnectionsChange(e.INPUT, k.target_slot, !1, k, n);
          }
          if (this.onConnectionsChange) {
            this.onConnectionsChange(e.OUTPUT, a, !1, k, d);
          }
          if (this.graph && this.graph.onNodeConnectionChange) {
            this.graph.onNodeConnectionChange(e.OUTPUT, this, a);
          }
          this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(e.OUTPUT, this, a), this.graph.onNodeConnectionChange(e.INPUT, b, k.target_slot));
          break;
        }
      }
    } else {
      h = 0;
      for (f = d.links.length; h < f; h++) {
        if (c = d.links[h], k = this.graph.links[c]) {
          b = this.graph.getNodeById(k.target_id);
          this.graph && this.graph._version++;
          if (b) {
            n = b.inputs[k.target_slot];
            n.link = null;
            if (b.onConnectionsChange) {
              b.onConnectionsChange(e.INPUT, k.target_slot, !1, k, n);
            }
            if (this.graph && this.graph.onNodeConnectionChange) {
              this.graph.onNodeConnectionChange(e.INPUT, b, k.target_slot);
            }
          }
          delete this.graph.links[c];
          if (this.onConnectionsChange) {
            this.onConnectionsChange(e.OUTPUT, a, !1, k, d);
          }
          this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(e.OUTPUT, this, a), this.graph.onNodeConnectionChange(e.INPUT, b, k.target_slot));
        }
      }
      d.links = null;
    }
    this.setDirtyCanvas(!1, !0);
    this.graph.connectionChange(this);
    return !0;
  };
  m.prototype.disconnectInput = function(a) {
    if (a.constructor === String) {
      if (a = this.findInputSlot(a), -1 == a) {
        return e.debug && console.log("Connect: Error, no slot of name " + a), !1;
      }
    } else {
      if (!this.inputs || a >= this.inputs.length) {
        return e.debug && console.log("Connect: Error, slot number not found"), !1;
      }
    }
    var b = this.inputs[a];
    if (!b) {
      return !1;
    }
    var d = this.inputs[a].link;
    this.inputs[a].link = null;
    var h = this.graph.links[d];
    if (h) {
      var f = this.graph.getNodeById(h.origin_id);
      if (!f) {
        return !1;
      }
      var c = f.outputs[h.origin_slot];
      if (!c || !c.links || 0 == c.links.length) {
        return !1;
      }
      for (var k = 0, n = c.links.length; k < n; k++) {
        if (c.links[k] == d) {
          c.links.splice(k, 1);
          break;
        }
      }
      delete this.graph.links[d];
      this.graph && this.graph._version++;
      if (this.onConnectionsChange) {
        this.onConnectionsChange(e.INPUT, a, !1, h, b);
      }
      if (f.onConnectionsChange) {
        f.onConnectionsChange(e.OUTPUT, k, !1, h, c);
      }
      this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(e.OUTPUT, f, k), this.graph.onNodeConnectionChange(e.INPUT, this, a));
    }
    this.setDirtyCanvas(!1, !0);
    this.graph.connectionChange(this);
    return !0;
  };
  m.prototype.getConnectionPos = function(a, b, d) {
    d = d || new Float32Array(2);
    var h = 0;
    a && this.inputs && (h = this.inputs.length);
    !a && this.outputs && (h = this.outputs.length);
    var f = 0.5 * e.NODE_SLOT_HEIGHT;
    if (this.flags.collapsed) {
      return b = this._collapsed_width || e.NODE_COLLAPSED_WIDTH, this.horizontal ? (d[0] = this.pos[0] + 0.5 * b, d[1] = a ? this.pos[1] - e.NODE_TITLE_HEIGHT : this.pos[1]) : (d[0] = a ? this.pos[0] : this.pos[0] + b, d[1] = this.pos[1] - 0.5 * e.NODE_TITLE_HEIGHT), d;
    }
    if (a && -1 == b) {
      return d[0] = this.pos[0] + 0.5 * e.NODE_TITLE_HEIGHT, d[1] = this.pos[1] + 0.5 * e.NODE_TITLE_HEIGHT, d;
    }
    if (a && h > b && this.inputs[b].pos) {
      return d[0] = this.pos[0] + this.inputs[b].pos[0], d[1] = this.pos[1] + this.inputs[b].pos[1], d;
    }
    if (!a && h > b && this.outputs[b].pos) {
      return d[0] = this.pos[0] + this.outputs[b].pos[0], d[1] = this.pos[1] + this.outputs[b].pos[1], d;
    }
    if (this.horizontal) {
      return d[0] = this.pos[0] + this.size[0] / h * (b + 0.5), d[1] = a ? this.pos[1] - e.NODE_TITLE_HEIGHT : this.pos[1] + this.size[1], d;
    }
    d[0] = a ? this.pos[0] + f : this.pos[0] + this.size[0] + 1 - f;
    d[1] = this.pos[1] + (b + 0.7) * e.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0);
    return d;
  };
  m.prototype.alignToGrid = function() {
    this.pos[0] = e.CANVAS_GRID_SIZE * Math.round(this.pos[0] / e.CANVAS_GRID_SIZE);
    this.pos[1] = e.CANVAS_GRID_SIZE * Math.round(this.pos[1] / e.CANVAS_GRID_SIZE);
  };
  m.prototype.trace = function(a) {
    this.console || (this.console = []);
    this.console.push(a);
    this.console.length > m.MAX_CONSOLE && this.console.shift();
    this.graph.onNodeTrace(this, a);
  };
  m.prototype.setDirtyCanvas = function(a, b) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [a, b]);
  };
  m.prototype.loadImage = function(a) {
    var b = new Image;
    b.src = e.node_images_path + a;
    b.ready = !1;
    var d = this;
    b.onload = function() {
      this.ready = !0;
      d.setDirtyCanvas(!0);
    };
    return b;
  };
  m.prototype.captureInput = function(a) {
    if (this.graph && this.graph.list_of_graphcanvas) {
      for (var b = this.graph.list_of_graphcanvas, d = 0; d < b.length; ++d) {
        var h = b[d];
        if (a || h.node_capturing_input == this) {
          h.node_capturing_input = a ? this : null;
        }
      }
    }
  };
  m.prototype.collapse = function(a) {
    this.graph._version++;
    if (!1 !== this.constructor.collapsable || a) {
      this.flags.collapsed = this.flags.collapsed ? !1 : !0, this.setDirtyCanvas(!0, !0);
    }
  };
  m.prototype.pin = function(a) {
    this.graph._version++;
    this.flags.pinned = void 0 === a ? !this.flags.pinned : a;
  };
  m.prototype.localToScreen = function(a, b, d) {
    return [(a + this.pos[0]) * d.scale + d.offset[0], (b + this.pos[1]) * d.scale + d.offset[1]];
  };
  v.LGraphGroup = e.LGraphGroup = g;
  g.prototype._ctor = function(a) {
    this.title = a || "Group";
    this.font_size = 24;
    this.color = l.node_colors.pale_blue ? l.node_colors.pale_blue.groupcolor : "#AAA";
    this._bounding = new Float32Array([10, 10, 140, 80]);
    this._pos = this._bounding.subarray(0, 2);
    this._size = this._bounding.subarray(2, 4);
    this._nodes = [];
    this.graph = null;
    Object.defineProperty(this, "pos", {set:function(a) {
      !a || 2 > a.length || (this._pos[0] = a[0], this._pos[1] = a[1]);
    }, get:function() {
      return this._pos;
    }, enumerable:!0});
    Object.defineProperty(this, "size", {set:function(a) {
      !a || 2 > a.length || (this._size[0] = Math.max(140, a[0]), this._size[1] = Math.max(80, a[1]));
    }, get:function() {
      return this._size;
    }, enumerable:!0});
  };
  g.prototype.configure = function(a) {
    this.title = a.title;
    this._bounding.set(a.bounding);
    this.color = a.color;
    this.font = a.font;
  };
  g.prototype.serialize = function() {
    var a = this._bounding;
    return {title:this.title, bounding:[Math.round(a[0]), Math.round(a[1]), Math.round(a[2]), Math.round(a[3])], color:this.color, font:this.font};
  };
  g.prototype.move = function(a, b, d) {
    this._pos[0] += a;
    this._pos[1] += b;
    if (!d) {
      for (d = 0; d < this._nodes.length; ++d) {
        var h = this._nodes[d];
        h.pos[0] += a;
        h.pos[1] += b;
      }
    }
  };
  g.prototype.recomputeInsideNodes = function() {
    this._nodes.length = 0;
    for (var a = this.graph._nodes, b = new Float32Array(4), d = 0; d < a.length; ++d) {
      var h = a[d];
      h.getBounding(b);
      w(this._bounding, b) && this._nodes.push(h);
    }
  };
  g.prototype.isPointInside = m.prototype.isPointInside;
  g.prototype.setDirtyCanvas = m.prototype.setDirtyCanvas;
  e.DragAndScale = r;
  r.prototype.bindEvents = function(a) {
    this.last_mouse = new Float32Array(2);
    this._binded_mouse_callback = this.onMouse.bind(this);
    a.addEventListener("mousedown", this._binded_mouse_callback);
    a.addEventListener("mousemove", this._binded_mouse_callback);
    a.addEventListener("mousewheel", this._binded_mouse_callback, !1);
    a.addEventListener("wheel", this._binded_mouse_callback, !1);
  };
  r.prototype.computeVisibleArea = function() {
    if (this.element) {
      var a = -this.offset[0], b = -this.offset[1], d = a + this.element.width / this.scale, h = b + this.element.height / this.scale;
      this.visible_area[0] = a;
      this.visible_area[1] = b;
      this.visible_area[2] = d - a;
      this.visible_area[3] = h - b;
    } else {
      this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
    }
  };
  r.prototype.onMouse = function(a) {
    if (this.enabled) {
      var b = this.element, d = b.getBoundingClientRect(), h = a.clientX - d.left;
      d = a.clientY - d.top;
      a.canvasx = h;
      a.canvasy = d;
      a.dragging = this.dragging;
      var f = !1;
      this.onmouse && (f = this.onmouse(a));
      if ("mousedown" == a.type) {
        this.dragging = !0, b.removeEventListener("mousemove", this._binded_mouse_callback), document.body.addEventListener("mousemove", this._binded_mouse_callback), document.body.addEventListener("mouseup", this._binded_mouse_callback);
      } else {
        if ("mousemove" == a.type) {
          f || (b = h - this.last_mouse[0], f = d - this.last_mouse[1], this.dragging && this.mouseDrag(b, f));
        } else {
          if ("mouseup" == a.type) {
            this.dragging = !1, document.body.removeEventListener("mousemove", this._binded_mouse_callback), document.body.removeEventListener("mouseup", this._binded_mouse_callback), b.addEventListener("mousemove", this._binded_mouse_callback);
          } else {
            if ("mousewheel" == a.type || "wheel" == a.type || "DOMMouseScroll" == a.type) {
              a.eventType = "mousewheel", a.wheel = "wheel" == a.type ? -a.deltaY : null != a.wheelDeltaY ? a.wheelDeltaY : -60 * a.detail, a.delta = a.wheelDelta ? a.wheelDelta / 40 : a.deltaY ? -a.deltaY / 3 : 0, this.changeDeltaScale(1.0 + 0.05 * a.delta);
            }
          }
        }
      }
      this.last_mouse[0] = h;
      this.last_mouse[1] = d;
      a.preventDefault();
      a.stopPropagation();
      return !1;
    }
  };
  r.prototype.toCanvasContext = function(a) {
    a.scale(this.scale, this.scale);
    a.translate(this.offset[0], this.offset[1]);
  };
  r.prototype.convertOffsetToCanvas = function(a) {
    return [(a[0] + this.offset[0]) * this.scale, (a[1] + this.offset[1]) * this.scale];
  };
  r.prototype.convertCanvasToOffset = function(a, b) {
    b = b || [0, 0];
    b[0] = a[0] / this.scale - this.offset[0];
    b[1] = a[1] / this.scale - this.offset[1];
    return b;
  };
  r.prototype.mouseDrag = function(a, b) {
    this.offset[0] += a / this.scale;
    this.offset[1] += b / this.scale;
    if (this.onredraw) {
      this.onredraw(this);
    }
  };
  r.prototype.changeScale = function(a, b) {
    a < this.min_scale ? a = this.min_scale : a > this.max_scale && (a = this.max_scale);
    if (a != this.scale && this.element) {
      var d = this.element.getBoundingClientRect();
      if (d && (b = b || [0.5 * d.width, 0.5 * d.height], d = this.convertCanvasToOffset(b), this.scale = a, 0.01 > Math.abs(this.scale - 1) && (this.scale = 1), a = this.convertCanvasToOffset(b), a = [a[0] - d[0], a[1] - d[1]], this.offset[0] += a[0], this.offset[1] += a[1], this.onredraw)) {
        this.onredraw(this);
      }
    }
  };
  r.prototype.changeDeltaScale = function(a, b) {
    this.changeScale(this.scale * a, b);
  };
  r.prototype.reset = function() {
    this.scale = 1;
    this.offset[0] = 0;
    this.offset[1] = 0;
  };
  v.LGraphCanvas = e.LGraphCanvas = l;
  l.link_type_colors = {"-1":e.EVENT_LINK_COLOR, number:"#AAA", node:"#DCA"};
  l.gradients = {};
  l.prototype.clear = function() {
    this.fps = this.render_time = this.last_draw_time = this.frame = 0;
    this.dragging_rectangle = null;
    this.selected_nodes = {};
    this.selected_group = null;
    this.visible_nodes = [];
    this.connecting_node = this.node_capturing_input = this.node_over = this.node_dragged = null;
    this.highlighted_links = {};
    this.dirty_bgcanvas = this.dirty_canvas = !0;
    this.node_widget = this.node_in_panel = this.dirty_area = null;
    this.last_mouse = [0, 0];
    this.last_mouseclick = 0;
    this.visible_area.set([0, 0, 0, 0]);
    if (this.onClear) {
      this.onClear();
    }
  };
  l.prototype.setGraph = function(a, b) {
    this.graph != a && (b || this.clear(), !a && this.graph ? this.graph.detachCanvas(this) : (a.attachCanvas(this), this._graph_stack && (this._graph_stack = null), this.setDirty(!0, !0)));
  };
  l.prototype.openSubgraph = function(a) {
    if (!a) {
      throw "graph cannot be null";
    }
    if (this.graph == a) {
      throw "graph cannot be the same";
    }
    this.clear();
    this.graph && (this._graph_stack || (this._graph_stack = []), this._graph_stack.push(this.graph));
    a.attachCanvas(this);
    this.setDirty(!0, !0);
  };
  l.prototype.closeSubgraph = function() {
    if (this._graph_stack && 0 != this._graph_stack.length) {
      var a = this.graph._subgraph_node, b = this._graph_stack.pop();
      this.selected_nodes = {};
      this.highlighted_links = {};
      b.attachCanvas(this);
      this.setDirty(!0, !0);
      a && (this.centerOnNode(a), this.selectNodes([a]));
    }
  };
  l.prototype.getCurrentGraph = function() {
    return this.graph;
  };
  l.prototype.setCanvas = function(a, b) {
    if (a && a.constructor === String && (a = document.getElementById(a), !a)) {
      throw "Error creating LiteGraph canvas: Canvas not found";
    }
    if (a !== this.canvas && (!a && this.canvas && (b || this.unbindEvents()), this.canvas = a, this.ds.element = a)) {
      a.className += " lgraphcanvas";
      a.data = this;
      a.tabindex = "1";
      this.bgcanvas = null;
      this.bgcanvas || (this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height);
      if (null == a.getContext) {
        if ("canvas" != a.localName) {
          throw "Element supplied for LGraphCanvas must be a <canvas> element, you passed a " + a.localName;
        }
        throw "This browser doesn't support Canvas";
      }
      null == (this.ctx = a.getContext("2d")) && (a.webgl_enabled || console.warn("This canvas seems to be WebGL, enabling WebGL renderer"), this.enableWebGL());
      this._mousemove_callback = this.processMouseMove.bind(this);
      this._mouseup_callback = this.processMouseUp.bind(this);
      b || this.bindEvents();
    }
  };
  l.prototype._doNothing = function(a) {
    a.preventDefault();
    return !1;
  };
  l.prototype._doReturnTrue = function(a) {
    a.preventDefault();
    return !0;
  };
  l.prototype.bindEvents = function() {
    if (this._events_binded) {
      console.warn("LGraphCanvas: events already binded");
    } else {
      var a = this.canvas, b = this.getCanvasWindow().document;
      this._mousedown_callback = this.processMouseDown.bind(this);
      this._mousewheel_callback = this.processMouseWheel.bind(this);
      a.addEventListener("mousedown", this._mousedown_callback, !0);
      a.addEventListener("mousemove", this._mousemove_callback);
      a.addEventListener("mousewheel", this._mousewheel_callback, !1);
      a.addEventListener("contextmenu", this._doNothing);
      a.addEventListener("DOMMouseScroll", this._mousewheel_callback, !1);
      a.addEventListener("touchstart", this.touchHandler, !0);
      a.addEventListener("touchmove", this.touchHandler, !0);
      a.addEventListener("touchend", this.touchHandler, !0);
      a.addEventListener("touchcancel", this.touchHandler, !0);
      this._key_callback = this.processKey.bind(this);
      a.addEventListener("keydown", this._key_callback, !0);
      b.addEventListener("keyup", this._key_callback, !0);
      this._ondrop_callback = this.processDrop.bind(this);
      a.addEventListener("dragover", this._doNothing, !1);
      a.addEventListener("dragend", this._doNothing, !1);
      a.addEventListener("drop", this._ondrop_callback, !1);
      a.addEventListener("dragenter", this._doReturnTrue, !1);
      this._events_binded = !0;
    }
  };
  l.prototype.unbindEvents = function() {
    if (this._events_binded) {
      var a = this.getCanvasWindow().document;
      this.canvas.removeEventListener("mousedown", this._mousedown_callback);
      this.canvas.removeEventListener("mousewheel", this._mousewheel_callback);
      this.canvas.removeEventListener("DOMMouseScroll", this._mousewheel_callback);
      this.canvas.removeEventListener("keydown", this._key_callback);
      a.removeEventListener("keyup", this._key_callback);
      this.canvas.removeEventListener("contextmenu", this._doNothing);
      this.canvas.removeEventListener("drop", this._ondrop_callback);
      this.canvas.removeEventListener("dragenter", this._doReturnTrue);
      this.canvas.removeEventListener("touchstart", this.touchHandler);
      this.canvas.removeEventListener("touchmove", this.touchHandler);
      this.canvas.removeEventListener("touchend", this.touchHandler);
      this.canvas.removeEventListener("touchcancel", this.touchHandler);
      this._ondrop_callback = this._key_callback = this._mousewheel_callback = this._mousedown_callback = null;
      this._events_binded = !1;
    } else {
      console.warn("LGraphCanvas: no events binded");
    }
  };
  l.getFileExtension = function(a) {
    var b = a.indexOf("?");
    -1 != b && (a = a.substr(0, b));
    b = a.lastIndexOf(".");
    return -1 == b ? "" : a.substr(b + 1).toLowerCase();
  };
  l.prototype.enableWebGL = function() {
    this.gl = this.ctx = enableWebGLCanvas(this.canvas);
    this.ctx.webgl = !0;
    this.bgcanvas = this.canvas;
    this.bgctx = this.gl;
    this.canvas.webgl_enabled = !0;
  };
  l.prototype.setDirty = function(a, b) {
    a && (this.dirty_canvas = !0);
    b && (this.dirty_bgcanvas = !0);
  };
  l.prototype.getCanvasWindow = function() {
    if (!this.canvas) {
      return window;
    }
    var a = this.canvas.ownerDocument;
    return a.defaultView || a.parentWindow;
  };
  l.prototype.startRendering = function() {
    function a() {
      this.pause_rendering || this.draw();
      var b = this.getCanvasWindow();
      this.is_rendering && b.requestAnimationFrame(a.bind(this));
    }
    this.is_rendering || (this.is_rendering = !0, a.call(this));
  };
  l.prototype.stopRendering = function() {
    this.is_rendering = !1;
  };
  l.prototype.processMouseDown = function(a) {
    if (this.graph) {
      this.adjustMouseEvent(a);
      var b = this.getCanvasWindow();
      l.active_canvas = this;
      this.canvas.removeEventListener("mousemove", this._mousemove_callback);
      b.document.addEventListener("mousemove", this._mousemove_callback, !0);
      b.document.addEventListener("mouseup", this._mouseup_callback, !0);
      var d = this.graph.getNodeOnPos(a.canvasX, a.canvasY, this.visible_nodes, 5), h = !1, f = 300 > e.getTime() - this.last_mouseclick;
      this.canvas_mouse[0] = a.canvasX;
      this.canvas_mouse[1] = a.canvasY;
      this.canvas.focus();
      e.closeAllContextMenus(b);
      if (!this.onMouse || 1 != this.onMouse(a)) {
        if (1 == a.which) {
          a.ctrlKey && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = a.canvasX, this.dragging_rectangle[1] = a.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, h = !0);
          var c = !1;
          if (d && this.allow_interaction && !h && !this.read_only) {
            this.live_mode || d.flags.pinned || this.bringToFront(d);
            if (!this.connecting_node && !d.flags.collapsed && !this.live_mode) {
              if (!h && !1 !== d.resizable && y(a.canvasX, a.canvasY, d.pos[0] + d.size[0] - 5, d.pos[1] + d.size[1] - 5, 10, 10)) {
                this.resizing_node = d, this.canvas.style.cursor = "se-resize", h = !0;
              } else {
                if (d.outputs) {
                  for (var k = 0, n = d.outputs.length; k < n; ++k) {
                    var p = d.outputs[k], g = d.getConnectionPos(!1, k);
                    if (y(a.canvasX, a.canvasY, g[0] - 15, g[1] - 10, 30, 20)) {
                      this.connecting_node = d;
                      this.connecting_output = p;
                      this.connecting_pos = d.getConnectionPos(!1, k);
                      this.connecting_slot = k;
                      a.shiftKey && d.disconnectOutput(k);
                      if (f) {
                        if (d.onOutputDblClick) {
                          d.onOutputDblClick(k, a);
                        }
                      } else {
                        if (d.onOutputClick) {
                          d.onOutputClick(k, a);
                        }
                      }
                      h = !0;
                      break;
                    }
                  }
                }
                if (d.inputs) {
                  for (k = 0, n = d.inputs.length; k < n; ++k) {
                    if (p = d.inputs[k], g = d.getConnectionPos(!0, k), y(a.canvasX, a.canvasY, g[0] - 15, g[1] - 10, 30, 20)) {
                      if (f) {
                        if (d.onInputDblClick) {
                          d.onInputDblClick(k, a);
                        }
                      } else {
                        if (d.onInputClick) {
                          d.onInputClick(k, a);
                        }
                      }
                      if (null !== p.link) {
                        h = this.graph.links[p.link];
                        d.disconnectInput(k);
                        if (this.allow_reconnect_links || a.shiftKey) {
                          this.connecting_node = this.graph._nodes_by_id[h.origin_id], this.connecting_slot = h.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot);
                        }
                        h = this.dirty_bgcanvas = !0;
                      }
                    }
                  }
                }
              }
            }
            if (!h) {
              k = !1;
              if (n = this.processNodeWidgets(d, this.canvas_mouse, a)) {
                k = !0, this.node_widget = [d, n];
              }
              if (f && this.selected_nodes[d.id]) {
                if (d.onDblClick) {
                  d.onDblClick(a, [a.canvasX - d.pos[0], a.canvasY - d.pos[1]], this);
                }
                this.processNodeDblClicked(d);
                k = !0;
              }
              d.onMouseDown && d.onMouseDown(a, [a.canvasX - d.pos[0], a.canvasY - d.pos[1]], this) ? k = !0 : this.live_mode && (k = c = !0);
              k || (this.allow_dragnodes && (this.node_dragged = d), this.selected_nodes[d.id] || this.processNodeSelected(d, a));
              this.dirty_canvas = !0;
            }
          } else {
            if (!this.read_only) {
              for (k = 0; k < this.visible_links.length; ++k) {
                if (d = this.visible_links[k], c = d._pos, !(!c || a.canvasX < c[0] - 4 || a.canvasX > c[0] + 4 || a.canvasY < c[1] - 4 || a.canvasY > c[1] + 4)) {
                  this.showLinkMenu(d, a);
                  this.over_link_center = null;
                  break;
                }
              }
            }
            this.selected_group = this.graph.getGroupOnPos(a.canvasX, a.canvasY);
            this.selected_group_resizing = !1;
            this.selected_group && !this.read_only && (a.ctrlKey && (this.dragging_rectangle = null), 10 > C([a.canvasX, a.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]) * this.ds.scale ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes());
            f && !this.read_only && this.allow_searchbox && this.showSearchBox(a);
            c = !0;
          }
          !h && c && this.allow_dragcanvas && (this.dragging_canvas = !0);
        } else {
          2 != a.which && 3 == a.which && (this.read_only || this.processContextMenu(d, a));
        }
        this.last_mouse[0] = a.localX;
        this.last_mouse[1] = a.localY;
        this.last_mouseclick = e.getTime();
        this.last_mouse_dragging = !0;
        this.graph.change();
        (!b.document.activeElement || "input" != b.document.activeElement.nodeName.toLowerCase() && "textarea" != b.document.activeElement.nodeName.toLowerCase()) && a.preventDefault();
        a.stopPropagation();
        if (this.onMouseDown) {
          this.onMouseDown(a);
        }
        return !1;
      }
    }
  };
  l.prototype.processMouseMove = function(a) {
    this.autoresize && this.resize();
    if (this.graph) {
      l.active_canvas = this;
      this.adjustMouseEvent(a);
      var b = [a.localX, a.localY], d = [b[0] - this.last_mouse[0], b[1] - this.last_mouse[1]];
      this.last_mouse = b;
      this.canvas_mouse[0] = a.canvasX;
      this.canvas_mouse[1] = a.canvasY;
      a.dragging = this.last_mouse_dragging;
      this.node_widget && (this.processNodeWidgets(this.node_widget[0], this.canvas_mouse, a, this.node_widget[1]), this.dirty_canvas = !0);
      if (this.dragging_rectangle) {
        this.dragging_rectangle[2] = a.canvasX - this.dragging_rectangle[0], this.dragging_rectangle[3] = a.canvasY - this.dragging_rectangle[1], this.dirty_canvas = !0;
      } else {
        if (this.selected_group && !this.read_only) {
          this.selected_group_resizing ? this.selected_group.size = [a.canvasX - this.selected_group.pos[0], a.canvasY - this.selected_group.pos[1]] : (this.selected_group.move(d[0] / this.ds.scale, d[1] / this.ds.scale, a.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0)), this.dirty_bgcanvas = !0;
        } else {
          if (this.dragging_canvas) {
            this.ds.offset[0] += d[0] / this.ds.scale, this.ds.offset[1] += d[1] / this.ds.scale, this.dirty_bgcanvas = this.dirty_canvas = !0;
          } else {
            if (this.allow_interaction && !this.read_only) {
              this.connecting_node && (this.dirty_canvas = !0);
              var h = this.graph.getNodeOnPos(a.canvasX, a.canvasY, this.visible_nodes);
              b = 0;
              for (var f = this.graph._nodes.length; b < f; ++b) {
                if (this.graph._nodes[b].mouseOver && h != this.graph._nodes[b]) {
                  this.graph._nodes[b].mouseOver = !1;
                  if (this.node_over && this.node_over.onMouseLeave) {
                    this.node_over.onMouseLeave(a);
                  }
                  this.node_over = null;
                  this.dirty_canvas = !0;
                }
              }
              if (h) {
                if (!h.mouseOver && (h.mouseOver = !0, this.node_over = h, this.dirty_canvas = !0, h.onMouseEnter)) {
                  h.onMouseEnter(a);
                }
                if (h.onMouseMove) {
                  h.onMouseMove(a, [a.canvasX - h.pos[0], a.canvasY - h.pos[1]], this);
                }
                if (this.connecting_node && (f = this._highlight_input || [0, 0], !this.isOverNodeBox(h, a.canvasX, a.canvasY))) {
                  var c = this.isOverNodeInput(h, a.canvasX, a.canvasY, f);
                  -1 != c && h.inputs[c] ? e.isValidConnection(this.connecting_output.type, h.inputs[c].type) && (this._highlight_input = f) : this._highlight_input = null;
                }
                this.canvas && (y(a.canvasX, a.canvasY, h.pos[0] + h.size[0] - 5, h.pos[1] + h.size[1] - 5, 5, 5) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
              } else {
                f = null;
                for (b = 0; b < this.visible_links.length; ++b) {
                  c = this.visible_links[b];
                  var k = c._pos;
                  if (!(!k || a.canvasX < k[0] - 4 || a.canvasX > k[0] + 4 || a.canvasY < k[1] - 4 || a.canvasY > k[1] + 4)) {
                    f = c;
                    break;
                  }
                }
                f != this.over_link_center && (this.over_link_center = f, this.dirty_canvas = !0);
                this.canvas && (this.canvas.style.cursor = "");
              }
              if (this.node_capturing_input && this.node_capturing_input != h && this.node_capturing_input.onMouseMove) {
                this.node_capturing_input.onMouseMove(a, [a.canvasX - this.node_capturing_input.pos[0], a.canvasY - this.node_capturing_input.pos[1]], this);
              }
              if (this.node_dragged && !this.live_mode) {
                for (b in this.selected_nodes) {
                  h = this.selected_nodes[b], h.pos[0] += d[0] / this.ds.scale, h.pos[1] += d[1] / this.ds.scale;
                }
                this.dirty_bgcanvas = this.dirty_canvas = !0;
              }
              if (this.resizing_node && !this.live_mode) {
                this.resizing_node.size[0] = a.canvasX - this.resizing_node.pos[0];
                this.resizing_node.size[1] = a.canvasY - this.resizing_node.pos[1];
                d = Math.max(this.resizing_node.inputs ? this.resizing_node.inputs.length : 0, this.resizing_node.outputs ? this.resizing_node.outputs.length : 0);
                var n = 0;
                this.resizing_node.widgets && this.resizing_node.widgets.forEach(function(a) {
                  n += e.NODE_WIDGET_HEIGHT * a.options.heightScale;
                });
                d = d * e.NODE_SLOT_HEIGHT + (n + 4) + 4;
                this.resizing_node.size[1] < d && (this.resizing_node.size[1] = d);
                this.resizing_node.size[0] < e.NODE_MIN_WIDTH && (this.resizing_node.size[0] = e.NODE_MIN_WIDTH);
                if (this.resizing_node.onResize) {
                  this.resizing_node.onResize(this.resizing_node.size);
                }
                this.canvas.style.cursor = "se-resize";
                this.dirty_bgcanvas = this.dirty_canvas = !0;
              }
            }
          }
        }
      }
      a.preventDefault();
      return !1;
    }
  };
  l.prototype.processMouseUp = function(a) {
    if (this.graph) {
      var b = this.getCanvasWindow().document;
      l.active_canvas = this;
      b.removeEventListener("mousemove", this._mousemove_callback, !0);
      this.canvas.addEventListener("mousemove", this._mousemove_callback, !0);
      b.removeEventListener("mouseup", this._mouseup_callback, !0);
      this.adjustMouseEvent(a);
      b = e.getTime();
      a.click_time = b - this.last_mouseclick;
      this.last_mouse_dragging = !1;
      if (1 == a.which) {
        if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.canvas_mouse, a), this.node_widget = null, this.selected_group && (this.selected_group.move(this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]), this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]), a.ctrlKey), this.selected_group.pos[0] = Math.round(this.selected_group.pos[0]), this.selected_group.pos[1] = Math.round(this.selected_group.pos[1]), this.selected_group._nodes.length && (this.dirty_canvas = 
        !0), this.selected_group = null), this.selected_group_resizing = !1, this.dragging_rectangle) {
          if (this.graph) {
            b = this.graph._nodes;
            var d = new Float32Array(4);
            this.deselectAllNodes();
            var h = Math.abs(this.dragging_rectangle[2]), f = Math.abs(this.dragging_rectangle[3]), c = 0 > this.dragging_rectangle[3] ? this.dragging_rectangle[1] - f : this.dragging_rectangle[1];
            this.dragging_rectangle[0] = 0 > this.dragging_rectangle[2] ? this.dragging_rectangle[0] - h : this.dragging_rectangle[0];
            this.dragging_rectangle[1] = c;
            this.dragging_rectangle[2] = h;
            this.dragging_rectangle[3] = f;
            f = [];
            for (c = 0; c < b.length; ++c) {
              h = b[c], h.getBounding(d), w(this.dragging_rectangle, d) && f.push(h);
            }
            f.length && this.selectNodes(f);
          }
          this.dragging_rectangle = null;
        } else {
          if (this.connecting_node) {
            this.dirty_bgcanvas = this.dirty_canvas = !0;
            if (h = this.graph.getNodeOnPos(a.canvasX, a.canvasY, this.visible_nodes)) {
              this.connecting_output.type == e.EVENT && this.isOverNodeBox(h, a.canvasX, a.canvasY) ? this.connecting_node.connect(this.connecting_slot, h, e.EVENT) : (b = this.isOverNodeInput(h, a.canvasX, a.canvasY), -1 != b ? this.connecting_node.connect(this.connecting_slot, h, b) : (b = h.getInputInfo(0), this.connecting_output.type == e.EVENT ? this.connecting_node.connect(this.connecting_slot, h, e.EVENT) : b && !b.link && e.isValidConnection(b.type && this.connecting_output.type) && this.connecting_node.connect(this.connecting_slot, 
              h, 0)));
            }
            this.connecting_node = this.connecting_pos = this.connecting_output = null;
            this.connecting_slot = -1;
          } else {
            if (this.resizing_node) {
              this.dirty_bgcanvas = this.dirty_canvas = !0, this.resizing_node = null;
            } else {
              if (this.node_dragged) {
                (h = this.node_dragged) && 300 > a.click_time && y(a.canvasX, a.canvasY, h.pos[0], h.pos[1] - e.NODE_TITLE_HEIGHT, e.NODE_TITLE_HEIGHT, e.NODE_TITLE_HEIGHT) && h.collapse();
                this.dirty_bgcanvas = this.dirty_canvas = !0;
                this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]);
                this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]);
                this.graph.config.align_to_grid && this.node_dragged.alignToGrid();
                if (this.onNodeMoved) {
                  this.onNodeMoved(this.node_dragged);
                }
                this.node_dragged = null;
              } else {
                h = this.graph.getNodeOnPos(a.canvasX, a.canvasY, this.visible_nodes);
                !h && 300 > a.click_time && this.deselectAllNodes();
                this.dirty_canvas = !0;
                this.dragging_canvas = !1;
                if (this.node_over && this.node_over.onMouseUp) {
                  this.node_over.onMouseUp(a, [a.canvasX - this.node_over.pos[0], a.canvasY - this.node_over.pos[1]], this);
                }
                if (this.node_capturing_input && this.node_capturing_input.onMouseUp) {
                  this.node_capturing_input.onMouseUp(a, [a.canvasX - this.node_capturing_input.pos[0], a.canvasY - this.node_capturing_input.pos[1]]);
                }
              }
            }
          }
        }
      } else {
        2 == a.which ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : 3 == a.which && (this.dirty_canvas = !0, this.dragging_canvas = !1);
      }
      this.graph.change();
      a.stopPropagation();
      a.preventDefault();
      return !1;
    }
  };
  l.prototype.processMouseWheel = function(a) {
    if (this.graph && this.allow_dragcanvas) {
      var b = null != a.wheelDeltaY ? a.wheelDeltaY : -60 * a.detail;
      this.adjustMouseEvent(a);
      var d = this.ds.scale;
      0 < b ? d *= 1.1 : 0 > b && (d *= 1 / 1.1);
      this.ds.changeScale(d, [a.localX, a.localY]);
      this.graph.change();
      a.preventDefault();
      return !1;
    }
  };
  l.prototype.isOverNodeBox = function(a, b, d) {
    var h = e.NODE_TITLE_HEIGHT;
    return y(b, d, a.pos[0] + 2, a.pos[1] + 2 - h, h - 4, h - 4) ? !0 : !1;
  };
  l.prototype.isOverNodeInput = function(a, b, d, h) {
    if (a.inputs) {
      for (var f = 0, e = a.inputs.length; f < e; ++f) {
        var c = a.getConnectionPos(!0, f);
        if (a.horizontal ? y(b, d, c[0] - 5, c[1] - 10, 10, 20) : y(b, d, c[0] - 10, c[1] - 5, 40, 10)) {
          return h && (h[0] = c[0], h[1] = c[1]), f;
        }
      }
    }
    return -1;
  };
  l.prototype.processKey = function(a) {
    if (this.graph) {
      var b = !1;
      if ("textarea" != a.target.localName) {
        if ("keydown" == a.type) {
          if (32 == a.keyCode && (b = this.dragging_canvas = !0), 65 == a.keyCode && a.ctrlKey && (this.selectNodes(), b = !0), "KeyC" == a.code && (a.metaKey || a.ctrlKey) && !a.shiftKey && this.selected_nodes && (this.copyToClipboard(), b = !0), "KeyV" != a.code || !a.metaKey && !a.ctrlKey || a.shiftKey || this.pasteFromClipboard(), 46 != a.keyCode && 8 != a.keyCode || "input" == a.target.localName || "textarea" == a.target.localName || (this.deleteSelectedNodes(), b = !0), this.selected_nodes) {
            for (var d in this.selected_nodes) {
              if (this.selected_nodes[d].onKeyDown) {
                this.selected_nodes[d].onKeyDown(a);
              }
            }
          }
        } else {
          if ("keyup" == a.type && (32 == a.keyCode && (this.dragging_canvas = !1), this.selected_nodes)) {
            for (d in this.selected_nodes) {
              if (this.selected_nodes[d].onKeyUp) {
                this.selected_nodes[d].onKeyUp(a);
              }
            }
          }
        }
        this.graph.change();
        if (b) {
          return a.preventDefault(), a.stopImmediatePropagation(), !1;
        }
      }
    }
  };
  l.prototype.copyToClipboard = function() {
    var a = {nodes:[], links:[]}, b = 0, d = [], h;
    for (h in this.selected_nodes) {
      var f = this.selected_nodes[h];
      f._relative_id = b;
      d.push(f);
      b += 1;
    }
    for (h = 0; h < d.length; ++h) {
      if (f = d[h], b = f.clone()) {
        if (a.nodes.push(b.serialize()), f.inputs && f.inputs.length) {
          for (b = 0; b < f.inputs.length; ++b) {
            var e = f.inputs[b];
            if (e && null != e.link && (e = this.graph.links[e.link])) {
              var c = this.graph.getNodeById(e.origin_id);
              c && this.selected_nodes[c.id] && a.links.push([c._relative_id, e.origin_slot, f._relative_id, e.target_slot]);
            }
          }
        }
      } else {
        console.warn("node type not found: " + f.type);
      }
    }
    localStorage.setItem("litegrapheditor_clipboard", JSON.stringify(a));
  };
  l.prototype.pasteFromClipboard = function() {
    var a = localStorage.getItem("litegrapheditor_clipboard");
    if (a) {
      a = JSON.parse(a);
      for (var b = [], d = 0; d < a.nodes.length; ++d) {
        var h = a.nodes[d], f = e.createNode(h.type);
        f && (f.configure(h), f.pos[0] += 5, f.pos[1] += 5, this.graph.add(f), b.push(f));
      }
      for (d = 0; d < a.links.length; ++d) {
        h = a.links[d];
        f = b[h[0]];
        var c = b[h[2]];
        f && c ? f.connect(h[1], c, h[3]) : console.warn("Warning, nodes missing on pasting");
      }
      this.selectNodes(b);
    }
  };
  l.prototype.processDrop = function(a) {
    a.preventDefault();
    this.adjustMouseEvent(a);
    var b = [a.canvasX, a.canvasY], d = this.graph.getNodeOnPos(b[0], b[1]);
    if (d) {
      if ((d.onDropFile || d.onDropData) && (b = a.dataTransfer.files) && b.length) {
        for (var h = 0; h < b.length; h++) {
          var f = a.dataTransfer.files[0], e = f.name;
          l.getFileExtension(e);
          if (d.onDropFile) {
            d.onDropFile(f);
          }
          if (d.onDropData) {
            var c = new FileReader;
            c.onload = function(a) {
              d.onDropData(a.target.result, e, f);
            };
            var k = f.type.split("/")[0];
            "text" == k || "" == k ? c.readAsText(f) : "image" == k ? c.readAsDataURL(f) : c.readAsArrayBuffer(f);
          }
        }
      }
      return d.onDropItem && d.onDropItem(event) ? !0 : this.onDropItem ? this.onDropItem(event) : !1;
    }
    b = null;
    this.onDropItem && (b = this.onDropItem(event));
    b || this.checkDropItem(a);
  };
  l.prototype.checkDropItem = function(a) {
    if (a.dataTransfer.files.length) {
      var b = a.dataTransfer.files[0], d = l.getFileExtension(b.name).toLowerCase();
      if (d = e.node_types_by_file_extension[d]) {
        if (d = e.createNode(d.type), d.pos = [a.canvasX, a.canvasY], this.graph.add(d), d.onDropFile) {
          d.onDropFile(b);
        }
      }
    }
  };
  l.prototype.processNodeDblClicked = function(a) {
    if (this.onShowNodePanel) {
      this.onShowNodePanel(a);
    }
    if (this.onNodeDblClicked) {
      this.onNodeDblClicked(a);
    }
    this.setDirty(!0);
  };
  l.prototype.processNodeSelected = function(a, b) {
    this.selectNode(a, b && b.shiftKey);
    if (this.onNodeSelected) {
      this.onNodeSelected(a);
    }
  };
  l.prototype.selectNode = function(a, b) {
    null == a ? this.deselectAllNodes() : this.selectNodes([a], b);
  };
  l.prototype.selectNodes = function(a, b) {
    b || this.deselectAllNodes();
    a = a || this.graph._nodes;
    for (b = 0; b < a.length; ++b) {
      var d = a[b];
      if (!d.is_selected) {
        if (!d.is_selected && d.onSelected) {
          d.onSelected();
        }
        d.is_selected = !0;
        this.selected_nodes[d.id] = d;
        if (d.inputs) {
          for (var h = 0; h < d.inputs.length; ++h) {
            this.highlighted_links[d.inputs[h].link] = !0;
          }
        }
        if (d.outputs) {
          for (h = 0; h < d.outputs.length; ++h) {
            var f = d.outputs[h];
            if (f.links) {
              for (var e = 0; e < f.links.length; ++e) {
                this.highlighted_links[f.links[e]] = !0;
              }
            }
          }
        }
      }
    }
    if (this.onSelectionChange) {
      this.onSelectionChange(this.selected_nodes);
    }
    this.setDirty(!0);
  };
  l.prototype.deselectNode = function(a) {
    if (a.is_selected) {
      if (a.onDeselected) {
        a.onDeselected();
      }
      a.is_selected = !1;
      if (this.onNodeDeselected) {
        this.onNodeDeselected(a);
      }
      if (a.inputs) {
        for (var b = 0; b < a.inputs.length; ++b) {
          delete this.highlighted_links[a.inputs[b].link];
        }
      }
      if (a.outputs) {
        for (b = 0; b < a.outputs.length; ++b) {
          var d = a.outputs[b];
          if (d.links) {
            for (var h = 0; h < d.links.length; ++h) {
              delete this.highlighted_links[d.links[h]];
            }
          }
        }
      }
    }
  };
  l.prototype.deselectAllNodes = function() {
    if (this.graph) {
      for (var a = this.graph._nodes, b = 0, d = a.length; b < d; ++b) {
        var h = a[b];
        if (h.is_selected) {
          if (h.onDeselected) {
            h.onDeselected();
          }
          h.is_selected = !1;
          if (this.onNodeDeselected) {
            this.onNodeDeselected(h);
          }
        }
      }
      this.selected_nodes = {};
      this.current_node = null;
      this.highlighted_links = {};
      if (this.onSelectionChange) {
        this.onSelectionChange(this.selected_nodes);
      }
      this.setDirty(!0);
    }
  };
  l.prototype.deleteSelectedNodes = function() {
    for (var a in this.selected_nodes) {
      var b = this.selected_nodes[a];
      if (b.inputs && b.inputs.length && b.outputs && b.outputs.length && e.isValidConnection(b.inputs[0].type, b.outputs[0].type) && b.inputs[0].link && b.outputs[0].links && b.outputs[0].links.length) {
        var d = b.graph.links[b.inputs[0].link], h = b.graph.links[b.outputs[0].links[0]], f = b.getInputNode(0), c = b.getOutputNodes(0)[0];
        f && c && f.connect(d.origin_slot, c, h.target_slot);
      }
      this.graph.remove(b);
      if (this.onNodeDeselected) {
        this.onNodeDeselected(b);
      }
    }
    this.selected_nodes = {};
    this.current_node = null;
    this.highlighted_links = {};
    this.setDirty(!0);
  };
  l.prototype.centerOnNode = function(a) {
    this.ds.offset[0] = -a.pos[0] - 0.5 * a.size[0] + 0.5 * this.canvas.width / this.ds.scale;
    this.ds.offset[1] = -a.pos[1] - 0.5 * a.size[1] + 0.5 * this.canvas.height / this.ds.scale;
    this.setDirty(!0, !0);
  };
  l.prototype.adjustMouseEvent = function(a) {
    if (this.canvas) {
      var b = this.canvas.getBoundingClientRect();
      a.localX = a.clientX - b.left;
      a.localY = a.clientY - b.top;
    } else {
      a.localX = a.clientX, a.localY = a.clientY;
    }
    a.deltaX = a.localX - this.last_mouse_position[0];
    a.deltaY = a.localY - this.last_mouse_position[1];
    this.last_mouse_position[0] = a.localX;
    this.last_mouse_position[1] = a.localY;
    a.canvasX = a.localX / this.ds.scale - this.ds.offset[0];
    a.canvasY = a.localY / this.ds.scale - this.ds.offset[1];
  };
  l.prototype.setZoom = function(a, b) {
    this.ds.changeScale(a, b);
    this.dirty_bgcanvas = this.dirty_canvas = !0;
  };
  l.prototype.convertOffsetToCanvas = function(a, b) {
    return this.ds.convertOffsetToCanvas(a, b);
  };
  l.prototype.convertCanvasToOffset = function(a, b) {
    return this.ds.convertCanvasToOffset(a, b);
  };
  l.prototype.convertEventToCanvasOffset = function(a) {
    var b = this.canvas.getBoundingClientRect();
    return this.convertCanvasToOffset([a.clientX - b.left, a.clientY - b.top]);
  };
  l.prototype.bringToFront = function(a) {
    var b = this.graph._nodes.indexOf(a);
    -1 != b && (this.graph._nodes.splice(b, 1), this.graph._nodes.push(a));
  };
  l.prototype.sendToBack = function(a) {
    var b = this.graph._nodes.indexOf(a);
    -1 != b && (this.graph._nodes.splice(b, 1), this.graph._nodes.unshift(a));
  };
  var B = new Float32Array(4);
  l.prototype.computeVisibleNodes = function(a, b) {
    b = b || [];
    b.length = 0;
    a = a || this.graph._nodes;
    for (var d = 0, h = a.length; d < h; ++d) {
      var f = a[d];
      (!this.live_mode || f.onDrawBackground || f.onDrawForeground) && w(this.visible_area, f.getBounding(B)) && b.push(f);
    }
    return b;
  };
  l.prototype.draw = function(a, b) {
    if (this.canvas) {
      var d = e.getTime();
      this.render_time = 0.001 * (d - this.last_draw_time);
      this.last_draw_time = d;
      this.graph && this.ds.computeVisibleArea();
      (this.dirty_bgcanvas || b || this.always_render_background || this.graph && this.graph._last_trigger_time && 1000 > d - this.graph._last_trigger_time) && this.drawBackCanvas();
      (this.dirty_canvas || a) && this.drawFrontCanvas();
      this.fps = this.render_time ? 1.0 / this.render_time : 0;
      this.frame += 1;
    }
  };
  l.prototype.drawFrontCanvas = function() {
    this.dirty_canvas = !1;
    this.ctx || (this.ctx = this.bgcanvas.getContext("2d"));
    var a = this.ctx;
    if (a) {
      a.start2D && a.start2D();
      var b = this.canvas;
      a.restore();
      a.setTransform(1, 0, 0, 1, 0, 0);
      this.dirty_area && (a.save(), a.beginPath(), a.rect(this.dirty_area[0], this.dirty_area[1], this.dirty_area[2], this.dirty_area[3]), a.clip());
      this.clear_background && a.clearRect(0, 0, b.width, b.height);
      this.bgcanvas == this.canvas ? this.drawBackCanvas() : a.drawImage(this.bgcanvas, 0, 0);
      if (this.onRender) {
        this.onRender(b, a);
      }
      this.show_info && this.renderInfo(a);
      if (this.graph) {
        a.save();
        this.ds.toCanvasContext(a);
        b = this.computeVisibleNodes(null, this.visible_nodes);
        for (var d = 0; d < b.length; ++d) {
          var h = b[d];
          a.save();
          a.translate(h.pos[0], h.pos[1]);
          this.drawNode(h, a);
          a.restore();
        }
        this.render_execution_order && this.drawExecutionOrder(a);
        this.graph.config.links_ontop && (this.live_mode || this.drawConnections(a));
        if (null != this.connecting_pos) {
          a.lineWidth = this.connections_width;
          switch(this.connecting_output.type) {
            case e.EVENT:
              b = e.EVENT_LINK_COLOR;
              break;
            default:
              b = e.CONNECTING_LINK_COLOR;
          }
          this.renderLink(a, this.connecting_pos, [this.canvas_mouse[0], this.canvas_mouse[1]], null, !1, null, b, this.connecting_output.dir || (this.connecting_node.horizontal ? e.DOWN : e.RIGHT), e.CENTER);
          a.beginPath();
          this.connecting_output.type === e.EVENT || this.connecting_output.shape === e.BOX_SHAPE ? a.rect(this.connecting_pos[0] - 6 + 0.5, this.connecting_pos[1] - 5 + 0.5, 14, 10) : a.arc(this.connecting_pos[0], this.connecting_pos[1], 4, 0, 2 * Math.PI);
          a.fill();
          a.fillStyle = "#ffcc00";
          this._highlight_input && (a.beginPath(), a.arc(this._highlight_input[0], this._highlight_input[1], 6, 0, 2 * Math.PI), a.fill());
        }
        this.dragging_rectangle && (a.strokeStyle = "#FFF", a.strokeRect(this.dragging_rectangle[0], this.dragging_rectangle[1], this.dragging_rectangle[2], this.dragging_rectangle[3]));
        if (this.over_link_center && this.render_link_tooltip) {
          this.drawLinkTooltip(a, this.over_link_center);
        } else {
          if (this.onDrawLinkTooltip) {
            this.onDrawLinkTooltip(a, null);
          }
        }
        if (this.onDrawForeground) {
          this.onDrawForeground(a, this.visible_rect);
        }
        a.restore();
      }
      if (this.onDrawOverlay) {
        this.onDrawOverlay(a);
      }
      this.dirty_area && a.restore();
      a.finish2D && a.finish2D();
    }
  };
  l.prototype.renderInfo = function(a, b, d) {
    b = b || 0;
    d = d || 0;
    a.save();
    a.translate(b, d);
    a.font = "10px Arial";
    a.fillStyle = "#888";
    this.graph ? (a.fillText("T: " + this.graph.globaltime.toFixed(2) + "s", 5, 13), a.fillText("I: " + this.graph.iteration, 5, 26), a.fillText("N: " + this.graph._nodes.length + " [" + this.visible_nodes.length + "]", 5, 39), a.fillText("V: " + this.graph._version, 5, 52), a.fillText("FPS:" + this.fps.toFixed(2), 5, 65)) : a.fillText("No graph selected", 5, 13);
    a.restore();
  };
  l.prototype.drawBackCanvas = function() {
    var a = this.bgcanvas;
    if (a.width != this.canvas.width || a.height != this.canvas.height) {
      a.width = this.canvas.width, a.height = this.canvas.height;
    }
    this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
    var b = this.bgctx;
    b.start && b.start();
    this.clear_background && b.clearRect(0, 0, a.width, a.height);
    if (this._graph_stack && this._graph_stack.length) {
      b.save();
      var d = this.graph._subgraph_node;
      b.strokeStyle = d.bgcolor;
      b.lineWidth = 10;
      b.strokeRect(1, 1, a.width - 2, a.height - 2);
      b.lineWidth = 1;
      b.font = "40px Arial";
      b.textAlign = "center";
      b.fillStyle = d.bgcolor || "#AAA";
      for (var h = "", f = 1; f < this._graph_stack.length; ++f) {
        h += this._graph_stack[f]._subgraph_node.getTitle() + " >> ";
      }
      b.fillText(h + d.getTitle(), 0.5 * a.width, 40);
      b.restore();
    }
    d = !1;
    this.onRenderBackground && (d = this.onRenderBackground(a, b));
    b.restore();
    b.setTransform(1, 0, 0, 1, 0, 0);
    this.visible_links.length = 0;
    if (this.graph) {
      b.save();
      this.ds.toCanvasContext(b);
      if (this.background_image && 0.5 < this.ds.scale && !d) {
        b.globalAlpha = this.zoom_modify_alpha ? (1.0 - 0.5 / this.ds.scale) * this.editor_alpha : this.editor_alpha;
        b.imageSmoothingEnabled = b.mozImageSmoothingEnabled = b.imageSmoothingEnabled = !1;
        if (!this._bg_img || this._bg_img.name != this.background_image) {
          this._bg_img = new Image;
          this._bg_img.name = this.background_image;
          this._bg_img.src = this.background_image;
          var e = this;
          this._bg_img.onload = function() {
            e.draw(!0, !0);
          };
        }
        d = null;
        null == this._pattern && 0 < this._bg_img.width ? (d = b.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = d) : d = this._pattern;
        d && (b.fillStyle = d, b.fillRect(this.visible_area[0], this.visible_area[1], this.visible_area[2], this.visible_area[3]), b.fillStyle = "transparent");
        b.globalAlpha = 1.0;
        b.imageSmoothingEnabled = b.mozImageSmoothingEnabled = b.imageSmoothingEnabled = !0;
      }
      this.graph._groups.length && !this.live_mode && this.drawGroups(a, b);
      if (this.onDrawBackground) {
        this.onDrawBackground(b, this.visible_area);
      }
      this.onBackgroundRender && (console.error("WARNING! onBackgroundRender deprecated, now is named onDrawBackground "), this.onBackgroundRender = null);
      this.render_canvas_border && (b.strokeStyle = "#235", b.strokeRect(0, 0, a.width, a.height));
      this.render_connections_shadows ? (b.shadowColor = "#000", b.shadowOffsetX = 0, b.shadowOffsetY = 0, b.shadowBlur = 6) : b.shadowColor = "rgba(0,0,0,0)";
      this.live_mode || this.drawConnections(b);
      b.shadowColor = "rgba(0,0,0,0)";
      b.restore();
    }
    b.finish && b.finish();
    this.dirty_bgcanvas = !1;
    this.dirty_canvas = !0;
  };
  var D = new Float32Array(2);
  l.prototype.drawNode = function(a, b) {
    this.current_node = a;
    var d = a.color || a.constructor.color || e.NODE_DEFAULT_COLOR, h = a.bgcolor || a.constructor.bgcolor || e.NODE_DEFAULT_BGCOLOR, f = 0.6 > this.ds.scale;
    if (this.live_mode) {
      if (!a.flags.collapsed && (b.shadowColor = "transparent", a.onDrawForeground)) {
        a.onDrawForeground(b, this, this.canvas);
      }
    } else {
      var c = this.editor_alpha;
      b.globalAlpha = c;
      this.render_shadows && !f ? (b.shadowColor = e.DEFAULT_SHADOW_COLOR, b.shadowOffsetX = 2 * this.ds.scale, b.shadowOffsetY = 2 * this.ds.scale, b.shadowBlur = 3 * this.ds.scale) : b.shadowColor = "transparent";
      if (!a.flags.collapsed || !a.onDrawCollapsed || 1 != a.onDrawCollapsed(b, this)) {
        var k = a._shape || e.BOX_SHAPE;
        D.set(a.size);
        var n = a.horizontal;
        if (a.flags.collapsed) {
          b.font = this.inner_text_font;
          var p = a.getTitle ? a.getTitle() : a.title;
          null != p && (a._collapsed_width = Math.min(a.size[0], b.measureText(p).width + 2 * e.NODE_TITLE_HEIGHT), D[0] = a._collapsed_width, D[1] = 0);
        }
        a.clip_area && (b.save(), b.beginPath(), k == e.BOX_SHAPE ? b.rect(0, 0, D[0], D[1]) : k == e.ROUND_SHAPE ? b.roundRect(0, 0, D[0], D[1], 10) : k == e.CIRCLE_SHAPE && b.arc(0.5 * D[0], 0.5 * D[1], 0.5 * D[0], 0, 2 * Math.PI), b.clip());
        a.has_errors && (h = "red");
        this.drawNodeShape(a, b, D, d, h, a.is_selected, a.mouseOver);
        b.shadowColor = "transparent";
        if (a.onDrawForeground) {
          a.onDrawForeground(b, this, this.canvas);
        }
        b.textAlign = n ? "center" : "left";
        b.font = this.inner_text_font;
        h = !f;
        k = this.connecting_output;
        b.lineWidth = 1;
        p = 0;
        var l = new Float32Array(2);
        if (!a.flags.collapsed) {
          if (a.inputs) {
            for (d = 0; d < a.inputs.length; d++) {
              var g = a.inputs[d];
              b.globalAlpha = c;
              this.connecting_node && !e.isValidConnection(g.type, k.type) && (b.globalAlpha = 0.4 * c);
              b.fillStyle = null != g.link ? g.color_on || this.default_connection_color.input_on : g.color_off || this.default_connection_color.input_off;
              var t = a.getConnectionPos(!0, d, l);
              t[0] -= a.pos[0];
              t[1] -= a.pos[1];
              p < t[1] + 0.5 * e.NODE_SLOT_HEIGHT && (p = t[1] + 0.5 * e.NODE_SLOT_HEIGHT);
              b.beginPath();
              g.type === e.EVENT || g.shape === e.BOX_SHAPE ? n ? b.rect(t[0] - 5 + 0.5, t[1] - 8 + 0.5, 10, 14) : b.rect(t[0] - 6 + 0.5, t[1] - 5 + 0.5, 14, 10) : g.shape === e.ARROW_SHAPE ? (b.moveTo(t[0] + 8, t[1] + 0.5), b.lineTo(t[0] - 4, t[1] + 6 + 0.5), b.lineTo(t[0] - 4, t[1] - 6 + 0.5), b.closePath()) : f ? b.rect(t[0] - 4, t[1] - 4, 8, 8) : b.arc(t[0], t[1], 4, 0, 2 * Math.PI);
              b.fill();
              if (h) {
                var m = null != g.label ? g.label : g.name;
                m && (b.fillStyle = e.NODE_TEXT_COLOR, n || g.dir == e.UP ? b.fillText(m, t[0], t[1] - 10) : b.fillText(m, t[0] + 10, t[1] + 5));
              }
            }
          }
          this.connecting_node && (b.globalAlpha = 0.4 * c);
          b.textAlign = n ? "center" : "right";
          b.strokeStyle = "black";
          if (a.outputs) {
            for (d = 0; d < a.outputs.length; d++) {
              if (g = a.outputs[d], t = a.getConnectionPos(!1, d, l), t[0] -= a.pos[0], t[1] -= a.pos[1], p < t[1] + 0.5 * e.NODE_SLOT_HEIGHT && (p = t[1] + 0.5 * e.NODE_SLOT_HEIGHT), b.fillStyle = g.links && g.links.length ? g.color_on || this.default_connection_color.output_on : g.color_off || this.default_connection_color.output_off, b.beginPath(), g.type === e.EVENT || g.shape === e.BOX_SHAPE ? n ? b.rect(t[0] - 5 + 0.5, t[1] - 8 + 0.5, 10, 14) : b.rect(t[0] - 6 + 0.5, t[1] - 5 + 0.5, 14, 10) : 
              g.shape === e.ARROW_SHAPE ? (b.moveTo(t[0] + 8, t[1] + 0.5), b.lineTo(t[0] - 4, t[1] + 6 + 0.5), b.lineTo(t[0] - 4, t[1] - 6 + 0.5), b.closePath()) : f ? b.rect(t[0] - 4, t[1] - 4, 8, 8) : b.arc(t[0], t[1], 4, 0, 2 * Math.PI), b.fill(), f || b.stroke(), h && (m = null != g.label ? g.label : g.name)) {
                b.fillStyle = e.NODE_TEXT_COLOR, n || g.dir == e.DOWN ? b.fillText(m, t[0], t[1] - 8) : b.fillText(m, t[0] - 10, t[1] + 5);
              }
            }
          }
          b.textAlign = "left";
          b.globalAlpha = 1;
          if (a.widgets) {
            g = p;
            if (n || a.widgets_up) {
              g = 2;
            }
            null != a.widgets_start_y && (g = a.widgets_start_y);
            this.drawNodeWidgets(a, g, b, this.node_widget && this.node_widget[0] == a ? this.node_widget[1] : null);
          }
        } else {
          if (this.render_collapsed_slots) {
            f = c = null;
            if (a.inputs) {
              for (d = 0; d < a.inputs.length; d++) {
                if (g = a.inputs[d], null != g.link) {
                  c = g;
                  break;
                }
              }
            }
            if (a.outputs) {
              for (d = 0; d < a.outputs.length; d++) {
                g = a.outputs[d], g.links && g.links.length && (f = g);
              }
            }
            c && (c = 0, d = -0.5 * e.NODE_TITLE_HEIGHT, n && (c = 0.5 * a._collapsed_width, d = -e.NODE_TITLE_HEIGHT), b.fillStyle = "#686", b.beginPath(), g.type === e.EVENT || g.shape === e.BOX_SHAPE ? b.rect(c - 7 + 0.5, d - 4, 14, 8) : g.shape === e.ARROW_SHAPE ? (b.moveTo(c + 8, d), b.lineTo(c + -4, d - 4), b.lineTo(c + -4, d + 4), b.closePath()) : b.arc(c, d, 4, 0, 2 * Math.PI), b.fill());
            f && (c = a._collapsed_width, d = -0.5 * e.NODE_TITLE_HEIGHT, n && (c = 0.5 * a._collapsed_width, d = 0), b.fillStyle = "#686", b.strokeStyle = "black", b.beginPath(), g.type === e.EVENT || g.shape === e.BOX_SHAPE ? b.rect(c - 7 + 0.5, d - 4, 14, 8) : g.shape === e.ARROW_SHAPE ? (b.moveTo(c + 6, d), b.lineTo(c - 6, d - 4), b.lineTo(c - 6, d + 4), b.closePath()) : b.arc(c, d, 4, 0, 2 * Math.PI), b.fill());
          }
        }
        a.clip_area && b.restore();
        b.globalAlpha = 1.0;
      }
    }
  };
  l.prototype.drawLinkTooltip = function(a, b) {
    var d = b._pos;
    a.fillStyle = "black";
    a.beginPath();
    a.arc(d[0], d[1], 3, 0, 2 * Math.PI);
    a.fill();
    if (null != b.data && (!this.onDrawLinkTooltip || 1 != this.onDrawLinkTooltip(a, b, this)) && (b = b.data, b = b.constructor === Number ? b.toFixed(2) : b.constructor === String ? '"' + b + '"' : b.constructor === Boolean ? String(b) : b.toToolTip ? b.toToolTip() : "[" + b.constructor.name + "]", null != b)) {
      b = b.substr(0, 30);
      a.font = "14px Courier New";
      var e = a.measureText(b).width + 20;
      a.shadowColor = "black";
      a.shadowOffsetX = 2;
      a.shadowOffsetY = 2;
      a.shadowBlur = 3;
      a.fillStyle = "#454";
      a.beginPath();
      a.roundRect(d[0] - 0.5 * e, d[1] - 15 - 24, e, 24, 3, 3);
      a.moveTo(d[0] - 10, d[1] - 15);
      a.lineTo(d[0] + 10, d[1] - 15);
      a.lineTo(d[0], d[1] - 5);
      a.fill();
      a.shadowColor = "transparent";
      a.textAlign = "center";
      a.fillStyle = "#CEC";
      a.fillText(b, d[0], d[1] - 15 - 24 * 0.3);
    }
  };
  var u = new Float32Array(4);
  l.prototype.drawNodeShape = function(a, b, d, h, f, c, k) {
    b.strokeStyle = h;
    b.fillStyle = f;
    f = e.NODE_TITLE_HEIGHT;
    var n = 0.5 > this.ds.scale, p = a._shape || a.constructor.shape || e.ROUND_SHAPE, x = a.constructor.title_mode, g = !0;
    x == e.TRANSPARENT_TITLE ? g = !1 : x == e.AUTOHIDE_TITLE && k && (g = !0);
    u[0] = 0;
    u[1] = g ? -f : 0;
    u[2] = d[0] + 1;
    u[3] = g ? d[1] + f : d[1];
    k = b.globalAlpha;
    b.beginPath();
    p == e.BOX_SHAPE || n ? b.fillRect(u[0], u[1], u[2], u[3]) : p == e.ROUND_SHAPE || p == e.CARD_SHAPE ? b.roundRect(u[0], u[1], u[2], u[3], this.round_radius, p == e.CARD_SHAPE ? 0 : this.round_radius) : p == e.CIRCLE_SHAPE && b.arc(0.5 * d[0], 0.5 * d[1], 0.5 * d[0], 0, 2 * Math.PI);
    b.fill();
    a.flags.collapsed || (b.shadowColor = "transparent", b.fillStyle = "rgba(0,0,0,0.2)", b.fillRect(0, -1, u[2], 2));
    b.shadowColor = "transparent";
    if (a.onDrawBackground) {
      a.onDrawBackground(b, this, this.canvas);
    }
    if (g || x == e.TRANSPARENT_TITLE) {
      if (a.onDrawTitleBar) {
        a.onDrawTitleBar(b, f, d, this.ds.scale, h);
      } else {
        if (x != e.TRANSPARENT_TITLE && (a.constructor.title_color || this.render_title_colored)) {
          g = a.constructor.title_color || h;
          a.flags.collapsed && (b.shadowColor = e.DEFAULT_SHADOW_COLOR);
          if (this.use_gradients) {
            var t = l.gradients[g];
            t || (t = l.gradients[g] = b.createLinearGradient(0, 0, 400, 0), t.addColorStop(0, g), t.addColorStop(1, "#000"));
            b.fillStyle = t;
          } else {
            b.fillStyle = g;
          }
          b.beginPath();
          p == e.BOX_SHAPE || n ? b.rect(0, -f, d[0] + 1, f) : (p == e.ROUND_SHAPE || p == e.CARD_SHAPE) && b.roundRect(0, -f, d[0] + 1, f, this.round_radius, a.flags.collapsed ? this.round_radius : 0);
          b.fill();
          b.shadowColor = "transparent";
        }
      }
      if (a.onDrawTitleBox) {
        a.onDrawTitleBox(b, f, d, this.ds.scale);
      } else {
        p == e.ROUND_SHAPE || p == e.CIRCLE_SHAPE || p == e.CARD_SHAPE ? (n && (b.fillStyle = "black", b.beginPath(), b.arc(0.5 * f, -0.5 * f, 6, 0, 2 * Math.PI), b.fill()), b.fillStyle = a.boxcolor || e.NODE_DEFAULT_BOXCOLOR, n ? b.fillRect(0.5 * f - 5, -0.5 * f - 5, 10, 10) : (b.beginPath(), b.arc(0.5 * f, -0.5 * f, 5, 0, 2 * Math.PI), b.fill())) : (n && (b.fillStyle = "black", b.fillRect(0.5 * (f - 10) - 1, -0.5 * (f + 10) - 1, 12, 12)), b.fillStyle = a.boxcolor || e.NODE_DEFAULT_BOXCOLOR, b.fillRect(0.5 * 
        (f - 10), -0.5 * (f + 10), 10, 10));
      }
      b.globalAlpha = k;
      if (a.onDrawTitleText) {
        a.onDrawTitleText(b, f, d, this.ds.scale, this.title_text_font, c);
      }
      !n && (b.font = this.title_text_font, n = String(a.getTitle())) && (b.fillStyle = c ? "white" : a.constructor.title_text_color || this.node_title_color, a.flags.collapsed ? (b.textAlign = "left", b.measureText(n), b.fillText(n.substr(0, 20), f, e.NODE_TITLE_TEXT_Y - f), b.textAlign = "left") : (b.textAlign = "left", b.fillText(n, f, e.NODE_TITLE_TEXT_Y - f)));
      if (a.onDrawTitle) {
        a.onDrawTitle(b);
      }
    }
    if (c) {
      if (a.onBounding) {
        a.onBounding(u);
      }
      x == e.TRANSPARENT_TITLE && (u[1] -= f, u[3] += f);
      b.lineWidth = 1;
      b.globalAlpha = 0.8;
      b.beginPath();
      p == e.BOX_SHAPE ? b.rect(-6 + u[0], -6 + u[1], 12 + u[2], 12 + u[3]) : p == e.ROUND_SHAPE || p == e.CARD_SHAPE && a.flags.collapsed ? b.roundRect(-6 + u[0], -6 + u[1], 12 + u[2], 12 + u[3], 2 * this.round_radius) : p == e.CARD_SHAPE ? b.roundRect(-6 + u[0], -6 + u[1], 12 + u[2], 12 + u[3], 2 * this.round_radius, 2) : p == e.CIRCLE_SHAPE && b.arc(0.5 * d[0], 0.5 * d[1], 0.5 * d[0] + 6, 0, 2 * Math.PI);
      b.strokeStyle = "#FFF";
      b.stroke();
      b.strokeStyle = h;
      b.globalAlpha = 1;
    }
  };
  var H = new Float32Array(4), n = new Float32Array(4), p = new Float32Array(2), k = new Float32Array(2);
  l.prototype.drawConnections = function(a) {
    var b = e.getTime(), d = this.visible_area;
    H[0] = d[0] - 20;
    H[1] = d[1] - 20;
    H[2] = d[2] + 40;
    H[3] = d[3] + 40;
    a.lineWidth = this.connections_width;
    a.fillStyle = "#AAA";
    a.strokeStyle = "#AAA";
    a.globalAlpha = this.editor_alpha;
    d = this.graph._nodes;
    for (var h = 0, f = d.length; h < f; ++h) {
      var c = d[h];
      if (c.inputs && c.inputs.length) {
        for (var l = 0; l < c.inputs.length; ++l) {
          var g = c.inputs[l];
          if (g && null != g.link && (g = this.graph.links[g.link])) {
            var m = this.graph.getNodeById(g.origin_id);
            if (null != m) {
              var r = g.origin_slot;
              var A = -1 == r ? [m.pos[0] + 10, m.pos[1] + 10] : m.getConnectionPos(!1, r, p);
              var t = c.getConnectionPos(!0, l, k);
              n[0] = A[0];
              n[1] = A[1];
              n[2] = t[0] - A[0];
              n[3] = t[1] - A[1];
              0 > n[2] && (n[0] += n[2], n[2] = Math.abs(n[2]));
              0 > n[3] && (n[1] += n[3], n[3] = Math.abs(n[3]));
              if (w(n, H)) {
                var K = m.outputs[r];
                r = c.inputs[l];
                if (K && r && (m = K.dir || (m.horizontal ? e.DOWN : e.RIGHT), r = r.dir || (c.horizontal ? e.UP : e.LEFT), this.renderLink(a, A, t, g, !1, 0, null, m, r), g && g._last_time && 1000 > b - g._last_time)) {
                  K = 2.0 - 0.002 * (b - g._last_time);
                  var M = a.globalAlpha;
                  a.globalAlpha = M * K;
                  this.renderLink(a, A, t, g, !0, K, "white", m, r);
                  a.globalAlpha = M;
                }
              }
            }
          }
        }
      }
    }
    a.globalAlpha = 1;
  };
  l.prototype.renderLink = function(a, b, d, h, f, c, k, n, p, g) {
    h && this.visible_links.push(h);
    !k && h && (k = h.color || l.link_type_colors[h.type]);
    k || (k = this.default_link_color);
    null != h && this.highlighted_links[h.id] && (k = "#FFF");
    n = n || e.RIGHT;
    p = p || e.LEFT;
    var x = C(b, d);
    this.render_connections_border && 0.6 < this.ds.scale && (a.lineWidth = this.connections_width + 4);
    a.lineJoin = "round";
    g = g || 1;
    1 < g && (a.lineWidth = 0.5);
    a.beginPath();
    for (var t = 0; t < g; t += 1) {
      var G = 5 * (t - 0.5 * (g - 1));
      if (this.links_render_mode == e.SPLINE_LINK) {
        a.moveTo(b[0], b[1] + G);
        var m = 0, r = 0, q = 0, I = 0;
        switch(n) {
          case e.LEFT:
            m = -0.25 * x;
            break;
          case e.RIGHT:
            m = 0.25 * x;
            break;
          case e.UP:
            r = -0.25 * x;
            break;
          case e.DOWN:
            r = 0.25 * x;
        }
        switch(p) {
          case e.LEFT:
            q = -0.25 * x;
            break;
          case e.RIGHT:
            q = 0.25 * x;
            break;
          case e.UP:
            I = -0.25 * x;
            break;
          case e.DOWN:
            I = 0.25 * x;
        }
        a.bezierCurveTo(b[0] + m, b[1] + r + G, d[0] + q, d[1] + I + G, d[0], d[1] + G);
      } else {
        if (this.links_render_mode == e.LINEAR_LINK) {
          a.moveTo(b[0], b[1] + G);
          I = q = r = m = 0;
          switch(n) {
            case e.LEFT:
              m = -1;
              break;
            case e.RIGHT:
              m = 1;
              break;
            case e.UP:
              r = -1;
              break;
            case e.DOWN:
              r = 1;
          }
          switch(p) {
            case e.LEFT:
              q = -1;
              break;
            case e.RIGHT:
              q = 1;
              break;
            case e.UP:
              I = -1;
              break;
            case e.DOWN:
              I = 1;
          }
          a.lineTo(b[0] + 15 * m, b[1] + 15 * r + G);
          a.lineTo(d[0] + 15 * q, d[1] + 15 * I + G);
          a.lineTo(d[0], d[1] + G);
        } else {
          if (this.links_render_mode == e.STRAIGHT_LINK) {
            a.moveTo(b[0], b[1]), G = b[0], m = b[1], r = d[0], q = d[1], n == e.RIGHT ? G += 10 : m += 10, p == e.LEFT ? r -= 10 : q -= 10, a.lineTo(G, m), a.lineTo(0.5 * (G + r), m), a.lineTo(0.5 * (G + r), q), a.lineTo(r, q), a.lineTo(d[0], d[1]);
          } else {
            return;
          }
        }
      }
    }
    this.render_connections_border && 0.6 < this.ds.scale && !f && (a.strokeStyle = "rgba(0,0,0,0.5)", a.stroke());
    a.lineWidth = this.connections_width;
    a.fillStyle = a.strokeStyle = k;
    a.stroke();
    f = this.computeConnectionPoint(b, d, 0.5, n, p);
    h && h._pos && (h._pos[0] = f[0], h._pos[1] = f[1]);
    0.6 <= this.ds.scale && this.highquality_render && p != e.CENTER && (this.render_connection_arrows && (t = this.computeConnectionPoint(b, d, 0.25, n, p), x = this.computeConnectionPoint(b, d, 0.26, n, p), h = this.computeConnectionPoint(b, d, 0.75, n, p), g = this.computeConnectionPoint(b, d, 0.76, n, p), this.render_curved_connections ? (x = -Math.atan2(x[0] - t[0], x[1] - t[1]), g = -Math.atan2(g[0] - h[0], g[1] - h[1])) : g = x = d[1] > b[1] ? 0 : Math.PI, a.save(), a.translate(t[0], t[1]), 
    a.rotate(x), a.beginPath(), a.moveTo(-5, -3), a.lineTo(0, 7), a.lineTo(5, -3), a.fill(), a.restore(), a.save(), a.translate(h[0], h[1]), a.rotate(g), a.beginPath(), a.moveTo(-5, -3), a.lineTo(0, 7), a.lineTo(5, -3), a.fill(), a.restore()), a.beginPath(), a.arc(f[0], f[1], 5, 0, 2 * Math.PI), a.fill());
    if (c) {
      for (a.fillStyle = k, t = 0; 5 > t; ++t) {
        c = (0.001 * e.getTime() + 0.2 * t) % 1, f = this.computeConnectionPoint(b, d, c, n, p), a.beginPath(), a.arc(f[0], f[1], 5, 0, 2 * Math.PI), a.fill();
      }
    }
  };
  l.prototype.computeConnectionPoint = function(a, b, d, h, f) {
    h = h || e.RIGHT;
    f = f || e.LEFT;
    var c = C(a, b), k = [a[0], a[1]], n = [b[0], b[1]];
    switch(h) {
      case e.LEFT:
        k[0] += -0.25 * c;
        break;
      case e.RIGHT:
        k[0] += 0.25 * c;
        break;
      case e.UP:
        k[1] += -0.25 * c;
        break;
      case e.DOWN:
        k[1] += 0.25 * c;
    }
    switch(f) {
      case e.LEFT:
        n[0] += -0.25 * c;
        break;
      case e.RIGHT:
        n[0] += 0.25 * c;
        break;
      case e.UP:
        n[1] += -0.25 * c;
        break;
      case e.DOWN:
        n[1] += 0.25 * c;
    }
    h = (1 - d) * (1 - d) * (1 - d);
    f = 3 * (1 - d) * (1 - d) * d;
    c = 3 * (1 - d) * d * d;
    d *= d * d;
    return [h * a[0] + f * k[0] + c * n[0] + d * b[0], h * a[1] + f * k[1] + c * n[1] + d * b[1]];
  };
  l.prototype.drawExecutionOrder = function(a) {
    a.shadowColor = "transparent";
    a.globalAlpha = 0.25;
    a.textAlign = "center";
    a.strokeStyle = "white";
    a.globalAlpha = 0.75;
    for (var b = this.visible_nodes, d = 0; d < b.length; ++d) {
      var c = b[d];
      a.fillStyle = "black";
      a.fillRect(c.pos[0] - e.NODE_TITLE_HEIGHT, c.pos[1] - e.NODE_TITLE_HEIGHT, e.NODE_TITLE_HEIGHT, e.NODE_TITLE_HEIGHT);
      0 == c.order && a.strokeRect(c.pos[0] - e.NODE_TITLE_HEIGHT + 0.5, c.pos[1] - e.NODE_TITLE_HEIGHT + 0.5, e.NODE_TITLE_HEIGHT, e.NODE_TITLE_HEIGHT);
      a.fillStyle = "#FFF";
      a.fillText(c.order, c.pos[0] + -0.5 * e.NODE_TITLE_HEIGHT, c.pos[1] - 6);
    }
    a.globalAlpha = 1;
  };
  l.prototype.drawNodeWidgets = function(a, b, d, c) {
    if (!a.widgets || !a.widgets.length) {
      return 0;
    }
    var f = a.size[0], h = a.widgets;
    b += 2;
    var k = e.NODE_WIDGET_HEIGHT, n = 0.5 < this.ds.scale;
    d.save();
    d.globalAlpha = this.editor_alpha;
    for (var p = e.WIDGET_OUTLINE_COLOR, l = e.WIDGET_BGCOLOR, g = e.WIDGET_TEXT_COLOR, t = e.WIDGET_SECONDARY_TEXT_COLOR, m = 0; m < h.length; ++m) {
      var r = h[m], q = b;
      r.y && (q = r.y);
      r.last_y = q;
      r.options.heightScale && (k = e.NODE_WIDGET_HEIGHT * r.options.heightScale);
      d.strokeStyle = p;
      d.fillStyle = "#222";
      d.textAlign = "left";
      r.disabled && (d.globalAlpha *= 0.5);
      switch(r.type) {
        case "button":
          r.clicked && (d.fillStyle = "#AAA", r.clicked = !1, this.dirty_canvas = !0);
          d.fillRect(15, q, f - 30, k);
          n && d.strokeRect(15, q, f - 30, k);
          n && (d.textAlign = "center", d.fillStyle = g, d.fillText(r.name, 0.5 * f, q + 0.7 * k));
          break;
        case "toggle":
          d.textAlign = "left";
          d.strokeStyle = p;
          d.fillStyle = l;
          d.beginPath();
          n ? d.roundRect(15, b, f - 30, k, 0.5 * k) : d.rect(15, b, f - 30, k);
          d.fill();
          n && d.stroke();
          d.fillStyle = r.value ? "#89A" : "#333";
          d.beginPath();
          d.arc(f - 30, q + 0.5 * k, 0.36 * k, 0, 2 * Math.PI);
          d.fill();
          n && (d.fillStyle = t, null != r.name && d.fillText(r.name, 30, q + 0.7 * k), d.fillStyle = r.value ? g : t, d.textAlign = "right", d.fillText(r.value ? r.options.on || "true" : r.options.off || "false", f - 40, q + 0.7 * k));
          break;
        case "slider":
          d.fillStyle = l;
          d.fillRect(15, q, f - 30, k);
          var u = r.options.max - r.options.min, B = (r.value - r.options.min) / u;
          d.fillStyle = c == r ? "#89A" : "#678";
          d.fillRect(15, q, B * (f - 30), k);
          n && d.strokeRect(15, q, f - 30, k);
          r.marker && (u = (r.marker - r.options.min) / u, d.fillStyle = "#AA9", d.fillRect(15 + u * (f - 30), q, 2, k));
          n && (d.textAlign = "center", d.fillStyle = g, d.fillText(r.name + "  " + Number(r.value).toFixed(3), 0.5 * f, q + 0.7 * k));
          break;
        case "number":
        case "combo":
          d.textAlign = "left";
          d.strokeStyle = p;
          d.fillStyle = l;
          d.beginPath();
          n ? d.roundRect(15, b, f - 30, k, 0.5 * k) : d.rect(15, b, f - 30, k);
          d.fill();
          n && (d.stroke(), d.fillStyle = g, d.beginPath(), d.moveTo(31, b + 5), d.lineTo(21, b + 0.5 * k), d.lineTo(31, b + k - 5), d.fill(), d.beginPath(), d.moveTo(f - 15 - 16, b + 5), d.lineTo(f - 15 - 6, b + 0.5 * k), d.lineTo(f - 15 - 16, b + k - 5), d.fill(), d.fillStyle = t, d.fillText(r.name, 35, q + 0.7 * k), d.fillStyle = g, d.textAlign = "right", "number" == r.type ? d.fillText(Number(r.value).toFixed(void 0 !== r.options.precision ? r.options.precision : 3), f - 30 - 20, q + 0.7 * k) : 
          (u = r.value, r.options.values && (B = r.options.values, B.constructor === Function && (B = B()), B && B.constructor !== Array && (u = B[r.value])), d.fillText(u, f - 30 - 20, q + 0.7 * k)));
          break;
        case "string":
        case "text":
          d.textAlign = "left";
          d.strokeStyle = p;
          d.fillStyle = l;
          d.beginPath();
          n ? d.roundRect(15, b, f - 30, k, 0.5 * k) : d.rect(15, b, f - 30, k);
          d.fill();
          n && (d.save(), d.beginPath(), d.rect(15, b, f - 30, k), d.clip(), d.stroke(), d.fillStyle = t, null != r.name && d.fillText(r.name, 30, q + 0.7 * k), d.fillStyle = g, d.textAlign = "right", d.fillText(String(r.value).substr(0, 30), f - 30, q + 0.7 * k), d.restore());
          break;
        case "textarea":
          d.textAlign = "left";
          d.strokeStyle = p;
          d.fillStyle = l;
          d.beginPath();
          u = this.canvasOptions.tools.canvasTxt;
          B = k;
          n ? d.roundRect(15, b, f - 30, B, 0.5 * e.NODE_WIDGET_HEIGHT) : d.rect(15, b, f - 30, B);
          d.fill();
          n && (d.save(), d.beginPath(), d.rect(15, b, f - 30, B), d.clip(), d.stroke(), d.fillStyle = t, null != r.name && d.fillText(r.name + ":", 20, q + 0.7 * e.NODE_WIDGET_HEIGHT), d.fillStyle = g, d.textAlign = "left", u.align = "left", u.vAlign = "top", u.fontSize = 12, u.drawText(d, r.value, 20, q + e.NODE_WIDGET_HEIGHT, f - 45, B - e.NODE_WIDGET_HEIGHT), d.restore());
          break;
        default:
          r.draw && r.draw(d, a, r, q, k);
      }
      b += k + 4;
      d.globalAlpha = this.editor_alpha;
    }
    d.restore();
    d.textAlign = "left";
  };
  l.prototype.processNodeWidgets = function(a, b, d, c) {
    function f(f, c) {
      f.value = c;
      f.options && f.options.property && void 0 !== a.properties[f.options.property] && a.setProperty(f.options.property, c);
      f.callback && f.callback(f.value, p, a, b, d);
    }
    if (!a.widgets || !a.widgets.length) {
      return null;
    }
    for (var h = b[0] - a.pos[0], k = b[1] - a.pos[1], n = a.size[0], p = this, l = this.getCanvasWindow(), g = 0; g < a.widgets.length; ++g) {
      var t = a.widgets[g];
      if (t && !t.disabled && (t == c || 6 < h && h < n - 12 && k > t.last_y && k < t.last_y + e.NODE_WIDGET_HEIGHT * t.options.heightScale)) {
        switch(t.type) {
          case "button":
            if ("mousemove" === d.type) {
              break;
            }
            t.callback && setTimeout(function() {
              t.callback(t, p, a, b, d);
            }, 20);
            this.dirty_canvas = t.clicked = !0;
            break;
          case "slider":
            l = Math.clamp((h - 10) / (n - 20), 0, 1);
            t.value = t.options.min + (t.options.max - t.options.min) * l;
            t.callback && setTimeout(function() {
              f(t, t.value);
            }, 20);
            this.dirty_canvas = !0;
            break;
          case "number":
          case "combo":
            c = t.value;
            if ("mousemove" == d.type && "number" == t.type) {
              t.value += 0.1 * d.deltaX * (t.options.step || 1), null != t.options.min && t.value < t.options.min && (t.value = t.options.min), null != t.options.max && t.value > t.options.max && (t.value = t.options.max);
            } else {
              if ("mousedown" == d.type) {
                var m = t.options.values;
                m && m.constructor === Function && (m = t.options.values(t, a));
                var r = null;
                "number" != t.type && (r = m.constructor === Array ? m : Object.keys(m));
                h = 40 > h ? -1 : h > n - 40 ? 1 : 0;
                if ("number" == t.type) {
                  t.value += 0.1 * h * (t.options.step || 1), null != t.options.min && t.value < t.options.min && (t.value = t.options.min), null != t.options.max && t.value > t.options.max && (t.value = t.options.max);
                } else {
                  if (h) {
                    l = -1, l = m.constructor === Object ? r.indexOf(String(t.value)) + h : r.indexOf(t.value) + h, l >= r.length && (l = r.length - 1), 0 > l && (l = 0), t.value = m.constructor === Array ? m[l] : l;
                  } else {
                    var q = m != r ? Object.values(m) : m;
                    new e.ContextMenu(q, {scale:Math.max(1, this.ds.scale), event:d, className:"dark", callback:function(a, b, d) {
                      m != r && (a = q.indexOf(a));
                      this.value = a;
                      f(this, a);
                      p.dirty_canvas = !0;
                      return !1;
                    }.bind(t)}, l);
                  }
                }
              } else {
                "mouseup" == d.type && "number" == t.type && (h = 40 > h ? -1 : h > n - 40 ? 1 : 0, 200 > d.click_time && 0 == h && this.prompt("Value", t.value, function(a) {
                  this.value = Number(a);
                  f(this, this.value);
                }.bind(t), d));
              }
            }
            c != t.value && setTimeout(function() {
              f(this, this.value);
            }.bind(t), 20);
            this.dirty_canvas = !0;
            break;
          case "toggle":
            "mousedown" == d.type && (t.value = !t.value, setTimeout(function() {
              f(t, t.value);
            }, 20));
            break;
          case "string":
          case "text":
            "mousedown" == d.type && this.prompt("Value", t.value, function(a) {
              this.value = a;
              f(this, a);
            }.bind(t), d);
            break;
          case "textarea":
            "mousedown" == d.type && this.prompt("Value", t.value, function(a) {
              this.value = a;
              f(this, a);
            }.bind(t), d);
            break;
          default:
            t.mouse && t.mouse(ctx, d, [h, k], a);
        }
        return t;
      }
    }
    return null;
  };
  l.prototype.drawGroups = function(a, b) {
    if (this.graph) {
      a = this.graph._groups;
      b.save();
      b.globalAlpha = 0.5 * this.editor_alpha;
      for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        if (w(this.visible_area, c._bounding)) {
          b.fillStyle = c.color || "#335";
          b.strokeStyle = c.color || "#335";
          var f = c._pos, k = c._size;
          b.globalAlpha = 0.25 * this.editor_alpha;
          b.beginPath();
          b.rect(f[0] + 0.5, f[1] + 0.5, k[0], k[1]);
          b.fill();
          b.globalAlpha = this.editor_alpha;
          b.stroke();
          b.beginPath();
          b.moveTo(f[0] + k[0], f[1] + k[1]);
          b.lineTo(f[0] + k[0] - 10, f[1] + k[1]);
          b.lineTo(f[0] + k[0], f[1] + k[1] - 10);
          b.fill();
          k = c.font_size || e.DEFAULT_GROUP_FONT_SIZE;
          b.font = k + "px Arial";
          b.fillText(c.title, f[0] + 4, f[1] + k);
        }
      }
      b.restore();
    }
  };
  l.prototype.adjustNodesSize = function() {
    for (var a = this.graph._nodes, b = 0; b < a.length; ++b) {
      a[b].size = a[b].computeSize();
    }
    this.setDirty(!0, !0);
  };
  l.prototype.resize = function(a, b) {
    a || b || (b = this.canvas.parentNode, a = b.offsetWidth, b = b.offsetHeight);
    if (this.canvas.width != a || this.canvas.height != b) {
      this.canvas.width = a, this.canvas.height = b, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.setDirty(!0, !0);
    }
  };
  l.prototype.switchLiveMode = function(a) {
    if (a) {
      var b = this, d = this.live_mode ? 1.1 : 0.9;
      this.live_mode && (this.live_mode = !1, this.editor_alpha = 0.1);
      var c = setInterval(function() {
        b.editor_alpha *= d;
        b.dirty_canvas = !0;
        b.dirty_bgcanvas = !0;
        1 > d && 0.01 > b.editor_alpha && (clearInterval(c), 1 > d && (b.live_mode = !0));
        1 < d && 0.99 < b.editor_alpha && (clearInterval(c), b.editor_alpha = 1);
      }, 1);
    } else {
      this.live_mode = !this.live_mode, this.dirty_bgcanvas = this.dirty_canvas = !0;
    }
  };
  l.prototype.onNodeSelectionChange = function(a) {
  };
  l.prototype.touchHandler = function(a) {
    var b = a.changedTouches[0];
    switch(a.type) {
      case "touchstart":
        var d = "mousedown";
        break;
      case "touchmove":
        d = "mousemove";
        break;
      case "touchend":
        d = "mouseup";
        break;
      default:
        return;
    }
    var c = this.getCanvasWindow(), f = c.document.createEvent("MouseEvent");
    f.initMouseEvent(d, !0, !0, c, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null);
    b.target.dispatchEvent(f);
    a.preventDefault();
  };
  l.onGroupAdd = function(a, b, d) {
    a = l.active_canvas;
    a.getCanvasWindow();
    b = new e.LGraphGroup;
    b.pos = a.convertEventToCanvasOffset(d);
    a.graph.add(b);
  };
  l.onMenuAdd = function(a, b, d, c, f) {
    function h(a, b) {
      b = c.getFirstEvent();
      if (a = e.createNode(a.value)) {
        a.pos = k.convertEventToCanvasOffset(b), k.graph.add(a);
      }
      f && f(a);
    }
    var k = l.active_canvas, n = k.getCanvasWindow();
    a = e.getNodeTypesCategories(k.filter);
    b = [];
    for (var p in a) {
      a[p] && b.push({value:a[p], content:a[p], has_submenu:!0});
    }
    var g = new e.ContextMenu(b, {event:d, callback:function(a, b, d) {
      a = e.getNodeTypesInCategory(a.value, k.filter);
      b = [];
      for (var f in a) {
        a[f].skip_list || b.push({content:a[f].title, value:a[f].type});
      }
      new e.ContextMenu(b, {event:d, callback:h, parentMenu:g}, n);
      return !1;
    }, parentMenu:c}, n);
    return !1;
  };
  l.onMenuCollapseAll = function() {
  };
  l.onMenuNodeEdit = function() {
  };
  l.showMenuNodeOptionalInputs = function(a, b, d, c, f) {
    if (f) {
      var h = this;
      a = l.active_canvas.getCanvasWindow();
      b = f.optional_inputs;
      f.onGetInputs && (b = f.onGetInputs());
      var k = [];
      if (b) {
        for (var n in b) {
          var p = b[n];
          if (p) {
            var g = p[0];
            p[2] && p[2].label && (g = p[2].label);
            g = {content:g, value:p};
            p[1] == e.ACTION && (g.className = "event");
            k.push(g);
          } else {
            k.push(null);
          }
        }
      }
      this.onMenuNodeInputs && (k = this.onMenuNodeInputs(k));
      if (k.length) {
        return new e.ContextMenu(k, {event:d, callback:function(a, b, d) {
          f && (a.callback && a.callback.call(h, f, a, b, d), a.value && (f.addInput(a.value[0], a.value[1], a.value[2]), f.setDirtyCanvas(!0, !0)));
        }, parentMenu:c, node:f}, a), !1;
      }
    }
  };
  l.showMenuNodeOptionalOutputs = function(a, b, d, c, f) {
    function h(a, b, d) {
      if (f && (a.callback && a.callback.call(k, f, a, b, d), a.value)) {
        if (d = a.value[1], !d || d.constructor !== Object && d.constructor !== Array) {
          f.addOutput(a.value[0], a.value[1], a.value[2]), f.setDirtyCanvas(!0, !0);
        } else {
          a = [];
          for (var n in d) {
            a.push({content:n, value:d[n]});
          }
          new e.ContextMenu(a, {event:b, callback:h, parentMenu:c, node:f});
          return !1;
        }
      }
    }
    if (f) {
      var k = this;
      a = l.active_canvas.getCanvasWindow();
      b = f.optional_outputs;
      f.onGetOutputs && (b = f.onGetOutputs());
      var n = [];
      if (b) {
        for (var p in b) {
          var g = b[p];
          if (!g) {
            n.push(null);
          } else {
            if (!f.flags || !f.flags.skip_repeated_outputs || -1 == f.findOutputSlot(g[0])) {
              var m = g[0];
              g[2] && g[2].label && (m = g[2].label);
              m = {content:m, value:g};
              g[1] == e.EVENT && (m.className = "event");
              n.push(m);
            }
          }
        }
      }
      this.onMenuNodeOutputs && (n = this.onMenuNodeOutputs(n));
      if (n.length) {
        return new e.ContextMenu(n, {event:d, callback:h, parentMenu:c, node:f}, a), !1;
      }
    }
  };
  l.onShowMenuNodeProperties = function(a, b, d, c, f) {
    if (f && f.properties) {
      var h = l.active_canvas;
      b = h.getCanvasWindow();
      var k = [], n;
      for (n in f.properties) {
        a = void 0 !== f.properties[n] ? f.properties[n] : " ", "object" == typeof a && (a = JSON.stringify(a)), a = l.decodeHTML(a), k.push({content:"<span class='property_name'>" + n + "</span><span class='property_value'>" + a + "</span>", value:n});
      }
      if (k.length) {
        return new e.ContextMenu(k, {event:d, callback:function(a, b, d, c) {
          f && (b = this.getBoundingClientRect(), h.showEditPropertyValue(f, a.value, {position:[b.left, b.top]}));
        }, parentMenu:c, allow_html:!0, node:f}, b), !1;
      }
    }
  };
  l.decodeHTML = function(a) {
    var b = document.createElement("div");
    b.innerText = a;
    return b.innerHTML;
  };
  l.onResizeNode = function(a, b, d, c, f) {
    f && (f.size = f.computeSize(), f.setDirtyCanvas(!0, !0));
  };
  l.prototype.showLinkMenu = function(a, b) {
    var d = this;
    console.log(a);
    var c = new e.ContextMenu(["Add Node", null, "Delete"], {event:b, title:null != a.data ? a.data.constructor.name : null, callback:function(b, e, h) {
      switch(b) {
        case "Add Node":
          l.onMenuAdd(null, null, h, c, function(b) {
            console.log("node autoconnect");
            var f = d.graph.getNodeById(a.origin_id), c = d.graph.getNodeById(a.target_id);
            b.inputs && b.inputs.length && b.outputs && b.outputs.length && f.outputs[a.origin_slot].type == b.inputs[0].type && b.outputs[0].type == c.inputs[0].type && (f.connect(a.origin_slot, b, 0), b.connect(0, c, a.target_slot), b.pos[0] -= 0.5 * b.size[0]);
          });
          break;
        case "Delete":
          d.graph.removeLink(a.id);
      }
    }});
    return !1;
  };
  l.onShowPropertyEditor = function(a, b, d, c, f) {
    function e() {
      var b = n.value;
      "Number" == a.type ? b = Number(b) : "Boolean" == a.type && (b = !!b);
      f[h] = b;
      k.parentNode && k.parentNode.removeChild(k);
      f.setDirtyCanvas(!0, !0);
    }
    var h = a.property || "title";
    b = f[h];
    var k = document.createElement("div");
    k.className = "graphdialog";
    k.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>";
    k.querySelector(".name").innerText = h;
    var n = k.querySelector("textarea");
    n && (n.value = b, n.addEventListener("blur", function(a) {
      this.focus();
    }), n.addEventListener("keydown", function(a) {
      13 == a.keyCode && (e(), a.preventDefault(), a.stopPropagation());
    }));
    b = l.active_canvas.canvas;
    d = b.getBoundingClientRect();
    var p = c = -20;
    d && (c -= d.left, p -= d.top);
    event ? (k.style.left = event.clientX + c + "px", k.style.top = event.clientY + p + "px") : (k.style.left = 0.5 * b.width + c + "px", k.style.top = 0.5 * b.height + p + "px");
    k.querySelector("button").addEventListener("click", e);
    b.parentNode.appendChild(k);
  };
  l.prototype.prompt = function(a, b, d, c) {
    var f = this;
    a = a || "";
    var e = !1, h = document.createElement("div");
    h.className = "graphdialog rounded";
    h.innerHTML = "<span class='name'></span> \n             <textarea autofocus cols='4' class='value valueInput'></textarea> \n             <button class='rounded'>OK</button>";
    h.close = function() {
      f.prompt_box = null;
      h.parentNode && h.parentNode.removeChild(h);
    };
    1 < this.ds.scale && (h.style.transform = "scale(" + this.ds.scale + ")");
    h.addEventListener("mouseleave", function(a) {
      e || h.close();
    });
    f.prompt_box && f.prompt_box.close();
    f.prompt_box = h;
    h.querySelector(".name").innerText = a;
    h.querySelector(".value").value = b;
    var k = h.querySelector("textarea");
    k.addEventListener("keydown", function(a) {
      e = !0;
      if (27 == a.keyCode) {
        h.close();
      } else {
        if (13 == a.keyCode) {
          d && d(this.value), h.close();
        } else {
          return;
        }
      }
      a.preventDefault();
      a.stopPropagation();
    });
    h.querySelector("button").addEventListener("click", function(a) {
      d && d(k.value);
      f.setDirty(!0);
      h.close();
    });
    a = l.active_canvas.canvas;
    b = a.getBoundingClientRect();
    var n = -20, p = -20;
    b && (n -= b.left, p -= b.top);
    c ? (h.style.left = c.clientX + n + "px", h.style.top = c.clientY + p + "px") : (h.style.left = 0.5 * a.width + n + "px", h.style.top = 0.5 * a.height + p + "px");
    a.parentNode.appendChild(h);
    setTimeout(function() {
      k.focus();
    }, 10);
    return h;
  };
  l.search_limit = -1;
  l.prototype.showSearchBox = function(a) {
    function b(b) {
      if (b) {
        if (f.onSearchBoxSelection) {
          f.onSearchBoxSelection(b, a, k);
        } else {
          var d = e.searchbox_extras[b.toLowerCase()];
          d && (b = d.type);
          if (b = e.createNode(b)) {
            b.pos = k.convertEventToCanvasOffset(a), k.graph.add(b);
          }
          if (d && d.data) {
            if (d.data.properties) {
              for (var c in d.data.properties) {
                b.addProperty(c, d.data.properties[c]);
              }
            }
            if (d.data.inputs) {
              for (c in b.inputs = [], d.data.inputs) {
                b.addOutput(d.data.inputs[c][0], d.data.inputs[c][1]);
              }
            }
            if (d.data.outputs) {
              for (c in b.outputs = [], d.data.outputs) {
                b.addOutput(d.data.outputs[c][0], d.data.outputs[c][1]);
              }
            }
            d.data.title && (b.title = d.data.title);
            d.data.json && b.configure(d.data.json);
          }
        }
      }
      g.close();
    }
    function d(a) {
      var b = u;
      u && u.classList.remove("selected");
      u ? (u = a ? u.nextSibling : u.previousSibling) || (u = b) : u = a ? r.childNodes[0] : r.childNodes[r.childNodes.length];
      u && (u.classList.add("selected"), u.scrollIntoView({block:"end", behavior:"smooth"}));
    }
    function c() {
      function a(a, d) {
        var f = document.createElement("div");
        t || (t = a);
        f.innerText = a;
        f.dataset.type = escape(a);
        f.className = "litegraph lite-search-item";
        d && (f.className += " " + d);
        f.addEventListener("click", function(a) {
          b(unescape(this.dataset.type));
        });
        r.appendChild(f);
      }
      q = null;
      var d = B.value;
      t = null;
      r.innerHTML = "";
      if (d) {
        if (f.onSearchBox) {
          var c = f.onSearchBox(r, d, k);
          if (c) {
            for (var h = 0; h < c.length; ++h) {
              a(c[h]);
            }
          }
        } else {
          c = function(a) {
            var b = e.registered_node_types[a];
            return p && b.filter != p ? !1 : -1 !== a.toLowerCase().indexOf(d);
          };
          var n = 0;
          d = d.toLowerCase();
          var p = k.filter || k.graph.filter;
          for (h in e.searchbox_extras) {
            var g = e.searchbox_extras[h];
            if (-1 !== g.desc.toLowerCase().indexOf(d)) {
              var m = e.registered_node_types[g.type];
              if (!m || !m.filter || m.filter == p) {
                if (a(g.desc, "searchbox_extra"), -1 !== l.search_limit && n++ > l.search_limit) {
                  break;
                }
              }
            }
          }
          g = null;
          if (Array.prototype.filter) {
            g = Object.keys(e.registered_node_types).filter(c);
          } else {
            for (h in g = [], e.registered_node_types) {
              c(h) && g.push(h);
            }
          }
          for (h = 0; h < g.length && !(a(g[h]), -1 !== l.search_limit && n++ > l.search_limit); h++) {
          }
        }
      }
    }
    var f = this, k = l.active_canvas, n = k.canvas, p = n.ownerDocument || document, g = document.createElement("div");
    g.className = "litegraph litesearchbox graphdialog rounded";
    g.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/><div class='helper'></div>";
    g.close = function() {
      f.search_box = null;
      p.body.focus();
      p.body.style.overflow = "";
      setTimeout(function() {
        f.canvas.focus();
      }, 20);
      g.parentNode && g.parentNode.removeChild(g);
    };
    var m = null;
    1 < this.ds.scale && (g.style.transform = "scale(" + this.ds.scale + ")");
    g.addEventListener("mouseenter", function(a) {
      m && (clearTimeout(m), m = null);
    });
    g.addEventListener("mouseleave", function(a) {
      m = setTimeout(function() {
        g.close();
      }, 500);
    });
    f.search_box && f.search_box.close();
    f.search_box = g;
    var r = g.querySelector(".helper"), t = null, q = null, u = null, B = g.querySelector("textarea");
    B && (B.addEventListener("blur", function(a) {
      this.focus();
    }), B.addEventListener("keydown", function(a) {
      if (38 == a.keyCode) {
        d(!1);
      } else {
        if (40 == a.keyCode) {
          d(!0);
        } else {
          if (27 == a.keyCode) {
            g.close();
          } else {
            if (13 == a.keyCode) {
              u ? b(u.innerHTML) : t ? b(t) : g.close();
            } else {
              q && clearInterval(q);
              q = setTimeout(c, 10);
              return;
            }
          }
        }
      }
      a.preventDefault();
      a.stopPropagation();
      a.stopImmediatePropagation();
      return !0;
    }));
    p.fullscreenElement ? p.fullscreenElement.appendChild(g) : (p.body.appendChild(g), p.body.style.overflow = "hidden");
    n = n.getBoundingClientRect();
    var w = (a ? a.clientY : n.top + 0.5 * n.height) - 20;
    g.style.left = (a ? a.clientX : n.left + 0.5 * n.width) - 80 + "px";
    g.style.top = w + "px";
    a.layerY > n.height - 200 && (r.style.maxHeight = n.height - a.layerY - 20 + "px");
    B.focus();
    return g;
  };
  l.prototype.showEditPropertyValue = function(a, b, d) {
    function c() {
      f(t.value);
    }
    function f(f) {
      "number" == typeof a.properties[b] && (f = Number(f));
      if ("array" == k || "object" == k) {
        f = JSON.parse(f);
      }
      a.properties[b] = f;
      a._graph && a._graph._version++;
      if (a.onPropertyChanged) {
        a.onPropertyChanged(b, f);
      }
      if (d.onclose) {
        d.onclose();
      }
      l.close();
      a.setDirtyCanvas(!0, !0);
    }
    if (a && void 0 !== a.properties[b]) {
      d = d || {};
      var e = a.getPropertyInfo(b), k = e.type, n = "";
      if ("string" == k || "number" == k || "array" == k || "object" == k) {
        n = "<input autofocus type='text' class='value'/>";
      } else {
        if ("enum" == k && e.values) {
          n = "<select autofocus type='text' class='value'>";
          for (var p in e.values) {
            var g = e.values.constructor === Array ? e.values[p] : p;
            n += "<option value='" + g + "' " + (g == a.properties[b] ? "selected" : "") + ">" + e.values[p] + "</option>";
          }
          n += "</select>";
        } else {
          if ("boolean" == k) {
            n = "<input autofocus type='checkbox' class='value' " + (a.properties[b] ? "checked" : "") + "/>";
          } else {
            console.warn("unknown type: " + k);
            return;
          }
        }
      }
      var l = this.createDialog("<span class='name'>" + b + "</span>" + n + "<button>OK</button>", d);
      if ("enum" == k && e.values) {
        var t = l.querySelector("select");
        t.addEventListener("change", function(a) {
          f(a.target.value);
        });
      } else {
        if ("boolean" == k) {
          (t = l.querySelector("textarea")) && t.addEventListener("click", function(a) {
            f(!!t.checked);
          });
        } else {
          if (t = l.querySelector("textarea")) {
            t.addEventListener("blur", function(a) {
              this.focus();
            }), g = void 0 !== a.properties[b] ? a.properties[b] : "", g = JSON.stringify(g), t.value = g, t.addEventListener("keydown", function(a) {
              13 == a.keyCode && (c(), a.preventDefault(), a.stopPropagation());
            });
          }
        }
      }
      l.querySelector("button").addEventListener("click", c);
      return l;
    }
  };
  l.prototype.createDialog = function(a, b) {
    b = b || {};
    var d = document.createElement("div");
    d.className = "graphdialog";
    d.innerHTML = a;
    a = this.canvas.getBoundingClientRect();
    var c = -20, f = -20;
    a && (c -= a.left, f -= a.top);
    b.position ? (c += b.position[0], f += b.position[1]) : b.event ? (c += b.event.clientX, f += b.event.clientY) : (c += 0.5 * this.canvas.width, f += 0.5 * this.canvas.height);
    d.style.left = c + "px";
    d.style.top = f + "px";
    this.canvas.parentNode.appendChild(d);
    d.close = function() {
      this.parentNode && this.parentNode.removeChild(this);
    };
    return d;
  };
  l.onMenuNodeCollapse = function(a, b, d, c, f) {
    f.collapse();
  };
  l.onMenuNodePin = function(a, b, d, c, f) {
    f.pin();
  };
  l.onMenuNodeMode = function(a, b, d, c, f) {
    new e.ContextMenu(["Always", "On Event", "On Trigger", "Never"], {event:d, callback:function(a) {
      if (f) {
        switch(a) {
          case "On Event":
            f.mode = e.ON_EVENT;
            break;
          case "On Trigger":
            f.mode = e.ON_TRIGGER;
            break;
          case "Never":
            f.mode = e.NEVER;
            break;
          default:
            f.mode = e.ALWAYS;
        }
      }
    }, parentMenu:c, node:f});
    return !1;
  };
  l.onMenuNodeColors = function(a, b, d, c, f) {
    if (!f) {
      throw "no node for color";
    }
    b = [];
    b.push({value:null, content:"<span style='display: block; padding-left: 4px;'>No color</span>"});
    for (var h in l.node_colors) {
      a = l.node_colors[h], a = {value:h, content:"<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid " + a.color + "; background-color:" + a.bgcolor + "'>" + h + "</span>"}, b.push(a);
    }
    new e.ContextMenu(b, {event:d, callback:function(a) {
      f && ((a = a.value ? l.node_colors[a.value] : null) ? f.constructor === e.LGraphGroup ? f.color = a.groupcolor : (f.color = a.color, f.bgcolor = a.bgcolor) : (delete f.color, delete f.bgcolor), f.setDirtyCanvas(!0, !0));
    }, parentMenu:c, node:f});
    return !1;
  };
  l.onMenuNodeShapes = function(a, b, d, c, f) {
    if (!f) {
      throw "no node passed";
    }
    new e.ContextMenu(e.VALID_SHAPES, {event:d, callback:function(a) {
      f && (f.shape = a, f.setDirtyCanvas(!0));
    }, parentMenu:c, node:f});
    return !1;
  };
  l.onMenuNodeRemove = function(a, b, d, c, f) {
    if (!f) {
      throw "no node passed";
    }
    !1 !== f.removable && (f.graph.remove(f), f.setDirtyCanvas(!0, !0));
  };
  l.onMenuNodeClone = function(a, b, d, c, f) {
    0 != f.clonable && (a = f.clone()) && (a.pos = [f.pos[0] + 5, f.pos[1] + 5], f.graph.add(a), f.setDirtyCanvas(!0, !0));
  };
  l.node_colors = {red:{color:"#322", bgcolor:"#533", groupcolor:"#A88"}, brown:{color:"#332922", bgcolor:"#593930", groupcolor:"#b06634"}, green:{color:"#232", bgcolor:"#353", groupcolor:"#8A8"}, blue:{color:"#223", bgcolor:"#335", groupcolor:"#88A"}, pale_blue:{color:"#2a363b", bgcolor:"#3f5159", groupcolor:"#3f789e"}, cyan:{color:"#233", bgcolor:"#355", groupcolor:"#8AA"}, purple:{color:"#323", bgcolor:"#535", groupcolor:"#a1309b"}, yellow:{color:"#432", bgcolor:"#653", groupcolor:"#b58b2a"}, 
  black:{color:"#222", bgcolor:"#000", groupcolor:"#444"}};
  l.prototype.getCanvasMenuOptions = function() {
    if (this.getMenuOptions) {
      var a = this.getMenuOptions();
    } else {
      a = [{content:"Add Node", has_submenu:!0, callback:l.onMenuAdd}, {content:"Add Group", callback:l.onGroupAdd}], this._graph_stack && 0 < this._graph_stack.length && a.push(null, {content:"Close subgraph", callback:this.closeSubgraph.bind(this)});
    }
    if (this.getExtraMenuOptions) {
      var b = this.getExtraMenuOptions(this, a);
      b && (a = a.concat(b));
    }
    return a;
  };
  l.prototype.getNodeMenuOptions = function(a) {
    var b = a.getMenuOptions ? a.getMenuOptions(this) : [{content:"Inputs", has_submenu:!0, disabled:!0, callback:l.showMenuNodeOptionalInputs}, {content:"Outputs", has_submenu:!0, disabled:!0, callback:l.showMenuNodeOptionalOutputs}, null, {content:"Properties", has_submenu:!0, callback:l.onShowMenuNodeProperties}, null, {content:"Title", callback:l.onShowPropertyEditor}, {content:"Mode", has_submenu:!0, callback:l.onMenuNodeMode}, {content:"Resize", callback:l.onResizeNode}, {content:"Collapse", 
    callback:l.onMenuNodeCollapse}, {content:"Pin", callback:l.onMenuNodePin}, {content:"Colors", has_submenu:!0, callback:l.onMenuNodeColors}, {content:"Shapes", has_submenu:!0, callback:l.onMenuNodeShapes}, null];
    if (a.onGetInputs) {
      var d = a.onGetInputs();
      d && d.length && (b[0].disabled = !1);
    }
    a.onGetOutputs && (d = a.onGetOutputs()) && d.length && (b[1].disabled = !1);
    a.getExtraMenuOptions && (d = a.getExtraMenuOptions(this)) && (d.push(null), b = d.concat(b));
    !1 !== a.clonable && b.push({content:"Clone", callback:l.onMenuNodeClone});
    !1 !== a.removable && b.push(null, {content:"Remove", callback:l.onMenuNodeRemove});
    if (a.graph && a.graph.onGetNodeMenuOptions) {
      a.graph.onGetNodeMenuOptions(b, a);
    }
    return b;
  };
  l.prototype.getGroupMenuOptions = function(a) {
    return [{content:"Title", callback:l.onShowPropertyEditor}, {content:"Color", has_submenu:!0, callback:l.onMenuNodeColors}, {content:"Font size", property:"font_size", type:"Number", callback:l.onShowPropertyEditor}, null, {content:"Remove", callback:l.onMenuNodeRemove}];
  };
  l.prototype.processContextMenu = function(a, b) {
    var d = this, c = l.active_canvas.getCanvasWindow(), f = null, k = {event:b, callback:function(b, f, c) {
      if (b) {
        if ("Remove Slot" == b.content) {
          b = b.slot, b.input ? a.removeInput(b.slot) : b.output && a.removeOutput(b.slot);
        } else {
          if ("Disconnect Links" == b.content) {
            b = b.slot, b.output ? a.disconnectOutput(b.slot) : b.input && a.disconnectInput(b.slot);
          } else {
            if ("Rename Slot" == b.content) {
              b = b.slot;
              var e = b.input ? a.getInputInfo(b.slot) : a.getOutputInfo(b.slot), h = d.createDialog("<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>", f), k = h.querySelector(".textarea");
              k && e && (k.value = e.label || "");
              h.querySelector("button").addEventListener("click", function(a) {
                k.value && (e && (e.label = k.value), d.setDirty(!0));
                h.close();
              });
            }
          }
        }
      }
    }, extra:a};
    a && (k.title = a.type);
    var n = null;
    a && (n = a.getSlotInPosition(b.canvasX, b.canvasY), l.active_node = a);
    n ? (f = [], a.getSlotMenuOptions ? f = a.getSlotMenuOptions(n) : (n && n.output && n.output.links && n.output.links.length && f.push({content:"Disconnect Links", slot:n}), b = n.input || n.output, f.push(b.locked ? "Cannot remove" : {content:"Remove Slot", slot:n}), f.push(b.nameLocked ? "Cannot rename" : {content:"Rename Slot", slot:n})), k.title = (n.input ? n.input.type : n.output.type) || "*", n.input && n.input.type == e.ACTION && (k.title = "Action"), n.output && n.output.type == e.EVENT && 
    (k.title = "Event")) : a ? f = this.getNodeMenuOptions(a) : (f = this.getCanvasMenuOptions(), (n = this.graph.getGroupOnPos(b.canvasX, b.canvasY)) && f.push(null, {content:"Edit Group", has_submenu:!0, submenu:{title:"Group", extra:n, options:this.getGroupMenuOptions(n)}}));
    f && new e.ContextMenu(f, k, c);
  };
  "undefined" != typeof window && window.CanvasRenderingContext2D && (window.CanvasRenderingContext2D.prototype.roundRect = function(a, b, d, c, f, e) {
    void 0 === f && (f = 5);
    void 0 === e && (e = f);
    this.moveTo(a + f, b);
    this.lineTo(a + d - f, b);
    this.quadraticCurveTo(a + d, b, a + d, b + f);
    this.lineTo(a + d, b + c - e);
    this.quadraticCurveTo(a + d, b + c, a + d - e, b + c);
    this.lineTo(a + e, b + c);
    this.quadraticCurveTo(a, b + c, a, b + c - e);
    this.lineTo(a, b + f);
    this.quadraticCurveTo(a, b, a + f, b);
  });
  e.compareObjects = function(a, b) {
    for (var d in a) {
      if (a[d] != b[d]) {
        return !1;
      }
    }
    return !0;
  };
  e.distance = C;
  e.colorToString = function(a) {
    return "rgba(" + Math.round(255 * a[0]).toFixed() + "," + Math.round(255 * a[1]).toFixed() + "," + Math.round(255 * a[2]).toFixed() + "," + (4 == a.length ? a[3].toFixed(2) : "1.0") + ")";
  };
  e.isInsideRectangle = y;
  e.growBounding = function(a, b, d) {
    b < a[0] ? a[0] = b : b > a[2] && (a[2] = b);
    d < a[1] ? a[1] = d : d > a[3] && (a[3] = d);
  };
  e.isInsideBounding = function(a, b) {
    return a[0] < b[0][0] || a[1] < b[0][1] || a[0] > b[1][0] || a[1] > b[1][1] ? !1 : !0;
  };
  e.overlapBounding = w;
  e.hex2num = function(a) {
    "#" == a.charAt(0) && (a = a.slice(1));
    a = a.toUpperCase();
    for (var b = Array(3), d = 0, c, f, e = 0; 6 > e; e += 2) {
      c = "0123456789ABCDEF".indexOf(a.charAt(e)), f = "0123456789ABCDEF".indexOf(a.charAt(e + 1)), b[d] = 16 * c + f, d++;
    }
    return b;
  };
  e.num2hex = function(a) {
    for (var b = "#", d, c, f = 0; 3 > f; f++) {
      d = a[f] / 16, c = a[f] % 16, b += "0123456789ABCDEF".charAt(d) + "0123456789ABCDEF".charAt(c);
    }
    return b;
  };
  E.prototype.addItem = function(a, b, d) {
    function c(a) {
      var b = this.value;
      b && b.has_submenu && f.call(this, a);
    }
    function f(a) {
      var b = this.value, f = !0;
      e.current_submenu && e.current_submenu.close(a);
      if (d.callback) {
        var c = d.callback.call(this, b, d, a, e, d.node);
        !0 === c && (f = !1);
      }
      if (b && (b.callback && !d.ignore_item_callbacks && !0 !== b.disabled && (c = b.callback.call(this, b, d, a, e, d.extra), !0 === c && (f = !1)), b.submenu)) {
        if (!b.submenu.options) {
          throw "ContextMenu submenu needs options";
        }
        new e.constructor(b.submenu.options, {callback:b.submenu.callback, event:a, parentMenu:e, ignore_item_callbacks:b.submenu.ignore_item_callbacks, title:b.submenu.title, extra:b.submenu.extra, autoopen:d.autoopen});
        f = !1;
      }
      f && !e.lock && e.close();
    }
    var e = this;
    d = d || {};
    var k = document.createElement("div");
    k.className = "litemenu-entry submenu";
    var n = !1;
    if (null === b) {
      k.classList.add("separator");
    } else {
      k.innerHTML = b && b.title ? b.title : a;
      if (k.value = b) {
        b.disabled && (n = !0, k.classList.add("disabled")), (b.submenu || b.has_submenu) && k.classList.add("has_submenu");
      }
      "function" == typeof b ? (k.dataset.value = a, k.onclick_callback = b) : k.dataset.value = b;
      b.className && (k.className += " " + b.className);
    }
    this.root.appendChild(k);
    n || k.addEventListener("click", f);
    d.autoopen && k.addEventListener("mouseenter", c);
    return k;
  };
  E.prototype.close = function(a, b) {
    this.root.parentNode && this.root.parentNode.removeChild(this.root);
    this.parentMenu && !b && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, void 0 === a ? this.parentMenu.close() : a && !E.isCursorOverElement(a, this.parentMenu.root) && E.trigger(this.parentMenu.root, "mouseleave", a));
    this.current_submenu && this.current_submenu.close(a, !0);
    this.root.closing_timer && clearTimeout(this.root.closing_timer);
  };
  E.trigger = function(a, b, d, c) {
    var f = document.createEvent("CustomEvent");
    f.initCustomEvent(b, !0, !0, d);
    f.srcElement = c;
    a.dispatchEvent ? a.dispatchEvent(f) : a.__events && a.__events.dispatchEvent(f);
    return f;
  };
  E.prototype.getTopMenu = function() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  };
  E.prototype.getFirstEvent = function() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  };
  E.isCursorOverElement = function(a, b) {
    var d = a.clientX;
    a = a.clientY;
    return (b = b.getBoundingClientRect()) ? a > b.top && a < b.top + b.height && d > b.left && d < b.left + b.width ? !0 : !1 : !1;
  };
  e.ContextMenu = E;
  e.closeAllContextMenus = function(a) {
    a = a || window;
    a = a.document.querySelectorAll(".litecontextmenu");
    if (a.length) {
      for (var b = [], d = 0; d < a.length; d++) {
        b.push(a[d]);
      }
      for (d in b) {
        b[d].close ? b[d].close() : b[d].parentNode && b[d].parentNode.removeChild(b[d]);
      }
    }
  };
  e.extendClass = function(a, b) {
    for (var d in b) {
      a.hasOwnProperty(d) || (a[d] = b[d]);
    }
    if (b.prototype) {
      for (d in b.prototype) {
        b.prototype.hasOwnProperty(d) && !a.prototype.hasOwnProperty(d) && (b.prototype.__lookupGetter__(d) ? a.prototype.__defineGetter__(d, b.prototype.__lookupGetter__(d)) : a.prototype[d] = b.prototype[d], b.prototype.__lookupSetter__(d) && a.prototype.__defineSetter__(d, b.prototype.__lookupSetter__(d)));
      }
    }
  };
  z.sampleCurve = function(a, b) {
    if (b) {
      for (var d = 0; d < b.length - 1; ++d) {
        var c = b[d], f = b[d + 1];
        if (!(f[0] < a)) {
          b = f[0] - c[0];
          if (0.00001 > Math.abs(b)) {
            return c[1];
          }
          a = (a - c[0]) / b;
          return c[1] * (1.0 - a) + f[1] * a;
        }
      }
      return 0;
    }
  };
  z.prototype.draw = function(a, b, d, c, f, e) {
    if (d = this.points) {
      this.size = b;
      var k = b[0] - 2 * this.margin;
      b = b[1] - 2 * this.margin;
      f = f || "#666";
      a.save();
      a.translate(this.margin, this.margin);
      c && (a.fillStyle = "#111", a.fillRect(0, 0, k, b), a.fillStyle = "#222", a.fillRect(0.5 * k, 0, 1, b), a.strokeStyle = "#333", a.strokeRect(0, 0, k, b));
      a.strokeStyle = f;
      e && (a.globalAlpha = 0.5);
      a.beginPath();
      for (c = 0; c < d.length; ++c) {
        f = d[c], a.lineTo(f[0] * k, (1.0 - f[1]) * b);
      }
      a.stroke();
      a.globalAlpha = 1;
      if (!e) {
        for (c = 0; c < d.length; ++c) {
          f = d[c], a.fillStyle = this.selected == c ? "#FFF" : this.nearest == c ? "#DDD" : "#AAA", a.beginPath(), a.arc(f[0] * k, (1.0 - f[1]) * b, 2, 0, 2 * Math.PI), a.fill();
        }
      }
      a.restore();
    }
  };
  z.prototype.onMouseDown = function(a, b) {
    var d = this.points;
    if (d && !(0 > a[1])) {
      var c = this.size[0] - 2 * this.margin, f = this.size[1] - 2 * this.margin, e = a[0] - this.margin;
      a = a[1] - this.margin;
      this.selected = this.getCloserPoint([e, a], 30 / b.ds.scale);
      -1 == this.selected && (b = [e / c, 1 - a / f], d.push(b), d.sort(function(a, b) {
        return a[0] - b[0];
      }), this.selected = d.indexOf(b), this.must_update = !0);
      if (-1 != this.selected) {
        return !0;
      }
    }
  };
  z.prototype.onMouseMove = function(a, b) {
    var d = this.points;
    if (d) {
      var c = this.selected;
      if (!(0 > c)) {
        var f = (a[0] - this.margin) / (this.size[0] - 2 * this.margin), e = (a[1] - this.margin) / (this.size[1] - 2 * this.margin);
        this._nearest = this.getCloserPoint([a[0] - this.margin, a[1] - this.margin], 30 / b.ds.scale);
        if (b = d[c]) {
          var k = 0 == c || c == d.length - 1;
          !k && (-10 > a[0] || a[0] > this.size[0] + 10 || -10 > a[1] || a[1] > this.size[1] + 10) ? (d.splice(c, 1), this.selected = -1) : (b[0] = k ? 0 == c ? 0 : 1 : Math.clamp(f, 0, 1), b[1] = 1.0 - Math.clamp(e, 0, 1), d.sort(function(a, b) {
            return a[0] - b[0];
          }), this.selected = d.indexOf(b), this.must_update = !0);
        }
      }
    }
  };
  z.prototype.onMouseUp = function(a, b) {
    this.selected = -1;
    return !1;
  };
  z.prototype.getCloserPoint = function(a, b) {
    var d = this.points;
    if (!d) {
      return -1;
    }
    b = b || 30;
    for (var c = this.size[0] - 2 * this.margin, f = this.size[1] - 2 * this.margin, e = d.length, k = [0, 0], n = 1000000, p = -1, g = 0; g < e; ++g) {
      var l = d[g];
      k[0] = l[0] * c;
      k[1] = (1.0 - l[1]) * f;
      l = vec2.distance(a, k);
      l > n || l > b || (p = g, n = l);
    }
    return p;
  };
  e.CurveEditor = z;
  e.getParameterNames = function(a) {
    return (a + "").replace(/[/][/].*$/gm, "").replace(/\s+/g, "").replace(/[/][*][^/*]*[*][/]/g, "").split("){", 1)[0].replace(/^[^(]*[(]/, "").replace(/=[^,]+/g, "").split(",").filter(Boolean);
  };
  Math.clamp = function(a, b, d) {
    return b > a ? b : d < a ? d : a;
  };
  "undefined" == typeof window || window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1000 / 60);
  });
})(this);
"undefined" != typeof exports && (exports.LiteGraph = this.LiteGraph);
(function(v) {
  function c() {
    this.addOutput("in ms", "number");
    this.addOutput("in sec", "number");
  }
  function q() {
    this.size = [140, 80];
    this.properties = {enabled:!0};
    this.enabled = !0;
    this.subgraph = new h.LGraph;
    this.subgraph._subgraph_node = this;
    this.subgraph._is_subgraph = !0;
    this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this);
    this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this);
    this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this);
    this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this);
    this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this);
    this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this);
    this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this);
    this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this);
    this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this);
  }
  function m() {
    this.addOutput("", "number");
    this.name_in_graph = "";
    this.properties = {name:"", type:"number", value:0};
    var a = this;
    this.name_widget = this.addWidget("text", "Name", this.properties.name, function(b) {
      b && a.setProperty("name", b);
    });
    this.type_widget = this.addWidget("text", "Type", this.properties.type, function(b) {
      a.setProperty("type", b);
    });
    this.value_widget = this.addWidget("number", "Value", this.properties.value, function(b) {
      a.setProperty("value", b);
    });
    this.widgets_up = !0;
    this.size = [180, 90];
  }
  function g() {
    this.addInput("", "");
    this.name_in_graph = "";
    this.properties = {};
    var a = this;
    Object.defineProperty(this.properties, "name", {get:function() {
      return a.name_in_graph;
    }, set:function(b) {
      "" != b && b != a.name_in_graph && (a.name_in_graph ? a.graph.renameOutput(a.name_in_graph, b) : a.graph.addOutput(b, a.properties.type), a.name_widget.value = b, a.name_in_graph = b);
    }, enumerable:!0});
    Object.defineProperty(this.properties, "type", {get:function() {
      return a.inputs[0].type;
    }, set:function(b) {
      if ("action" == b || "event" == b) {
        b = h.ACTION;
      }
      a.inputs[0].type = b;
      a.name_in_graph && a.graph.changeOutputType(a.name_in_graph, a.inputs[0].type);
      a.type_widget.value = b || "";
    }, enumerable:!0});
    this.name_widget = this.addWidget("text", "Name", this.properties.name, "name");
    this.type_widget = this.addWidget("text", "Type", this.properties.type, "type");
    this.widgets_up = !0;
    this.size = [180, 60];
  }
  function r() {
    this.addOutput("value", "number");
    this.addProperty("value", 1.0);
    this.widget = this.addWidget("number", "value", 1, "value");
    this.widgets_up = !0;
    this.size = [180, 30];
  }
  function l() {
    this.addOutput("", "boolean");
    this.addProperty("value", !0);
    this.widget = this.addWidget("toggle", "value", !0, "value");
    this.widgets_up = !0;
    this.size = [140, 30];
  }
  function C() {
    this.addOutput("", "string");
    this.addProperty("value", "");
    this.widget = this.addWidget("text", "value", "", "value");
    this.widgets_up = !0;
    this.size = [180, 30];
  }
  function y() {
    this.addInput("url", "");
    this.addOutput("", "");
    this.addProperty("url", "");
    this.addProperty("type", "text");
    this.widget = this.addWidget("text", "url", "", "url");
    this._data = null;
  }
  function w() {
    this.addOutput("", "");
    this.addProperty("value", "");
    this.widget = this.addWidget("text", "json", "", "value");
    this.widgets_up = !0;
    this.size = [140, 30];
    this._value = null;
  }
  function E() {
    this.addInput("", "");
    this.addOutput("", "array");
    this.addProperty("value", "");
    this.widget = this.addWidget("text", "array", "", "value");
    this.widgets_up = !0;
    this.size = [140, 30];
    this._value = null;
  }
  function z() {
    this.addInput("array", "array,table,string");
    this.addInput("index", "number");
    this.addOutput("value", "");
    this.addProperty("index", 0);
  }
  function e() {
    this.addInput("table", "table");
    this.addInput("row", "number");
    this.addInput("col", "number");
    this.addOutput("value", "");
    this.addProperty("row", 0);
    this.addProperty("column", 0);
  }
  function B() {
    this.addInput("obj", "");
    this.addOutput("", "");
    this.addProperty("value", "");
    this.widget = this.addWidget("text", "prop.", "", this.setValue.bind(this));
    this.widgets_up = !0;
    this.size = [140, 30];
    this._value = null;
  }
  function D() {
    this.addInput("obj", "");
    this.addOutput("keys", "array");
    this.size = [140, 30];
  }
  function u() {
    this.addInput("A", "object");
    this.addInput("B", "object");
    this.addOutput("", "object");
    this._result = {};
    var a = this;
    this.addWidget("button", "clear", "", function() {
      a._result = {};
    });
    this.size = this.computeSize();
  }
  function H() {
    this.size = [60, 30];
    this.addInput("in");
    this.addOutput("out");
    this.properties = {varname:"myname", global:!1};
    this.value = null;
  }
  function n() {
    this.size = [60, 30];
    this.addInput("data", 0);
    this.addInput("download", h.ACTION);
    this.properties = {filename:"data.json"};
    this.value = null;
    var a = this;
    this.addWidget("button", "Download", "", function(b) {
      a.value && a.downloadAsFile();
    });
  }
  function p() {
    this.size = [60, 30];
    this.addInput("value", 0, {label:""});
    this.value = 0;
  }
  function k() {
    this.addInput("in", 0);
    this.addOutput("out", 0);
    this.size = [40, 30];
  }
  function a() {
    this.mode = h.ON_EVENT;
    this.size = [80, 30];
    this.addProperty("msg", "");
    this.addInput("log", h.EVENT);
    this.addInput("msg", 0);
  }
  function b() {
    this.mode = h.ON_EVENT;
    this.addProperty("msg", "");
    this.addInput("", h.EVENT);
    var a = this;
    this.widget = this.addWidget("text", "Text", "", function(b) {
      a.properties.msg = b;
    });
    this.widgets_up = !0;
    this.size = [200, 30];
  }
  function d() {
    this.size = [60, 30];
    this.addProperty("onExecute", "return A;");
    this.addInput("A", "");
    this.addInput("B", "");
    this.addOutput("out", "");
    this._func = null;
    this.data = {};
  }
  var h = v.LiteGraph;
  c.title = "Time";
  c.desc = "Time";
  c.prototype.onExecute = function() {
    this.setOutputData(0, 1000 * this.graph.globaltime);
    this.setOutputData(1, this.graph.globaltime);
  };
  h.registerNodeType("basic/time", c);
  q.title = "Subgraph";
  q.desc = "Graph inside a node";
  q.title_color = "#334";
  q.prototype.onGetInputs = function() {
    return [["enabled", "boolean"]];
  };
  q.prototype.onDrawTitle = function(a) {
    if (!this.flags.collapsed) {
      a.fillStyle = "#555";
      var b = h.NODE_TITLE_HEIGHT, d = this.size[0] - b;
      a.fillRect(d, -b, b, b);
      a.fillStyle = "#333";
      a.beginPath();
      a.moveTo(d + 0.2 * b, 0.6 * -b);
      a.lineTo(d + 0.8 * b, 0.6 * -b);
      a.lineTo(d + 0.5 * b, 0.3 * -b);
      a.fill();
    }
  };
  q.prototype.onDblClick = function(a, b, d) {
    var f = this;
    setTimeout(function() {
      d.openSubgraph(f.subgraph);
    }, 10);
  };
  q.prototype.onMouseDown = function(a, b, d) {
    if (!this.flags.collapsed && b[0] > this.size[0] - h.NODE_TITLE_HEIGHT && 0 > b[1]) {
      var f = this;
      setTimeout(function() {
        d.openSubgraph(f.subgraph);
      }, 10);
    }
  };
  q.prototype.onAction = function(a, b) {
    this.subgraph.onAction(a, b);
  };
  q.prototype.onExecute = function() {
    if (this.enabled = this.getInputOrProperty("enabled")) {
      if (this.inputs) {
        for (var a = 0; a < this.inputs.length; a++) {
          var b = this.inputs[a], d = this.getInputData(a);
          this.subgraph.setInputData(b.name, d);
        }
      }
      this.subgraph.runStep();
      if (this.outputs) {
        for (a = 0; a < this.outputs.length; a++) {
          d = this.subgraph.getOutputData(this.outputs[a].name), this.setOutputData(a, d);
        }
      }
    }
  };
  q.prototype.sendEventToAllNodes = function(a, b, d) {
    this.enabled && this.subgraph.sendEventToAllNodes(a, b, d);
  };
  q.prototype.onSubgraphTrigger = function(a, b) {
    a = this.findOutputSlot(a);
    -1 != a && this.triggerSlot(a);
  };
  q.prototype.onSubgraphNewInput = function(a, b) {
    -1 == this.findInputSlot(a) && this.addInput(a, b);
  };
  q.prototype.onSubgraphRenamedInput = function(a, b) {
    a = this.findInputSlot(a);
    -1 != a && (this.getInputInfo(a).name = b);
  };
  q.prototype.onSubgraphTypeChangeInput = function(a, b) {
    a = this.findInputSlot(a);
    -1 != a && (this.getInputInfo(a).type = b);
  };
  q.prototype.onSubgraphRemovedInput = function(a) {
    a = this.findInputSlot(a);
    -1 != a && this.removeInput(a);
  };
  q.prototype.onSubgraphNewOutput = function(a, b) {
    -1 == this.findOutputSlot(a) && this.addOutput(a, b);
  };
  q.prototype.onSubgraphRenamedOutput = function(a, b) {
    a = this.findOutputSlot(a);
    -1 != a && (this.getOutputInfo(a).name = b);
  };
  q.prototype.onSubgraphTypeChangeOutput = function(a, b) {
    a = this.findOutputSlot(a);
    -1 != a && (this.getOutputInfo(a).type = b);
  };
  q.prototype.onSubgraphRemovedOutput = function(a) {
    a = this.findInputSlot(a);
    -1 != a && this.removeOutput(a);
  };
  q.prototype.getExtraMenuOptions = function(a) {
    var b = this;
    return [{content:"Open", callback:function() {
      a.openSubgraph(b.subgraph);
    }}];
  };
  q.prototype.onResize = function(a) {
    a[1] += 20;
  };
  q.prototype.serialize = function() {
    var a = h.LGraphNode.prototype.serialize.call(this);
    a.subgraph = this.subgraph.serialize();
    return a;
  };
  q.prototype.clone = function() {
    var a = h.createNode(this.type), b = this.serialize();
    delete b.id;
    delete b.inputs;
    delete b.outputs;
    a.configure(b);
    return a;
  };
  h.Subgraph = q;
  h.registerNodeType("graph/subgraph", q);
  m.title = "Input";
  m.desc = "Input of the graph";
  m.prototype.onConfigure = function() {
    this.updateType();
  };
  m.prototype.updateType = function() {
    var a = this.properties.type;
    this.type_widget.value = a;
    this.outputs[0].type != a && (this.outputs[0].type = a, this.disconnectOutput(0));
    "number" == a ? (this.value_widget.type = "number", this.value_widget.value = 0) : "boolean" == a ? (this.value_widget.type = "toggle", this.value_widget.value = !0) : "string" == a ? (this.value_widget.type = "text", this.value_widget.value = "") : (this.value_widget.type = null, this.value_widget.value = null);
    this.properties.value = this.value_widget.value;
  };
  m.prototype.onPropertyChanged = function(a, b) {
    if ("name" == a) {
      if ("" == b || b == this.name_in_graph || "enabled" == b) {
        return !1;
      }
      this.graph && (this.name_in_graph ? this.graph.renameInput(this.name_in_graph, b) : this.graph.addInput(b, this.properties.type));
      this.name_in_graph = this.name_widget.value = b;
    } else {
      "type" == a && this.updateType(b || "");
    }
  };
  m.prototype.getTitle = function() {
    return this.flags.collapsed ? this.properties.name : this.title;
  };
  m.prototype.onAction = function(a, b) {
    this.properties.type == h.EVENT && this.triggerSlot(0, b);
  };
  m.prototype.onExecute = function() {
    var a = this.graph.inputs[this.properties.name];
    a ? this.setOutputData(0, void 0 !== a.value ? a.value : this.properties.value) : this.setOutputData(0, this.properties.value);
  };
  m.prototype.onRemoved = function() {
    this.name_in_graph && this.graph.removeInput(this.name_in_graph);
  };
  h.GraphInput = m;
  h.registerNodeType("graph/input", m);
  g.title = "Output";
  g.desc = "Output of the graph";
  g.prototype.onExecute = function() {
    this._value = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, this._value);
  };
  g.prototype.onAction = function(a, b) {
    this.properties.type == h.ACTION && this.graph.trigger(this.properties.name, b);
  };
  g.prototype.onRemoved = function() {
    this.name_in_graph && this.graph.removeOutput(this.name_in_graph);
  };
  g.prototype.getTitle = function() {
    return this.flags.collapsed ? this.properties.name : this.title;
  };
  h.GraphOutput = g;
  h.registerNodeType("graph/output", g);
  r.title = "Const Number";
  r.desc = "Constant number";
  r.prototype.onExecute = function() {
    this.setOutputData(0, parseFloat(this.properties.value));
  };
  r.prototype.getTitle = function() {
    return this.flags.collapsed ? this.properties.value : this.title;
  };
  r.prototype.setValue = function(a) {
    this.setProperty("value", a);
  };
  r.prototype.onDrawBackground = function(a) {
    this.outputs[0].label = this.properties.value.toFixed(3);
  };
  h.registerNodeType("basic/const", r);
  l.title = "Const Boolean";
  l.desc = "Constant boolean";
  l.prototype.getTitle = r.prototype.getTitle;
  l.prototype.onExecute = function() {
    this.setOutputData(0, this.properties.value);
  };
  l.prototype.setValue = r.prototype.setValue;
  l.prototype.onGetInputs = function() {
    return [["toggle", h.ACTION]];
  };
  l.prototype.onAction = function(a) {
    this.setValue(!this.properties.value);
  };
  h.registerNodeType("basic/boolean", l);
  C.title = "Const String";
  C.desc = "Constant string";
  C.prototype.getTitle = r.prototype.getTitle;
  C.prototype.onExecute = function() {
    this.setOutputData(0, this.properties.value);
  };
  C.prototype.setValue = r.prototype.setValue;
  C.prototype.onDropFile = function(a) {
    var b = this, d = new FileReader;
    d.onload = function(a) {
      b.setProperty("value", a.target.result);
    };
    d.readAsText(a);
  };
  h.registerNodeType("basic/string", C);
  y.title = "Const File";
  y.desc = "Fetches a file from an url";
  y["@type"] = {type:"enum", values:["text", "arraybuffer", "blob", "json"]};
  y.prototype.onPropertyChanged = function(a, b) {
    "url" == a && (null == b || "" == b ? this._data = null : this.fetchFile(b));
  };
  y.prototype.onExecute = function() {
    var a = this.getInputData(0) || this.properties.url;
    !a || a == this._url && this._type == this.properties.type || this.fetchFile(a);
    this.setOutputData(0, this._data);
  };
  y.prototype.setValue = r.prototype.setValue;
  y.prototype.fetchFile = function(a) {
    var b = this;
    a && a.constructor === String ? (this._url = a, this._type = this.properties.type, "http" == a.substr(0, 4) && h.proxy && (a = h.proxy + a.substr(a.indexOf(":") + 3)), fetch(a).then(function(a) {
      if (!a.ok) {
        throw Error("File not found");
      }
      if ("arraybuffer" == b.properties.type) {
        return a.arrayBuffer();
      }
      if ("text" == b.properties.type) {
        return a.text();
      }
      if ("json" == b.properties.type) {
        return a.json();
      }
      if ("blob" == b.properties.type) {
        return a.blob();
      }
    }).then(function(a) {
      b._data = a;
      b.boxcolor = "#AEA";
    }).catch(function(d) {
      b._data = null;
      b.boxcolor = "red";
      console.error("error fetching file:", a);
    })) : (b._data = null, b.boxcolor = null);
  };
  y.prototype.onDropFile = function(a) {
    var b = this;
    this._url = a.name;
    this._type = this.properties.type;
    this.properties.url = a.name;
    var d = new FileReader;
    d.onload = function(a) {
      b.boxcolor = "#AEA";
      a = a.target.result;
      "json" == b.properties.type && (a = JSON.parse(a));
      b._data = a;
    };
    if ("arraybuffer" == b.properties.type) {
      d.readAsArrayBuffer(a);
    } else {
      if ("text" == b.properties.type || "json" == b.properties.type) {
        d.readAsText(a);
      } else {
        if ("blob" == b.properties.type) {
          return d.readAsBinaryString(a);
        }
      }
    }
  };
  h.registerNodeType("basic/file", y);
  w.title = "Const Data";
  w.desc = "Constant Data";
  w.prototype.onPropertyChanged = function(a, b) {
    this.widget.value = b;
    if (null != b && "" != b) {
      try {
        this._value = JSON.parse(b), this.boxcolor = "#AEA";
      } catch (G) {
        this.boxcolor = "red";
      }
    }
  };
  w.prototype.onExecute = function() {
    this.setOutputData(0, this._value);
  };
  w.prototype.setValue = r.prototype.setValue;
  h.registerNodeType("basic/data", w);
  E.title = "Const Array";
  E.desc = "Constant Array";
  E.prototype.onPropertyChanged = function(a, b) {
    this.widget.value = b;
    if (null != b && "" != b) {
      try {
        this._value = JSON.parse(b), this.boxcolor = "#AEA";
      } catch (G) {
        this.boxcolor = "red";
      }
    }
  };
  E.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && a.length) {
      this._value || (this._value = []);
      this._value.length = a.length;
      for (var b = 0; b < a.length; ++b) {
        this._value[b] = a[b];
      }
    }
    this.setOutputData(0, this._value);
  };
  E.prototype.setValue = r.prototype.setValue;
  h.registerNodeType("basic/array", E);
  z.title = "Array[i]";
  z.desc = "Returns an element from an array";
  z.prototype.onExecute = function() {
    var a = this.getInputData(0), b = this.getInputData(1);
    null == b && (b = this.properties.index);
    null != a && null != b && this.setOutputData(0, a[Math.floor(Number(b))]);
  };
  h.registerNodeType("basic/array[]", z);
  e.title = "Table[row][col]";
  e.desc = "Returns an element from a table";
  e.prototype.onExecute = function() {
    var a = this.getInputData(0), b = this.getInputData(1), d = this.getInputData(2);
    null == b && (b = this.properties.row);
    null == d && (d = this.properties.column);
    null != a && null != b && null != d && ((b = a[Math.floor(Number(b))]) ? this.setOutputData(0, b[Math.floor(Number(d))]) : this.setOutputData(0, null));
  };
  h.registerNodeType("basic/table[][]", e);
  B.title = "Object property";
  B.desc = "Outputs the property of an object";
  B.prototype.setValue = function(a) {
    this.properties.value = a;
    this.widget.value = a;
  };
  B.prototype.getTitle = function() {
    return this.flags.collapsed ? "in." + this.properties.value : this.title;
  };
  B.prototype.onPropertyChanged = function(a, b) {
    this.widget.value = b;
  };
  B.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && this.setOutputData(0, a[this.properties.value]);
  };
  h.registerNodeType("basic/object_property", B);
  D.title = "Object keys";
  D.desc = "Outputs an array with the keys of an object";
  D.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && this.setOutputData(0, Object.keys(a));
  };
  h.registerNodeType("basic/object_keys", D);
  u.title = "Merge Objects";
  u.desc = "Creates an object copying properties from others";
  u.prototype.onExecute = function() {
    var a = this.getInputData(0), b = this.getInputData(1), d = this._result;
    if (a) {
      for (var c in a) {
        d[c] = a[c];
      }
    }
    if (b) {
      for (c in b) {
        d[c] = b[c];
      }
    }
    this.setOutputData(0, d);
  };
  h.registerNodeType("basic/merge_objects", u);
  H.title = "Variable";
  H.desc = "store/read variable value";
  H.prototype.onExecute = function() {
    this.value = this.getInputData(0);
    this.graph && (this.graph.vars[this.properties.varname] = this.value);
    this.properties.global && (v[this.properties.varname] = this.value);
    this.setOutputData(0, this.value);
  };
  H.prototype.getTitle = function() {
    return this.properties.varname;
  };
  h.registerNodeType("basic/variable", H);
  h.wrapFunctionAsNode("basic/length", function(a) {
    return a && null != a.length ? Number(a.length) : 0;
  }, ["*"], "number");
  n.title = "Download";
  n.desc = "Download some data";
  n.prototype.downloadAsFile = function() {
    if (null != this.value) {
      var a = null;
      a = this.value.constructor === String ? this.value : JSON.stringify(this.value);
      a = new Blob([a]);
      var b = URL.createObjectURL(a);
      a = document.createElement("a");
      a.setAttribute("href", b);
      a.setAttribute("download", this.properties.filename);
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() {
        URL.revokeObjectURL(b);
      }, 6E4);
    }
  };
  n.prototype.onAction = function(a, b) {
    var d = this;
    setTimeout(function() {
      d.downloadAsFile();
    }, 100);
  };
  n.prototype.onExecute = function() {
    this.inputs[0] && (this.value = this.getInputData(0));
  };
  n.prototype.getTitle = function() {
    return this.flags.collapsed ? this.properties.filename : this.title;
  };
  h.registerNodeType("basic/download", n);
  p.title = "Watch";
  p.desc = "Show value of input";
  p.prototype.onExecute = function() {
    this.inputs[0] && (this.value = this.getInputData(0));
  };
  p.prototype.getTitle = function() {
    return this.flags.collapsed ? this.inputs[0].label : this.title;
  };
  p.toString = function(a) {
    if (null == a) {
      return "null";
    }
    if (a.constructor === Number) {
      return a.toFixed(3);
    }
    if (a.constructor === Array) {
      for (var b = "[", d = 0; d < a.length; ++d) {
        b += p.toString(a[d]) + (d + 1 != a.length ? "," : "");
      }
      return b + "]";
    }
    return String(a);
  };
  p.prototype.onDrawBackground = function(a) {
    this.inputs[0].label = p.toString(this.value);
  };
  h.registerNodeType("basic/watch", p);
  k.title = "Cast";
  k.desc = "Allows to connect different types";
  k.prototype.onExecute = function() {
    this.setOutputData(0, this.getInputData(0));
  };
  h.registerNodeType("basic/cast", k);
  a.title = "Console";
  a.desc = "Show value inside the console";
  a.prototype.onAction = function(a, b) {
    "log" == a ? console.log(b) : "warn" == a ? console.warn(b) : "error" == a && console.error(b);
  };
  a.prototype.onExecute = function() {
    var a = this.getInputData(1);
    null !== a && (this.properties.msg = a);
    console.log(a);
  };
  a.prototype.onGetInputs = function() {
    return [["log", h.ACTION], ["warn", h.ACTION], ["error", h.ACTION]];
  };
  h.registerNodeType("basic/console", a);
  b.title = "Alert";
  b.desc = "Show an alert window";
  b.color = "#510";
  b.prototype.onConfigure = function(a) {
    this.widget.value = a.properties.msg;
  };
  b.prototype.onAction = function(a, b) {
    var d = this.properties.msg;
    setTimeout(function() {
      alert(d);
    }, 10);
  };
  h.registerNodeType("basic/alert", b);
  d.prototype.onConfigure = function(a) {
    a.properties.onExecute && h.allow_scripts ? this.compileCode(a.properties.onExecute) : console.warn("Script not compiled, LiteGraph.allow_scripts is false");
  };
  d.title = "Script";
  d.desc = "executes a code (max 100 characters)";
  d.widgets_info = {onExecute:{type:"code"}};
  d.prototype.onPropertyChanged = function(a, b) {
    "onExecute" == a && h.allow_scripts ? this.compileCode(b) : console.warn("Script not compiled, LiteGraph.allow_scripts is false");
  };
  d.prototype.compileCode = function(a) {
    this._func = null;
    if (256 < a.length) {
      console.warn("Script too long, max 256 chars");
    } else {
      for (var b = a.toLowerCase(), d = "script body document eval nodescript function".split(" "), c = 0; c < d.length; ++c) {
        if (-1 != b.indexOf(d[c])) {
          console.warn("invalid script");
          return;
        }
      }
      try {
        this._func = new Function("A", "B", "C", "DATA", "node", a);
      } catch (J) {
        console.error("Error parsing script"), console.error(J);
      }
    }
  };
  d.prototype.onExecute = function() {
    if (this._func) {
      try {
        var a = this.getInputData(0), b = this.getInputData(1), d = this.getInputData(2);
        this.setOutputData(0, this._func(a, b, d, this.data, this));
      } catch (I) {
        console.error("Error in script"), console.error(I);
      }
    }
  };
  d.prototype.onGetOutputs = function() {
    return [["C", ""]];
  };
  h.registerNodeType("basic/script", d);
})(this);
(function(v) {
  function c() {
    this.size = [60, 30];
    this.addInput("event", w.ACTION);
  }
  function q() {
    this.size = [60, 30];
    this.addInput("if", "");
    this.addOutput("true", w.EVENT);
    this.addOutput("change", w.EVENT);
    this.addOutput("false", w.EVENT);
    this.properties = {only_on_change:!0};
    this.prev = 0;
  }
  function m() {
    this.addInput("", w.ACTION);
    this.addInput("", w.ACTION);
    this.addInput("", w.ACTION);
    this.addInput("", w.ACTION);
    this.addInput("", w.ACTION);
    this.addInput("", w.ACTION);
    this.addOutput("", w.EVENT);
    this.addOutput("", w.EVENT);
    this.addOutput("", w.EVENT);
    this.addOutput("", w.EVENT);
    this.addOutput("", w.EVENT);
    this.addOutput("", w.EVENT);
    this.size = [120, 30];
    this.flags = {horizontal:!0, render_box:!1};
  }
  function g() {
    this.size = [60, 30];
    this.addInput("event", w.ACTION);
    this.addOutput("event", w.EVENT);
    this.properties = {equal_to:"", has_property:"", property_equal_to:""};
  }
  function r() {
    this.addInput("inc", w.ACTION);
    this.addInput("dec", w.ACTION);
    this.addInput("reset", w.ACTION);
    this.addOutput("change", w.EVENT);
    this.addOutput("num", "number");
    this.num = 0;
  }
  function l() {
    this.size = [60, 30];
    this.addProperty("time_in_ms", 1000);
    this.addInput("event", w.ACTION);
    this.addOutput("on_time", w.EVENT);
    this._pending = [];
  }
  function C() {
    this.addProperty("interval", 1000);
    this.addProperty("event", "tick");
    this.addOutput("on_tick", w.EVENT);
    this.time = 0;
    this.last_interval = 1000;
    this.triggered = !1;
  }
  function y() {
    this.addInput("data", "");
    this.addInput("assign", w.ACTION);
    this.addOutput("data", "");
    this._last_value = null;
    this.properties = {data:null, serialize:!0};
    var c = this;
    this.addWidget("button", "store", "", function() {
      c.properties.data = c._last_value;
    });
  }
  var w = v.LiteGraph;
  c.title = "Log Event";
  c.desc = "Log event in console";
  c.prototype.onAction = function(c, g) {
    console.log(c, g);
  };
  w.registerNodeType("events/log", c);
  q.title = "TriggerEvent";
  q.desc = "Triggers event if input evaluates to true";
  q.prototype.onExecute = function(c, g) {
    c = this.getInputData(0);
    var e = c != this.prev;
    0 === this.prev && (e = !1);
    var l = e && this.properties.only_on_change || !e && !this.properties.only_on_change;
    c && l && this.triggerSlot(0, g);
    !c && l && this.triggerSlot(2, g);
    e && this.triggerSlot(1, g);
    this.prev = c;
  };
  w.registerNodeType("events/trigger", q);
  m.title = "Sequencer";
  m.desc = "Trigger events when an event arrives";
  m.prototype.getTitle = function() {
    return "";
  };
  m.prototype.onAction = function(c, g) {
    if (this.outputs) {
      for (c = 0; c < this.outputs.length; ++c) {
        this.triggerSlot(c, g);
      }
    }
  };
  w.registerNodeType("events/sequencer", m);
  g.title = "Filter Event";
  g.desc = "Blocks events that do not match the filter";
  g.prototype.onAction = function(c, g) {
    if (null != g && (!this.properties.equal_to || this.properties.equal_to == g)) {
      if (this.properties.has_property && (c = g[this.properties.has_property], null == c || this.properties.property_equal_to && this.properties.property_equal_to != c)) {
        return;
      }
      this.triggerSlot(0, g);
    }
  };
  w.registerNodeType("events/filter", g);
  r.title = "Counter";
  r.desc = "Counts events";
  r.prototype.getTitle = function() {
    return this.flags.collapsed ? String(this.num) : this.title;
  };
  r.prototype.onAction = function(c, g) {
    g = this.num;
    "inc" == c ? this.num += 1 : "dec" == c ? --this.num : "reset" == c && (this.num = 0);
    this.num != g && this.trigger("change", this.num);
  };
  r.prototype.onDrawBackground = function(c) {
    this.flags.collapsed || (c.fillStyle = "#AAA", c.font = "20px Arial", c.textAlign = "center", c.fillText(this.num, 0.5 * this.size[0], 0.5 * this.size[1]));
  };
  r.prototype.onExecute = function() {
    this.setOutputData(1, this.num);
  };
  w.registerNodeType("events/counter", r);
  l.title = "Delay";
  l.desc = "Delays one event";
  l.prototype.onAction = function(c, g) {
    c = this.properties.time_in_ms;
    0 >= c ? this.trigger(null, g) : this._pending.push([c, g]);
  };
  l.prototype.onExecute = function() {
    var c = 1000 * this.graph.elapsed_time;
    this.isInputConnected(1) && (this.properties.time_in_ms = this.getInputData(1));
    for (var g = 0; g < this._pending.length; ++g) {
      var e = this._pending[g];
      e[0] -= c;
      0 < e[0] || (this._pending.splice(g, 1), --g, this.trigger(null, e[1]));
    }
  };
  l.prototype.onGetInputs = function() {
    return [["event", w.ACTION], ["time_in_ms", "number"]];
  };
  w.registerNodeType("events/delay", l);
  C.title = "Timer";
  C.desc = "Sends an event every N milliseconds";
  C.prototype.onStart = function() {
    this.time = 0;
  };
  C.prototype.getTitle = function() {
    return "Timer: " + this.last_interval.toString() + "ms";
  };
  C.on_color = "#AAA";
  C.off_color = "#222";
  C.prototype.onDrawBackground = function() {
    this.boxcolor = this.triggered ? C.on_color : C.off_color;
    this.triggered = !1;
  };
  C.prototype.onExecute = function() {
    var c = 0 == this.time;
    this.time += 1000 * this.graph.elapsed_time;
    this.last_interval = Math.max(1, this.getInputOrProperty("interval") | 0);
    !c && (this.time < this.last_interval || isNaN(this.last_interval)) ? this.inputs && 1 < this.inputs.length && this.inputs[1] && this.setOutputData(1, !1) : (this.triggered = !0, this.time %= this.last_interval, this.trigger("on_tick", this.properties.event), this.inputs && 1 < this.inputs.length && this.inputs[1] && this.setOutputData(1, !0));
  };
  C.prototype.onGetInputs = function() {
    return [["interval", "number"]];
  };
  C.prototype.onGetOutputs = function() {
    return [["tick", "boolean"]];
  };
  w.registerNodeType("events/timer", C);
  y.title = "Data Store";
  y.desc = "Stores data and only changes when event is received";
  y.prototype.onExecute = function() {
    this._last_value = this.getInputData(0);
    this.setOutputData(0, this.properties.data);
  };
  y.prototype.onAction = function(c, g) {
    this.properties.data = this._last_value;
  };
  y.prototype.onSerialize = function(c) {
    null != c.data && (0 == this.properties.serialize || c.data.constructor !== String && c.data.constructor !== Number && c.data.constructor !== Boolean && c.data.constructor !== Array && c.data.constructor !== Object) && (c.data = null);
  };
  w.registerNodeType("basic/data_store", y);
})(this);
(function(v) {
  function c() {
    this.addOutput("", z.EVENT);
    this.addOutput("", "boolean");
    this.addProperty("text", "click me");
    this.addProperty("font_size", 30);
    this.addProperty("message", "");
    this.size = [164, 84];
    this.clicked = !1;
  }
  function q() {
    this.addInput("", "boolean");
    this.addInput("e", z.ACTION);
    this.addOutput("v", "boolean");
    this.addOutput("e", z.EVENT);
    this.properties = {font:"", value:!1};
    this.size = [160, 44];
  }
  function m() {
    this.addOutput("", "number");
    this.size = [80, 60];
    this.properties = {min:-1000, max:1000, value:1, step:1};
    this.old_y = -1;
    this._precision = this._remainder = 0;
    this.mouse_captured = !1;
  }
  function g() {
    this.addOutput("", "string");
    this.addOutput("change", z.EVENT);
    this.size = [80, 60];
    this.properties = {value:"A", values:"A;B;C"};
    this.old_y = -1;
    this.mouse_captured = !1;
    this._values = this.properties.values.split(";");
    var c = this;
    this.widgets_up = !0;
    this.widget = this.addWidget("combo", "", this.properties.value, function(e) {
      c.properties.value = e;
      c.triggerSlot(1, e);
    }, {property:"value", values:this._values});
  }
  function r() {
    this.addOutput("", "number");
    this.size = [64, 84];
    this.properties = {min:0, max:1, value:0.5, color:"#7AF", precision:2};
    this.value = -1;
  }
  function l() {
    this.addOutput("", "number");
    this.properties = {value:0.5, min:0, max:1, text:"V"};
    var c = this;
    this.size = [140, 40];
    this.slider = this.addWidget("slider", "V", this.properties.value, function(e) {
      c.properties.value = e;
    }, this.properties);
    this.widgets_up = !0;
  }
  function C() {
    this.size = [160, 26];
    this.addOutput("", "number");
    this.properties = {color:"#7AF", min:0, max:1, value:0.5};
    this.value = -1;
  }
  function y() {
    this.size = [160, 26];
    this.addInput("", "number");
    this.properties = {min:0, max:1, value:0, color:"#AAF"};
  }
  function w() {
    this.addInputs("", 0);
    this.properties = {value:"...", font:"Arial", fontsize:18, color:"#AAA", align:"left", glowSize:0, decimals:1};
  }
  function E() {
    this.size = [200, 100];
    this.properties = {borderColor:"#ffffff", bgcolorTop:"#f0f0f0", bgcolorBottom:"#e0e0e0", shadowSize:2, borderRadius:3};
  }
  var z = v.LiteGraph;
  c.title = "Button";
  c.desc = "Triggers an event";
  c.font = "Arial";
  c.prototype.onDrawForeground = function(e) {
    if (!this.flags.collapsed && (e.fillStyle = "black", e.fillRect(11, 11, this.size[0] - 20, this.size[1] - 20), e.fillStyle = "#AAF", e.fillRect(9, 9, this.size[0] - 20, this.size[1] - 20), e.fillStyle = this.clicked ? "white" : this.mouseOver ? "#668" : "#334", e.fillRect(10, 10, this.size[0] - 20, this.size[1] - 20), this.properties.text || 0 === this.properties.text)) {
      var g = this.properties.font_size || 30;
      e.textAlign = "center";
      e.fillStyle = this.clicked ? "black" : "white";
      e.font = g + "px " + c.font;
      e.fillText(this.properties.text, 0.5 * this.size[0], 0.5 * this.size[1] + 0.3 * g);
      e.textAlign = "left";
    }
  };
  c.prototype.onMouseDown = function(c, g) {
    if (1 < g[0] && 1 < g[1] && g[0] < this.size[0] - 2 && g[1] < this.size[1] - 2) {
      return this.clicked = !0, this.triggerSlot(0, this.properties.message), !0;
    }
  };
  c.prototype.onExecute = function() {
    this.setOutputData(1, this.clicked);
  };
  c.prototype.onMouseUp = function(c) {
    this.clicked = !1;
  };
  z.registerNodeType("widget/button", c);
  q.title = "Toggle";
  q.desc = "Toggles between true or false";
  q.prototype.onDrawForeground = function(c) {
    if (!this.flags.collapsed) {
      var e = 0.5 * this.size[1], g = 0.8 * this.size[1];
      c.font = this.properties.font || (0.8 * e).toFixed(0) + "px Arial";
      var l = c.measureText(this.title).width;
      l = 0.5 * (this.size[0] - (l + e));
      c.fillStyle = "#AAA";
      c.fillRect(l, g - e, e, e);
      c.fillStyle = this.properties.value ? "#AEF" : "#000";
      c.fillRect(l + 0.25 * e, g - e + 0.25 * e, .5 * e, .5 * e);
      c.textAlign = "left";
      c.fillStyle = "#AAA";
      c.fillText(this.title, 1.2 * e + l, 0.85 * g);
      c.textAlign = "left";
    }
  };
  q.prototype.onAction = function(c) {
    this.properties.value = !this.properties.value;
    this.trigger("e", this.properties.value);
  };
  q.prototype.onExecute = function() {
    var c = this.getInputData(0);
    null != c && (this.properties.value = c);
    this.setOutputData(0, this.properties.value);
  };
  q.prototype.onMouseDown = function(c, g) {
    if (1 < g[0] && 1 < g[1] && g[0] < this.size[0] - 2 && g[1] < this.size[1] - 2) {
      return this.properties.value = !this.properties.value, this.graph._version++, this.trigger("e", this.properties.value), !0;
    }
  };
  z.registerNodeType("widget/toggle", q);
  m.title = "Number";
  m.desc = "Widget to select number value";
  m.pixels_threshold = 10;
  m.markers_color = "#666";
  m.prototype.onDrawForeground = function(c) {
    var e = 0.5 * this.size[0], g = this.size[1];
    30 < g ? (c.fillStyle = m.markers_color, c.beginPath(), c.moveTo(e, 0.1 * g), c.lineTo(e + 0.1 * g, 0.2 * g), c.lineTo(e + -0.1 * g, 0.2 * g), c.fill(), c.beginPath(), c.moveTo(e, 0.9 * g), c.lineTo(e + 0.1 * g, 0.8 * g), c.lineTo(e + -0.1 * g, 0.8 * g), c.fill(), c.font = (0.7 * g).toFixed(1) + "px Arial") : c.font = (0.8 * g).toFixed(1) + "px Arial";
    c.textAlign = "center";
    c.font = (0.7 * g).toFixed(1) + "px Arial";
    c.fillStyle = "#EEE";
    c.fillText(this.properties.value.toFixed(this._precision), e, 0.75 * g);
  };
  m.prototype.onExecute = function() {
    this.setOutputData(0, this.properties.value);
  };
  m.prototype.onPropertyChanged = function(c, g) {
    c = (this.properties.step + "").split(".");
    this._precision = 1 < c.length ? c[1].length : 0;
  };
  m.prototype.onMouseDown = function(c, g) {
    if (!(0 > g[1])) {
      return this.old_y = c.canvasY, this.captureInput(!0), this.mouse_captured = !0;
    }
  };
  m.prototype.onMouseMove = function(c) {
    if (this.mouse_captured) {
      var e = this.old_y - c.canvasY;
      c.shiftKey && (e *= 10);
      if (c.metaKey || c.altKey) {
        e *= 0.1;
      }
      this.old_y = c.canvasY;
      c = this._remainder + e / m.pixels_threshold;
      this._remainder = c % 1;
      c = Math.clamp(this.properties.value + (c | 0) * this.properties.step, this.properties.min, this.properties.max);
      this.properties.value = c;
      this.graph._version++;
      this.setDirtyCanvas(!0);
    }
  };
  m.prototype.onMouseUp = function(c, g) {
    200 > c.click_time && (this.properties.value = Math.clamp(this.properties.value + (g[1] > 0.5 * this.size[1] ? -1 : 1) * this.properties.step, this.properties.min, this.properties.max), this.graph._version++, this.setDirtyCanvas(!0));
    this.mouse_captured && (this.mouse_captured = !1, this.captureInput(!1));
  };
  z.registerNodeType("widget/number", m);
  g.title = "Combo";
  g.desc = "Widget to select from a list";
  g.prototype.onExecute = function() {
    this.setOutputData(0, this.properties.value);
  };
  g.prototype.onPropertyChanged = function(c, g) {
    "values" == c ? (this._values = g.split(";"), this.widget.options.values = this._values) : "value" == c && (this.widget.value = g);
  };
  z.registerNodeType("widget/combo", g);
  r.title = "Knob";
  r.desc = "Circular controller";
  r.size = [80, 100];
  r.prototype.onDrawForeground = function(c) {
    if (!this.flags.collapsed) {
      -1 == this.value && (this.value = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min));
      var e = 0.5 * this.size[0], g = 0.5 * this.size[1], l = 0.5 * Math.min(this.size[0], this.size[1]) - 5;
      c.globalAlpha = 1;
      c.save();
      c.translate(e, g);
      c.rotate(0.75 * Math.PI);
      c.fillStyle = "rgba(0,0,0,0.5)";
      c.beginPath();
      c.moveTo(0, 0);
      c.arc(0, 0, l, 0, 1.5 * Math.PI);
      c.fill();
      c.strokeStyle = "black";
      c.fillStyle = this.properties.color;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(0, 0);
      c.arc(0, 0, l - 4, 0, 1.5 * Math.PI * Math.max(0.01, this.value));
      c.closePath();
      c.fill();
      c.lineWidth = 1;
      c.globalAlpha = 1;
      c.restore();
      c.fillStyle = "black";
      c.beginPath();
      c.arc(e, g, 0.75 * l, 0, 2 * Math.PI, !0);
      c.fill();
      c.fillStyle = this.mouseOver ? "white" : this.properties.color;
      c.beginPath();
      var m = this.value * Math.PI * 1.5 + 0.75 * Math.PI;
      c.arc(e + Math.cos(m) * l * 0.65, g + Math.sin(m) * l * 0.65, 0.05 * l, 0, 2 * Math.PI, !0);
      c.fill();
      c.fillStyle = this.mouseOver ? "white" : "#AAA";
      c.font = Math.floor(0.5 * l) + "px Arial";
      c.textAlign = "center";
      c.fillText(this.properties.value.toFixed(this.properties.precision), e, g + 0.15 * l);
    }
  };
  r.prototype.onExecute = function() {
    this.setOutputData(0, this.properties.value);
    this.boxcolor = z.colorToString([this.value, this.value, this.value]);
  };
  r.prototype.onMouseDown = function(c) {
    this.center = [0.5 * this.size[0], 0.5 * this.size[1] + 20];
    this.radius = 0.5 * this.size[0];
    if (20 > c.canvasY - this.pos[1] || z.distance([c.canvasX, c.canvasY], [this.pos[0] + this.center[0], this.pos[1] + this.center[1]]) > this.radius) {
      return !1;
    }
    this.oldmouse = [c.canvasX - this.pos[0], c.canvasY - this.pos[1]];
    this.captureInput(!0);
    return !0;
  };
  r.prototype.onMouseMove = function(c) {
    if (this.oldmouse) {
      c = [c.canvasX - this.pos[0], c.canvasY - this.pos[1]];
      var e = this.value;
      e -= 0.01 * (c[1] - this.oldmouse[1]);
      1.0 < e ? e = 1.0 : 0.0 > e && (e = 0.0);
      this.value = e;
      this.properties.value = this.properties.min + (this.properties.max - this.properties.min) * this.value;
      this.oldmouse = c;
      this.setDirtyCanvas(!0);
    }
  };
  r.prototype.onMouseUp = function(c) {
    this.oldmouse && (this.oldmouse = null, this.captureInput(!1));
  };
  r.prototype.onPropertyChanged = function(c, g) {
    if ("min" == c || "max" == c || "value" == c) {
      return this.properties[c] = parseFloat(g), !0;
    }
  };
  z.registerNodeType("widget/knob", r);
  l.title = "Inner Slider";
  l.prototype.onPropertyChanged = function(c, g) {
    "value" == c && (this.slider.value = g);
  };
  l.prototype.onExecute = function() {
    this.setOutputData(0, this.properties.value);
  };
  z.registerNodeType("widget/internal_slider", l);
  C.title = "H.Slider";
  C.desc = "Linear slider controller";
  C.prototype.onDrawForeground = function(c) {
    -1 == this.value && (this.value = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min));
    c.globalAlpha = 1;
    c.lineWidth = 1;
    c.fillStyle = "#000";
    c.fillRect(2, 2, this.size[0] - 4, this.size[1] - 4);
    c.fillStyle = this.properties.color;
    c.beginPath();
    c.rect(4, 4, (this.size[0] - 8) * this.value, this.size[1] - 8);
    c.fill();
  };
  C.prototype.onExecute = function() {
    this.properties.value = this.properties.min + (this.properties.max - this.properties.min) * this.value;
    this.setOutputData(0, this.properties.value);
    this.boxcolor = z.colorToString([this.value, this.value, this.value]);
  };
  C.prototype.onMouseDown = function(c) {
    if (0 > c.canvasY - this.pos[1]) {
      return !1;
    }
    this.oldmouse = [c.canvasX - this.pos[0], c.canvasY - this.pos[1]];
    this.captureInput(!0);
    return !0;
  };
  C.prototype.onMouseMove = function(c) {
    if (this.oldmouse) {
      c = [c.canvasX - this.pos[0], c.canvasY - this.pos[1]];
      var e = this.value;
      e += (c[0] - this.oldmouse[0]) / this.size[0];
      1.0 < e ? e = 1.0 : 0.0 > e && (e = 0.0);
      this.value = e;
      this.oldmouse = c;
      this.setDirtyCanvas(!0);
    }
  };
  C.prototype.onMouseUp = function(c) {
    this.oldmouse = null;
    this.captureInput(!1);
  };
  C.prototype.onMouseLeave = function(c) {
  };
  z.registerNodeType("widget/hslider", C);
  y.title = "Progress";
  y.desc = "Shows data in linear progress";
  y.prototype.onExecute = function() {
    var c = this.getInputData(0);
    void 0 != c && (this.properties.value = c);
  };
  y.prototype.onDrawForeground = function(c) {
    c.lineWidth = 1;
    c.fillStyle = this.properties.color;
    var e = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min);
    e = Math.min(1, e);
    e = Math.max(0, e);
    c.fillRect(2, 2, (this.size[0] - 4) * e, this.size[1] - 4);
  };
  z.registerNodeType("widget/progress", y);
  w.title = "Text";
  w.desc = "Shows the input value";
  w.widgets = [{name:"resize", text:"Resize box", type:"button"}, {name:"led_text", text:"LED", type:"minibutton"}, {name:"normal_text", text:"Normal", type:"minibutton"}];
  w.prototype.onDrawForeground = function(c) {
    c.fillStyle = this.properties.color;
    var e = this.properties.value;
    this.properties.glowSize ? (c.shadowColor = this.properties.color, c.shadowOffsetX = 0, c.shadowOffsetY = 0, c.shadowBlur = this.properties.glowSize) : c.shadowColor = "transparent";
    var g = this.properties.fontsize;
    c.textAlign = this.properties.align;
    c.font = g.toString() + "px " + this.properties.font;
    this.str = "number" == typeof e ? e.toFixed(this.properties.decimals) : e;
    if ("string" == typeof this.str) {
      e = this.str.split("\\n");
      for (var l in e) {
        c.fillText(e[l], "left" == this.properties.align ? 15 : this.size[0] - 15, -0.15 * g + g * (parseInt(l) + 1));
      }
    }
    c.shadowColor = "transparent";
    this.last_ctx = c;
    c.textAlign = "left";
  };
  w.prototype.onExecute = function() {
    var c = this.getInputData(0);
    null != c && (this.properties.value = c);
  };
  w.prototype.resize = function() {
    if (this.last_ctx) {
      var c = this.str.split("\\n");
      this.last_ctx.font = this.properties.fontsize + "px " + this.properties.font;
      var g = 0, l;
      for (l in c) {
        var m = this.last_ctx.measureText(c[l]).width;
        g < m && (g = m);
      }
      this.size[0] = g + 20;
      this.size[1] = 4 + c.length * this.properties.fontsize;
      this.setDirtyCanvas(!0);
    }
  };
  w.prototype.onPropertyChanged = function(c, g) {
    this.properties[c] = g;
    this.str = "number" == typeof g ? g.toFixed(3) : g;
    return !0;
  };
  z.registerNodeType("widget/text", w);
  E.title = "Panel";
  E.desc = "Non interactive panel";
  E.widgets = [{name:"update", text:"Update", type:"button"}];
  E.prototype.createGradient = function(c) {
    "" == this.properties.bgcolorTop || "" == this.properties.bgcolorBottom ? this.lineargradient = 0 : (this.lineargradient = c.createLinearGradient(0, 0, 0, this.size[1]), this.lineargradient.addColorStop(0, this.properties.bgcolorTop), this.lineargradient.addColorStop(1, this.properties.bgcolorBottom));
  };
  E.prototype.onDrawForeground = function(c) {
    this.flags.collapsed || (null == this.lineargradient && this.createGradient(c), this.lineargradient && (c.lineWidth = 1, c.strokeStyle = this.properties.borderColor, c.fillStyle = this.lineargradient, this.properties.shadowSize ? (c.shadowColor = "#000", c.shadowOffsetX = 0, c.shadowOffsetY = 0, c.shadowBlur = this.properties.shadowSize) : c.shadowColor = "transparent", c.roundRect(0, 0, this.size[0] - 1, this.size[1] - 1, this.properties.shadowSize), c.fill(), c.shadowColor = "transparent", 
    c.stroke()));
  };
  z.registerNodeType("widget/panel", E);
})(this);
(function(v) {
  function c() {
    this.addOutput("left_x_axis", "number");
    this.addOutput("left_y_axis", "number");
    this.addOutput("button_pressed", q.EVENT);
    this.properties = {gamepad_index:0, threshold:0.1};
    this._left_axis = new Float32Array(2);
    this._right_axis = new Float32Array(2);
    this._triggers = new Float32Array(2);
    this._previous_buttons = new Uint8Array(17);
    this._current_buttons = new Uint8Array(17);
  }
  var q = v.LiteGraph;
  c.title = "Gamepad";
  c.desc = "gets the input of the gamepad";
  c.CENTER = 0;
  c.LEFT = 1;
  c.RIGHT = 2;
  c.UP = 4;
  c.DOWN = 8;
  c.zero = new Float32Array(2);
  c.buttons = "a b x y lb rb lt rt back start ls rs home".split(" ");
  c.prototype.onExecute = function() {
    var m = this.getGamepad(), g = this.properties.threshold || 0.0;
    m && (this._left_axis[0] = Math.abs(m.xbox.axes.lx) > g ? m.xbox.axes.lx : 0, this._left_axis[1] = Math.abs(m.xbox.axes.ly) > g ? m.xbox.axes.ly : 0, this._right_axis[0] = Math.abs(m.xbox.axes.rx) > g ? m.xbox.axes.rx : 0, this._right_axis[1] = Math.abs(m.xbox.axes.ry) > g ? m.xbox.axes.ry : 0, this._triggers[0] = Math.abs(m.xbox.axes.ltrigger) > g ? m.xbox.axes.ltrigger : 0, this._triggers[1] = Math.abs(m.xbox.axes.rtrigger) > g ? m.xbox.axes.rtrigger : 0);
    if (this.outputs) {
      for (g = 0; g < this.outputs.length; g++) {
        var r = this.outputs[g];
        if (r.links && r.links.length) {
          var l = null;
          if (m) {
            switch(r.name) {
              case "left_axis":
                l = this._left_axis;
                break;
              case "right_axis":
                l = this._right_axis;
                break;
              case "left_x_axis":
                l = this._left_axis[0];
                break;
              case "left_y_axis":
                l = this._left_axis[1];
                break;
              case "right_x_axis":
                l = this._right_axis[0];
                break;
              case "right_y_axis":
                l = this._right_axis[1];
                break;
              case "trigger_left":
                l = this._triggers[0];
                break;
              case "trigger_right":
                l = this._triggers[1];
                break;
              case "a_button":
                l = m.xbox.buttons.a ? 1 : 0;
                break;
              case "b_button":
                l = m.xbox.buttons.b ? 1 : 0;
                break;
              case "x_button":
                l = m.xbox.buttons.x ? 1 : 0;
                break;
              case "y_button":
                l = m.xbox.buttons.y ? 1 : 0;
                break;
              case "lb_button":
                l = m.xbox.buttons.lb ? 1 : 0;
                break;
              case "rb_button":
                l = m.xbox.buttons.rb ? 1 : 0;
                break;
              case "ls_button":
                l = m.xbox.buttons.ls ? 1 : 0;
                break;
              case "rs_button":
                l = m.xbox.buttons.rs ? 1 : 0;
                break;
              case "hat_left":
                l = m.xbox.hatmap & c.LEFT;
                break;
              case "hat_right":
                l = m.xbox.hatmap & c.RIGHT;
                break;
              case "hat_up":
                l = m.xbox.hatmap & c.UP;
                break;
              case "hat_down":
                l = m.xbox.hatmap & c.DOWN;
                break;
              case "hat":
                l = m.xbox.hatmap;
                break;
              case "start_button":
                l = m.xbox.buttons.start ? 1 : 0;
                break;
              case "back_button":
                l = m.xbox.buttons.back ? 1 : 0;
                break;
              case "button_pressed":
                for (r = 0; r < this._current_buttons.length; ++r) {
                  this._current_buttons[r] && !this._previous_buttons[r] && this.triggerSlot(g, c.buttons[r]);
                }
            }
          } else {
            switch(r.name) {
              case "button_pressed":
                break;
              case "left_axis":
              case "right_axis":
                l = c.zero;
                break;
              default:
                l = 0;
            }
          }
          this.setOutputData(g, l);
        }
      }
    }
  };
  c.mapping = {a:0, b:1, x:2, y:3, lb:4, rb:5, lt:6, rt:7, back:8, start:9, ls:10, rs:11};
  c.mapping_array = "a b x y lb rb lt rt back start ls rs".split(" ");
  c.prototype.getGamepad = function() {
    var m = navigator.getGamepads || navigator.webkitGetGamepads || navigator.mozGetGamepads;
    if (!m) {
      return null;
    }
    m = m.call(navigator);
    this._previous_buttons.set(this._current_buttons);
    for (var g = this.properties.gamepad_index; 4 > g; g++) {
      if (m[g]) {
        m = m[g];
        g = this.xbox_mapping;
        g || (g = this.xbox_mapping = {axes:[], buttons:{}, hat:"", hatmap:c.CENTER});
        g.axes.lx = m.axes[0];
        g.axes.ly = m.axes[1];
        g.axes.rx = m.axes[2];
        g.axes.ry = m.axes[3];
        g.axes.ltrigger = m.buttons[6].value;
        g.axes.rtrigger = m.buttons[7].value;
        g.hat = "";
        g.hatmap = c.CENTER;
        for (var r = 0; r < m.buttons.length; r++) {
          if (this._current_buttons[r] = m.buttons[r].pressed, 12 > r) {
            g.buttons[c.mapping_array[r]] = m.buttons[r].pressed, m.buttons[r].was_pressed && this.trigger(c.mapping_array[r] + "_button_event");
          } else {
            switch(r) {
              case 12:
                m.buttons[r].pressed && (g.hat += "up", g.hatmap |= c.UP);
                break;
              case 13:
                m.buttons[r].pressed && (g.hat += "down", g.hatmap |= c.DOWN);
                break;
              case 14:
                m.buttons[r].pressed && (g.hat += "left", g.hatmap |= c.LEFT);
                break;
              case 15:
                m.buttons[r].pressed && (g.hat += "right", g.hatmap |= c.RIGHT);
                break;
              case 16:
                g.buttons.home = m.buttons[r].pressed;
            }
          }
        }
        m.xbox = g;
        return m;
      }
    }
  };
  c.prototype.onDrawBackground = function(c) {
    if (!this.flags.collapsed) {
      var g = this._left_axis, m = this._right_axis;
      c.strokeStyle = "#88A";
      c.strokeRect(0.5 * (g[0] + 1) * this.size[0] - 4, 0.5 * (g[1] + 1) * this.size[1] - 4, 8, 8);
      c.strokeStyle = "#8A8";
      c.strokeRect(0.5 * (m[0] + 1) * this.size[0] - 4, 0.5 * (m[1] + 1) * this.size[1] - 4, 8, 8);
      g = this.size[1] / this._current_buttons.length;
      c.fillStyle = "#AEB";
      for (m = 0; m < this._current_buttons.length; ++m) {
        this._current_buttons[m] && c.fillRect(0, g * m, 6, g);
      }
    }
  };
  c.prototype.onGetOutputs = function() {
    return [["left_axis", "vec2"], ["right_axis", "vec2"], ["left_x_axis", "number"], ["left_y_axis", "number"], ["right_x_axis", "number"], ["right_y_axis", "number"], ["trigger_left", "number"], ["trigger_right", "number"], ["a_button", "number"], ["b_button", "number"], ["x_button", "number"], ["y_button", "number"], ["lb_button", "number"], ["rb_button", "number"], ["ls_button", "number"], ["rs_button", "number"], ["start_button", "number"], ["back_button", "number"], ["a_button_event", q.EVENT], 
    ["b_button_event", q.EVENT], ["x_button_event", q.EVENT], ["y_button_event", q.EVENT], ["lb_button_event", q.EVENT], ["rb_button_event", q.EVENT], ["ls_button_event", q.EVENT], ["rs_button_event", q.EVENT], ["start_button_event", q.EVENT], ["back_button_event", q.EVENT], ["hat_left", "number"], ["hat_right", "number"], ["hat_up", "number"], ["hat_down", "number"], ["hat", "number"], ["button_pressed", q.EVENT]];
  };
  q.registerNodeType("input/gamepad", c);
})(this);
(function(v) {
  function c() {
    this.addInput("in", "*");
    this.size = [80, 30];
  }
  function q() {
    this.addInput("in");
    this.addOutput("out");
    this.size = [80, 30];
  }
  function m() {
    this.addInput("in");
    this.addOutput("out");
  }
  function g() {
    this.addInput("in", "number", {locked:!0});
    this.addOutput("out", "number", {locked:!0});
    this.addOutput("clamped", "number", {locked:!0});
    this.addProperty("in", 0);
    this.addProperty("in_min", 0);
    this.addProperty("in_max", 1);
    this.addProperty("out_min", 0);
    this.addProperty("out_max", 1);
    this.size = [120, 50];
  }
  function r() {
    this.addOutput("value", "number");
    this.addProperty("min", 0);
    this.addProperty("max", 1);
    this.size = [80, 30];
  }
  function l() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.addProperty("min", 0);
    this.addProperty("max", 1);
    this.addProperty("smooth", !0);
    this.size = [90, 30];
  }
  function C() {
    this.addOutput("out", "number");
    this.addProperty("min_time", 1);
    this.addProperty("max_time", 2);
    this.addProperty("duration", 0.2);
    this.size = [90, 30];
    this._blink_time = this._remaining_time = 0;
  }
  function y() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.size = [80, 30];
    this.addProperty("min", 0);
    this.addProperty("max", 1);
  }
  function w() {
    this.properties = {f:0.5};
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("out", "number");
  }
  function E() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.size = [80, 30];
  }
  function z() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.size = [80, 30];
  }
  function e() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.size = [80, 30];
  }
  function B() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.size = [80, 30];
    this.properties = {A:0, B:1};
  }
  function D() {
    this.addInput("in", "number", {label:""});
    this.addOutput("out", "number", {label:""});
    this.size = [80, 30];
    this.addProperty("factor", 1);
  }
  function u() {
    this.addInput("v", "boolean");
    this.addInput("A");
    this.addInput("B");
    this.addOutput("out");
  }
  function H() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.size = [80, 30];
    this.addProperty("samples", 10);
    this._values = new Float32Array(10);
    this._current = 0;
  }
  function n() {
    this.addInput("in", "number");
    this.addOutput("out", "number");
    this.addProperty("factor", 0.1);
    this.size = [80, 30];
    this._value = null;
  }
  function p() {
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("=", "number");
    this.addProperty("A", 1);
    this.addProperty("B", 1);
    this.addProperty("OP", "+", "enum", {values:p.values});
  }
  function k() {
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("A==B", "boolean");
    this.addOutput("A!=B", "boolean");
    this.addProperty("A", 0);
    this.addProperty("B", 0);
  }
  function a() {
    this.addInput("A", "number");
    this.addInput("B", "number");
    this.addOutput("true", "boolean");
    this.addOutput("false", "boolean");
    this.addProperty("A", 1);
    this.addProperty("B", 1);
    this.addProperty("OP", ">", "enum", {values:a.values});
    this.size = [80, 60];
  }
  function b() {
    this.addInput("inc", "number");
    this.addOutput("total", "number");
    this.addProperty("increment", 1);
    this.addProperty("value", 0);
  }
  function d() {
    this.addInput("v", "number");
    this.addOutput("sin", "number");
    this.addProperty("amplitude", 1);
    this.addProperty("offset", 0);
    this.bgImageUrl = "nodes/imgs/icon-sin.png";
  }
  function h() {
    this.addInput("x", "number");
    this.addInput("y", "number");
    this.addOutput("", "number");
    this.properties = {x:1.0, y:1.0, formula:"x+y"};
    this.code_widget = this.addWidget("text", "F(x,y)", this.properties.formula, function(a, b, d) {
      d.properties.formula = a;
    });
    this.addWidget("toggle", "allow", A.allow_scripts, function(a) {
      A.allow_scripts = a;
    });
    this._func = null;
  }
  function f() {
    this.addInput("vec2", "vec2");
    this.addOutput("x", "number");
    this.addOutput("y", "number");
  }
  function x() {
    this.addInputs([["x", "number"], ["y", "number"]]);
    this.addOutput("vec2", "vec2");
    this.properties = {x:0, y:0};
    this._data = new Float32Array(2);
  }
  function G() {
    this.addInput("vec3", "vec3");
    this.addOutput("x", "number");
    this.addOutput("y", "number");
    this.addOutput("z", "number");
  }
  function I() {
    this.addInputs([["x", "number"], ["y", "number"], ["z", "number"]]);
    this.addOutput("vec3", "vec3");
    this.properties = {x:0, y:0, z:0};
    this._data = new Float32Array(3);
  }
  function J() {
    this.addInput("vec4", "vec4");
    this.addOutput("x", "number");
    this.addOutput("y", "number");
    this.addOutput("z", "number");
    this.addOutput("w", "number");
  }
  function L() {
    this.addInputs([["x", "number"], ["y", "number"], ["z", "number"], ["w", "number"]]);
    this.addOutput("vec4", "vec4");
    this.properties = {x:0, y:0, z:0, w:0};
    this._data = new Float32Array(4);
  }
  var A = v.LiteGraph;
  c.title = "Converter";
  c.desc = "type A to type B";
  c.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (null != a && this.outputs) {
      for (var b = 0; b < this.outputs.length; b++) {
        var d = this.outputs[b];
        if (d.links && d.links.length) {
          var c = null;
          switch(d.name) {
            case "number":
              c = a.length ? a[0] : parseFloat(a);
              break;
            case "vec2":
            case "vec3":
            case "vec4":
              c = 1;
              switch(d.name) {
                case "vec2":
                  c = 2;
                  break;
                case "vec3":
                  c = 3;
                  break;
                case "vec4":
                  c = 4;
              }c = new Float32Array(c);
              if (a.length) {
                for (d = 0; d < a.length && d < c.length; d++) {
                  c[d] = a[d];
                }
              } else {
                c[0] = parseFloat(a);
              }
          }
          this.setOutputData(b, c);
        }
      }
    }
  };
  c.prototype.onGetOutputs = function() {
    return [["number", "number"], ["vec2", "vec2"], ["vec3", "vec3"], ["vec4", "vec4"]];
  };
  A.registerNodeType("math/converter", c);
  q.title = "Bypass";
  q.desc = "removes the type";
  q.prototype.onExecute = function() {
    var a = this.getInputData(0);
    this.setOutputData(0, a);
  };
  A.registerNodeType("math/bypass", q);
  m.title = "to Number";
  m.desc = "Cast to number";
  m.prototype.onExecute = function() {
    var a = this.getInputData(0);
    this.setOutputData(0, Number(a));
  };
  A.registerNodeType("math/to_number", m);
  g.title = "Range";
  g.desc = "Convert a number from one range to another";
  g.prototype.getTitle = function() {
    return this.flags.collapsed ? (this._last_v || 0).toFixed(2) : this.title;
  };
  g.prototype.onExecute = function() {
    if (this.inputs) {
      for (var a = 0; a < this.inputs.length; a++) {
        var b = this.inputs[a], d = this.getInputData(a);
        void 0 !== d && (this.properties[b.name] = d);
      }
    }
    d = this.properties["in"];
    if (void 0 === d || null === d || d.constructor !== Number) {
      d = 0;
    }
    a = this.properties.in_min;
    b = this.properties.out_min;
    var c = this.properties.out_max;
    this._last_v = (d - a) / (this.properties.in_max - a) * (c - b) + b;
    this.setOutputData(0, this._last_v);
    this.setOutputData(1, Math.clamp(this._last_v, b, c));
  };
  g.prototype.onDrawBackground = function(a) {
    this.outputs[0].label = this._last_v ? this._last_v.toFixed(3) : "?";
  };
  g.prototype.onGetInputs = function() {
    return [["in_min", "number"], ["in_max", "number"], ["out_min", "number"], ["out_max", "number"]];
  };
  A.registerNodeType("math/range", g);
  r.title = "Rand";
  r.desc = "Random number";
  r.prototype.onExecute = function() {
    if (this.inputs) {
      for (var a = 0; a < this.inputs.length; a++) {
        var b = this.inputs[a], d = this.getInputData(a);
        void 0 !== d && (this.properties[b.name] = d);
      }
    }
    a = this.properties.min;
    this._last_v = Math.random() * (this.properties.max - a) + a;
    this.setOutputData(0, this._last_v);
  };
  r.prototype.onDrawBackground = function(a) {
    this.outputs[0].label = (this._last_v || 0).toFixed(3);
  };
  r.prototype.onGetInputs = function() {
    return [["min", "number"], ["max", "number"]];
  };
  A.registerNodeType("math/rand", r);
  l.title = "Noise";
  l.desc = "Random number with temporal continuity";
  l.data = null;
  l.getValue = function(a, b) {
    if (!l.data) {
      l.data = new Float32Array(1024);
      for (var d = 0; d < l.data.length; ++d) {
        l.data[d] = Math.random();
      }
    }
    a %= 1024;
    0 > a && (a += 1024);
    var c = Math.floor(a);
    a -= c;
    d = l.data[c];
    c = l.data[1023 == c ? 0 : c + 1];
    b && (a = a * a * a * (a * (6.0 * a - 15.0) + 10.0));
    return d * (1 - a) + c * a;
  };
  l.prototype.onExecute = function() {
    var a = this.getInputData(0) || 0;
    a = l.getValue(a, this.properties.smooth);
    var b = this.properties.min;
    this._last_v = a * (this.properties.max - b) + b;
    this.setOutputData(0, this._last_v);
  };
  l.prototype.onDrawBackground = function(a) {
    this.outputs[0].label = (this._last_v || 0).toFixed(3);
  };
  A.registerNodeType("math/noise", l);
  C.title = "Spikes";
  C.desc = "spike every random time";
  C.prototype.onExecute = function() {
    var a = this.graph.elapsed_time;
    this._remaining_time -= a;
    this._blink_time -= a;
    a = 0;
    0 < this._blink_time && (a = 1 / (Math.pow(this._blink_time / this.properties.duration * 8 - 4, 4) + 1));
    0 > this._remaining_time ? (this._remaining_time = Math.random() * (this.properties.max_time - this.properties.min_time) + this.properties.min_time, this._blink_time = this.properties.duration, this.boxcolor = "#FFF") : this.boxcolor = "#000";
    this.setOutputData(0, a);
  };
  A.registerNodeType("math/spikes", C);
  y.title = "Clamp";
  y.desc = "Clamp number between min and max";
  y.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && (a = Math.max(this.properties.min, a), a = Math.min(this.properties.max, a), this.setOutputData(0, a));
  };
  y.prototype.getCode = function(a) {
    a = "";
    this.isInputConnected(0) && (a += "clamp({{0}}," + this.properties.min + "," + this.properties.max + ")");
    return a;
  };
  A.registerNodeType("math/clamp", y);
  w.title = "Lerp";
  w.desc = "Linear Interpolation";
  w.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = 0);
    var b = this.getInputData(1);
    null == b && (b = 0);
    var d = this.properties.f, c = this.getInputData(2);
    void 0 !== c && (d = c);
    this.setOutputData(0, a * (1 - d) + b * d);
  };
  w.prototype.onGetInputs = function() {
    return [["f", "number"]];
  };
  A.registerNodeType("math/lerp", w);
  E.title = "Abs";
  E.desc = "Absolute";
  E.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && this.setOutputData(0, Math.abs(a));
  };
  A.registerNodeType("math/abs", E);
  z.title = "Floor";
  z.desc = "Floor number to remove fractional part";
  z.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && this.setOutputData(0, Math.floor(a));
  };
  A.registerNodeType("math/floor", z);
  e.title = "Frac";
  e.desc = "Returns fractional part";
  e.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && this.setOutputData(0, a % 1);
  };
  A.registerNodeType("math/frac", e);
  B.title = "Smoothstep";
  B.desc = "Smoothstep";
  B.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (void 0 !== a) {
      var b = this.properties.A;
      a = Math.clamp((a - b) / (this.properties.B - b), 0.0, 1.0);
      this.setOutputData(0, a * a * (3 - 2 * a));
    }
  };
  A.registerNodeType("math/smoothstep", B);
  D.title = "Scale";
  D.desc = "v * factor";
  D.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && this.setOutputData(0, a * this.properties.factor);
  };
  A.registerNodeType("math/scale", D);
  u.title = "Gate";
  u.desc = "if v is true, then outputs A, otherwise B";
  u.prototype.onExecute = function() {
    var a = this.getInputData(0);
    this.setOutputData(0, this.getInputData(a ? 1 : 2));
  };
  A.registerNodeType("math/gate", u);
  H.title = "Average";
  H.desc = "Average Filter";
  H.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = 0);
    var b = this._values.length;
    this._values[this._current % b] = a;
    this._current += 1;
    this._current > b && (this._current = 0);
    for (var d = a = 0; d < b; ++d) {
      a += this._values[d];
    }
    this.setOutputData(0, a / b);
  };
  H.prototype.onPropertyChanged = function(a, b) {
    1 > b && (b = 1);
    this.properties.samples = Math.round(b);
    a = this._values;
    this._values = new Float32Array(this.properties.samples);
    a.length <= this._values.length ? this._values.set(a) : this._values.set(a.subarray(0, this._values.length));
  };
  A.registerNodeType("math/average", H);
  n.title = "TendTo";
  n.desc = "moves the output value always closer to the input";
  n.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = 0);
    var b = this.properties.factor;
    this._value = null == this._value ? a : this._value * (1 - b) + a * b;
    this.setOutputData(0, this._value);
  };
  A.registerNodeType("math/tendTo", n);
  p.values = "+ - * / % ^ max min".split(" ");
  p.title = "Operation";
  p.desc = "Easy math operators";
  p["@OP"] = {type:"enum", title:"operation", values:p.values};
  p.size = [100, 60];
  p.prototype.getTitle = function() {
    return "max" == this.properties.OP || "min" == this.properties.OP ? this.properties.OP + "(A,B)" : "A " + this.properties.OP + " B";
  };
  p.prototype.setValue = function(a) {
    "string" == typeof a && (a = parseFloat(a));
    this.properties.value = a;
  };
  p.prototype.onExecute = function() {
    var a = this.getInputData(0), b = this.getInputData(1);
    null != a ? this.properties.A = a : a = this.properties.A;
    null != b ? this.properties.B = b : b = this.properties.B;
    var d = 0;
    switch(this.properties.OP) {
      case "+":
        d = a + b;
        break;
      case "-":
        d = a - b;
        break;
      case "x":
      case "X":
      case "*":
        d = a * b;
        break;
      case "/":
        d = a / b;
        break;
      case "%":
        d = a % b;
        break;
      case "^":
        d = Math.pow(a, b);
        break;
      case "max":
        d = Math.max(a, b);
        break;
      case "min":
        d = Math.min(a, b);
        break;
      default:
        console.warn("Unknown operation: " + this.properties.OP);
    }
    this.setOutputData(0, d);
  };
  p.prototype.onDrawBackground = function(a) {
    this.flags.collapsed || (a.font = "40px Arial", a.fillStyle = "#666", a.textAlign = "center", a.fillText(this.properties.OP, 0.5 * this.size[0], 0.5 * (this.size[1] + A.NODE_TITLE_HEIGHT)), a.textAlign = "left");
  };
  A.registerNodeType("math/operation", p);
  A.registerSearchboxExtra("math/operation", "MAX", {properties:{OP:"max"}, title:"MAX()"});
  A.registerSearchboxExtra("math/operation", "MIN", {properties:{OP:"min"}, title:"MIN()"});
  k.title = "Compare";
  k.desc = "compares between two values";
  k.prototype.onExecute = function() {
    var a = this.getInputData(0), b = this.getInputData(1);
    void 0 !== a ? this.properties.A = a : a = this.properties.A;
    void 0 !== b ? this.properties.B = b : b = this.properties.B;
    for (var d = 0, c = this.outputs.length; d < c; ++d) {
      var k = this.outputs[d];
      if (k.links && k.links.length) {
        switch(k.name) {
          case "A==B":
            var f = a == b;
            break;
          case "A!=B":
            f = a != b;
            break;
          case "A>B":
            f = a > b;
            break;
          case "A<B":
            f = a < b;
            break;
          case "A<=B":
            f = a <= b;
            break;
          case "A>=B":
            f = a >= b;
        }
        this.setOutputData(d, f);
      }
    }
  };
  k.prototype.onGetOutputs = function() {
    return [["A==B", "boolean"], ["A!=B", "boolean"], ["A>B", "boolean"], ["A<B", "boolean"], ["A>=B", "boolean"], ["A<=B", "boolean"]];
  };
  A.registerNodeType("math/compare", k);
  A.registerSearchboxExtra("math/compare", "==", {outputs:[["A==B", "boolean"]], title:"A==B"});
  A.registerSearchboxExtra("math/compare", "!=", {outputs:[["A!=B", "boolean"]], title:"A!=B"});
  A.registerSearchboxExtra("math/compare", ">", {outputs:[["A>B", "boolean"]], title:"A>B"});
  A.registerSearchboxExtra("math/compare", "<", {outputs:[["A<B", "boolean"]], title:"A<B"});
  A.registerSearchboxExtra("math/compare", ">=", {outputs:[["A>=B", "boolean"]], title:"A>=B"});
  A.registerSearchboxExtra("math/compare", "<=", {outputs:[["A<=B", "boolean"]], title:"A<=B"});
  a.values = "> < == != <= >= || &&".split(" ");
  a["@OP"] = {type:"enum", title:"operation", values:a.values};
  a.title = "Condition";
  a.desc = "evaluates condition between A and B";
  a.prototype.getTitle = function() {
    return "A " + this.properties.OP + " B";
  };
  a.prototype.onExecute = function() {
    var a = this.getInputData(0);
    void 0 === a ? a = this.properties.A : this.properties.A = a;
    var b = this.getInputData(1);
    void 0 === b ? b = this.properties.B : this.properties.B = b;
    var d = !0;
    switch(this.properties.OP) {
      case ">":
        d = a > b;
        break;
      case "<":
        d = a < b;
        break;
      case "==":
        d = a == b;
        break;
      case "!=":
        d = a != b;
        break;
      case "<=":
        d = a <= b;
        break;
      case ">=":
        d = a >= b;
        break;
      case "||":
        d = a || b;
        break;
      case "&&":
        d = a && b;
    }
    this.setOutputData(0, d);
    this.setOutputData(1, !d);
  };
  A.registerNodeType("math/condition", a);
  b.title = "Accumulate";
  b.desc = "Increments a value every time";
  b.prototype.onExecute = function() {
    null === this.properties.value && (this.properties.value = 0);
    var a = this.getInputData(0);
    this.properties.value = null !== a ? this.properties.value + a : this.properties.value + this.properties.increment;
    this.setOutputData(0, this.properties.value);
  };
  A.registerNodeType("math/accumulate", b);
  d.title = "Trigonometry";
  d.desc = "Sin Cos Tan";
  d.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = 0);
    var b = this.properties.amplitude, d = this.findInputSlot("amplitude");
    -1 != d && (b = this.getInputData(d));
    var c = this.properties.offset;
    d = this.findInputSlot("offset");
    -1 != d && (c = this.getInputData(d));
    d = 0;
    for (var k = this.outputs.length; d < k; ++d) {
      switch(this.outputs[d].name) {
        case "sin":
          var f = Math.sin(a);
          break;
        case "cos":
          f = Math.cos(a);
          break;
        case "tan":
          f = Math.tan(a);
          break;
        case "asin":
          f = Math.asin(a);
          break;
        case "acos":
          f = Math.acos(a);
          break;
        case "atan":
          f = Math.atan(a);
      }
      this.setOutputData(d, b * f + c);
    }
  };
  d.prototype.onGetInputs = function() {
    return [["v", "number"], ["amplitude", "number"], ["offset", "number"]];
  };
  d.prototype.onGetOutputs = function() {
    return [["sin", "number"], ["cos", "number"], ["tan", "number"], ["asin", "number"], ["acos", "number"], ["atan", "number"]];
  };
  A.registerNodeType("math/trigonometry", d);
  A.registerSearchboxExtra("math/trigonometry", "SIN()", {outputs:[["sin", "number"]], title:"SIN()"});
  A.registerSearchboxExtra("math/trigonometry", "COS()", {outputs:[["cos", "number"]], title:"COS()"});
  A.registerSearchboxExtra("math/trigonometry", "TAN()", {outputs:[["tan", "number"]], title:"TAN()"});
  h.title = "Formula";
  h.desc = "Compute formula";
  h.size = [160, 100];
  H.prototype.onPropertyChanged = function(a, b) {
    "formula" == a && (this.code_widget.value = b);
  };
  h.prototype.onExecute = function() {
    if (A.allow_scripts) {
      var a = this.getInputData(0), b = this.getInputData(1);
      null != a ? this.properties.x = a : a = this.properties.x;
      null != b ? this.properties.y = b : b = this.properties.y;
      try {
        this._func && this._func_code == this.properties.formula || (this._func = new Function("x", "y", "TIME", "return " + this.properties.formula), this._func_code = this.properties.formula);
        var d = this._func(a, b, this.graph.globaltime);
        this.boxcolor = null;
      } catch (N) {
        this.boxcolor = "red";
      }
      this.setOutputData(0, d);
    }
  };
  h.prototype.getTitle = function() {
    return this._func_code || "Formula";
  };
  h.prototype.onDrawBackground = function() {
    var a = this.properties.formula;
    this.outputs && this.outputs.length && (this.outputs[0].label = a);
  };
  A.registerNodeType("math/formula", h);
  f.title = "Vec2->XY";
  f.desc = "vector 2 to components";
  f.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && (this.setOutputData(0, a[0]), this.setOutputData(1, a[1]));
  };
  A.registerNodeType("math3d/vec2-to-xy", f);
  x.title = "XY->Vec2";
  x.desc = "components to vector2";
  x.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = this.properties.x);
    var b = this.getInputData(1);
    null == b && (b = this.properties.y);
    var d = this._data;
    d[0] = a;
    d[1] = b;
    this.setOutputData(0, d);
  };
  A.registerNodeType("math3d/xy-to-vec2", x);
  G.title = "Vec3->XYZ";
  G.desc = "vector 3 to components";
  G.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && (this.setOutputData(0, a[0]), this.setOutputData(1, a[1]), this.setOutputData(2, a[2]));
  };
  A.registerNodeType("math3d/vec3-to-xyz", G);
  I.title = "XYZ->Vec3";
  I.desc = "components to vector3";
  I.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = this.properties.x);
    var b = this.getInputData(1);
    null == b && (b = this.properties.y);
    var d = this.getInputData(2);
    null == d && (d = this.properties.z);
    var c = this._data;
    c[0] = a;
    c[1] = b;
    c[2] = d;
    this.setOutputData(0, c);
  };
  A.registerNodeType("math3d/xyz-to-vec3", I);
  J.title = "Vec4->XYZW";
  J.desc = "vector 4 to components";
  J.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null != a && (this.setOutputData(0, a[0]), this.setOutputData(1, a[1]), this.setOutputData(2, a[2]), this.setOutputData(3, a[3]));
  };
  A.registerNodeType("math3d/vec4-to-xyzw", J);
  L.title = "XYZW->Vec4";
  L.desc = "components to vector4";
  L.prototype.onExecute = function() {
    var a = this.getInputData(0);
    null == a && (a = this.properties.x);
    var b = this.getInputData(1);
    null == b && (b = this.properties.y);
    var d = this.getInputData(2);
    null == d && (d = this.properties.z);
    var c = this.getInputData(3);
    null == c && (c = this.properties.w);
    var k = this._data;
    k[0] = a;
    k[1] = b;
    k[2] = d;
    k[3] = c;
    this.setOutputData(0, k);
  };
  A.registerNodeType("math3d/xyzw-to-vec4", L);
})(this);
(function(v) {
  function c() {
    this.addInput("sel", "number");
    this.addInput("A");
    this.addInput("B");
    this.addInput("C");
    this.addInput("D");
    this.addOutput("out");
    this.selected = 0;
  }
  function q() {
    this.properties = {sequence:"A,B,C"};
    this.addInput("index", "number");
    this.addInput("seq");
    this.addOutput("out");
    this.index = 0;
    this.values = this.properties.sequence.split(",");
  }
  var m = v.LiteGraph;
  c.title = "Selector";
  c.desc = "selects an output";
  c.prototype.onDrawBackground = function(c) {
    if (!this.flags.collapsed) {
      c.fillStyle = "#AFB";
      var g = (this.selected + 1) * m.NODE_SLOT_HEIGHT + 6;
      c.beginPath();
      c.moveTo(50, g);
      c.lineTo(50, g + m.NODE_SLOT_HEIGHT);
      c.lineTo(34, g + 0.5 * m.NODE_SLOT_HEIGHT);
      c.fill();
    }
  };
  c.prototype.onExecute = function() {
    var c = this.getInputData(0);
    if (null == c || c.constructor !== Number) {
      c = 0;
    }
    this.selected = c = Math.round(c) % (this.inputs.length - 1);
    c = this.getInputData(c + 1);
    void 0 !== c && this.setOutputData(0, c);
  };
  c.prototype.onGetInputs = function() {
    return [["E", 0], ["F", 0], ["G", 0], ["H", 0]];
  };
  m.registerNodeType("logic/selector", c);
  q.title = "Sequence";
  q.desc = "select one element from a sequence from a string";
  q.prototype.onPropertyChanged = function(c, m) {
    "sequence" == c && (this.values = m.split(","));
  };
  q.prototype.onExecute = function() {
    var c = this.getInputData(1);
    c && c != this.current_sequence && (this.values = c.split(","), this.current_sequence = c);
    c = this.getInputData(0);
    null == c && (c = 0);
    this.index = c = Math.round(c) % this.values.length;
    this.setOutputData(0, this.values[c]);
  };
  m.registerNodeType("logic/sequence", q);
})(this);
(function(v) {
  function c() {
    this.addOutput("tex", "Texture");
    this.addOutput("name", "string");
    this.properties = {name:"", filter:!0};
    this.size = [c.image_preview_size, c.image_preview_size];
  }
  function q() {
    this.addInput("Texture", "Texture");
    this.properties = {flipY:!1};
    this.size = [c.image_preview_size, c.image_preview_size];
  }
  function m() {
    this.addInput("Texture", "Texture");
    this.addOutput("tex", "Texture");
    this.addOutput("name", "string");
    this.properties = {name:"", generate_mipmaps:!1};
  }
  function g() {
    this.addInput("Texture", "Texture");
    this.addInput("TextureB", "Texture");
    this.addInput("value", "number");
    this.addOutput("Texture", "Texture");
    this.help = "<p>pixelcode must be vec3, uvcode must be vec2, is optional</p>\t\t<p><strong>uv:</strong> tex. coords</p><p><strong>color:</strong> texture <strong>colorB:</strong> textureB</p><p><strong>time:</strong> scene time <strong>value:</strong> input value</p><p>For multiline you must type: result = ...</p>";
    this.properties = {value:1, pixelcode:"color + colorB * value", uvcode:"", precision:c.DEFAULT};
    this.has_error = !1;
  }
  function r() {
    this.addOutput("out", "Texture");
    this.properties = {code:"", u_value:1, u_color:[1, 1, 1, 1], width:512, height:512, precision:c.DEFAULT};
    this.properties.code = r.pixel_shader;
    this._uniforms = {u_value:1, u_color:vec4.create(), in_texture:0, texSize:vec2.create(), time:0};
  }
  function l() {
    this.addInput("in", "Texture");
    this.addInput("scale", "vec2");
    this.addInput("offset", "vec2");
    this.addOutput("out", "Texture");
    this.properties = {offset:vec2.fromValues(0, 0), scale:vec2.fromValues(1, 1), precision:c.DEFAULT};
  }
  function C() {
    this.addInput("in", "Texture");
    this.addInput("warp", "Texture");
    this.addInput("factor", "number");
    this.addOutput("out", "Texture");
    this.properties = {factor:0.01, scale:[1, 1], offset:[0, 0], precision:c.DEFAULT};
    this._uniforms = {u_texture:0, u_textureB:1, u_factor:1, u_scale:vec2.create(), u_offset:vec2.create()};
  }
  function y() {
    this.addInput("Texture", "Texture");
    this.properties = {additive:!1, antialiasing:!1, filter:!0, disable_alpha:!1, gamma:1.0, viewport:[0, 0, 1, 1]};
    this.size[0] = 130;
  }
  function w() {
    this.addInput("Texture", "Texture");
    this.addOutput("", "Texture");
    this.properties = {size:0, generate_mipmaps:!1, precision:c.DEFAULT};
  }
  function E() {
    this.addInput("Texture", "Texture");
    this.addOutput("", "Texture");
    this.properties = {iterations:1, generate_mipmaps:!1, precision:c.DEFAULT};
  }
  function z() {
    this.addInput("Texture", "Texture");
    this.addOutput("tex", "Texture");
    this.addOutput("avg", "vec4");
    this.addOutput("lum", "number");
    this.properties = {use_previous_frame:!0, high_quality:!1};
    this._uniforms = {u_texture:0, u_mipmap_offset:0};
    this._luminance = new Float32Array(4);
  }
  function e() {
    this.addInput("in", "Texture");
    this.addInput("factor", "Number");
    this.addOutput("out", "Texture");
    this.properties = {factor:0.5};
    this._uniforms = {u_texture:0, u_textureB:1, u_factor:this.properties.factor};
  }
  function B() {
    this.addInput("in", "Texture");
    this.addOutput("avg", "Texture");
    this.addOutput("array", "Texture");
    this.properties = {samples:64, frames_interval:1};
    this._uniforms = {u_texture:0, u_textureB:1, u_samples:this.properties.samples, u_isamples:1 / this.properties.samples};
    this.frame = 0;
  }
  function D() {
    this.addInput("Image", "image");
    this.addOutput("", "Texture");
    this.properties = {};
  }
  function u() {
    this.addInput("Texture", "Texture");
    this.addInput("LUT", "Texture");
    this.addInput("Intensity", "number");
    this.addOutput("", "Texture");
    this.properties = {enabled:!0, intensity:1, precision:c.DEFAULT, texture:null};
    u._shader || (u._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, u.pixel_shader));
  }
  function H() {
    this.addInput("Texture", "Texture");
    this.addOutput("R", "Texture");
    this.addOutput("G", "Texture");
    this.addOutput("B", "Texture");
    this.addOutput("A", "Texture");
    H._shader || (H._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, H.pixel_shader));
  }
  function n() {
    this.addInput("R", "Texture");
    this.addInput("G", "Texture");
    this.addInput("B", "Texture");
    this.addInput("A", "Texture");
    this.addOutput("Texture", "Texture");
    this.properties = {precision:c.DEFAULT, R:1, G:1, B:1, A:1};
    this._color = vec4.create();
    this._uniforms = {u_textureR:0, u_textureG:1, u_textureB:2, u_textureA:3, u_color:this._color};
  }
  function p() {
    this.addOutput("Texture", "Texture");
    this._tex_color = vec4.create();
    this.properties = {color:vec4.create(), precision:c.DEFAULT};
  }
  function k() {
    this.addInput("A", "color");
    this.addInput("B", "color");
    this.addOutput("Texture", "Texture");
    this.properties = {angle:0, scale:1, A:[0, 0, 0], B:[1, 1, 1], texture_size:32};
    k._shader || (k._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, k.pixel_shader));
    this._uniforms = {u_angle:0, u_colorA:vec3.create(), u_colorB:vec3.create()};
  }
  function a() {
    this.addInput("A", "Texture");
    this.addInput("B", "Texture");
    this.addInput("Mixer", "Texture");
    this.addOutput("Texture", "Texture");
    this.properties = {factor:0.5, size_from_biggest:!0, invert:!1, precision:c.DEFAULT};
    this._uniforms = {u_textureA:0, u_textureB:1, u_textureMix:2, u_mix:vec4.create()};
  }
  function b() {
    this.addInput("Tex.", "Texture");
    this.addOutput("Edges", "Texture");
    this.properties = {invert:!0, threshold:!1, factor:1, precision:c.DEFAULT};
    b._shader || (b._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, b.pixel_shader));
  }
  function d() {
    this.addInput("Texture", "Texture");
    this.addInput("Distance", "number");
    this.addInput("Range", "number");
    this.addOutput("Texture", "Texture");
    this.properties = {distance:100, range:50, only_depth:!1, high_precision:!1};
    this._uniforms = {u_texture:0, u_distance:100, u_range:50, u_camera_planes:null};
  }
  function h() {
    this.addInput("Texture", "Texture");
    this.addOutput("Texture", "Texture");
    this.properties = {precision:c.DEFAULT, invert:!1};
    this._uniforms = {u_texture:0, u_camera_planes:null, u_ires:vec2.create()};
  }
  function f() {
    this.addInput("Texture", "Texture");
    this.addInput("Iterations", "number");
    this.addInput("Intensity", "number");
    this.addOutput("Blurred", "Texture");
    this.properties = {intensity:1, iterations:1, preserve_aspect:!1, scale:[1, 1], precision:c.DEFAULT};
  }
  function x() {
    this.addInput("in", "Texture");
    this.addInput("dirt", "Texture");
    this.addOutput("out", "Texture");
    this.addOutput("glow", "Texture");
    this.properties = {enabled:!0, intensity:1, persistence:0.99, iterations:16, threshold:0, scale:1, dirt_factor:0.5, precision:c.DEFAULT};
    this._textures = [];
    this._uniforms = {u_intensity:1, u_texture:0, u_glow_texture:1, u_threshold:0, u_texel_size:vec2.create()};
  }
  function G() {
    this.addInput("Texture", "Texture");
    this.addOutput("Filtered", "Texture");
    this.properties = {intensity:1, radius:5};
  }
  function I() {
    this.addInput("Texture", "Texture");
    this.addOutput("Filtered", "Texture");
    this.properties = {sigma:1.4, k:1.6, p:21.7, epsilon:79, phi:0.017};
  }
  function J() {
    this.addOutput("Webcam", "Texture");
    this.properties = {texture_name:"", facingMode:"user"};
    this.boxcolor = "black";
    this.version = 0;
  }
  function L() {
    this.addInput("in", "Texture");
    this.addInput("f", "number");
    this.addOutput("out", "Texture");
    this.properties = {enabled:!0, factor:1, precision:c.LOW};
    this._uniforms = {u_texture:0, u_factor:1};
  }
  function A() {
    this.addInput("in", "Texture");
    this.addOutput("out", "Texture");
    this.properties = {precision:c.LOW, split_channels:!1};
    this._values = new Uint8Array(1024);
    this._values.fill(255);
    this._curve_texture = null;
    this._uniforms = {u_texture:0, u_curve:1, u_range:1.0};
    this._must_update = !0;
    this._points = {RGB:[[0, 0], [1, 1]], R:[[0, 0], [1, 1]], G:[[0, 0], [1, 1]], B:[[0, 0], [1, 1]]};
    this.curve_editor = null;
    this.addWidget("toggle", "Split Channels", !1, "split_channels");
    this.addWidget("combo", "Channel", "RGB", {values:["RGB", "R", "G", "B"]});
    this.curve_offset = 68;
    this.size = [240, 160];
  }
  function t() {
    this.addInput("in", "Texture");
    this.addInput("exp", "number");
    this.addOutput("out", "Texture");
    this.properties = {exposition:1, precision:c.LOW};
    this._uniforms = {u_texture:0, u_exposition:1};
  }
  function K() {
    this.addInput("in", "Texture");
    this.addInput("avg", "number,Texture");
    this.addOutput("out", "Texture");
    this.properties = {enabled:!0, scale:1, gamma:1, average_lum:1, lum_white:1, precision:c.LOW};
    this._uniforms = {u_texture:0, u_lumwhite2:1, u_igamma:1, u_scale:1, u_average_lum:1};
  }
  function M() {
    this.addOutput("out", "Texture");
    this.properties = {width:512, height:512, seed:0, persistence:0.1, octaves:8, scale:1, offset:[0, 0], amplitude:1, precision:c.DEFAULT};
    this._key = 0;
    this._texture = null;
    this._uniforms = {u_persistence:0.1, u_seed:0, u_offset:vec2.create(), u_scale:1, u_viewport:vec2.create()};
  }
  function N() {
    this.addInput("v");
    this.addOutput("out", "Texture");
    this.properties = {code:N.default_code, width:512, height:512, clear:!0, precision:c.DEFAULT, use_html_canvas:!1};
    this._temp_texture = this._func = null;
    this.compileCode();
  }
  function O() {
    this.addInput("in", "Texture");
    this.addOutput("out", "Texture");
    this.properties = {key_color:vec3.fromValues(0, 1, 0), threshold:0.8, slope:0.2, precision:c.DEFAULT};
  }
  function P() {
    this.addInput("in", "texture");
    this.addInput("yaw", "number");
    this.addOutput("out", "texture");
    this.properties = {yaw:0};
  }
  var F = v.LiteGraph;
  v.LGraphTexture = null;
  "undefined" != typeof GL && (LGraphCanvas.link_type_colors.Texture = "#987", v.LGraphTexture = c, c.title = "Texture", c.desc = "Texture", c.widgets_info = {name:{widget:"texture"}, filter:{widget:"checkbox"}}, c.loadTextureCallback = null, c.image_preview_size = 256, c.PASS_THROUGH = 1, c.COPY = 2, c.LOW = 3, c.HIGH = 4, c.REUSE = 5, c.DEFAULT = 2, c.MODE_VALUES = {"pass through":c.PASS_THROUGH, copy:c.COPY, low:c.LOW, high:c.HIGH, reuse:c.REUSE, default:c.DEFAULT}, c.getTexturesContainer = function() {
    return gl.textures;
  }, c.loadTexture = function(a, b) {
    b = b || {};
    var d = a;
    "http://" == d.substr(0, 7) && F.proxy && (d = F.proxy + d.substr(7));
    return c.getTexturesContainer()[a] = GL.Texture.fromURL(d, b);
  }, c.getTexture = function(a) {
    var b = this.getTexturesContainer();
    if (!b) {
      throw "Cannot load texture, container of textures not found";
    }
    b = b[a];
    return !b && a && ":" != a[0] ? this.loadTexture(a) : b;
  }, c.getTargetTexture = function(a, b, d) {
    if (!a) {
      throw "LGraphTexture.getTargetTexture expects a reference texture";
    }
    switch(d) {
      case c.LOW:
        d = gl.UNSIGNED_BYTE;
        break;
      case c.HIGH:
        d = gl.HIGH_PRECISION_FORMAT;
        break;
      case c.REUSE:
        return a;
      default:
        d = a ? a.type : gl.UNSIGNED_BYTE;
    }
    b && b.width == a.width && b.height == a.height && b.type == d || (b = new GL.Texture(a.width, a.height, {type:d, format:gl.RGBA, filter:gl.LINEAR}));
    return b;
  }, c.getTextureType = function(a, b) {
    b = b ? b.type : gl.UNSIGNED_BYTE;
    switch(a) {
      case c.HIGH:
        b = gl.HIGH_PRECISION_FORMAT;
        break;
      case c.LOW:
        b = gl.UNSIGNED_BYTE;
    }
    return b;
  }, c.getWhiteTexture = function() {
    return this._white_texture ? this._white_texture : this._white_texture = GL.Texture.fromMemory(1, 1, [255, 255, 255, 255], {format:gl.RGBA, wrap:gl.REPEAT, filter:gl.NEAREST});
  }, c.getNoiseTexture = function() {
    if (this._noise_texture) {
      return this._noise_texture;
    }
    for (var a = new Uint8Array(1048576), b = 0; 1048576 > b; ++b) {
      a[b] = 255 * Math.random();
    }
    return this._noise_texture = a = GL.Texture.fromMemory(512, 512, a, {format:gl.RGBA, wrap:gl.REPEAT, filter:gl.NEAREST});
  }, c.prototype.onDropFile = function(a, b, d) {
    a ? ("string" == typeof a ? a = GL.Texture.fromURL(a) : -1 != b.toLowerCase().indexOf(".dds") ? a = GL.Texture.fromDDSInMemory(a) : (a = new Blob([d]), a = URL.createObjectURL(a), a = GL.Texture.fromURL(a)), this._drop_texture = a, this.properties.name = b) : (this._drop_texture = null, this.properties.name = "");
  }, c.prototype.getExtraMenuOptions = function(a) {
    var b = this;
    if (this._drop_texture) {
      return [{content:"Clear", callback:function() {
        b._drop_texture = null;
        b.properties.name = "";
      }}];
    }
  }, c.prototype.onExecute = function() {
    var a = null;
    this.isOutputConnected(1) && (a = this.getInputData(0));
    !a && this._drop_texture && (a = this._drop_texture);
    !a && this.properties.name && (a = c.getTexture(this.properties.name));
    if (a) {
      this._last_tex = a;
      !1 === this.properties.filter ? a.setParameter(gl.TEXTURE_MAG_FILTER, gl.NEAREST) : a.setParameter(gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      this.setOutputData(0, a);
      this.setOutputData(1, a.fullpath || a.filename);
      for (var b = 2; b < this.outputs.length; b++) {
        var d = this.outputs[b];
        if (d) {
          var k = null;
          "width" == d.name ? k = a.width : "height" == d.name ? k = a.height : "aspect" == d.name && (k = a.width / a.height);
          this.setOutputData(b, k);
        }
      }
    } else {
      this.setOutputData(0, null), this.setOutputData(1, "");
    }
  }, c.prototype.onResourceRenamed = function(a, b) {
    this.properties.name == a && (this.properties.name = b);
  }, c.prototype.onDrawBackground = function(a) {
    if (!(this.flags.collapsed || 20 >= this.size[1])) {
      if (this._drop_texture && a.webgl) {
        a.drawImage(this._drop_texture, 0, 0, this.size[0], this.size[1]);
      } else {
        if (this._last_preview_tex != this._last_tex) {
          if (a.webgl) {
            this._canvas = this._last_tex;
          } else {
            var b = c.generateLowResTexturePreview(this._last_tex);
            if (!b) {
              return;
            }
            this._last_preview_tex = this._last_tex;
            this._canvas = cloneCanvas(b);
          }
        }
        this._canvas && (a.save(), a.webgl || (a.translate(0, this.size[1]), a.scale(1, -1)), a.drawImage(this._canvas, 0, 0, this.size[0], this.size[1]), a.restore());
      }
    }
  }, c.generateLowResTexturePreview = function(a) {
    if (!a) {
      return null;
    }
    var b = c.image_preview_size, d = a;
    if (a.format == gl.DEPTH_COMPONENT) {
      return null;
    }
    if (a.width > b || a.height > b) {
      d = this._preview_temp_tex, this._preview_temp_tex || (this._preview_temp_tex = d = new GL.Texture(b, b, {minFilter:gl.NEAREST})), a.copyTo(d);
    }
    a = this._preview_canvas;
    a || (this._preview_canvas = a = createCanvas(b, b));
    d && d.toCanvas(a);
    return a;
  }, c.prototype.getResources = function(a) {
    this.properties.name && (a[this.properties.name] = GL.Texture);
    return a;
  }, c.prototype.onGetInputs = function() {
    return [["in", "Texture"]];
  }, c.prototype.onGetOutputs = function() {
    return [["width", "number"], ["height", "number"], ["aspect", "number"]];
  }, c.replaceCode = function(a, b) {
    return a.replace(/\{\{[a-zA-Z0-9_]*\}\}/g, function(a) {
      a = a.replace(/[\{\}]/g, "");
      return b[a] || "";
    });
  }, F.registerNodeType("texture/texture", c), q.title = "Preview", q.desc = "Show a texture in the graph canvas", q.allow_preview = !1, q.prototype.onDrawBackground = function(a) {
    if (!this.flags.collapsed && (a.webgl || q.allow_preview)) {
      var b = this.getInputData(0);
      b && (b = !b.handle && a.webgl ? b : c.generateLowResTexturePreview(b), a.save(), this.properties.flipY && (a.translate(0, this.size[1]), a.scale(1, -1)), a.drawImage(b, 0, 0, this.size[0], this.size[1]), a.restore());
    }
  }, F.registerNodeType("texture/preview", q), m.title = "Save", m.desc = "Save a texture in the repository", m.prototype.getPreviewTexture = function() {
    return this._texture;
  }, m.prototype.onExecute = function() {
    var a = this.getInputData(0);
    a && (this.properties.generate_mipmaps && (a.bind(0), a.setParameter(gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), gl.generateMipmap(a.texture_type), a.unbind(0)), this.properties.name && (c.storeTexture ? c.storeTexture(this.properties.name, a) : c.getTexturesContainer()[this.properties.name] = a), this._texture = a, this.setOutputData(0, a), this.setOutputData(1, this.properties.name));
  }, F.registerNodeType("texture/save", m), g.widgets_info = {uvcode:{widget:"code"}, pixelcode:{widget:"code"}, precision:{widget:"combo", values:c.MODE_VALUES}}, g.title = "Operation", g.desc = "Texture shader operation", g.presets = {}, g.prototype.getExtraMenuOptions = function(a) {
    var b = this;
    return [{content:b.properties.show ? "Hide Texture" : "Show Texture", callback:function() {
      b.properties.show = !b.properties.show;
    }}];
  }, g.prototype.onPropertyChanged = function() {
    this.has_error = !1;
  }, g.prototype.onDrawBackground = function(a) {
    this.flags.collapsed || 20 >= this.size[1] || !this.properties.show || !this._tex || this._tex.gl != a || (a.save(), a.drawImage(this._tex, 0, 0, this.size[0], this.size[1]), a.restore());
  }, g.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (this.isOutputConnected(0)) {
      if (this.properties.precision === c.PASS_THROUGH) {
        this.setOutputData(0, a);
      } else {
        var b = this.getInputData(1);
        if (this.properties.uvcode || this.properties.pixelcode) {
          var d = 512, k = 512;
          a ? (d = a.width, k = a.height) : b && (d = b.width, k = b.height);
          b || (b = GL.Texture.getWhiteTexture());
          var f = c.getTextureType(this.properties.precision, a);
          this._tex = a || this._tex ? c.getTargetTexture(a || this._tex, this._tex, this.properties.precision) : new GL.Texture(d, k, {type:f, format:gl.RGBA, filter:gl.LINEAR});
          f = "";
          this.properties.uvcode && (f = "uv = " + this.properties.uvcode, -1 != this.properties.uvcode.indexOf(";") && (f = this.properties.uvcode));
          var h = "";
          this.properties.pixelcode && (h = "result = " + this.properties.pixelcode, -1 != this.properties.pixelcode.indexOf(";") && (h = this.properties.pixelcode));
          var e = this._shader;
          if (!(this.has_error || e && this._shader_code == f + "|" + h)) {
            var n = c.replaceCode(g.pixel_shader, {UV_CODE:f, PIXEL_CODE:h});
            try {
              e = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, n), this.boxcolor = "#00FF00";
            } catch (T) {
              GL.Shader.dumpErrorToConsole(T, Shader.SCREEN_VERTEX_SHADER, n);
              this.boxcolor = "#FF0000";
              this.has_error = !0;
              return;
            }
            this._shader = e;
            this._shader_code = f + "|" + h;
          }
          if (this._shader) {
            var p = this.getInputData(2);
            null != p ? this.properties.value = p : p = parseFloat(this.properties.value);
            var l = this.graph.getTime();
            this._tex.drawTo(function() {
              gl.disable(gl.DEPTH_TEST);
              gl.disable(gl.CULL_FACE);
              gl.disable(gl.BLEND);
              a && a.bind(0);
              b && b.bind(1);
              var c = Mesh.getScreenQuad();
              e.uniforms({u_texture:0, u_textureB:1, value:p, texSize:[d, k], time:l}).draw(c);
            });
            this.setOutputData(0, this._tex);
          }
        }
      }
    }
  }, g.pixel_shader = "precision highp float;\n\t\t\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tvarying vec2 v_coord;\n\t\tuniform vec2 texSize;\n\t\tuniform float time;\n\t\tuniform float value;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord;\n\t\t\t{{UV_CODE}};\n\t\t\tvec4 color4 = texture2D(u_texture, uv);\n\t\t\tvec3 color = color4.rgb;\n\t\t\tvec4 color4B = texture2D(u_textureB, uv);\n\t\t\tvec3 colorB = color4B.rgb;\n\t\t\tvec3 result = color;\n\t\t\tfloat alpha = 1.0;\n\t\t\t{{PIXEL_CODE}};\n\t\t\tgl_FragColor = vec4(result, alpha);\n\t\t}\n\t\t", 
  g.registerPreset = function(a, b) {
    g.presets[a] = b;
  }, g.registerPreset("", ""), g.registerPreset("bypass", "color"), g.registerPreset("add", "color + colorB * value"), g.registerPreset("substract", "(color - colorB) * value"), g.registerPreset("mate", "mix( color, colorB, color4B.a * value)"), g.registerPreset("invert", "vec3(1.0) - color"), g.registerPreset("multiply", "color * colorB * value"), g.registerPreset("divide", "(color / colorB) / value"), g.registerPreset("difference", "abs(color - colorB) * value"), g.registerPreset("max", "max(color, colorB) * value"), 
  g.registerPreset("min", "min(color, colorB) * value"), g.registerPreset("displace", "texture2D(u_texture, uv + (colorB.xy - vec2(0.5)) * value).xyz"), g.registerPreset("grayscale", "vec3(color.x + color.y + color.z) * value / 3.0"), g.registerPreset("saturation", "mix( vec3(color.x + color.y + color.z) / 3.0, color, value )"), g.registerPreset("threshold", "vec3(color.x > colorB.x * value ? 1.0 : 0.0,color.y > colorB.y * value ? 1.0 : 0.0,color.z > colorB.z * value ? 1.0 : 0.0)"), g.prototype.onInspect = 
  function(a) {
    var b = this;
    a.addCombo("Presets", "", {values:Object.keys(g.presets), callback:function(d) {
      var c = g.presets[d];
      c && (b.setProperty("pixelcode", c), b.title = d, a.refresh());
    }});
  }, F.registerNodeType("texture/operation", g), r.title = "Shader", r.desc = "Texture shader", r.widgets_info = {code:{type:"code", lang:"glsl"}, precision:{widget:"combo", values:c.MODE_VALUES}}, r.prototype.onPropertyChanged = function(a, b) {
    if ("code" == a && (a = this.getShader())) {
      b = a.uniformInfo;
      if (this.inputs) {
        for (var d = {}, c = 0; c < this.inputs.length; ++c) {
          var k = this.getInputInfo(c);
          k && (b[k.name] && !d[k.name] ? d[k.name] = !0 : (this.removeInput(c), c--));
        }
      }
      for (c in b) {
        if (k = a.uniformInfo[c], null !== k.loc && "time" != c) {
          if (this._shader.samplers[c]) {
            b = "texture";
          } else {
            switch(k.size) {
              case 1:
                b = "number";
                break;
              case 2:
                b = "vec2";
                break;
              case 3:
                b = "vec3";
                break;
              case 4:
                b = "vec4";
                break;
              case 9:
                b = "mat3";
                break;
              case 16:
                b = "mat4";
                break;
              default:
                continue;
            }
          }
          d = this.findInputSlot(c);
          if (-1 != d && (k = this.getInputInfo(d))) {
            if (k.type == b) {
              continue;
            }
            this.removeInput(d, b);
          }
          this.addInput(c, b);
        }
      }
    }
  }, r.prototype.getShader = function() {
    if (this._shader && this._shader_code == this.properties.code) {
      return this._shader;
    }
    this._shader_code = this.properties.code;
    this._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, this.properties.code), this.boxcolor = "green";
    return this._shader;
  }, r.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getShader();
      if (a) {
        var b = 0, d = null;
        if (this.inputs) {
          for (var k = 0; k < this.inputs.length; ++k) {
            var f = this.getInputInfo(k), h = this.getInputData(k);
            null != h && (h.constructor === GL.Texture && (h.bind(b), d || (d = h), h = b, b++), a.setUniform(f.name, h));
          }
        }
        var e = this._uniforms;
        b = c.getTextureType(this.properties.precision, d);
        k = this.properties.width | 0;
        f = this.properties.height | 0;
        0 == k && (k = d ? d.width : gl.canvas.width);
        0 == f && (f = d ? d.height : gl.canvas.height);
        e.texSize[0] = k;
        e.texSize[1] = f;
        e.time = this.graph.getTime();
        e.u_value = this.properties.u_value;
        e.u_color.set(this.properties.u_color);
        this._tex && this._tex.type == b && this._tex.width == k && this._tex.height == f || (this._tex = new GL.Texture(k, f, {type:b, format:gl.RGBA, filter:gl.LINEAR}));
        this._tex.drawTo(function() {
          a.uniforms(e).draw(GL.Mesh.getScreenQuad());
        });
        this.setOutputData(0, this._tex);
      }
    }
  }, r.pixel_shader = "precision highp float;\n\nvarying vec2 v_coord;\nuniform float time; //time in seconds\nuniform vec2 texSize; //tex resolution\nuniform float u_value;\nuniform vec4 u_color;\n\nvoid main() {\n\tvec2 uv = v_coord;\n\tvec3 color = vec3(0.0);\n\t//your code here\n\tcolor.xy=uv;\n\n\tgl_FragColor = vec4(color, 1.0);\n}\n", F.registerNodeType("texture/shader", r), l.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, l.title = "Scale/Offset", l.desc = "Applies an scaling and offseting", 
  l.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (this.isOutputConnected(0) && a) {
      if (this.properties.precision === c.PASS_THROUGH) {
        this.setOutputData(0, a);
      } else {
        var b = a.width, d = a.height, k = this.precision === c.LOW ? gl.UNSIGNED_BYTE : gl.HIGH_PRECISION_FORMAT;
        this.precision === c.DEFAULT && (k = a.type);
        this._tex && this._tex.width == b && this._tex.height == d && this._tex.type == k || (this._tex = new GL.Texture(b, d, {type:k, format:gl.RGBA, filter:gl.LINEAR}));
        var f = this._shader;
        f || (f = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, l.pixel_shader));
        var h = this.getInputData(1);
        h ? (this.properties.scale[0] = h[0], this.properties.scale[1] = h[1]) : h = this.properties.scale;
        var e = this.getInputData(2);
        e ? (this.properties.offset[0] = e[0], this.properties.offset[1] = e[1]) : e = this.properties.offset;
        this._tex.drawTo(function() {
          gl.disable(gl.DEPTH_TEST);
          gl.disable(gl.CULL_FACE);
          gl.disable(gl.BLEND);
          a.bind(0);
          var b = Mesh.getScreenQuad();
          f.uniforms({u_texture:0, u_scale:h, u_offset:e}).draw(b);
        });
        this.setOutputData(0, this._tex);
      }
    }
  }, l.pixel_shader = "precision highp float;\n\t\t\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tvarying vec2 v_coord;\n\t\tuniform vec2 u_scale;\n\t\tuniform vec2 u_offset;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord;\n\t\t\tuv = uv / u_scale - u_offset;\n\t\t\tgl_FragColor = texture2D(u_texture, uv);\n\t\t}\n\t\t", F.registerNodeType("texture/scaleOffset", l), C.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, C.title = "Warp", C.desc = "Texture warp operation", 
  C.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (this.isOutputConnected(0)) {
      if (this.properties.precision === c.PASS_THROUGH) {
        this.setOutputData(0, a);
      } else {
        var b = this.getInputData(1), d = 512, k = 512;
        a ? (d = a.width, k = a.height) : b && (d = b.width, k = b.height);
        this._tex = a || this._tex ? c.getTargetTexture(a || this._tex, this._tex, this.properties.precision) : new GL.Texture(d, k, {type:this.precision === c.LOW ? gl.UNSIGNED_BYTE : gl.HIGH_PRECISION_FORMAT, format:gl.RGBA, filter:gl.LINEAR});
        var f = this._shader;
        f || (f = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, C.pixel_shader));
        d = this.getInputData(2);
        null != d ? this.properties.factor = d : d = parseFloat(this.properties.factor);
        var h = this._uniforms;
        h.u_factor = d;
        h.u_scale.set(this.properties.scale);
        h.u_offset.set(this.properties.offset);
        this._tex.drawTo(function() {
          gl.disable(gl.DEPTH_TEST);
          gl.disable(gl.CULL_FACE);
          gl.disable(gl.BLEND);
          a && a.bind(0);
          b && b.bind(1);
          var d = Mesh.getScreenQuad();
          f.uniforms(h).draw(d);
        });
        this.setOutputData(0, this._tex);
      }
    }
  }, C.pixel_shader = "precision highp float;\n\t\t\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tvarying vec2 v_coord;\n\t\tuniform float u_factor;\n\t\tuniform vec2 u_scale;\n\t\tuniform vec2 u_offset;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord;\n\t\t\tuv += ( texture2D(u_textureB, uv).rg - vec2(0.5)) * u_factor * u_scale + u_offset;\n\t\t\tgl_FragColor = texture2D(u_texture, uv);\n\t\t}\n\t\t", F.registerNodeType("texture/warp", C), y.title = "to Viewport", y.desc = 
  "Texture to viewport", y._prev_viewport = new Float32Array(4), y.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a) {
      this.properties.disable_alpha ? gl.disable(gl.BLEND) : (gl.enable(gl.BLEND), this.properties.additive ? gl.blendFunc(gl.SRC_ALPHA, gl.ONE) : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA));
      gl.disable(gl.DEPTH_TEST);
      var b = this.properties.gamma || 1.0;
      this.isInputConnected(1) && (b = this.getInputData(1));
      a.setParameter(gl.TEXTURE_MAG_FILTER, this.properties.filter ? gl.LINEAR : gl.NEAREST);
      var d = y._prev_viewport;
      d.set(gl.viewport_data);
      var c = this.properties.viewport;
      gl.viewport(d[0] + d[2] * c[0], d[1] + d[3] * c[1], d[2] * c[2], d[3] * c[3]);
      gl.getViewport();
      this.properties.antialiasing ? (y._shader || (y._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, y.aa_pixel_shader)), c = Mesh.getScreenQuad(), a.bind(0), y._shader.uniforms({u_texture:0, uViewportSize:[a.width, a.height], u_igamma:1 / b, inverseVP:[1 / a.width, 1 / a.height]}).draw(c)) : 1.0 != b ? (y._gamma_shader || (y._gamma_shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, y.gamma_pixel_shader)), a.toViewport(y._gamma_shader, {u_texture:0, u_igamma:1 / b})) : a.toViewport();
      gl.viewport(d[0], d[1], d[2], d[3]);
    }
  }, y.prototype.onGetInputs = function() {
    return [["gamma", "number"]];
  }, y.aa_pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 uViewportSize;\n\t\tuniform vec2 inverseVP;\n\t\tuniform float u_igamma;\n\t\t#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n\t\t#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n\t\t#define FXAA_SPAN_MAX     8.0\n\t\t\n\t\t/* from mitsuhiko/webgl-meincraft based on the code on geeks3d.com */\n\t\tvec4 applyFXAA(sampler2D tex, vec2 fragCoord)\n\t\t{\n\t\t\tvec4 color = vec4(0.0);\n\t\t\t/*vec2 inverseVP = vec2(1.0 / uViewportSize.x, 1.0 / uViewportSize.y);*/\n\t\t\tvec3 rgbNW = texture2D(tex, (fragCoord + vec2(-1.0, -1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbNE = texture2D(tex, (fragCoord + vec2(1.0, -1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbSW = texture2D(tex, (fragCoord + vec2(-1.0, 1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbSE = texture2D(tex, (fragCoord + vec2(1.0, 1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbM  = texture2D(tex, fragCoord  * inverseVP).xyz;\n\t\t\tvec3 luma = vec3(0.299, 0.587, 0.114);\n\t\t\tfloat lumaNW = dot(rgbNW, luma);\n\t\t\tfloat lumaNE = dot(rgbNE, luma);\n\t\t\tfloat lumaSW = dot(rgbSW, luma);\n\t\t\tfloat lumaSE = dot(rgbSE, luma);\n\t\t\tfloat lumaM  = dot(rgbM,  luma);\n\t\t\tfloat lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n\t\t\tfloat lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\t\t\t\n\t\t\tvec2 dir;\n\t\t\tdir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n\t\t\tdir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\t\t\t\n\t\t\tfloat dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\t\t\t\n\t\t\tfloat rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n\t\t\tdir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * inverseVP;\n\t\t\t\n\t\t\tvec3 rgbA = 0.5 * (texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz + \n\t\t\t\ttexture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n\t\t\tvec3 rgbB = rgbA * 0.5 + 0.25 * (texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz + \n\t\t\t\ttexture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\t\t\t\n\t\t\t//return vec4(rgbA,1.0);\n\t\t\tfloat lumaB = dot(rgbB, luma);\n\t\t\tif ((lumaB < lumaMin) || (lumaB > lumaMax))\n\t\t\t\tcolor = vec4(rgbA, 1.0);\n\t\t\telse\n\t\t\t\tcolor = vec4(rgbB, 1.0);\n\t\t\tif(u_igamma != 1.0)\n\t\t\t\tcolor.xyz = pow( color.xyz, vec3(u_igamma) );\n\t\t\treturn color;\n\t\t}\n\t\t\n\t\tvoid main() {\n\t\t   gl_FragColor = applyFXAA( u_texture, v_coord * uViewportSize) ;\n\t\t}\n\t\t", 
  y.gamma_pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_igamma;\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord);\n\t\t\tcolor.xyz = pow(color.xyz, vec3(u_igamma) );\n\t\t   gl_FragColor = color;\n\t\t}\n\t\t", F.registerNodeType("texture/toviewport", y), w.title = "Copy", w.desc = "Copy Texture", w.widgets_info = {size:{widget:"combo", values:[0, 32, 64, 128, 256, 512, 1024, 
  2048]}, precision:{widget:"combo", values:c.MODE_VALUES}}, w.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if ((a || this._temp_texture) && this.isOutputConnected(0)) {
      if (a) {
        var b = a.width, d = a.height;
        0 != this.properties.size && (d = b = this.properties.size);
        var k = this._temp_texture, f = a.type;
        this.properties.precision === c.LOW ? f = gl.UNSIGNED_BYTE : this.properties.precision === c.HIGH && (f = gl.HIGH_PRECISION_FORMAT);
        k && k.width == b && k.height == d && k.type == f || (k = gl.LINEAR, this.properties.generate_mipmaps && isPowerOfTwo(b) && isPowerOfTwo(d) && (k = gl.LINEAR_MIPMAP_LINEAR), this._temp_texture = new GL.Texture(b, d, {type:f, format:gl.RGBA, minFilter:k, magFilter:gl.LINEAR}));
        a.copyTo(this._temp_texture);
        this.properties.generate_mipmaps && (this._temp_texture.bind(0), gl.generateMipmap(this._temp_texture.texture_type), this._temp_texture.unbind(0));
      }
      this.setOutputData(0, this._temp_texture);
    }
  }, F.registerNodeType("texture/copy", w), E.title = "Downsample", E.desc = "Downsample Texture", E.widgets_info = {iterations:{type:"number", step:1, precision:0, min:0}, precision:{widget:"combo", values:c.MODE_VALUES}}, E.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if ((a || this._temp_texture) && this.isOutputConnected(0) && a && a.texture_type === GL.TEXTURE_2D) {
      if (1 > this.properties.iterations) {
        this.setOutputData(0, a);
      } else {
        var b = E._shader;
        b || (E._shader = b = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, E.pixel_shader));
        var d = a.width | 0, k = a.height | 0, f = a.type;
        this.properties.precision === c.LOW ? f = gl.UNSIGNED_BYTE : this.properties.precision === c.HIGH && (f = gl.HIGH_PRECISION_FORMAT);
        var h = this.properties.iterations || 1, e = a, n = [];
        f = {type:f, format:a.format};
        var g = vec2.create(), p = {u_offset:g};
        this._texture && GL.Texture.releaseTemporary(this._texture);
        for (var l = 0; l < h; ++l) {
          g[0] = 1 / d;
          g[1] = 1 / k;
          d = d >> 1 || 0;
          k = k >> 1 || 0;
          a = GL.Texture.getTemporary(d, k, f);
          n.push(a);
          e.setParameter(GL.TEXTURE_MAG_FILTER, GL.NEAREST);
          e.copyTo(a, b, p);
          if (1 == d && 1 == k) {
            break;
          }
          e = a;
        }
        this._texture = n.pop();
        for (l = 0; l < n.length; ++l) {
          GL.Texture.releaseTemporary(n[l]);
        }
        this.properties.generate_mipmaps && (this._texture.bind(0), gl.generateMipmap(this._texture.texture_type), this._texture.unbind(0));
        this.setOutputData(0, this._texture);
      }
    }
  }, E.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_offset;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D(u_texture, v_coord );\n\t\t\tcolor += texture2D(u_texture, v_coord + vec2( u_offset.x, 0.0 ) );\n\t\t\tcolor += texture2D(u_texture, v_coord + vec2( 0.0, u_offset.y ) );\n\t\t\tcolor += texture2D(u_texture, v_coord + vec2( u_offset.x, u_offset.y ) );\n\t\t   gl_FragColor = color * 0.25;\n\t\t}\n\t\t", 
  F.registerNodeType("texture/downsample", E), z.title = "Average", z.desc = "Compute a partial average (32 random samples) of a texture and stores it as a 1x1 pixel texture.\n If high_quality is true, then it generates the mipmaps first and reads from the lower one.", z.prototype.onExecute = function() {
    this.properties.use_previous_frame || this.updateAverage();
    var a = this._luminance;
    this.setOutputData(0, this._temp_texture);
    this.setOutputData(1, a);
    this.setOutputData(2, (a[0] + a[1] + a[2]) / 3);
  }, z.prototype.onPreRenderExecute = function() {
    this.updateAverage();
  }, z.prototype.updateAverage = function() {
    var a = this.getInputData(0);
    if (a && (this.isOutputConnected(0) || this.isOutputConnected(1) || this.isOutputConnected(2))) {
      if (!z._shader) {
        z._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, z.pixel_shader);
        for (var b = new Float32Array(16), d = 0; d < b.length; ++d) {
          b[d] = Math.random();
        }
        z._shader.uniforms({u_samples_a:b.subarray(0, 16), u_samples_b:b.subarray(16, 32)});
      }
      d = this._temp_texture;
      b = gl.UNSIGNED_BYTE;
      a.type != b && (b = gl.FLOAT);
      d && d.type == b || (this._temp_texture = new GL.Texture(1, 1, {type:b, format:gl.RGBA, filter:gl.NEAREST}));
      this._uniforms.u_mipmap_offset = 0;
      this.properties.high_quality && (this._temp_pot2_texture && this._temp_pot2_texture.type == b || (this._temp_pot2_texture = new GL.Texture(512, 512, {type:b, format:gl.RGBA, minFilter:gl.LINEAR_MIPMAP_LINEAR, magFilter:gl.LINEAR})), a.copyTo(this._temp_pot2_texture), a = this._temp_pot2_texture, a.bind(0), gl.generateMipmap(GL.TEXTURE_2D), this._uniforms.u_mipmap_offset = 9);
      var c = z._shader, k = this._uniforms;
      k.u_mipmap_offset = this.properties.mipmap_offset;
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      this._temp_texture.drawTo(function() {
        a.toViewport(c, k);
      });
      if (this.isOutputConnected(1) || this.isOutputConnected(2)) {
        if (d = this._temp_texture.getPixels()) {
          var f = this._luminance;
          b = this._temp_texture.type;
          f.set(d);
          b == gl.UNSIGNED_BYTE && vec4.scale(f, f, 1 / 255);
        }
      }
    }
  }, z.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform mat4 u_samples_a;\n\t\tuniform mat4 u_samples_b;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_mipmap_offset;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = vec4(0.0);\n\t\t\t//random average\n\t\t\tfor(int i = 0; i < 4; ++i)\n\t\t\t\tfor(int j = 0; j < 4; ++j)\n\t\t\t\t{\n\t\t\t\t\tcolor += texture2D(u_texture, vec2( u_samples_a[i][j], u_samples_b[i][j] ), u_mipmap_offset );\n\t\t\t\t\tcolor += texture2D(u_texture, vec2( 1.0 - u_samples_a[i][j], 1.0 - u_samples_b[i][j] ), u_mipmap_offset );\n\t\t\t\t}\n\t\t   gl_FragColor = color * 0.03125;\n\t\t}\n\t\t", 
  F.registerNodeType("texture/average", z), e.title = "Smooth", e.desc = "Smooth texture over time", e.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      e._shader || (e._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, e.pixel_shader));
      var b = this._temp_texture;
      b && b.type == a.type && b.width == a.width && b.height == a.height || (b = {type:a.type, format:gl.RGBA, filter:gl.NEAREST}, this._temp_texture = new GL.Texture(a.width, a.height, b), this._temp_texture2 = new GL.Texture(a.width, a.height, b), a.copyTo(this._temp_texture2));
      b = this._temp_texture;
      var d = this._temp_texture2, c = e._shader, k = this._uniforms;
      k.u_factor = 1.0 - this.getInputOrProperty("factor");
      gl.disable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);
      b.drawTo(function() {
        d.bind(1);
        a.toViewport(c, k);
      });
      this.setOutputData(0, b);
      this._temp_texture = d;
      this._temp_texture2 = b;
    }
  }, e.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_factor;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tgl_FragColor = mix( texture2D( u_texture, v_coord ), texture2D( u_textureB, v_coord ), u_factor );\n\t\t}\n\t\t", F.registerNodeType("texture/temporal_smooth", e), B.title = "Lineal Avg Smooth", B.desc = "Smooth texture linearly over time", B["@samples"] = {type:"number", 
  min:1, max:64, step:1, precision:1}, B.prototype.getPreviewTexture = function() {
    return this._temp_texture2;
  }, B.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      B._shader || (B._shader_copy = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, B.pixel_shader_copy), B._shader_avg = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, B.pixel_shader_avg));
      var b = Math.clamp(this.properties.samples, 0, 64), d = this.frame, c = this.properties.frames_interval;
      if (0 == c || 0 == d % c) {
        d = this._temp_texture;
        d && d.type == a.type && d.width == b || (d = {type:a.type, format:gl.RGBA, filter:gl.NEAREST}, this._temp_texture = new GL.Texture(b, 1, d), this._temp_texture2 = new GL.Texture(b, 1, d), this._temp_texture_out = new GL.Texture(1, 1, d));
        var k = this._temp_texture, f = this._temp_texture2, h = B._shader_copy, e = B._shader_avg, n = this._uniforms;
        n.u_samples = b;
        n.u_isamples = 1.0 / b;
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        k.drawTo(function() {
          f.bind(1);
          a.toViewport(h, n);
        });
        this._temp_texture_out.drawTo(function() {
          k.toViewport(e, n);
        });
        this.setOutputData(0, this._temp_texture_out);
        this._temp_texture = f;
        this._temp_texture2 = k;
      } else {
        this.setOutputData(0, this._temp_texture_out);
      }
      this.setOutputData(1, this._temp_texture2);
      this.frame++;
    }
  }, B.pixel_shader_copy = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_isamples;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tif( v_coord.x <= u_isamples )\n\t\t\t\tgl_FragColor = texture2D( u_texture, vec2(0.5) );\n\t\t\telse\n\t\t\t\tgl_FragColor = texture2D( u_textureB, v_coord - vec2(u_isamples,0.0) );\n\t\t}\n\t\t", B.pixel_shader_avg = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform int u_samples;\n\t\tuniform float u_isamples;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = vec4(0.0);\n\t\t\tfor(int i = 0; i < 64; ++i)\n\t\t\t{\n\t\t\t\tcolor += texture2D( u_texture, vec2( float(i)*u_isamples,0.0) );\n\t\t\t\tif(i == (u_samples - 1))\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tgl_FragColor = color * u_isamples;\n\t\t}\n\t\t", 
  F.registerNodeType("texture/linear_avg_smooth", B), D.title = "Image to Texture", D.desc = "Uploads an image to the GPU", D.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a) {
      var b = a.videoWidth || a.width, d = a.videoHeight || a.height;
      if (a.gltexture) {
        this.setOutputData(0, a.gltexture);
      } else {
        var c = this._temp_texture;
        c && c.width == b && c.height == d || (this._temp_texture = new GL.Texture(b, d, {format:gl.RGBA, filter:gl.LINEAR}));
        try {
          this._temp_texture.uploadImage(a);
        } catch (S) {
          console.error("image comes from an unsafe location, cannot be uploaded to webgl: " + S);
          return;
        }
        this.setOutputData(0, this._temp_texture);
      }
    }
  }, F.registerNodeType("texture/imageToTexture", D), u.widgets_info = {texture:{widget:"texture"}, precision:{widget:"combo", values:c.MODE_VALUES}}, u.title = "LUT", u.desc = "Apply LUT to Texture", u.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getInputData(0);
      if (this.properties.precision === c.PASS_THROUGH || !1 === this.properties.enabled) {
        this.setOutputData(0, a);
      } else {
        if (a) {
          var b = this.getInputData(1);
          b || (b = c.getTexture(this.properties.texture));
          if (b) {
            b.bind(0);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            var d = this.properties.intensity;
            this.isInputConnected(2) && (this.properties.intensity = d = this.getInputData(2));
            this._tex = c.getTargetTexture(a, this._tex, this.properties.precision);
            this._tex.drawTo(function() {
              b.bind(1);
              a.toViewport(u._shader, {u_texture:0, u_textureB:1, u_amount:d});
            });
            this.setOutputData(0, this._tex);
          } else {
            this.setOutputData(0, a);
          }
        }
      }
    }
  }, u.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_amount;\n\t\t\n\t\tvoid main() {\n\t\t\t lowp vec4 textureColor = clamp( texture2D(u_texture, v_coord), vec4(0.0), vec4(1.0) );\n\t\t\t mediump float blueColor = textureColor.b * 63.0;\n\t\t\t mediump vec2 quad1;\n\t\t\t quad1.y = floor(floor(blueColor) / 8.0);\n\t\t\t quad1.x = floor(blueColor) - (quad1.y * 8.0);\n\t\t\t mediump vec2 quad2;\n\t\t\t quad2.y = floor(ceil(blueColor) / 8.0);\n\t\t\t quad2.x = ceil(blueColor) - (quad2.y * 8.0);\n\t\t\t highp vec2 texPos1;\n\t\t\t texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);\n\t\t\t texPos1.y = 1.0 - ((quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g));\n\t\t\t highp vec2 texPos2;\n\t\t\t texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);\n\t\t\t texPos2.y = 1.0 - ((quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g));\n\t\t\t lowp vec4 newColor1 = texture2D(u_textureB, texPos1);\n\t\t\t lowp vec4 newColor2 = texture2D(u_textureB, texPos2);\n\t\t\t lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));\n\t\t\t gl_FragColor = vec4( mix( textureColor.rgb, newColor.rgb, u_amount), textureColor.w);\n\t\t}\n\t\t", 
  F.registerNodeType("texture/LUT", u), H.title = "Texture to Channels", H.desc = "Split texture channels", H.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a) {
      this._channels || (this._channels = Array(4));
      for (var b = gl.RGB, d = 0, c = 0; 4 > c; c++) {
        this.isOutputConnected(c) ? (this._channels[c] && this._channels[c].width == a.width && this._channels[c].height == a.height && this._channels[c].type == a.type && this._channels[c].format == b || (this._channels[c] = new GL.Texture(a.width, a.height, {type:a.type, format:b, filter:gl.LINEAR})), d++) : this._channels[c] = null;
      }
      if (d) {
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        var k = Mesh.getScreenQuad(), f = H._shader, h = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        for (c = 0; 4 > c; c++) {
          this._channels[c] && (this._channels[c].drawTo(function() {
            a.bind(0);
            f.uniforms({u_texture:0, u_mask:h[c]}).draw(k);
          }), this.setOutputData(c, this._channels[c]));
        }
      }
    }
  }, H.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec4 u_mask;\n\t\t\n\t\tvoid main() {\n\t\t   gl_FragColor = vec4( vec3( length( texture2D(u_texture, v_coord) * u_mask )), 1.0 );\n\t\t}\n\t\t", F.registerNodeType("texture/textureChannels", H), n.title = "Channels to Texture", n.desc = "Split texture channels", n.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, n.prototype.onExecute = 
  function() {
    var a = c.getWhiteTexture(), b = this.getInputData(0) || a, d = this.getInputData(1) || a, k = this.getInputData(2) || a, f = this.getInputData(3) || a;
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    var h = Mesh.getScreenQuad();
    n._shader || (n._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, n.pixel_shader));
    var e = n._shader;
    a = Math.max(b.width, d.width, k.width, f.width);
    var g = Math.max(b.height, d.height, k.height, f.height), p = this.properties.precision == c.HIGH ? c.HIGH_PRECISION_FORMAT : gl.UNSIGNED_BYTE;
    this._texture && this._texture.width == a && this._texture.height == g && this._texture.type == p || (this._texture = new GL.Texture(a, g, {type:p, format:gl.RGBA, filter:gl.LINEAR}));
    a = this._color;
    a[0] = this.properties.R;
    a[1] = this.properties.G;
    a[2] = this.properties.B;
    a[3] = this.properties.A;
    var l = this._uniforms;
    this._texture.drawTo(function() {
      b.bind(0);
      d.bind(1);
      k.bind(2);
      f.bind(3);
      e.uniforms(l).draw(h);
    });
    this.setOutputData(0, this._texture);
  }, n.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_textureR;\n\t\tuniform sampler2D u_textureG;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform sampler2D u_textureA;\n\t\tuniform vec4 u_color;\n\t\t\n\t\tvoid main() {\n\t\t   gl_FragColor = u_color * vec4( \t\t\t\t\ttexture2D(u_textureR, v_coord).r,\t\t\t\t\ttexture2D(u_textureG, v_coord).r,\t\t\t\t\ttexture2D(u_textureB, v_coord).r,\t\t\t\t\ttexture2D(u_textureA, v_coord).r);\n\t\t}\n\t\t", 
  F.registerNodeType("texture/channelsTexture", n), p.title = "Color", p.desc = "Generates a 1x1 texture with a constant color", p.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, p.prototype.onDrawBackground = function(a) {
    var b = this.properties.color;
    a.fillStyle = "rgb(" + Math.floor(255 * Math.clamp(b[0], 0, 1)) + "," + Math.floor(255 * Math.clamp(b[1], 0, 1)) + "," + Math.floor(255 * Math.clamp(b[2], 0, 1)) + ")";
    this.flags.collapsed ? this.boxcolor = a.fillStyle : a.fillRect(0, 0, this.size[0], this.size[1]);
  }, p.prototype.onExecute = function() {
    var a = this.properties.precision == c.HIGH ? c.HIGH_PRECISION_FORMAT : gl.UNSIGNED_BYTE;
    this._tex && this._tex.type == a || (this._tex = new GL.Texture(1, 1, {format:gl.RGBA, type:a, minFilter:gl.NEAREST}));
    a = this.properties.color;
    if (this.inputs) {
      for (var b = 0; b < this.inputs.length; b++) {
        var d = this.inputs[b], k = this.getInputData(b);
        if (void 0 !== k) {
          switch(d.name) {
            case "RGB":
            case "RGBA":
              a.set(k);
              break;
            case "R":
              a[0] = k;
              break;
            case "G":
              a[1] = k;
              break;
            case "B":
              a[2] = k;
              break;
            case "A":
              a[3] = k;
          }
        }
      }
    }
    0.001 < vec4.sqrDist(this._tex_color, a) && (this._tex_color.set(a), this._tex.fill(a));
    this.setOutputData(0, this._tex);
  }, p.prototype.onGetInputs = function() {
    return [["RGB", "vec3"], ["RGBA", "vec4"], ["R", "number"], ["G", "number"], ["B", "number"], ["A", "number"]];
  }, F.registerNodeType("texture/color", p), k.title = "Gradient", k.desc = "Generates a gradient", k["@A"] = {type:"color"}, k["@B"] = {type:"color"}, k["@texture_size"] = {type:"enum", values:[32, 64, 128, 256, 512]}, k.prototype.onExecute = function() {
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    var a = GL.Mesh.getScreenQuad(), b = k._shader, d = this.getInputData(0);
    d || (d = this.properties.A);
    var c = this.getInputData(1);
    c || (c = this.properties.B);
    for (var f = 2; f < this.inputs.length; f++) {
      var h = this.inputs[f], e = this.getInputData(f);
      void 0 !== e && (this.properties[h.name] = e);
    }
    var n = this._uniforms;
    this._uniforms.u_angle = this.properties.angle * DEG2RAD;
    this._uniforms.u_scale = this.properties.scale;
    vec3.copy(n.u_colorA, d);
    vec3.copy(n.u_colorB, c);
    d = parseInt(this.properties.texture_size);
    this._tex && this._tex.width == d || (this._tex = new GL.Texture(d, d, {format:gl.RGB, filter:gl.LINEAR}));
    this._tex.drawTo(function() {
      b.uniforms(n).draw(a);
    });
    this.setOutputData(0, this._tex);
  }, k.prototype.onGetInputs = function() {
    return [["angle", "number"], ["scale", "number"]];
  }, k.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform float u_angle;\n\t\tuniform float u_scale;\n\t\tuniform vec3 u_colorA;\n\t\tuniform vec3 u_colorB;\n\t\t\n\t\tvec2 rotate(vec2 v, float angle)\n\t\t{\n\t\t\tvec2 result;\n\t\t\tfloat _cos = cos(angle);\n\t\t\tfloat _sin = sin(angle);\n\t\t\tresult.x = v.x * _cos - v.y * _sin;\n\t\t\tresult.y = v.x * _sin + v.y * _cos;\n\t\t\treturn result;\n\t\t}\n\t\tvoid main() {\n\t\t\tfloat f = (rotate(u_scale * (v_coord - vec2(0.5)), u_angle) + vec2(0.5)).x;\n\t\t\tvec3 color = mix(u_colorA,u_colorB,clamp(f,0.0,1.0));\n\t\t   gl_FragColor = vec4(color,1.0);\n\t\t}\n\t\t", 
  F.registerNodeType("texture/gradient", k), a.title = "Mix", a.desc = "Generates a texture mixing two textures", a.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, a.prototype.onExecute = function() {
    var b = this.getInputData(0);
    if (this.isOutputConnected(0)) {
      if (this.properties.precision === c.PASS_THROUGH) {
        this.setOutputData(0, b);
      } else {
        var d = this.getInputData(1);
        if (b && d) {
          var k = this.getInputData(2), f = this.getInputData(3);
          this._tex = c.getTargetTexture(this.properties.size_from_biggest && d.width > b.width ? d : b, this._tex, this.properties.precision);
          gl.disable(gl.BLEND);
          gl.disable(gl.DEPTH_TEST);
          var h = Mesh.getScreenQuad(), e = null, n = this._uniforms;
          k ? (e = a._shader_tex, e || (e = a._shader_tex = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, a.pixel_shader, {MIX_TEX:""}))) : (e = a._shader_factor, e || (e = a._shader_factor = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, a.pixel_shader)), f = null == f ? this.properties.factor : f, n.u_mix.set([f, f, f, f]));
          var g = this.properties.invert;
          this._tex.drawTo(function() {
            b.bind(g ? 1 : 0);
            d.bind(g ? 0 : 1);
            k && k.bind(2);
            e.uniforms(n).draw(h);
          });
          this.setOutputData(0, this._tex);
        }
      }
    }
  }, a.prototype.onGetInputs = function() {
    return [["factor", "number"]];
  }, a.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_textureA;\n\t\tuniform sampler2D u_textureB;\n\t\t#ifdef MIX_TEX\n\t\t\tuniform sampler2D u_textureMix;\n\t\t#else\n\t\t\tuniform vec4 u_mix;\n\t\t#endif\n\t\t\n\t\tvoid main() {\n\t\t\t#ifdef MIX_TEX\n\t\t\t   vec4 f = texture2D(u_textureMix, v_coord);\n\t\t\t#else\n\t\t\t   vec4 f = u_mix;\n\t\t\t#endif\n\t\t   gl_FragColor = mix( texture2D(u_textureA, v_coord), texture2D(u_textureB, v_coord), f );\n\t\t}\n\t\t", 
  F.registerNodeType("texture/mix", a), b.title = "Edges", b.desc = "Detects edges", b.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, b.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getInputData(0);
      if (this.properties.precision === c.PASS_THROUGH) {
        this.setOutputData(0, a);
      } else {
        if (a) {
          this._tex = c.getTargetTexture(a, this._tex, this.properties.precision);
          gl.disable(gl.BLEND);
          gl.disable(gl.DEPTH_TEST);
          var d = Mesh.getScreenQuad(), k = b._shader, f = this.properties.invert, h = this.properties.factor, e = this.properties.threshold ? 1 : 0;
          this._tex.drawTo(function() {
            a.bind(0);
            k.uniforms({u_texture:0, u_isize:[1 / a.width, 1 / a.height], u_factor:h, u_threshold:e, u_invert:f ? 1 : 0}).draw(d);
          });
          this.setOutputData(0, this._tex);
        }
      }
    }
  }, b.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_isize;\n\t\tuniform int u_invert;\n\t\tuniform float u_factor;\n\t\tuniform float u_threshold;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 center = texture2D(u_texture, v_coord);\n\t\t\tvec4 up = texture2D(u_texture, v_coord + u_isize * vec2(0.0,1.0) );\n\t\t\tvec4 down = texture2D(u_texture, v_coord + u_isize * vec2(0.0,-1.0) );\n\t\t\tvec4 left = texture2D(u_texture, v_coord + u_isize * vec2(1.0,0.0) );\n\t\t\tvec4 right = texture2D(u_texture, v_coord + u_isize * vec2(-1.0,0.0) );\n\t\t\tvec4 diff = abs(center - up) + abs(center - down) + abs(center - left) + abs(center - right);\n\t\t\tdiff *= u_factor;\n\t\t\tif(u_invert == 1)\n\t\t\t\tdiff.xyz = vec3(1.0) - diff.xyz;\n\t\t\tif( u_threshold == 0.0 )\n\t\t\t\tgl_FragColor = vec4( diff.xyz, center.a );\n\t\t\telse\n\t\t\t\tgl_FragColor = vec4( diff.x > 0.5 ? 1.0 : 0.0, diff.y > 0.5 ? 1.0 : 0.0, diff.z > 0.5 ? 1.0 : 0.0, center.a );\n\t\t}\n\t\t", 
  F.registerNodeType("texture/edges", b), d.title = "Depth Range", d.desc = "Generates a texture with a depth range", d.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getInputData(0);
      if (a) {
        var b = gl.UNSIGNED_BYTE;
        this.properties.high_precision && (b = gl.half_float_ext ? gl.HALF_FLOAT_OES : gl.FLOAT);
        this._temp_texture && this._temp_texture.type == b && this._temp_texture.width == a.width && this._temp_texture.height == a.height || (this._temp_texture = new GL.Texture(a.width, a.height, {type:b, format:gl.RGBA, filter:gl.LINEAR}));
        var c = this._uniforms;
        b = this.properties.distance;
        this.isInputConnected(1) && (b = this.getInputData(1), this.properties.distance = b);
        var k = this.properties.range;
        this.isInputConnected(2) && (k = this.getInputData(2), this.properties.range = k);
        c.u_distance = b;
        c.u_range = k;
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        var f = Mesh.getScreenQuad();
        d._shader || (d._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, d.pixel_shader), d._shader_onlydepth = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, d.pixel_shader, {ONLY_DEPTH:""}));
        var h = this.properties.only_depth ? d._shader_onlydepth : d._shader;
        b = null;
        b = a.near_far_planes ? a.near_far_planes : window.LS && LS.Renderer._main_camera ? LS.Renderer._main_camera._uniforms.u_camera_planes : [0.1, 1000];
        c.u_camera_planes = b;
        this._temp_texture.drawTo(function() {
          a.bind(0);
          h.uniforms(c).draw(f);
        });
        this._temp_texture.near_far_planes = b;
        this.setOutputData(0, this._temp_texture);
      }
    }
  }, d.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_camera_planes;\n\t\tuniform float u_distance;\n\t\tuniform float u_range;\n\t\t\n\t\tfloat LinearDepth()\n\t\t{\n\t\t\tfloat zNear = u_camera_planes.x;\n\t\t\tfloat zFar = u_camera_planes.y;\n\t\t\tfloat depth = texture2D(u_texture, v_coord).x;\n\t\t\tdepth = depth * 2.0 - 1.0;\n\t\t\treturn zNear * (depth + 1.0) / (zFar + zNear - depth * (zFar - zNear));\n\t\t}\n\t\t\n\t\tvoid main() {\n\t\t\tfloat depth = LinearDepth();\n\t\t\t#ifdef ONLY_DEPTH\n\t\t\t   gl_FragColor = vec4(depth);\n\t\t\t#else\n\t\t\t\tfloat diff = abs(depth * u_camera_planes.y - u_distance);\n\t\t\t\tfloat dof = 1.0;\n\t\t\t\tif(diff <= u_range)\n\t\t\t\t\tdof = diff / u_range;\n\t\t\t   gl_FragColor = vec4(dof);\n\t\t\t#endif\n\t\t}\n\t\t", 
  F.registerNodeType("texture/depth_range", d), h.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, h.title = "Linear Depth", h.desc = "Creates a color texture with linear depth", h.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getInputData(0);
      if (a && (a.format == gl.DEPTH_COMPONENT || a.format == gl.DEPTH_STENCIL)) {
        var b = this.properties.precision == c.HIGH ? gl.HIGH_PRECISION_FORMAT : gl.UNSIGNED_BYTE;
        this._temp_texture && this._temp_texture.type == b && this._temp_texture.width == a.width && this._temp_texture.height == a.height || (this._temp_texture = new GL.Texture(a.width, a.height, {type:b, format:gl.RGB, filter:gl.LINEAR}));
        var d = this._uniforms;
        d.u_invert = this.properties.invert ? 1 : 0;
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        var k = Mesh.getScreenQuad();
        h._shader || (h._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, h.pixel_shader));
        var f = h._shader;
        b = null;
        b = a.near_far_planes ? a.near_far_planes : window.LS && LS.Renderer._main_camera ? LS.Renderer._main_camera._uniforms.u_camera_planes : [0.1, 1000];
        d.u_camera_planes = b;
        d.u_ires.set([0, 0]);
        this._temp_texture.drawTo(function() {
          a.bind(0);
          f.uniforms(d).draw(k);
        });
        this._temp_texture.near_far_planes = b;
        this.setOutputData(0, this._temp_texture);
      }
    }
  }, h.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_camera_planes;\n\t\tuniform int u_invert;\n\t\tuniform vec2 u_ires;\n\t\t\n\t\tvoid main() {\n\t\t\tfloat zNear = u_camera_planes.x;\n\t\t\tfloat zFar = u_camera_planes.y;\n\t\t\tfloat depth = texture2D(u_texture, v_coord + u_ires*0.5).x * 2.0 - 1.0;\n\t\t\tfloat f = zNear * (depth + 1.0) / (zFar + zNear - depth * (zFar - zNear));\n\t\t\tif( u_invert == 1 )\n\t\t\t\tf = 1.0 - f;\n\t\t\tgl_FragColor = vec4(vec3(f),1.0);\n\t\t}\n\t\t", 
  F.registerNodeType("texture/linear_depth", h), f.title = "Blur", f.desc = "Blur a texture", f.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, f.max_iterations = 20, f.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      var b = this._final_texture;
      b && b.width == a.width && b.height == a.height && b.type == a.type || (b = this._final_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
      var d = this.properties.iterations;
      this.isInputConnected(1) && (d = this.getInputData(1), this.properties.iterations = d);
      d = Math.min(Math.floor(d), f.max_iterations);
      if (0 == d) {
        this.setOutputData(0, a);
      } else {
        var c = this.properties.intensity;
        this.isInputConnected(2) && (c = this.getInputData(2), this.properties.intensity = c);
        var k = F.camera_aspect;
        k || void 0 === window.gl || (k = gl.canvas.height / gl.canvas.width);
        k || (k = 1);
        k = this.properties.preserve_aspect ? k : 1;
        var h = this.properties.scale || [1, 1];
        a.applyBlur(k * h[0], h[1], c, b);
        for (a = 1; a < d; ++a) {
          b.applyBlur(k * h[0] * (a + 1), h[1] * (a + 1), c);
        }
        this.setOutputData(0, b);
      }
    }
  }, F.registerNodeType("texture/blur", f), x.title = "Glow", x.desc = "Filters a texture giving it a glow effect", x.weights = new Float32Array([0.5, 0.4, 0.3, 0.2]), x.widgets_info = {iterations:{type:"number", min:0, max:16, step:1, precision:0}, threshold:{type:"number", min:0, max:10, step:0.01, precision:2}, precision:{widget:"combo", values:c.MODE_VALUES}}, x.prototype.onGetInputs = function() {
    return [["enabled", "boolean"], ["threshold", "number"], ["intensity", "number"], ["persistence", "number"], ["iterations", "number"], ["dirt_factor", "number"]];
  }, x.prototype.onGetOutputs = function() {
    return [["average", "Texture"]];
  }, x.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isAnyOutputConnected()) {
      if (this.properties.precision === c.PASS_THROUGH || !1 === this.getInputOrProperty("enabled")) {
        this.setOutputData(0, a);
      } else {
        var b = a.width, d = a.height, k = {format:a.format, type:a.type, minFilter:GL.LINEAR, magFilter:GL.LINEAR, wrap:gl.CLAMP_TO_EDGE}, f = c.getTextureType(this.properties.precision, a), h = this._uniforms, e = this._textures, n = x._cut_shader;
        n || (n = x._cut_shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, x.cut_pixel_shader));
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        h.u_threshold = this.getInputOrProperty("threshold");
        var g = e[0] = GL.Texture.getTemporary(b, d, k);
        a.blit(g, n.uniforms(h));
        var p = g, l = this.getInputOrProperty("iterations");
        l = Math.clamp(l, 1, 16) | 0;
        var m = h.u_texel_size, r = this.getInputOrProperty("intensity");
        h.u_intensity = 1;
        h.u_delta = this.properties.scale;
        n = x._shader;
        n || (n = x._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, x.scale_pixel_shader));
        for (var q = 1; q < l; q++) {
          b >>= 1;
          1 < (d | 0) && (d >>= 1);
          if (2 > b) {
            break;
          }
          g = e[q] = GL.Texture.getTemporary(b, d, k);
          m[0] = 1 / p.width;
          m[1] = 1 / p.height;
          p.blit(g, n.uniforms(h));
          p = g;
        }
        this.isOutputConnected(2) && (b = this._average_texture, b && b.type == a.type && b.format == a.format || (b = this._average_texture = new GL.Texture(1, 1, {type:a.type, format:a.format, filter:gl.LINEAR})), m[0] = 1 / p.width, m[1] = 1 / p.height, h.u_intensity = r, h.u_delta = 1, p.blit(b, n.uniforms(h)), this.setOutputData(2, b));
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        h.u_intensity = this.getInputOrProperty("persistence");
        h.u_delta = 0.5;
        for (q -= 2; 0 <= q; q--) {
          g = e[q], e[q] = null, m[0] = 1 / p.width, m[1] = 1 / p.height, p.blit(g, n.uniforms(h)), GL.Texture.releaseTemporary(p), p = g;
        }
        gl.disable(gl.BLEND);
        this.isOutputConnected(1) && (e = this._glow_texture, e && e.width == a.width && e.height == a.height && e.type == f && e.format == a.format || (e = this._glow_texture = new GL.Texture(a.width, a.height, {type:f, format:a.format, filter:gl.LINEAR})), p.blit(e), this.setOutputData(1, e));
        if (this.isOutputConnected(0)) {
          e = this._final_texture;
          e && e.width == a.width && e.height == a.height && e.type == f && e.format == a.format || (e = this._final_texture = new GL.Texture(a.width, a.height, {type:f, format:a.format, filter:gl.LINEAR}));
          var t = this.getInputData(1), u = this.getInputOrProperty("dirt_factor");
          h.u_intensity = r;
          n = t ? x._dirt_final_shader : x._final_shader;
          n || (n = t ? x._dirt_final_shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, x.final_pixel_shader, {USE_DIRT:""}) : x._final_shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, x.final_pixel_shader));
          e.drawTo(function() {
            a.bind(0);
            p.bind(1);
            t && (n.setUniform("u_dirt_factor", u), n.setUniform("u_dirt_texture", t.bind(2)));
            n.toViewport(h);
          });
          this.setOutputData(0, e);
        }
        GL.Texture.releaseTemporary(p);
      }
    }
  }, x.cut_pixel_shader = "precision highp float;\n\tvarying vec2 v_coord;\n\tuniform sampler2D u_texture;\n\tuniform float u_threshold;\n\tvoid main() {\n\t\tgl_FragColor = max( texture2D( u_texture, v_coord ) - vec4( u_threshold ), vec4(0.0) );\n\t}", x.scale_pixel_shader = "precision highp float;\n\tvarying vec2 v_coord;\n\tuniform sampler2D u_texture;\n\tuniform vec2 u_texel_size;\n\tuniform float u_delta;\n\tuniform float u_intensity;\n\t\n\tvec4 sampleBox(vec2 uv) {\n\t\tvec4 o = u_texel_size.xyxy * vec2(-u_delta, u_delta).xxyy;\n\t\tvec4 s = texture2D( u_texture, uv + o.xy ) + texture2D( u_texture, uv + o.zy) + texture2D( u_texture, uv + o.xw) + texture2D( u_texture, uv + o.zw);\n\t\treturn s * 0.25;\n\t}\n\tvoid main() {\n\t\tgl_FragColor = u_intensity * sampleBox( v_coord );\n\t}", 
  x.final_pixel_shader = "precision highp float;\n\tvarying vec2 v_coord;\n\tuniform sampler2D u_texture;\n\tuniform sampler2D u_glow_texture;\n\t#ifdef USE_DIRT\n\t\tuniform sampler2D u_dirt_texture;\n\t#endif\n\tuniform vec2 u_texel_size;\n\tuniform float u_delta;\n\tuniform float u_intensity;\n\tuniform float u_dirt_factor;\n\t\n\tvec4 sampleBox(vec2 uv) {\n\t\tvec4 o = u_texel_size.xyxy * vec2(-u_delta, u_delta).xxyy;\n\t\tvec4 s = texture2D( u_glow_texture, uv + o.xy ) + texture2D( u_glow_texture, uv + o.zy) + texture2D( u_glow_texture, uv + o.xw) + texture2D( u_glow_texture, uv + o.zw);\n\t\treturn s * 0.25;\n\t}\n\tvoid main() {\n\t\tvec4 glow = sampleBox( v_coord );\n\t\t#ifdef USE_DIRT\n\t\t\tglow = mix( glow, glow * texture2D( u_dirt_texture, v_coord ), u_dirt_factor );\n\t\t#endif\n\t\tgl_FragColor = texture2D( u_texture, v_coord ) + u_intensity * glow;\n\t}", 
  F.registerNodeType("texture/glow", x), G.title = "Kuwahara Filter", G.desc = "Filters a texture giving an artistic oil canvas painting", G.max_radius = 10, G._shaders = [], G.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      var b = this._temp_texture;
      b && b.width == a.width && b.height == a.height && b.type == a.type || (this._temp_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
      b = this.properties.radius;
      b = Math.min(Math.floor(b), G.max_radius);
      if (0 == b) {
        this.setOutputData(0, a);
      } else {
        var d = this.properties.intensity, c = F.camera_aspect;
        c || void 0 === window.gl || (c = gl.canvas.height / gl.canvas.width);
        c || (c = 1);
        c = this.properties.preserve_aspect ? c : 1;
        G._shaders[b] || (G._shaders[b] = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, G.pixel_shader, {RADIUS:b.toFixed(0)}));
        var k = G._shaders[b], f = GL.Mesh.getScreenQuad();
        a.bind(0);
        this._temp_texture.drawTo(function() {
          k.uniforms({u_texture:0, u_intensity:d, u_resolution:[a.width, a.height], u_iResolution:[1 / a.width, 1 / a.height]}).draw(f);
        });
        this.setOutputData(0, this._temp_texture);
      }
    }
  }, G.pixel_shader = "\nprecision highp float;\nvarying vec2 v_coord;\nuniform sampler2D u_texture;\nuniform float u_intensity;\nuniform vec2 u_resolution;\nuniform vec2 u_iResolution;\n#ifndef RADIUS\n\t#define RADIUS 7\n#endif\nvoid main() {\n\n\tconst int radius = RADIUS;\n\tvec2 fragCoord = v_coord;\n\tvec2 src_size = u_iResolution;\n\tvec2 uv = v_coord;\n\tfloat n = float((radius + 1) * (radius + 1));\n\tint i;\n\tint j;\n\tvec3 m0 = vec3(0.0); vec3 m1 = vec3(0.0); vec3 m2 = vec3(0.0); vec3 m3 = vec3(0.0);\n\tvec3 s0 = vec3(0.0); vec3 s1 = vec3(0.0); vec3 s2 = vec3(0.0); vec3 s3 = vec3(0.0);\n\tvec3 c;\n\t\n\tfor (int j = -radius; j <= 0; ++j)  {\n\t\tfor (int i = -radius; i <= 0; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm0 += c;\n\t\t\ts0 += c * c;\n\t\t}\n\t}\n\t\n\tfor (int j = -radius; j <= 0; ++j)  {\n\t\tfor (int i = 0; i <= radius; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm1 += c;\n\t\t\ts1 += c * c;\n\t\t}\n\t}\n\t\n\tfor (int j = 0; j <= radius; ++j)  {\n\t\tfor (int i = 0; i <= radius; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm2 += c;\n\t\t\ts2 += c * c;\n\t\t}\n\t}\n\t\n\tfor (int j = 0; j <= radius; ++j)  {\n\t\tfor (int i = -radius; i <= 0; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm3 += c;\n\t\t\ts3 += c * c;\n\t\t}\n\t}\n\t\n\tfloat min_sigma2 = 1e+2;\n\tm0 /= n;\n\ts0 = abs(s0 / n - m0 * m0);\n\t\n\tfloat sigma2 = s0.r + s0.g + s0.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m0, 1.0);\n\t}\n\t\n\tm1 /= n;\n\ts1 = abs(s1 / n - m1 * m1);\n\t\n\tsigma2 = s1.r + s1.g + s1.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m1, 1.0);\n\t}\n\t\n\tm2 /= n;\n\ts2 = abs(s2 / n - m2 * m2);\n\t\n\tsigma2 = s2.r + s2.g + s2.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m2, 1.0);\n\t}\n\t\n\tm3 /= n;\n\ts3 = abs(s3 / n - m3 * m3);\n\t\n\tsigma2 = s3.r + s3.g + s3.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m3, 1.0);\n\t}\n}\n", 
  F.registerNodeType("texture/kuwahara", G), I.title = "XDoG Filter", I.desc = "Filters a texture giving an artistic ink style", I.max_radius = 10, I._shaders = [], I.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      var b = this._temp_texture;
      b && b.width == a.width && b.height == a.height && b.type == a.type || (this._temp_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
      I._xdog_shader || (I._xdog_shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, I.xdog_pixel_shader));
      var d = I._xdog_shader, c = GL.Mesh.getScreenQuad(), k = this.properties.sigma, f = this.properties.k, h = this.properties.p, e = this.properties.epsilon, n = this.properties.phi;
      a.bind(0);
      this._temp_texture.drawTo(function() {
        d.uniforms({src:0, sigma:k, k:f, p:h, epsilon:e, phi:n, cvsWidth:a.width, cvsHeight:a.height}).draw(c);
      });
      this.setOutputData(0, this._temp_texture);
    }
  }, I.xdog_pixel_shader = "\nprecision highp float;\nuniform sampler2D src;\n\nuniform float cvsHeight;\nuniform float cvsWidth;\n\nuniform float sigma;\nuniform float k;\nuniform float p;\nuniform float epsilon;\nuniform float phi;\nvarying vec2 v_coord;\n\nfloat cosh(float val)\n{\n\tfloat tmp = exp(val);\n\tfloat cosH = (tmp + 1.0 / tmp) / 2.0;\n\treturn cosH;\n}\n\nfloat tanh(float val)\n{\n\tfloat tmp = exp(val);\n\tfloat tanH = (tmp - 1.0 / tmp) / (tmp + 1.0 / tmp);\n\treturn tanH;\n}\n\nfloat sinh(float val)\n{\n\tfloat tmp = exp(val);\n\tfloat sinH = (tmp - 1.0 / tmp) / 2.0;\n\treturn sinH;\n}\n\nvoid main(void){\n\tvec3 destColor = vec3(0.0);\n\tfloat tFrag = 1.0 / cvsHeight;\n\tfloat sFrag = 1.0 / cvsWidth;\n\tvec2 Frag = vec2(sFrag,tFrag);\n\tvec2 uv = gl_FragCoord.st;\n\tfloat twoSigmaESquared = 2.0 * sigma * sigma;\n\tfloat twoSigmaRSquared = twoSigmaESquared * k * k;\n\tint halfWidth = int(ceil( 1.0 * sigma * k ));\n\n\tconst int MAX_NUM_ITERATION = 99999;\n\tvec2 sum = vec2(0.0);\n\tvec2 norm = vec2(0.0);\n\n\tfor(int cnt=0;cnt<MAX_NUM_ITERATION;cnt++){\n\t\tif(cnt > (2*halfWidth+1)*(2*halfWidth+1)){break;}\n\t\tint i = int(cnt / (2*halfWidth+1)) - halfWidth;\n\t\tint j = cnt - halfWidth - int(cnt / (2*halfWidth+1)) * (2*halfWidth+1);\n\n\t\tfloat d = length(vec2(i,j));\n\t\tvec2 kernel = vec2( exp( -d * d / twoSigmaESquared ), \n\t\t\t\t\t\t\texp( -d * d / twoSigmaRSquared ));\n\n\t\tvec2 L = texture2D(src, (uv + vec2(i,j)) * Frag).xx;\n\n\t\tnorm += kernel;\n\t\tsum += kernel * L;\n\t}\n\n\tsum /= norm;\n\n\tfloat H = 100.0 * ((1.0 + p) * sum.x - p * sum.y);\n\tfloat edge = ( H > epsilon )? 1.0 : 1.0 + tanh( phi * (H - epsilon));\n\tdestColor = vec3(edge);\n\tgl_FragColor = vec4(destColor, 1.0);\n}", 
  F.registerNodeType("texture/xDoG", I), J.title = "Webcam", J.desc = "Webcam texture", J.is_webcam_open = !1, J.prototype.openStream = function() {
    if (navigator.getUserMedia) {
      this._waiting_confirmation = !0;
      navigator.mediaDevices.getUserMedia({audio:!1, video:{facingMode:this.properties.facingMode}}).then(this.streamReady.bind(this)).catch(function(b) {
        J.is_webcam_open = !1;
        console.log("Webcam rejected", b);
        a._webcam_stream = !1;
        a.boxcolor = "red";
        a.trigger("stream_error");
      });
      var a = this;
    }
  }, J.prototype.closeStream = function() {
    if (this._webcam_stream) {
      var a = this._webcam_stream.getTracks();
      if (a.length) {
        for (var b = 0; b < a.length; ++b) {
          a[b].stop();
        }
      }
      J.is_webcam_open = !1;
      this._video = this._webcam_stream = null;
      this.boxcolor = "black";
      this.trigger("stream_closed");
    }
  }, J.prototype.streamReady = function(a) {
    this._webcam_stream = a;
    this.boxcolor = "green";
    var b = this._video;
    b || (b = document.createElement("video"), b.autoplay = !0, b.srcObject = a, this._video = b, b.onloadedmetadata = function(a) {
      J.is_webcam_open = !0;
      console.log(a);
    });
    this.trigger("stream_ready", b);
  }, J.prototype.onPropertyChanged = function(a, b) {
    "facingMode" == a && (this.properties.facingMode = b, this.closeStream(), this.openStream());
  }, J.prototype.onRemoved = function() {
    if (this._webcam_stream) {
      var a = this._webcam_stream.getTracks();
      if (a.length) {
        for (var b = 0; b < a.length; ++b) {
          a[b].stop();
        }
      }
      this._video = this._webcam_stream = null;
    }
  }, J.prototype.onDrawBackground = function(a) {
    this.flags.collapsed || 20 >= this.size[1] || !this._video || (a.save(), a.webgl ? this._video_texture && a.drawImage(this._video_texture, 0, 0, this.size[0], this.size[1]) : a.drawImage(this._video, 0, 0, this.size[0], this.size[1]), a.restore());
  }, J.prototype.onExecute = function() {
    null != this._webcam_stream || this._waiting_confirmation || this.openStream();
    if (this._video && this._video.videoWidth) {
      var a = this._video.videoWidth, b = this._video.videoHeight, d = this._video_texture;
      d && d.width == a && d.height == b || (this._video_texture = new GL.Texture(a, b, {format:gl.RGB, filter:gl.LINEAR}));
      this._video_texture.uploadImage(this._video);
      this._video_texture.version = ++this.version;
      this.properties.texture_name && (c.getTexturesContainer()[this.properties.texture_name] = this._video_texture);
      this.setOutputData(0, this._video_texture);
      for (a = 1; a < this.outputs.length; ++a) {
        if (this.outputs[a]) {
          switch(this.outputs[a].name) {
            case "width":
              this.setOutputData(a, this._video.videoWidth);
              break;
            case "height":
              this.setOutputData(a, this._video.videoHeight);
          }
        }
      }
    }
  }, J.prototype.onGetOutputs = function() {
    return [["width", "number"], ["height", "number"], ["stream_ready", F.EVENT], ["stream_closed", F.EVENT], ["stream_error", F.EVENT]];
  }, F.registerNodeType("texture/webcam", J), L.title = "Lens FX", L.desc = "distortion and chromatic aberration", L.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, L.prototype.onGetInputs = function() {
    return [["enabled", "boolean"]];
  }, L.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      if (this.properties.precision === c.PASS_THROUGH || !1 === this.getInputOrProperty("enabled")) {
        this.setOutputData(0, a);
      } else {
        var b = this._temp_texture;
        b && b.width == a.width && b.height == a.height && b.type == a.type || (b = this._temp_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
        var d = L._shader;
        d || (d = L._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, L.pixel_shader));
        var k = this.getInputData(1);
        null == k && (k = this.properties.factor);
        var f = this._uniforms;
        f.u_factor = k;
        gl.disable(gl.DEPTH_TEST);
        b.drawTo(function() {
          a.bind(0);
          d.uniforms(f).draw(GL.Mesh.getScreenQuad());
        });
        this.setOutputData(0, b);
      }
    }
  }, L.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_factor;\n\t\tvec2 barrelDistortion(vec2 coord, float amt) {\n\t\t\tvec2 cc = coord - 0.5;\n\t\t\tfloat dist = dot(cc, cc);\n\t\t\treturn coord + cc * dist * amt;\n\t\t}\n\t\t\n\t\tfloat sat( float t )\n\t\t{\n\t\t\treturn clamp( t, 0.0, 1.0 );\n\t\t}\n\t\t\n\t\tfloat linterp( float t ) {\n\t\t\treturn sat( 1.0 - abs( 2.0*t - 1.0 ) );\n\t\t}\n\t\t\n\t\tfloat remap( float t, float a, float b ) {\n\t\t\treturn sat( (t - a) / (b - a) );\n\t\t}\n\t\t\n\t\tvec4 spectrum_offset( float t ) {\n\t\t\tvec4 ret;\n\t\t\tfloat lo = step(t,0.5);\n\t\t\tfloat hi = 1.0-lo;\n\t\t\tfloat w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );\n\t\t\tret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);\n\t\t\n\t\t\treturn pow( ret, vec4(1.0/2.2) );\n\t\t}\n\t\t\n\t\tconst float max_distort = 2.2;\n\t\tconst int num_iter = 12;\n\t\tconst float reci_num_iter_f = 1.0 / float(num_iter);\n\t\t\n\t\tvoid main()\n\t\t{\t\n\t\t\tvec2 uv=v_coord;\n\t\t\tvec4 sumcol = vec4(0.0);\n\t\t\tvec4 sumw = vec4(0.0);\t\n\t\t\tfor ( int i=0; i<num_iter;++i )\n\t\t\t{\n\t\t\t\tfloat t = float(i) * reci_num_iter_f;\n\t\t\t\tvec4 w = spectrum_offset( t );\n\t\t\t\tsumw += w;\n\t\t\t\tsumcol += w * texture2D( u_texture, barrelDistortion(uv, .6 * max_distort*t * u_factor ) );\n\t\t\t}\n\t\t\tgl_FragColor = sumcol / sumw;\n\t\t}", 
  F.registerNodeType("texture/lensfx", L), A.title = "Curve", A.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      var b = this._temp_texture;
      b && b.width == a.width && b.height == a.height && b.type == a.type || (b = this._temp_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
      var d = A._shader;
      d || (d = A._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, A.pixel_shader));
      !this._must_update && this._curve_texture || this.updateCurve();
      var c = this._uniforms, k = this._curve_texture;
      b.drawTo(function() {
        gl.disable(gl.DEPTH_TEST);
        a.bind(0);
        k.bind(1);
        d.uniforms(c).draw(GL.Mesh.getScreenQuad());
      });
      this.setOutputData(0, b);
    }
  }, A.prototype.sampleCurve = function(a, b) {
    if (b = b || this._points.RGB) {
      for (var d = 0; d < b.length - 1; ++d) {
        var c = b[d], k = b[d + 1];
        if (!(k[0] < a)) {
          b = k[0] - c[0];
          if (0.00001 > Math.abs(b)) {
            return c[1];
          }
          a = (a - c[0]) / b;
          return c[1] * (1.0 - a) + k[1] * a;
        }
      }
      return 0;
    }
  }, A.prototype.updateCurve = function() {
    for (var a = this._values, b = a.length / 4, d = this.properties.split_channels, c = 0; c < b; ++c) {
      if (d) {
        a[4 * c] = Math.clamp(255 * this.sampleCurve(c / b, this._points.R), 0, 255), a[4 * c + 1] = Math.clamp(255 * this.sampleCurve(c / b, this._points.G), 0, 255), a[4 * c + 2] = Math.clamp(255 * this.sampleCurve(c / b, this._points.B), 0, 255);
      } else {
        var k = this.sampleCurve(c / b);
        a[4 * c] = a[4 * c + 1] = a[4 * c + 2] = Math.clamp(255 * k, 0, 255);
      }
      a[4 * c + 3] = 255;
    }
    this._curve_texture || (this._curve_texture = new GL.Texture(256, 1, {format:gl.RGBA, magFilter:gl.LINEAR, wrap:gl.CLAMP_TO_EDGE}));
    this._curve_texture.uploadData(a, null, !0);
  }, A.prototype.onSerialize = function(a) {
    var b = {}, d;
    for (d in this._points) {
      b[d] = this._points[d].concat();
    }
    a.curves = b;
  }, A.prototype.onConfigure = function(a) {
    this._points = a.curves;
    this.curve_editor && (curve_editor.points = this._points);
    this._must_update = !0;
  }, A.prototype.onMouseDown = function(a, b, d) {
    if (this.curve_editor) {
      return (a = this.curve_editor.onMouseDown([b[0], b[1] - this.curve_offset], d)) && this.captureInput(!0), a;
    }
  }, A.prototype.onMouseMove = function(a, b, d) {
    if (this.curve_editor) {
      return this.curve_editor.onMouseMove([b[0], b[1] - this.curve_offset], d);
    }
  }, A.prototype.onMouseUp = function(a, b, d) {
    if (this.curve_editor) {
      return this.curve_editor.onMouseUp([b[0], b[1] - this.curve_offset], d);
    }
    this.captureInput(!1);
  }, A.channel_line_colors = {RGB:"#666", R:"#F33", G:"#3F3", B:"#33F"}, A.prototype.onDrawBackground = function(a, b) {
    if (!this.flags.collapsed) {
      this.curve_editor || (this.curve_editor = new F.CurveEditor(this._points.R));
      a.save();
      a.translate(0, this.curve_offset);
      var d = this.widgets[1].value;
      this.properties.split_channels ? ("RGB" == d && (this.widgets[1].value = d = "R", this.widgets[1].disabled = !1), this.curve_editor.points = this._points.R, this.curve_editor.draw(a, [this.size[0], this.size[1] - this.curve_offset], b, "#111", A.channel_line_colors.R, !0), a.globalCompositeOperation = "lighten", this.curve_editor.points = this._points.G, this.curve_editor.draw(a, [this.size[0], this.size[1] - this.curve_offset], b, null, A.channel_line_colors.G, !0), this.curve_editor.points = 
      this._points.B, this.curve_editor.draw(a, [this.size[0], this.size[1] - this.curve_offset], b, null, A.channel_line_colors.B, !0), a.globalCompositeOperation = "source-over") : (this.widgets[1].value = d = "RGB", this.widgets[1].disabled = !0);
      this.curve_editor.points = this._points[d];
      this.curve_editor.draw(a, [this.size[0], this.size[1] - this.curve_offset], b, this.properties.split_channels ? null : "#111", A.channel_line_colors[d]);
      a.restore();
    }
  }, A.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_curve;\n\t\tuniform float u_range;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord ) * u_range;\n\t\t\tcolor.x = texture2D( u_curve, vec2( color.x, 0.5 ) ).x;\n\t\t\tcolor.y = texture2D( u_curve, vec2( color.y, 0.5 ) ).y;\n\t\t\tcolor.z = texture2D( u_curve, vec2( color.z, 0.5 ) ).z;\n\t\t\t//color.w = texture2D( u_curve, vec2( color.w, 0.5 ) ).w;\n\t\t\tgl_FragColor = color;\n\t\t}", 
  F.registerNodeType("texture/curve", A), t.title = "Exposition", t.desc = "Controls texture exposition", t.widgets_info = {exposition:{widget:"slider", min:0, max:3}, precision:{widget:"combo", values:c.MODE_VALUES}}, t.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      var b = this._temp_texture;
      b && b.width == a.width && b.height == a.height && b.type == a.type || (b = this._temp_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
      var d = t._shader;
      d || (d = t._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, t.pixel_shader));
      var c = this.getInputData(1);
      null != c && (this.properties.exposition = c);
      var k = this._uniforms;
      b.drawTo(function() {
        gl.disable(gl.DEPTH_TEST);
        a.bind(0);
        d.uniforms(k).draw(GL.Mesh.getScreenQuad());
      });
      this.setOutputData(0, b);
    }
  }, t.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_exposition;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord );\n\t\t\tgl_FragColor = vec4( color.xyz * u_exposition, color.a );\n\t\t}", F.registerNodeType("texture/exposition", t), K.title = "Tone Mapping", K.desc = "Applies Tone Mapping to convert from high to low", K.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}}, K.prototype.onGetInputs = 
  function() {
    return [["enabled", "boolean"]];
  }, K.prototype.onExecute = function() {
    var a = this.getInputData(0);
    if (a && this.isOutputConnected(0)) {
      if (this.properties.precision === c.PASS_THROUGH || !1 === this.getInputOrProperty("enabled")) {
        this.setOutputData(0, a);
      } else {
        var b = this._temp_texture;
        b && b.width == a.width && b.height == a.height && b.type == a.type || (b = this._temp_texture = new GL.Texture(a.width, a.height, {type:a.type, format:gl.RGBA, filter:gl.LINEAR}));
        var d = this.getInputData(1);
        null == d && (d = this.properties.average_lum);
        var k = this._uniforms, f = null;
        d.constructor === Number ? (this.properties.average_lum = d, k.u_average_lum = this.properties.average_lum, f = K._shader, f || (f = K._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, K.pixel_shader))) : d.constructor === GL.Texture && (k.u_average_texture = d.bind(1), f = K._shader_texture, f || (f = K._shader_texture = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, K.pixel_shader, {AVG_TEXTURE:""})));
        k.u_lumwhite2 = this.properties.lum_white * this.properties.lum_white;
        k.u_scale = this.properties.scale;
        k.u_igamma = 1 / this.properties.gamma;
        gl.disable(gl.DEPTH_TEST);
        b.drawTo(function() {
          a.bind(0);
          f.uniforms(k).draw(GL.Mesh.getScreenQuad());
        });
        this.setOutputData(0, this._temp_texture);
      }
    }
  }, K.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_scale;\n\t\t#ifdef AVG_TEXTURE\n\t\t\tuniform sampler2D u_average_texture;\n\t\t#else\n\t\t\tuniform float u_average_lum;\n\t\t#endif\n\t\tuniform float u_lumwhite2;\n\t\tuniform float u_igamma;\n\t\tvec3 RGB2xyY (vec3 rgb)\n\t\t{\n\t\t\t const mat3 RGB2XYZ = mat3(0.4124, 0.3576, 0.1805,\n\t\t\t\t\t\t\t\t\t   0.2126, 0.7152, 0.0722,\n\t\t\t\t\t\t\t\t\t   0.0193, 0.1192, 0.9505);\n\t\t\tvec3 XYZ = RGB2XYZ * rgb;\n\t\t\t\n\t\t\tfloat f = (XYZ.x + XYZ.y + XYZ.z);\n\t\t\treturn vec3(XYZ.x / f,\n\t\t\t\t\t\tXYZ.y / f,\n\t\t\t\t\t\tXYZ.y);\n\t\t}\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord );\n\t\t\tvec3 rgb = color.xyz;\n\t\t\tfloat average_lum = 0.0;\n\t\t\t#ifdef AVG_TEXTURE\n\t\t\t\tvec3 pixel = texture2D(u_average_texture,vec2(0.5)).xyz;\n\t\t\t\taverage_lum = (pixel.x + pixel.y + pixel.z) / 3.0;\n\t\t\t#else\n\t\t\t\taverage_lum = u_average_lum;\n\t\t\t#endif\n\t\t\t//Ld - this part of the code is the same for both versions\n\t\t\tfloat lum = dot(rgb, vec3(0.2126, 0.7152, 0.0722));\n\t\t\tfloat L = (u_scale / average_lum) * lum;\n\t\t\tfloat Ld = (L * (1.0 + L / u_lumwhite2)) / (1.0 + L);\n\t\t\t//first\n\t\t\t//vec3 xyY = RGB2xyY(rgb);\n\t\t\t//xyY.z *= Ld;\n\t\t\t//rgb = xyYtoRGB(xyY);\n\t\t\t//second\n\t\t\trgb = (rgb / lum) * Ld;\n\t\t\trgb = max(rgb,vec3(0.001));\n\t\t\trgb = pow( rgb, vec3( u_igamma ) );\n\t\t\tgl_FragColor = vec4( rgb, color.a );\n\t\t}", 
  F.registerNodeType("texture/tonemapping", K), M.title = "Perlin", M.desc = "Generates a perlin noise texture", M.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}, width:{type:"Number", precision:0, step:1}, height:{type:"Number", precision:0, step:1}, octaves:{type:"Number", precision:0, step:1, min:1, max:50}}, M.prototype.onGetInputs = function() {
    return [["seed", "Number"], ["persistence", "Number"], ["octaves", "Number"], ["scale", "Number"], ["amplitude", "Number"], ["offset", "vec2"]];
  }, M.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.properties.width | 0, b = this.properties.height | 0;
      0 == a && (a = gl.viewport_data[2]);
      0 == b && (b = gl.viewport_data[3]);
      var d = c.getTextureType(this.properties.precision), k = this._texture;
      k && k.width == a && k.height == b && k.type == d || (k = this._texture = new GL.Texture(a, b, {type:d, format:gl.RGB, filter:gl.LINEAR}));
      var f = this.getInputOrProperty("persistence"), h = this.getInputOrProperty("octaves"), e = this.getInputOrProperty("offset"), n = this.getInputOrProperty("scale"), g = this.getInputOrProperty("amplitude"), p = this.getInputOrProperty("seed");
      d = "" + a + b + d + f + h + n + p + e[0] + e[1] + g;
      if (d != this._key) {
        this._key = d;
        var l = this._uniforms;
        l.u_persistence = f;
        l.u_octaves = h;
        l.u_offset.set(e);
        l.u_scale = n;
        l.u_amplitude = g;
        l.u_seed = 128 * p;
        l.u_viewport[0] = a;
        l.u_viewport[1] = b;
        var m = M._shader;
        m || (m = M._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, M.pixel_shader));
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        k.drawTo(function() {
          m.uniforms(l).draw(GL.Mesh.getScreenQuad());
        });
      }
      this.setOutputData(0, k);
    }
  }, M.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform vec2 u_offset;\n\t\tuniform float u_scale;\n\t\tuniform float u_persistence;\n\t\tuniform int u_octaves;\n\t\tuniform float u_amplitude;\n\t\tuniform vec2 u_viewport;\n\t\tuniform float u_seed;\n\t\t#define M_PI 3.14159265358979323846\n\t\t\n\t\tfloat rand(vec2 c){\treturn fract(sin(dot(c.xy ,vec2( 12.9898 + u_seed,78.233 + u_seed))) * 43758.5453); }\n\t\t\n\t\tfloat noise(vec2 p, float freq ){\n\t\t\tfloat unit = u_viewport.x/freq;\n\t\t\tvec2 ij = floor(p/unit);\n\t\t\tvec2 xy = mod(p,unit)/unit;\n\t\t\t//xy = 3.*xy*xy-2.*xy*xy*xy;\n\t\t\txy = .5*(1.-cos(M_PI*xy));\n\t\t\tfloat a = rand((ij+vec2(0.,0.)));\n\t\t\tfloat b = rand((ij+vec2(1.,0.)));\n\t\t\tfloat c = rand((ij+vec2(0.,1.)));\n\t\t\tfloat d = rand((ij+vec2(1.,1.)));\n\t\t\tfloat x1 = mix(a, b, xy.x);\n\t\t\tfloat x2 = mix(c, d, xy.x);\n\t\t\treturn mix(x1, x2, xy.y);\n\t\t}\n\t\t\n\t\tfloat pNoise(vec2 p, int res){\n\t\t\tfloat persistance = u_persistence;\n\t\t\tfloat n = 0.;\n\t\t\tfloat normK = 0.;\n\t\t\tfloat f = 4.;\n\t\t\tfloat amp = 1.0;\n\t\t\tint iCount = 0;\n\t\t\tfor (int i = 0; i<50; i++){\n\t\t\t\tn+=amp*noise(p, f);\n\t\t\t\tf*=2.;\n\t\t\t\tnormK+=amp;\n\t\t\t\tamp*=persistance;\n\t\t\t\tif (iCount >= res)\n\t\t\t\t\tbreak;\n\t\t\t\tiCount++;\n\t\t\t}\n\t\t\tfloat nf = n/normK;\n\t\t\treturn nf*nf*nf*nf;\n\t\t}\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord * u_scale * u_viewport + u_offset * u_scale;\n\t\t\tvec4 color = vec4( pNoise( uv, u_octaves ) * u_amplitude );\n\t\t\tgl_FragColor = color;\n\t\t}", 
  F.registerNodeType("texture/perlin", M), N.title = "Canvas2D", N.desc = "Executes Canvas2D code inside a texture or the viewport.", N.help = "Set width and height to 0 to match viewport size.", N.default_code = "//vars: canvas,ctx,time\nctx.fillStyle='red';\nctx.fillRect(0,0,50,50);\n", N.widgets_info = {precision:{widget:"combo", values:c.MODE_VALUES}, code:{type:"code"}, width:{type:"Number", precision:0, step:1}, height:{type:"Number", precision:0, step:1}}, N.prototype.onPropertyChanged = function(a, 
  b) {
    "code" == a && this.compileCode(b);
  }, N.prototype.compileCode = function(a) {
    this._func = null;
    if (F.allow_scripts) {
      try {
        this._func = new Function("canvas", "ctx", "time", "script", "v", a), this.boxcolor = "#00FF00";
      } catch (R) {
        this.boxcolor = "#FF0000", console.error("Error parsing script"), console.error(R);
      }
    }
  }, N.prototype.onExecute = function() {
    var a = this._func;
    a && this.isOutputConnected(0) && this.executeDraw(a);
  }, N.prototype.executeDraw = function(a) {
    var b = this.properties.width || gl.canvas.width, d = this.properties.height || gl.canvas.height, k = this._temp_texture, f = c.getTextureType(this.properties.precision);
    k && k.width == b && k.height == d && k.type == f || (k = this._temp_texture = new GL.Texture(b, d, {format:gl.RGBA, filter:gl.LINEAR, type:f}));
    var h = this.getInputData(0), e = this.properties, n = this, g = this.graph.getTime(), p = gl, l = gl.canvas;
    if (this.properties.use_html_canvas || !v.enableWebGLCanvas) {
      this._canvas ? (l = this._canvas, p = this._ctx) : (l = this._canvas = createCanvas(b.height), p = this._ctx = l.getContext("2d")), l.width = b, l.height = d;
    }
    if (p == gl) {
      k.drawTo(function() {
        gl.start2D();
        e.clear && (gl.clearColor(0, 0, 0, 0), gl.clear(gl.COLOR_BUFFER_BIT));
        try {
          a.draw ? a.draw.call(n, l, p, g, a, h) : a.call(n, l, p, g, a, h), n.boxcolor = "#00FF00";
        } catch (Q) {
          n.boxcolor = "#FF0000", console.error("Error executing script"), console.error(Q);
        }
        gl.finish2D();
      });
    } else {
      e.clear && p.clearRect(0, 0, l.width, l.height);
      try {
        a.draw ? a.draw.call(this, l, p, g, a, h) : a.call(this, l, p, g, a, h), this.boxcolor = "#00FF00";
      } catch (Q) {
        this.boxcolor = "#FF0000", console.error("Error executing script"), console.error(Q);
      }
      k.uploadImage(l);
    }
    this.setOutputData(0, k);
  }, F.registerNodeType("texture/canvas2D", N), O.title = "Matte", O.desc = "Extracts background", O.widgets_info = {key_color:{widget:"color"}, precision:{widget:"combo", values:c.MODE_VALUES}}, O.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getInputData(0);
      if (this.properties.precision === c.PASS_THROUGH) {
        this.setOutputData(0, a);
      } else {
        if (a) {
          this._tex = c.getTargetTexture(a, this._tex, this.properties.precision);
          gl.disable(gl.BLEND);
          gl.disable(gl.DEPTH_TEST);
          this._uniforms || (this._uniforms = {u_texture:0, u_key_color:this.properties.key_color, u_threshold:1, u_slope:1});
          var b = this._uniforms, d = Mesh.getScreenQuad(), k = O._shader;
          k || (k = O._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, O.pixel_shader));
          b.u_key_color = this.properties.key_color;
          b.u_threshold = this.properties.threshold;
          b.u_slope = this.properties.slope;
          this._tex.drawTo(function() {
            a.bind(0);
            k.uniforms(b).draw(d);
          });
          this.setOutputData(0, this._tex);
        }
      }
    }
  }, O.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec3 u_key_color;\n\t\tuniform float u_threshold;\n\t\tuniform float u_slope;\n\t\t\n\t\tvoid main() {\n\t\t\tvec3 color = texture2D( u_texture, v_coord ).xyz;\n\t\t\tfloat diff = length( normalize(color) - normalize(u_key_color) );\n\t\t\tfloat edge = u_threshold * (1.0 - u_slope);\n\t\t\tfloat alpha = smoothstep( edge, u_threshold, diff);\n\t\t\tgl_FragColor = vec4( color, alpha );\n\t\t}", 
  F.registerNodeType("texture/matte", O), P.title = "CubemapToTexture2D", P.desc = "Transforms a CUBEMAP texture into a TEXTURE2D in Polar Representation", P.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var a = this.getInputData(0);
      if (a && a.texture_type == GL.TEXTURE_CUBE_MAP) {
        !this._last_tex || this._last_tex.height == a.height && this._last_tex.type == a.type || (this._last_tex = null);
        var b = this.getInputOrProperty("yaw");
        this._last_tex = GL.Texture.cubemapToTexture2D(a, a.height, this._last_tex, !0, b);
        this.setOutputData(0, this._last_tex);
      }
    }
  }, F.registerNodeType("texture/cubemapToTexture2D", P));
})(this);
(function(v) {
  var c = v.LiteGraph;
  if ("undefined" != typeof GL) {
    var q = function() {
      this.addInput("Tex.", "Texture");
      this.addInput("intensity", "number");
      this.addOutput("Texture", "Texture");
      this.properties = {intensity:1, invert:!1, precision:LGraphTexture.DEFAULT};
      q._shader || (q._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, q.pixel_shader));
    }, m = function() {
      this.addInput("Texture", "Texture");
      this.addInput("value1", "number");
      this.addInput("value2", "number");
      this.addOutput("Texture", "Texture");
      this.properties = {fx:"halftone", value1:1, value2:1, precision:LGraphTexture.DEFAULT};
    }, g = function() {
      this.addInput("Texture", "Texture");
      this.addInput("Blurred", "Texture");
      this.addInput("Mask", "Texture");
      this.addInput("Threshold", "number");
      this.addOutput("Texture", "Texture");
      this.properties = {shape:"", size:10, alpha:1.0, threshold:1.0, high_precision:!1};
    }, r = function() {
      this.addInput("Texture", "Texture");
      this.addInput("Aberration", "number");
      this.addInput("Distortion", "number");
      this.addInput("Blur", "number");
      this.addOutput("Texture", "Texture");
      this.properties = {aberration:1.0, distortion:1.0, blur:1.0, precision:LGraphTexture.DEFAULT};
      r._shader || (r._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, r.pixel_shader), r._texture = new GL.Texture(3, 1, {format:gl.RGB, wrap:gl.CLAMP_TO_EDGE, magFilter:gl.LINEAR, minFilter:gl.LINEAR, pixel_data:[255, 0, 0, 0, 255, 0, 0, 0, 255]}));
    };
    r.title = "Lens";
    r.desc = "Camera Lens distortion";
    r.widgets_info = {precision:{widget:"combo", values:LGraphTexture.MODE_VALUES}};
    r.prototype.onExecute = function() {
      var c = this.getInputData(0);
      if (this.properties.precision === LGraphTexture.PASS_THROUGH) {
        this.setOutputData(0, c);
      } else {
        if (c) {
          this._tex = LGraphTexture.getTargetTexture(c, this._tex, this.properties.precision);
          var g = this.properties.aberration;
          this.isInputConnected(1) && (g = this.getInputData(1), this.properties.aberration = g);
          var m = this.properties.distortion;
          this.isInputConnected(2) && (m = this.getInputData(2), this.properties.distortion = m);
          var q = this.properties.blur;
          this.isInputConnected(3) && (q = this.getInputData(3), this.properties.blur = q);
          gl.disable(gl.BLEND);
          gl.disable(gl.DEPTH_TEST);
          var v = Mesh.getScreenQuad(), z = r._shader;
          this._tex.drawTo(function() {
            c.bind(0);
            z.uniforms({u_texture:0, u_aberration:g, u_distortion:m, u_blur:q}).draw(v);
          });
          this.setOutputData(0, this._tex);
        }
      }
    };
    r.pixel_shader = "precision highp float;\n\r\n\t\t\tprecision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform vec2 u_camera_planes;\n\r\n\t\t\tuniform float u_aberration;\n\r\n\t\t\tuniform float u_distortion;\n\r\n\t\t\tuniform float u_blur;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec2 coord = v_coord;\n\r\n\t\t\t\tfloat dist = distance(vec2(0.5), coord);\n\r\n\t\t\t\tvec2 dist_coord = coord - vec2(0.5);\n\r\n\t\t\t\tfloat percent = 1.0 + ((0.5 - dist) / 0.5) * u_distortion;\n\r\n\t\t\t\tdist_coord *= percent;\n\r\n\t\t\t\tcoord = dist_coord + vec2(0.5);\n\r\n\t\t\t\tvec4 color = texture2D(u_texture,coord, u_blur * dist);\n\r\n\t\t\t\tcolor.r = texture2D(u_texture,vec2(0.5) + dist_coord * (1.0+0.01*u_aberration), u_blur * dist ).r;\n\r\n\t\t\t\tcolor.b = texture2D(u_texture,vec2(0.5) + dist_coord * (1.0-0.01*u_aberration), u_blur * dist ).b;\n\r\n\t\t\t\tgl_FragColor = color;\n\r\n\t\t\t}\n\r\n\t\t\t";
    c.registerNodeType("fx/lens", r);
    v.LGraphFXLens = r;
    g.title = "Bokeh";
    g.desc = "applies an Bokeh effect";
    g.widgets_info = {shape:{widget:"texture"}};
    g.prototype.onExecute = function() {
      var c = this.getInputData(0), m = this.getInputData(1), r = this.getInputData(2);
      if (c && r && this.properties.shape) {
        m || (m = c);
        var q = LGraphTexture.getTexture(this.properties.shape);
        if (q) {
          var v = this.properties.threshold;
          this.isInputConnected(3) && (v = this.getInputData(3), this.properties.threshold = v);
          var z = gl.UNSIGNED_BYTE;
          this.properties.high_precision && (z = gl.half_float_ext ? gl.HALF_FLOAT_OES : gl.FLOAT);
          this._temp_texture && this._temp_texture.type == z && this._temp_texture.width == c.width && this._temp_texture.height == c.height || (this._temp_texture = new GL.Texture(c.width, c.height, {type:z, format:gl.RGBA, filter:gl.LINEAR}));
          var e = g._first_shader;
          e || (e = g._first_shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, g._first_pixel_shader));
          var B = g._second_shader;
          B || (B = g._second_shader = new GL.Shader(g._second_vertex_shader, g._second_pixel_shader));
          var D = this._points_mesh;
          D && D._width == c.width && D._height == c.height && 2 == D._spacing || (D = this.createPointsMesh(c.width, c.height, 2));
          var u = Mesh.getScreenQuad(), H = this.properties.size, n = this.properties.alpha;
          gl.disable(gl.DEPTH_TEST);
          gl.disable(gl.BLEND);
          this._temp_texture.drawTo(function() {
            c.bind(0);
            m.bind(1);
            r.bind(2);
            e.uniforms({u_texture:0, u_texture_blur:1, u_mask:2, u_texsize:[c.width, c.height]}).draw(u);
          });
          this._temp_texture.drawTo(function() {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE);
            c.bind(0);
            q.bind(3);
            B.uniforms({u_texture:0, u_mask:2, u_shape:3, u_alpha:n, u_threshold:v, u_pointSize:H, u_itexsize:[1.0 / c.width, 1.0 / c.height]}).draw(D, gl.POINTS);
          });
          this.setOutputData(0, this._temp_texture);
        }
      } else {
        this.setOutputData(0, c);
      }
    };
    g.prototype.createPointsMesh = function(c, g, m) {
      for (var l = Math.round(c / m), r = Math.round(g / m), q = new Float32Array(l * r * 2), e = -1, v = 2 / c * m, y = 2 / g * m, u = 0; u < r; ++u) {
        for (var C = -1, n = 0; n < l; ++n) {
          var p = u * l * 2 + 2 * n;
          q[p] = C;
          q[p + 1] = e;
          C += v;
        }
        e += y;
      }
      this._points_mesh = GL.Mesh.load({vertices2D:q});
      this._points_mesh._width = c;
      this._points_mesh._height = g;
      this._points_mesh._spacing = m;
      return this._points_mesh;
    };
    g._first_pixel_shader = "precision highp float;\n\r\n\t\t\tprecision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform sampler2D u_texture_blur;\n\r\n\t\t\tuniform sampler2D u_mask;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\r\n\t\t\t\tvec4 blurred_color = texture2D(u_texture_blur, v_coord);\n\r\n\t\t\t\tfloat mask = texture2D(u_mask, v_coord).x;\n\r\n\t\t\t   gl_FragColor = mix(color, blurred_color, mask);\n\r\n\t\t\t}\n\r\n\t\t\t";
    g._second_vertex_shader = "precision highp float;\n\r\n\t\t\tattribute vec2 a_vertex2D;\n\r\n\t\t\tvarying vec4 v_color;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform sampler2D u_mask;\n\r\n\t\t\tuniform vec2 u_itexsize;\n\r\n\t\t\tuniform float u_pointSize;\n\r\n\t\t\tuniform float u_threshold;\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec2 coord = a_vertex2D * 0.5 + 0.5;\n\r\n\t\t\t\tv_color = texture2D( u_texture, coord );\n\r\n\t\t\t\tv_color += texture2D( u_texture, coord + vec2(u_itexsize.x, 0.0) );\n\r\n\t\t\t\tv_color += texture2D( u_texture, coord + vec2(0.0, u_itexsize.y));\n\r\n\t\t\t\tv_color += texture2D( u_texture, coord + u_itexsize);\n\r\n\t\t\t\tv_color *= 0.25;\n\r\n\t\t\t\tfloat mask = texture2D(u_mask, coord).x;\n\r\n\t\t\t\tfloat luminance = length(v_color) * mask;\n\r\n\t\t\t\t/*luminance /= (u_pointSize*u_pointSize)*0.01 */;\n\r\n\t\t\t\tluminance -= u_threshold;\n\r\n\t\t\t\tif(luminance < 0.0)\n\r\n\t\t\t\t{\n\r\n\t\t\t\t\tgl_Position.x = -100.0;\n\r\n\t\t\t\t\treturn;\n\r\n\t\t\t\t}\n\r\n\t\t\t\tgl_PointSize = u_pointSize;\n\r\n\t\t\t\tgl_Position = vec4(a_vertex2D,0.0,1.0);\n\r\n\t\t\t}\n\r\n\t\t\t";
    g._second_pixel_shader = "precision highp float;\n\r\n\t\t\tvarying vec4 v_color;\n\r\n\t\t\tuniform sampler2D u_shape;\n\r\n\t\t\tuniform float u_alpha;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec4 color = texture2D( u_shape, gl_PointCoord );\n\r\n\t\t\t\tcolor *= v_color * u_alpha;\n\r\n\t\t\t\tgl_FragColor = color;\n\r\n\t\t\t}\n";
    c.registerNodeType("fx/bokeh", g);
    v.LGraphFXBokeh = g;
    m.title = "FX";
    m.desc = "applies an FX from a list";
    m.widgets_info = {fx:{widget:"combo", values:["halftone", "pixelate", "lowpalette", "noise", "gamma"]}, precision:{widget:"combo", values:LGraphTexture.MODE_VALUES}};
    m.shaders = {};
    m.prototype.onExecute = function() {
      if (this.isOutputConnected(0)) {
        var c = this.getInputData(0);
        if (this.properties.precision === LGraphTexture.PASS_THROUGH) {
          this.setOutputData(0, c);
        } else {
          if (c) {
            this._tex = LGraphTexture.getTargetTexture(c, this._tex, this.properties.precision);
            var g = this.properties.value1;
            this.isInputConnected(1) && (g = this.getInputData(1), this.properties.value1 = g);
            var r = this.properties.value2;
            this.isInputConnected(2) && (r = this.getInputData(2), this.properties.value2 = r);
            var q = this.properties.fx, E = m.shaders[q];
            if (!E) {
              var z = m["pixel_shader_" + q];
              if (!z) {
                return;
              }
              E = m.shaders[q] = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, z);
            }
            gl.disable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            var e = Mesh.getScreenQuad();
            var B = v.LS && LS.Renderer._current_camera ? [LS.Renderer._current_camera.near, LS.Renderer._current_camera.far] : [1, 100];
            var D = null;
            "noise" == q && (D = LGraphTexture.getNoiseTexture());
            this._tex.drawTo(function() {
              c.bind(0);
              "noise" == q && D.bind(1);
              E.uniforms({u_texture:0, u_noise:1, u_size:[c.width, c.height], u_rand:[Math.random(), Math.random()], u_value1:g, u_value2:r, u_camera_planes:B}).draw(e);
            });
            this.setOutputData(0, this._tex);
          }
        }
      }
    };
    m.pixel_shader_halftone = "precision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform vec2 u_camera_planes;\n\r\n\t\t\tuniform vec2 u_size;\n\r\n\t\t\tuniform float u_value1;\n\r\n\t\t\tuniform float u_value2;\n\r\n\t\t\t\n\r\n\t\t\tfloat pattern() {\n\r\n\t\t\t\tfloat s = sin(u_value1 * 3.1415), c = cos(u_value1 * 3.1415);\n\r\n\t\t\t\tvec2 tex = v_coord * u_size.xy;\n\r\n\t\t\t\tvec2 point = vec2(\n\r\n\t\t\t\t   c * tex.x - s * tex.y ,\n\r\n\t\t\t\t   s * tex.x + c * tex.y \n\r\n\t\t\t\t) * u_value2;\n\r\n\t\t\t\treturn (sin(point.x) * sin(point.y)) * 4.0;\n\r\n\t\t\t}\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\r\n\t\t\t\tfloat average = (color.r + color.g + color.b) / 3.0;\n\r\n\t\t\t\tgl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n\r\n\t\t\t}\n";
    m.pixel_shader_pixelate = "precision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform vec2 u_camera_planes;\n\r\n\t\t\tuniform vec2 u_size;\n\r\n\t\t\tuniform float u_value1;\n\r\n\t\t\tuniform float u_value2;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec2 coord = vec2( floor(v_coord.x * u_value1) / u_value1, floor(v_coord.y * u_value2) / u_value2 );\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, coord);\n\r\n\t\t\t\tgl_FragColor = color;\n\r\n\t\t\t}\n";
    m.pixel_shader_lowpalette = "precision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform vec2 u_camera_planes;\n\r\n\t\t\tuniform vec2 u_size;\n\r\n\t\t\tuniform float u_value1;\n\r\n\t\t\tuniform float u_value2;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\r\n\t\t\t\tgl_FragColor = floor(color * u_value1) / u_value1;\n\r\n\t\t\t}\n";
    m.pixel_shader_noise = "precision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform sampler2D u_noise;\n\r\n\t\t\tuniform vec2 u_size;\n\r\n\t\t\tuniform float u_value1;\n\r\n\t\t\tuniform float u_value2;\n\r\n\t\t\tuniform vec2 u_rand;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\r\n\t\t\t\tvec3 noise = texture2D(u_noise, v_coord * vec2(u_size.x / 512.0, u_size.y / 512.0) + u_rand).xyz - vec3(0.5);\n\r\n\t\t\t\tgl_FragColor = vec4( color.xyz + noise * u_value1, color.a );\n\r\n\t\t\t}\n";
    m.pixel_shader_gamma = "precision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform float u_value1;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\r\n\t\t\t\tfloat gamma = 1.0 / u_value1;\n\r\n\t\t\t\tgl_FragColor = vec4( pow( color.xyz, vec3(gamma) ), color.a );\n\r\n\t\t\t}\n";
    c.registerNodeType("fx/generic", m);
    v.LGraphFXGeneric = m;
    q.title = "Vigneting";
    q.desc = "Vigneting";
    q.widgets_info = {precision:{widget:"combo", values:LGraphTexture.MODE_VALUES}};
    q.prototype.onExecute = function() {
      var c = this.getInputData(0);
      if (this.properties.precision === LGraphTexture.PASS_THROUGH) {
        this.setOutputData(0, c);
      } else {
        if (c) {
          this._tex = LGraphTexture.getTargetTexture(c, this._tex, this.properties.precision);
          var g = this.properties.intensity;
          this.isInputConnected(1) && (g = this.getInputData(1), this.properties.intensity = g);
          gl.disable(gl.BLEND);
          gl.disable(gl.DEPTH_TEST);
          var m = Mesh.getScreenQuad(), r = q._shader, v = this.properties.invert;
          this._tex.drawTo(function() {
            c.bind(0);
            r.uniforms({u_texture:0, u_intensity:g, u_isize:[1 / c.width, 1 / c.height], u_invert:v ? 1 : 0}).draw(m);
          });
          this.setOutputData(0, this._tex);
        }
      }
    };
    q.pixel_shader = "precision highp float;\n\r\n\t\t\tprecision highp float;\n\r\n\t\t\tvarying vec2 v_coord;\n\r\n\t\t\tuniform sampler2D u_texture;\n\r\n\t\t\tuniform float u_intensity;\n\r\n\t\t\tuniform int u_invert;\n\r\n\t\t\t\n\r\n\t\t\tvoid main() {\n\r\n\t\t\t\tfloat luminance = 1.0 - length( v_coord - vec2(0.5) ) * 1.414;\n\r\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\r\n\t\t\t\tif(u_invert == 1)\n\r\n\t\t\t\t\tluminance = 1.0 - luminance;\n\r\n\t\t\t\tluminance = mix(1.0, luminance, u_intensity);\n\r\n\t\t\t   gl_FragColor = vec4( luminance * color.xyz, color.a);\n\r\n\t\t\t}\n\r\n\t\t\t";
    c.registerNodeType("fx/vigneting", q);
    v.LGraphFXVigneting = q;
  }
})(this);
(function(v) {
  function c(c) {
    this.cmd = this.channel = 0;
    this.data = new Uint32Array(3);
    c && this.setup(c);
  }
  function q(c, e) {
    navigator.requestMIDIAccess ? (this.on_ready = c, this.state = {note:[], cc:[]}, this.input_ports = null, this.input_ports_info = [], this.output_ports = null, this.output_ports_info = [], navigator.requestMIDIAccess().then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this))) : (this.error = "not suppoorted", e ? e("Not supported") : console.error("MIDI NOT SUPPORTED, enable by chrome://flags"));
  }
  function m() {
    this.addOutput("on_midi", u.EVENT);
    this.addOutput("out", "midi");
    this.properties = {port:0};
    this._current_midi_event = this._last_midi_event = null;
    this.boxcolor = "#AAA";
    this._last_time = 0;
    var c = this;
    new q(function(e) {
      c._midi = e;
      if (c._waiting) {
        c.onStart();
      }
      c._waiting = !1;
    });
  }
  function g() {
    this.addInput("send", u.EVENT);
    this.properties = {port:0};
    var c = this;
    new q(function(e) {
      c._midi = e;
      c.widget.options.values = c.getMIDIOutputs();
    });
    this.widget = this.addWidget("combo", "Device", this.properties.port, {property:"port", values:this.getMIDIOutputs.bind(this)});
    this.size = [340, 60];
  }
  function r() {
    this.addInput("on_midi", u.EVENT);
    this._str = "";
    this.size = [200, 40];
  }
  function l() {
    this.properties = {channel:-1, cmd:-1, min_value:-1, max_value:-1};
    var c = this;
    this._learning = !1;
    this.addWidget("button", "Learn", "", function() {
      c._learning = !0;
      c.boxcolor = "#FA3";
    });
    this.addInput("in", u.EVENT);
    this.addOutput("on_midi", u.EVENT);
    this.boxcolor = "#AAA";
  }
  function C() {
    this.properties = {channel:0, cmd:144, value1:1, value2:1};
    this.addInput("send", u.EVENT);
    this.addInput("assign", u.EVENT);
    this.addOutput("on_midi", u.EVENT);
    this.midi_event = new c;
    this.gate = !1;
  }
  function y() {
    this.properties = {cc:1, value:0};
    this.addOutput("value", "number");
  }
  function w() {
    this.addInput("generate", u.ACTION);
    this.addInput("scale", "string");
    this.addInput("octave", "number");
    this.addOutput("note", u.EVENT);
    this.properties = {notes:"A,A#,B,C,C#,D,D#,E,F,F#,G,G#", octave:2, duration:0.5, mode:"sequence"};
    this.notes_pitches = w.processScale(this.properties.notes);
    this.sequence_index = 0;
  }
  function E() {
    this.properties = {amount:0};
    this.addInput("in", u.ACTION);
    this.addInput("amount", "number");
    this.addOutput("out", u.EVENT);
    this.midi_event = new c;
  }
  function z() {
    this.properties = {scale:"A,A#,B,C,C#,D,D#,E,F,F#,G,G#"};
    this.addInput("note", u.ACTION);
    this.addInput("scale", "string");
    this.addOutput("out", u.EVENT);
    this.valid_notes = Array(12);
    this.offset_notes = Array(12);
    this.processScale(this.properties.scale);
  }
  function e() {
    this.properties = {url:"", autoplay:!0};
    this.addInput("play", u.ACTION);
    this.addInput("pause", u.ACTION);
    this.addOutput("note", u.EVENT);
    this._midi = null;
    this._current_time = 0;
    this._playing = !1;
    "undefined" == typeof MidiParser && (console.error("midi-parser.js not included, LGMidiPlay requires that library: https://raw.githubusercontent.com/colxi/midi-parser-js/master/src/main.js"), this.boxcolor = "red");
  }
  function B() {
    this.properties = {volume:0.5, duration:1};
    this.addInput("note", u.ACTION);
    this.addInput("volume", "number");
    this.addInput("duration", "number");
    this.addOutput("note", u.EVENT);
    "undefined" == typeof AudioSynth ? (console.error("Audiosynth.js not included, LGMidiPlay requires that library"), this.boxcolor = "red") : this.instrument = (this.synth = new AudioSynth).createInstrument("piano");
  }
  function D() {
    this.properties = {num_octaves:2, start_octave:2};
    this.addInput("note", u.ACTION);
    this.addInput("reset", u.ACTION);
    this.addOutput("note", u.EVENT);
    this.size = [400, 100];
    this.keys = [];
    this._last_key = -1;
  }
  var u = v.LiteGraph;
  u.MIDIEvent = c;
  c.prototype.fromJSON = function(c) {
    this.setup(c.data);
  };
  c.prototype.setup = function(e) {
    var n = e;
    e.constructor === Object && (n = e.data);
    this.data.set(n);
    this.status = e = n[0];
    n = e & 240;
    this.cmd = 240 <= e ? e : n;
    this.cmd == c.NOTEON && 0 == this.velocity && (this.cmd = c.NOTEOFF);
    this.cmd_str = c.commands[this.cmd] || "";
    if (n >= c.NOTEON || n <= c.NOTEOFF) {
      this.channel = e & 15;
    }
  };
  Object.defineProperty(c.prototype, "velocity", {get:function() {
    return this.cmd == c.NOTEON ? this.data[2] : -1;
  }, set:function(c) {
    this.data[2] = c;
  }, enumerable:!0});
  c.notes = "A A# B C C# D D# E F F# G G#".split(" ");
  c.note_to_index = {A:0, "A#":1, B:2, C:3, "C#":4, D:5, "D#":6, E:7, F:8, "F#":9, G:10, "G#":11};
  Object.defineProperty(c.prototype, "note", {get:function() {
    return this.cmd != c.NOTEON ? -1 : c.toNoteString(this.data[1], !0);
  }, set:function(c) {
    throw "notes cannot be assigned this way, must modify the data[1]";
  }, enumerable:!0});
  Object.defineProperty(c.prototype, "octave", {get:function() {
    return this.cmd != c.NOTEON ? -1 : Math.floor((this.data[1] - 24) / 12 + 1);
  }, set:function(c) {
    throw "octave cannot be assigned this way, must modify the data[1]";
  }, enumerable:!0});
  c.prototype.getPitch = function() {
    return 440 * Math.pow(2, (this.data[1] - 69) / 12);
  };
  c.computePitch = function(c) {
    return 440 * Math.pow(2, (c - 69) / 12);
  };
  c.prototype.getCC = function() {
    return this.data[1];
  };
  c.prototype.getCCValue = function() {
    return this.data[2];
  };
  c.prototype.getPitchBend = function() {
    return this.data[1] + (this.data[2] << 7) - 8192;
  };
  c.computePitchBend = function(c, e) {
    return c + (e << 7) - 8192;
  };
  c.prototype.setCommandFromString = function(e) {
    this.cmd = c.computeCommandFromString(e);
  };
  c.computeCommandFromString = function(e) {
    if (!e) {
      return 0;
    }
    if (e && e.constructor === Number) {
      return e;
    }
    e = e.toUpperCase();
    switch(e) {
      case "NOTE ON":
      case "NOTEON":
        return c.NOTEON;
      case "NOTE OFF":
      case "NOTEOFF":
        return c.NOTEON;
      case "KEY PRESSURE":
      case "KEYPRESSURE":
        return c.KEYPRESSURE;
      case "CONTROLLER CHANGE":
      case "CONTROLLERCHANGE":
      case "CC":
        return c.CONTROLLERCHANGE;
      case "PROGRAM CHANGE":
      case "PROGRAMCHANGE":
      case "PC":
        return c.PROGRAMCHANGE;
      case "CHANNEL PRESSURE":
      case "CHANNELPRESSURE":
        return c.CHANNELPRESSURE;
      case "PITCH BEND":
      case "PITCHBEND":
        return c.PITCHBEND;
      case "TIME TICK":
      case "TIMETICK":
        return c.TIMETICK;
      default:
        return Number(e);
    }
  };
  c.toNoteString = function(e, g) {
    e = Math.round(e);
    var k = Math.floor((e - 24) / 12 + 1);
    e = (e - 21) % 12;
    0 > e && (e = 12 + e);
    return c.notes[e] + (g ? "" : k);
  };
  c.NoteStringToPitch = function(e) {
    e = e.toUpperCase();
    var n = e[0], k = 4;
    "#" == e[1] ? (n += "#", 2 < e.length && (k = Number(e[2]))) : 1 < e.length && (k = Number(e[1]));
    e = c.note_to_index[n];
    return null == e ? null : 12 * (k - 1) + e + 21;
  };
  c.prototype.toString = function() {
    var e = "" + this.channel + ". ";
    switch(this.cmd) {
      case c.NOTEON:
        e += "NOTEON " + c.toNoteString(this.data[1]);
        break;
      case c.NOTEOFF:
        e += "NOTEOFF " + c.toNoteString(this.data[1]);
        break;
      case c.CONTROLLERCHANGE:
        e += "CC " + this.data[1] + " " + this.data[2];
        break;
      case c.PROGRAMCHANGE:
        e += "PC " + this.data[1];
        break;
      case c.PITCHBEND:
        e += "PITCHBEND " + this.getPitchBend();
        break;
      case c.KEYPRESSURE:
        e += "KEYPRESS " + this.data[1];
    }
    return e;
  };
  c.prototype.toHexString = function() {
    for (var c = "", e = 0; e < this.data.length; e++) {
      c += this.data[e].toString(16) + " ";
    }
  };
  c.prototype.toJSON = function() {
    return {data:[this.data[0], this.data[1], this.data[2]], object_class:"MIDIEvent"};
  };
  c.NOTEOFF = 128;
  c.NOTEON = 144;
  c.KEYPRESSURE = 160;
  c.CONTROLLERCHANGE = 176;
  c.PROGRAMCHANGE = 192;
  c.CHANNELPRESSURE = 208;
  c.PITCHBEND = 224;
  c.TIMETICK = 248;
  c.commands = {128:"note off", 144:"note on", 160:"key pressure", 176:"controller change", 192:"program change", 208:"channel pressure", 224:"pitch bend", 240:"system", 242:"Song pos", 243:"Song select", 246:"Tune request", 248:"time tick", 250:"Start Song", 251:"Continue Song", 252:"Stop Song", 254:"Sensing", 255:"Reset"};
  c.commands_short = {128:"NOTEOFF", 144:"NOTEOFF", 160:"KEYP", 176:"CC", 192:"PC", 208:"CP", 224:"PB", 240:"SYS", 242:"POS", 243:"SELECT", 246:"TUNEREQ", 248:"TT", 250:"START", 251:"CONTINUE", 252:"STOP", 254:"SENS", 255:"RESET"};
  c.commands_reversed = {};
  for (var H in c.commands) {
    c.commands_reversed[c.commands[H]] = H;
  }
  q.input = null;
  q.MIDIEvent = c;
  q.prototype.onMIDISuccess = function(c) {
    console.log("MIDI ready!");
    console.log(c);
    this.midi = c;
    this.updatePorts();
    if (this.on_ready) {
      this.on_ready(this);
    }
  };
  q.prototype.updatePorts = function() {
    var c = this.midi;
    this.input_ports = c.inputs;
    this.input_ports_info = [];
    this.output_ports = c.outputs;
    this.output_ports_info = [];
    c = 0;
    for (var e = this.input_ports.values(), k = e.next(); k && !1 === k.done;) {
      k = k.value, this.input_ports_info.push(k), console.log("Input port [type:'" + k.type + "'] id:'" + k.id + "' manufacturer:'" + k.manufacturer + "' name:'" + k.name + "' version:'" + k.version + "'"), c++, k = e.next();
    }
    this.num_input_ports = c;
    c = 0;
    e = this.output_ports.values();
    for (k = e.next(); k && !1 === k.done;) {
      k = k.value, this.output_ports_info.push(k), console.log("Output port [type:'" + k.type + "'] id:'" + k.id + "' manufacturer:'" + k.manufacturer + "' name:'" + k.name + "' version:'" + k.version + "'"), c++, k = e.next();
    }
    this.num_output_ports = c;
  };
  q.prototype.onMIDIFailure = function(c) {
    console.error("Failed to get MIDI access - " + c);
  };
  q.prototype.openInputPort = function(e, g) {
    e = this.input_ports.get("input-" + e);
    if (!e) {
      return !1;
    }
    q.input = this;
    var k = this;
    e.onmidimessage = function(a) {
      var b = new c(a.data);
      k.updateState(b);
      g && g(a.data, b);
      if (q.on_message) {
        q.on_message(a.data, b);
      }
    };
    console.log("port open: ", e);
    return !0;
  };
  q.parseMsg = function(c) {
  };
  q.prototype.updateState = function(e) {
    switch(e.cmd) {
      case c.NOTEON:
        this.state.note[e.value1 | 0] = e.value2;
        break;
      case c.NOTEOFF:
        this.state.note[e.value1 | 0] = 0;
        break;
      case c.CONTROLLERCHANGE:
        this.state.cc[e.getCC()] = e.getCCValue();
    }
  };
  q.prototype.sendMIDI = function(e, g) {
    g && (e = this.output_ports_info[e]) && (q.output = this, g.constructor === c ? e.send(g.data) : e.send(g));
  };
  m.MIDIInterface = q;
  m.title = "MIDI Input";
  m.desc = "Reads MIDI from a input port";
  m.color = "#243";
  m.prototype.getPropertyInfo = function(c) {
    if (this._midi && "port" == c) {
      c = {};
      for (var e = 0; e < this._midi.input_ports_info.length; ++e) {
        var k = this._midi.input_ports_info[e];
        c[e] = e + ".- " + k.name + " version:" + k.version;
      }
      return {type:"enum", values:c};
    }
  };
  m.prototype.onStart = function() {
    this._midi ? this._midi.openInputPort(this.properties.port, this.onMIDIEvent.bind(this)) : this._waiting = !0;
  };
  m.prototype.onMIDIEvent = function(e, g) {
    this._last_midi_event = g;
    this.boxcolor = "#AFA";
    this._last_time = u.getTime();
    this.trigger("on_midi", g);
    g.cmd == c.NOTEON ? this.trigger("on_noteon", g) : g.cmd == c.NOTEOFF ? this.trigger("on_noteoff", g) : g.cmd == c.CONTROLLERCHANGE ? this.trigger("on_cc", g) : g.cmd == c.PROGRAMCHANGE ? this.trigger("on_pc", g) : g.cmd == c.PITCHBEND && this.trigger("on_pitchbend", g);
  };
  m.prototype.onDrawBackground = function(c) {
    this.boxcolor = "#AAA";
    if (!this.flags.collapsed && this._last_midi_event) {
      c.fillStyle = "white";
      var e = u.getTime();
      e = 1.0 - Math.max(0, 0.001 * (e - this._last_time));
      if (0 < e) {
        var k = c.globalAlpha;
        c.globalAlpha *= e;
        c.font = "12px Tahoma";
        c.fillText(this._last_midi_event.toString(), 2, 0.5 * this.size[1] + 3);
        c.globalAlpha = k;
      }
    }
  };
  m.prototype.onExecute = function() {
    if (this.outputs) {
      for (var c = this._last_midi_event, e = 0; e < this.outputs.length; ++e) {
        switch(this.outputs[e].name) {
          case "midi":
            var k = this._midi;
            break;
          case "last_midi":
            k = c;
            break;
          default:
            continue;
        }
        this.setOutputData(e, k);
      }
    }
  };
  m.prototype.onGetOutputs = function() {
    return [["last_midi", "midi"], ["on_midi", u.EVENT], ["on_noteon", u.EVENT], ["on_noteoff", u.EVENT], ["on_cc", u.EVENT], ["on_pc", u.EVENT], ["on_pitchbend", u.EVENT]];
  };
  u.registerNodeType("midi/input", m);
  g.MIDIInterface = q;
  g.title = "MIDI Output";
  g.desc = "Sends MIDI to output channel";
  g.color = "#243";
  g.prototype.onGetPropertyInfo = function(c) {
    if (this._midi && "port" == c) {
      return {type:"enum", values:this.getMIDIOutputs()};
    }
  };
  g.default_ports = {0:"unknown"};
  g.prototype.getMIDIOutputs = function() {
    var c = {};
    if (!this._midi) {
      return g.default_ports;
    }
    if (this._midi.output_ports_info) {
      for (var e = 0; e < this._midi.output_ports_info.length; ++e) {
        var k = this._midi.output_ports_info[e];
        k && (c[e] = e + ".- " + k.name + " version:" + k.version);
      }
    }
    return c;
  };
  g.prototype.onAction = function(c, e) {
    this._midi && ("send" == c && this._midi.sendMIDI(this.properties.port, e), this.trigger("midi", e));
  };
  g.prototype.onGetInputs = function() {
    return [["send", u.ACTION]];
  };
  g.prototype.onGetOutputs = function() {
    return [["on_midi", u.EVENT]];
  };
  u.registerNodeType("midi/output", g);
  r.title = "MIDI Show";
  r.desc = "Shows MIDI in the graph";
  r.color = "#243";
  r.prototype.getTitle = function() {
    return this.flags.collapsed ? this._str : this.title;
  };
  r.prototype.onAction = function(e, g) {
    g && (this._str = g.constructor === c ? g.toString() : "???");
  };
  r.prototype.onDrawForeground = function(c) {
    this._str && !this.flags.collapsed && (c.font = "30px Arial", c.fillText(this._str, 10, 0.8 * this.size[1]));
  };
  r.prototype.onGetInputs = function() {
    return [["in", u.ACTION]];
  };
  r.prototype.onGetOutputs = function() {
    return [["on_midi", u.EVENT]];
  };
  u.registerNodeType("midi/show", r);
  l.title = "MIDI Filter";
  l.desc = "Filters MIDI messages";
  l.color = "#243";
  l["@cmd"] = {type:"enum", title:"Command", values:c.commands_reversed};
  l.prototype.getTitle = function() {
    var e = -1 == this.properties.cmd ? "Nothing" : c.commands_short[this.properties.cmd] || "Unknown";
    -1 != this.properties.min_value && -1 != this.properties.max_value && (e += " " + (this.properties.min_value == this.properties.max_value ? this.properties.max_value : this.properties.min_value + ".." + this.properties.max_value));
    return "Filter: " + e;
  };
  l.prototype.onPropertyChanged = function(e, g) {
    "cmd" == e && (e = Number(g), isNaN(e) && (e = c.commands[g] || 0), this.properties.cmd = e);
  };
  l.prototype.onAction = function(e, g) {
    if (g && g.constructor === c) {
      if (this._learning) {
        this._learning = !1, this.boxcolor = "#AAA", this.properties.channel = g.channel, this.properties.cmd = g.cmd, this.properties.min_value = this.properties.max_value = g.data[1];
      } else {
        if (-1 != this.properties.channel && g.channel != this.properties.channel || -1 != this.properties.cmd && g.cmd != this.properties.cmd || -1 != this.properties.min_value && g.data[1] < this.properties.min_value || -1 != this.properties.max_value && g.data[1] > this.properties.max_value) {
          return;
        }
      }
      this.trigger("on_midi", g);
    }
  };
  u.registerNodeType("midi/filter", l);
  C.title = "MIDIEvent";
  C.desc = "Create a MIDI Event";
  C.color = "#243";
  C.prototype.onAction = function(e, g) {
    "assign" == e ? (this.properties.channel = g.channel, this.properties.cmd = g.cmd, this.properties.value1 = g.data[1], this.properties.value2 = g.data[2], g.cmd == c.NOTEON ? this.gate = !0 : g.cmd == c.NOTEOFF && (this.gate = !1)) : (g = this.midi_event, g.channel = this.properties.channel, this.properties.cmd && this.properties.cmd.constructor === String ? g.setCommandFromString(this.properties.cmd) : g.cmd = this.properties.cmd, g.data[0] = g.cmd | g.channel, g.data[1] = Number(this.properties.value1), 
    g.data[2] = Number(this.properties.value2), this.trigger("on_midi", g));
  };
  C.prototype.onExecute = function() {
    var e = this.properties;
    if (this.inputs) {
      for (var g = 0; g < this.inputs.length; ++g) {
        var k = this.inputs[g];
        if (-1 != k.link) {
          switch(k.name) {
            case "note":
              k = this.getInputData(g);
              null != k && (k.constructor === String && (k = c.NoteStringToPitch(k)), this.properties.value1 = (k | 0) % 255);
              break;
            case "cmd":
              k = this.getInputData(g);
              null != k && (this.properties.cmd = k);
              break;
            case "value1":
              k = this.getInputData(g);
              null != k && (this.properties.value1 = Math.clamp(k | 0, 0, 127));
              break;
            case "value2":
              k = this.getInputData(g), null != k && (this.properties.value2 = Math.clamp(k | 0, 0, 127));
          }
        }
      }
    }
    if (this.outputs) {
      for (g = 0; g < this.outputs.length; ++g) {
        switch(this.outputs[g].name) {
          case "midi":
            k = new c;
            k.setup([e.cmd, e.value1, e.value2]);
            k.channel = e.channel;
            break;
          case "command":
            k = e.cmd;
            break;
          case "cc":
            k = e.value1;
            break;
          case "cc_value":
            k = e.value2;
            break;
          case "note":
            k = e.cmd == c.NOTEON || e.cmd == c.NOTEOFF ? e.value1 : null;
            break;
          case "velocity":
            k = e.cmd == c.NOTEON ? e.value2 : null;
            break;
          case "pitch":
            k = e.cmd == c.NOTEON ? c.computePitch(e.value1) : null;
            break;
          case "pitchbend":
            k = e.cmd == c.PITCHBEND ? c.computePitchBend(e.value1, e.value2) : null;
            break;
          case "gate":
            k = this.gate;
            break;
          default:
            continue;
        }
        null !== k && this.setOutputData(g, k);
      }
    }
  };
  C.prototype.onPropertyChanged = function(e, g) {
    "cmd" == e && (this.properties.cmd = c.computeCommandFromString(g));
  };
  C.prototype.onGetInputs = function() {
    return [["cmd", "number"], ["note", "number"], ["value1", "number"], ["value2", "number"]];
  };
  C.prototype.onGetOutputs = function() {
    return [["midi", "midi"], ["on_midi", u.EVENT], ["command", "number"], ["note", "number"], ["velocity", "number"], ["cc", "number"], ["cc_value", "number"], ["pitch", "number"], ["gate", "bool"], ["pitchbend", "number"]];
  };
  u.registerNodeType("midi/event", C);
  y.title = "MIDICC";
  y.desc = "gets a Controller Change";
  y.color = "#243";
  y.prototype.onExecute = function() {
    q.input && (this.properties.value = q.input.state.cc[this.properties.cc]);
    this.setOutputData(0, this.properties.value);
  };
  u.registerNodeType("midi/cc", y);
  w.title = "MIDI Generator";
  w.desc = "Generates a random MIDI note";
  w.color = "#243";
  w.processScale = function(e) {
    e = e.split(",");
    for (var g = 0; g < e.length; ++g) {
      var k = e[g];
      e[g] = 2 == k.length && "#" != k[1] || 2 < k.length ? -u.MIDIEvent.NoteStringToPitch(k) : c.note_to_index[k] || 0;
    }
    return e;
  };
  w.prototype.onPropertyChanged = function(c, e) {
    "notes" == c && (this.notes_pitches = w.processScale(e));
  };
  w.prototype.onExecute = function() {
    var c = this.getInputData(2);
    null != c && (this.properties.octave = c);
    if (c = this.getInputData(1)) {
      this.notes_pitches = w.processScale(c);
    }
  };
  w.prototype.onAction = function(e, g) {
    var k = 0;
    g = this.notes_pitches.length;
    e = 0;
    "sequence" == this.properties.mode ? e = this.sequence_index = (this.sequence_index + 1) % g : "random" == this.properties.mode && (e = Math.floor(Math.random() * g));
    g = this.notes_pitches[e];
    k = 0 <= g ? g + 12 * (this.properties.octave - 1) + 33 : -g;
    g = new c;
    g.setup([c.NOTEON, k, 10]);
    e = this.properties.duration || 1;
    this.trigger("note", g);
    setTimeout(function() {
      var a = new c;
      a.setup([c.NOTEOFF, k, 0]);
      this.trigger("note", a);
    }.bind(this), 1000 * e);
  };
  u.registerNodeType("midi/generator", w);
  E.title = "MIDI Transpose";
  E.desc = "Transpose a MIDI note";
  E.color = "#243";
  E.prototype.onAction = function(e, g) {
    g && g.constructor === c && (g.data[0] == c.NOTEON || g.data[0] == c.NOTEOFF ? (this.midi_event = new c, this.midi_event.setup(g.data), this.midi_event.data[1] = Math.round(this.midi_event.data[1] + this.properties.amount), this.trigger("out", this.midi_event)) : this.trigger("out", g));
  };
  E.prototype.onExecute = function() {
    var c = this.getInputData(1);
    null != c && (this.properties.amount = c);
  };
  u.registerNodeType("midi/transpose", E);
  z.title = "MIDI Quantize Pitch";
  z.desc = "Transpose a MIDI note tp fit an scale";
  z.color = "#243";
  z.prototype.onPropertyChanged = function(c, e) {
    "scale" == c && this.processScale(e);
  };
  z.prototype.processScale = function(c) {
    this._current_scale = c;
    this.notes_pitches = w.processScale(c);
    for (c = 0; 12 > c; ++c) {
      this.valid_notes[c] = -1 != this.notes_pitches.indexOf(c);
    }
    for (c = 0; 12 > c; ++c) {
      if (this.valid_notes[c]) {
        this.offset_notes[c] = 0;
      } else {
        for (var e = 1; 12 > e; ++e) {
          if (this.valid_notes[(c - e) % 12]) {
            this.offset_notes[c] = -e;
            break;
          }
          if (this.valid_notes[(c + e) % 12]) {
            this.offset_notes[c] = e;
            break;
          }
        }
      }
    }
  };
  z.prototype.onAction = function(e, g) {
    g && g.constructor === c && (g.data[0] == c.NOTEON || g.data[0] == c.NOTEOFF ? (this.midi_event = new c, this.midi_event.setup(g.data), this.midi_event.data[1] += this.offset_notes[c.note_to_index[g.note]], this.trigger("out", this.midi_event)) : this.trigger("out", g));
  };
  z.prototype.onExecute = function() {
    var c = this.getInputData(1);
    null != c && c != this._current_scale && this.processScale(c);
  };
  u.registerNodeType("midi/quantize", z);
  e.title = "MIDI fromFile";
  e.desc = "Plays a MIDI file";
  e.color = "#243";
  e.prototype.onAction = function(c) {
    "play" == c ? this.play() : "pause" == c && (this._playing = !this._playing);
  };
  e.prototype.onPropertyChanged = function(c, e) {
    "url" == c && this.loadMIDIFile(e);
  };
  e.prototype.onExecute = function() {
    if (this._midi && this._playing) {
      this._current_time += this.graph.elapsed_time;
      for (var e = 100 * this._current_time, g = 0; g < this._midi.tracks; ++g) {
        var k = this._midi.track[g];
        k._last_pos || (k._last_pos = 0, k._time = 0);
        var a = k.event[k._last_pos];
        if (a && k._time + a.deltaTime <= e && (k._last_pos++, k._time += a.deltaTime, a.data)) {
          k = a.type << 4 + a.channel;
          var b = new c;
          b.setup([k, a.data[0], a.data[1]]);
          this.trigger("note", b);
        }
      }
    }
  };
  e.prototype.play = function() {
    this._playing = !0;
    for (var c = this._current_time = 0; c < this._midi.tracks; ++c) {
      var e = this._midi.track[c];
      e._last_pos = 0;
      e._time = 0;
    }
  };
  e.prototype.loadMIDIFile = function(c) {
    var e = this;
    u.fetchFile(c, "arraybuffer", function(c) {
      e.boxcolor = "#AFA";
      e._midi = MidiParser.parse(new Uint8Array(c));
      e.properties.autoplay && e.play();
    }, function(c) {
      e.boxcolor = "#FAA";
      e._midi = null;
    });
  };
  e.prototype.onDropFile = function(c) {
    this.properties.url = "";
    this.loadMIDIFile(c);
  };
  u.registerNodeType("midi/fromFile", e);
  B.title = "MIDI Play";
  B.desc = "Plays a MIDI note";
  B.color = "#243";
  B.prototype.onAction = function(e, g) {
    if (g && g.constructor === c) {
      if (this.instrument && g.data[0] == c.NOTEON) {
        e = g.note;
        if (!e || "undefined" == e || e.constructor !== String) {
          return;
        }
        this.instrument.play(e, g.octave, this.properties.duration, this.properties.volume);
      }
      this.trigger("note", g);
    }
  };
  B.prototype.onExecute = function() {
    var c = this.getInputData(1);
    null != c && (this.properties.volume = c);
    c = this.getInputData(2);
    null != c && (this.properties.duration = c);
  };
  u.registerNodeType("midi/play", B);
  D.title = "MIDI Keys";
  D.desc = "Keyboard to play notes";
  D.color = "#243";
  D.keys = [{x:0, w:1, h:1, t:0}, {x:0.75, w:0.5, h:0.6, t:1}, {x:1, w:1, h:1, t:0}, {x:1.75, w:0.5, h:0.6, t:1}, {x:2, w:1, h:1, t:0}, {x:2.75, w:0.5, h:0.6, t:1}, {x:3, w:1, h:1, t:0}, {x:4, w:1, h:1, t:0}, {x:4.75, w:0.5, h:0.6, t:1}, {x:5, w:1, h:1, t:0}, {x:5.75, w:0.5, h:0.6, t:1}, {x:6, w:1, h:1, t:0}];
  D.prototype.onDrawForeground = function(c) {
    if (!this.flags.collapsed) {
      var e = 12 * this.properties.num_octaves;
      this.keys.length = e;
      var k = this.size[0] / (7 * this.properties.num_octaves), a = this.size[1];
      c.globalAlpha = 1;
      for (var b = 0; 2 > b; b++) {
        for (var d = 0; d < e; ++d) {
          var h = D.keys[d % 12];
          if (h.t == b) {
            var f = 7 * Math.floor(d / 12) * k + h.x * k;
            c.fillStyle = 0 == b ? this.keys[d] ? "#CCC" : "white" : this.keys[d] ? "#333" : "black";
            c.fillRect(f + 1, 0, k * h.w - 2, a * h.h);
          }
        }
      }
    }
  };
  D.prototype.getKeyIndex = function(c) {
    for (var e = this.size[0] / (7 * this.properties.num_octaves), k = this.size[1], a = 1; 0 <= a; a--) {
      for (var b = 0; b < this.keys.length; ++b) {
        var d = D.keys[b % 12];
        if (d.t == a) {
          var h = 7 * Math.floor(b / 12) * e + d.x * e, f = e * d.w;
          d = k * d.h;
          if (!(c[0] < h || c[0] > h + f || c[1] > d)) {
            return b;
          }
        }
      }
    }
    return -1;
  };
  D.prototype.onAction = function(e, g) {
    if ("reset" == e) {
      for (g = 0; g < this.keys.length; ++g) {
        this.keys[g] = !1;
      }
    } else {
      g && g.constructor === c && (e = g.data[1] - (12 * (this.properties.start_octave - 1) + 29), 0 <= e && e < this.keys.length && (g.data[0] == c.NOTEON ? this.keys[e] = !0 : g.data[0] == c.NOTEOFF && (this.keys[e] = !1)), this.trigger("note", g));
    }
  };
  D.prototype.onMouseDown = function(e, g) {
    if (!(0 > g[1])) {
      return e = this.getKeyIndex(g), this.keys[e] = !0, this._last_key = e, e = 12 * (this.properties.start_octave - 1) + 29 + e, g = new c, g.setup([c.NOTEON, e, 100]), this.trigger("note", g), !0;
    }
  };
  D.prototype.onMouseMove = function(e, g) {
    if (!(0 > g[1] || -1 == this._last_key)) {
      this.setDirtyCanvas(!0);
      e = this.getKeyIndex(g);
      if (this._last_key == e) {
        return !0;
      }
      this.keys[this._last_key] = !1;
      g = 12 * (this.properties.start_octave - 1) + 29 + this._last_key;
      var k = new c;
      k.setup([c.NOTEOFF, g, 100]);
      this.trigger("note", k);
      this.keys[e] = !0;
      g = 12 * (this.properties.start_octave - 1) + 29 + e;
      k = new c;
      k.setup([c.NOTEON, g, 100]);
      this.trigger("note", k);
      this._last_key = e;
      return !0;
    }
  };
  D.prototype.onMouseUp = function(e, g) {
    if (!(0 > g[1])) {
      return e = this.getKeyIndex(g), this.keys[e] = !1, this._last_key = -1, e = 12 * (this.properties.start_octave - 1) + 29 + e, g = new c, g.setup([c.NOTEOFF, e, 100]), this.trigger("note", g), !0;
    }
  };
  u.registerNodeType("midi/keys", D);
})(this);
(function(v) {
  function c() {
    this.properties = {src:"", gain:0.5, loop:!0, autoplay:!0, playbackRate:1};
    this._loading_audio = !1;
    this._audiobuffer = null;
    this._audionodes = [];
    this._last_sourcenode = null;
    this.addOutput("out", "audio");
    this.addInput("gain", "number");
    this.audionode = p.getAudioContext().createGain();
    this.audionode.graphnode = this;
    this.audionode.gain.value = this.properties.gain;
    this.properties.src && this.loadSound(this.properties.src);
  }
  function q() {
    this.properties = {gain:0.5};
    this._audionodes = [];
    this._media_stream = null;
    this.addOutput("out", "audio");
    this.addInput("gain", "number");
    this.audionode = p.getAudioContext().createGain();
    this.audionode.graphnode = this;
    this.audionode.gain.value = this.properties.gain;
  }
  function m() {
    this.properties = {fftSize:2048, minDecibels:-100, maxDecibels:-10, smoothingTimeConstant:0.5};
    this.audionode = p.getAudioContext().createAnalyser();
    this.audionode.graphnode = this;
    this.audionode.fftSize = this.properties.fftSize;
    this.audionode.minDecibels = this.properties.minDecibels;
    this.audionode.maxDecibels = this.properties.maxDecibels;
    this.audionode.smoothingTimeConstant = this.properties.smoothingTimeConstant;
    this.addInput("in", "audio");
    this.addOutput("freqs", "array");
    this.addOutput("samples", "array");
    this._time_bin = this._freq_bin = null;
  }
  function g() {
    this.properties = {gain:1};
    this.audionode = p.getAudioContext().createGain();
    this.addInput("in", "audio");
    this.addInput("gain", "number");
    this.addOutput("out", "audio");
  }
  function r() {
    this.properties = {impulse_src:"", normalize:!0};
    this.audionode = p.getAudioContext().createConvolver();
    this.addInput("in", "audio");
    this.addOutput("out", "audio");
  }
  function l() {
    this.properties = {threshold:-50, knee:40, ratio:12, reduction:-20, attack:0, release:0.25};
    this.audionode = p.getAudioContext().createDynamicsCompressor();
    this.addInput("in", "audio");
    this.addOutput("out", "audio");
  }
  function C() {
    this.properties = {};
    this.audionode = p.getAudioContext().createWaveShaper();
    this.addInput("in", "audio");
    this.addInput("shape", "waveshape");
    this.addOutput("out", "audio");
  }
  function y() {
    this.properties = {gain1:0.5, gain2:0.5};
    this.audionode = p.getAudioContext().createGain();
    this.audionode1 = p.getAudioContext().createGain();
    this.audionode1.gain.value = this.properties.gain1;
    this.audionode2 = p.getAudioContext().createGain();
    this.audionode2.gain.value = this.properties.gain2;
    this.audionode1.connect(this.audionode);
    this.audionode2.connect(this.audionode);
    this.addInput("in1", "audio");
    this.addInput("in1 gain", "number");
    this.addInput("in2", "audio");
    this.addInput("in2 gain", "number");
    this.addOutput("out", "audio");
  }
  function w() {
    this.properties = {A:0.1, D:0.1, S:0.1, R:0.1};
    this.audionode = p.getAudioContext().createGain();
    this.audionode.gain.value = 0;
    this.addInput("in", "audio");
    this.addInput("gate", "bool");
    this.addOutput("out", "audio");
    this.gate = !1;
  }
  function E() {
    this.properties = {delayTime:0.5};
    this.audionode = p.getAudioContext().createDelay(10);
    this.audionode.delayTime.value = this.properties.delayTime;
    this.addInput("in", "audio");
    this.addInput("time", "number");
    this.addOutput("out", "audio");
  }
  function z() {
    this.properties = {frequency:350, detune:0, Q:1};
    this.addProperty("type", "lowpass", "enum", {values:"lowpass highpass bandpass lowshelf highshelf peaking notch allpass".split(" ")});
    this.audionode = p.getAudioContext().createBiquadFilter();
    this.addInput("in", "audio");
    this.addOutput("out", "audio");
  }
  function e() {
    this.properties = {frequency:440, detune:0, type:"sine"};
    this.addProperty("type", "sine", "enum", {values:["sine", "square", "sawtooth", "triangle", "custom"]});
    this.audionode = p.getAudioContext().createOscillator();
    this.addOutput("out", "audio");
  }
  function B() {
    this.properties = {continuous:!0, mark:-1};
    this.addInput("data", "array");
    this.addInput("mark", "number");
    this.size = [300, 200];
    this._last_buffer = null;
  }
  function D() {
    this.properties = {band:440, amplitude:1};
    this.addInput("freqs", "array");
    this.addOutput("signal", "number");
  }
  function u() {
    if (!u.default_code) {
      var c = u.default_function.toString(), a = c.indexOf("{") + 1, b = c.lastIndexOf("}");
      u.default_code = c.substr(a, b - a);
    }
    this.properties = {code:u.default_code};
    c = p.getAudioContext();
    c.createScriptProcessor ? this.audionode = c.createScriptProcessor(4096, 1, 1) : (console.warn("ScriptProcessorNode deprecated"), this.audionode = c.createGain());
    this.processCode();
    u._bypass_function || (u._bypass_function = this.audionode.onaudioprocess);
    this.addInput("in", "audio");
    this.addOutput("out", "audio");
  }
  function H() {
    this.audionode = p.getAudioContext().destination;
    this.addInput("in", "audio");
  }
  var n = v.LiteGraph, p = {};
  v.LGAudio = p;
  p.getAudioContext = function() {
    if (!this._audio_context) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!window.AudioContext) {
        return console.error("AudioContext not supported by browser"), null;
      }
      this._audio_context = new AudioContext;
      this._audio_context.onmessage = function(c) {
        console.log("msg", c);
      };
      this._audio_context.onended = function(c) {
        console.log("ended", c);
      };
      this._audio_context.oncomplete = function(c) {
        console.log("complete", c);
      };
    }
    return this._audio_context;
  };
  p.connect = function(c, a) {
    try {
      c.connect(a);
    } catch (b) {
      console.warn("LGraphAudio:", b);
    }
  };
  p.disconnect = function(c, a) {
    try {
      c.disconnect(a);
    } catch (b) {
      console.warn("LGraphAudio:", b);
    }
  };
  p.changeAllAudiosConnections = function(c, a) {
    if (c.inputs) {
      for (var b = 0; b < c.inputs.length; ++b) {
        var d = c.graph.links[c.inputs[b].link];
        if (d) {
          var e = c.graph.getNodeById(d.origin_id);
          e = e.getAudioNodeInOutputSlot ? e.getAudioNodeInOutputSlot(d.origin_slot) : e.audionode;
          d = c.getAudioNodeInInputSlot ? c.getAudioNodeInInputSlot(b) : c.audionode;
          a ? p.connect(e, d) : p.disconnect(e, d);
        }
      }
    }
    if (c.outputs) {
      for (b = 0; b < c.outputs.length; ++b) {
        for (var k = c.outputs[b], g = 0; g < k.links.length; ++g) {
          if (d = c.graph.links[k.links[g]]) {
            e = c.getAudioNodeInOutputSlot ? c.getAudioNodeInOutputSlot(b) : c.audionode;
            var l = c.graph.getNodeById(d.target_id);
            d = l.getAudioNodeInInputSlot ? l.getAudioNodeInInputSlot(d.target_slot) : l.audionode;
            a ? p.connect(e, d) : p.disconnect(e, d);
          }
        }
      }
    }
  };
  p.onConnectionsChange = function(c, a, b, d) {
    c == n.OUTPUT && (c = null, d && (c = this.graph.getNodeById(d.target_id)), c && (a = this.getAudioNodeInOutputSlot ? this.getAudioNodeInOutputSlot(a) : this.audionode, d = c.getAudioNodeInInputSlot ? c.getAudioNodeInInputSlot(d.target_slot) : c.audionode, b ? p.connect(a, d) : p.disconnect(a, d)));
  };
  p.createAudioNodeWrapper = function(c) {
    var a = c.prototype.onPropertyChanged;
    c.prototype.onPropertyChanged = function(b, d) {
      a && a.call(this, b, d);
      this.audionode && void 0 !== this.audionode[b] && (void 0 !== this.audionode[b].value ? this.audionode[b].value = d : this.audionode[b] = d);
    };
    c.prototype.onConnectionsChange = p.onConnectionsChange;
  };
  p.cached_audios = {};
  p.loadSound = function(c, a, b) {
    function d(a) {
      console.log("Audio loading sample error:", a);
      b && b(a);
    }
    if (p.cached_audios[c] && -1 == c.indexOf("blob:")) {
      a && a(p.cached_audios[c]);
    } else {
      p.onProcessAudioURL && (c = p.onProcessAudioURL(c));
      var e = new XMLHttpRequest;
      e.open("GET", c, !0);
      e.responseType = "arraybuffer";
      var k = p.getAudioContext();
      e.onload = function() {
        console.log("AudioSource loaded");
        k.decodeAudioData(e.response, function(b) {
          console.log("AudioSource decoded");
          p.cached_audios[c] = b;
          a && a(b);
        }, d);
      };
      e.send();
      return e;
    }
  };
  c.desc = "Plays an audio file";
  c["@src"] = {widget:"resource"};
  c.supported_extensions = ["wav", "ogg", "mp3"];
  c.prototype.onAdded = function(c) {
    if (c.status === LGraph.STATUS_RUNNING) {
      this.onStart();
    }
  };
  c.prototype.onStart = function() {
    this._audiobuffer && this.properties.autoplay && this.playBuffer(this._audiobuffer);
  };
  c.prototype.onStop = function() {
    this.stopAllSounds();
  };
  c.prototype.onPause = function() {
    this.pauseAllSounds();
  };
  c.prototype.onUnpause = function() {
    this.unpauseAllSounds();
  };
  c.prototype.onRemoved = function() {
    this.stopAllSounds();
    this._dropped_url && URL.revokeObjectURL(this._url);
  };
  c.prototype.stopAllSounds = function() {
    for (var c = 0; c < this._audionodes.length; ++c) {
      this._audionodes[c].started && (this._audionodes[c].started = !1, this._audionodes[c].stop());
    }
    this._audionodes.length = 0;
  };
  c.prototype.pauseAllSounds = function() {
    p.getAudioContext().suspend();
  };
  c.prototype.unpauseAllSounds = function() {
    p.getAudioContext().resume();
  };
  c.prototype.onExecute = function() {
    if (this.inputs) {
      for (var c = 0; c < this.inputs.length; ++c) {
        var a = this.inputs[c];
        if (null != a.link) {
          var b = this.getInputData(c);
          if (void 0 !== b) {
            if ("gain" == a.name) {
              this.audionode.gain.value = b;
            } else {
              if ("src" == a.name) {
                this.setProperty("src", b);
              } else {
                if ("playbackRate" == a.name) {
                  for (this.properties.playbackRate = b, a = 0; a < this._audionodes.length; ++a) {
                    this._audionodes[a].playbackRate.value = b;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.outputs) {
      for (c = 0; c < this.outputs.length; ++c) {
        "buffer" == this.outputs[c].name && this._audiobuffer && this.setOutputData(c, this._audiobuffer);
      }
    }
  };
  c.prototype.onAction = function(c) {
    this._audiobuffer && ("Play" == c ? this.playBuffer(this._audiobuffer) : "Stop" == c && this.stopAllSounds());
  };
  c.prototype.onPropertyChanged = function(c, a) {
    if ("src" == c) {
      this.loadSound(a);
    } else {
      if ("gain" == c) {
        this.audionode.gain.value = a;
      } else {
        if ("playbackRate" == c) {
          for (c = 0; c < this._audionodes.length; ++c) {
            this._audionodes[c].playbackRate.value = a;
          }
        }
      }
    }
  };
  c.prototype.playBuffer = function(c) {
    var a = this, b = p.getAudioContext().createBufferSource();
    this._last_sourcenode = b;
    b.graphnode = this;
    b.buffer = c;
    b.loop = this.properties.loop;
    b.playbackRate.value = this.properties.playbackRate;
    this._audionodes.push(b);
    b.connect(this.audionode);
    this._audionodes.push(b);
    this.trigger("start");
    b.onended = function() {
      a.trigger("ended");
      var d = a._audionodes.indexOf(b);
      -1 != d && a._audionodes.splice(d, 1);
    };
    b.started || (b.started = !0, b.start());
    return b;
  };
  c.prototype.loadSound = function(c) {
    var a = this;
    this._request && (this._request.abort(), this._request = null);
    this._audiobuffer = null;
    this._loading_audio = !1;
    c && (this._request = p.loadSound(c, function(b) {
      this.boxcolor = n.NODE_DEFAULT_BOXCOLOR;
      a._audiobuffer = b;
      a._loading_audio = !1;
      if (a.graph && a.graph.status === LGraph.STATUS_RUNNING) {
        a.onStart();
      }
    }), this._loading_audio = !0, this.boxcolor = "#AA4");
  };
  c.prototype.onConnectionsChange = p.onConnectionsChange;
  c.prototype.onGetInputs = function() {
    return [["playbackRate", "number"], ["src", "string"], ["Play", n.ACTION], ["Stop", n.ACTION]];
  };
  c.prototype.onGetOutputs = function() {
    return [["buffer", "audiobuffer"], ["start", n.EVENT], ["ended", n.EVENT]];
  };
  c.prototype.onDropFile = function(c) {
    this._dropped_url && URL.revokeObjectURL(this._dropped_url);
    c = URL.createObjectURL(c);
    this.properties.src = c;
    this.loadSound(c);
    this._dropped_url = c;
  };
  c.title = "Source";
  c.desc = "Plays audio";
  n.registerNodeType("audio/source", c);
  q.prototype.onAdded = function(c) {
    if (c.status === LGraph.STATUS_RUNNING) {
      this.onStart();
    }
  };
  q.prototype.onStart = function() {
    null != this._media_stream || this._waiting_confirmation || this.openStream();
  };
  q.prototype.onStop = function() {
    this.audionode.gain.value = 0;
  };
  q.prototype.onPause = function() {
    this.audionode.gain.value = 0;
  };
  q.prototype.onUnpause = function() {
    this.audionode.gain.value = this.properties.gain;
  };
  q.prototype.onRemoved = function() {
    this.audionode.gain.value = 0;
    this.audiosource_node && (this.audiosource_node.disconnect(this.audionode), this.audiosource_node = null);
    if (this._media_stream) {
      var c = this._media_stream.getTracks();
      c.length && c[0].stop();
    }
  };
  q.prototype.openStream = function() {
    if (navigator.mediaDevices) {
      this._waiting_confirmation = !0;
      navigator.mediaDevices.getUserMedia({audio:!0, video:!1}).then(this.streamReady.bind(this)).catch(function(a) {
        console.log("Media rejected", a);
        c._media_stream = !1;
        c.boxcolor = "red";
      });
      var c = this;
    } else {
      console.log("getUserMedia() is not supported in your browser, use chrome and enable WebRTC from about://flags");
    }
  };
  q.prototype.streamReady = function(c) {
    this._media_stream = c;
    this.audiosource_node && this.audiosource_node.disconnect(this.audionode);
    this.audiosource_node = p.getAudioContext().createMediaStreamSource(c);
    this.audiosource_node.graphnode = this;
    this.audiosource_node.connect(this.audionode);
    this.boxcolor = "white";
  };
  q.prototype.onExecute = function() {
    null != this._media_stream || this._waiting_confirmation || this.openStream();
    if (this.inputs) {
      for (var c = 0; c < this.inputs.length; ++c) {
        var a = this.inputs[c];
        if (null != a.link) {
          var b = this.getInputData(c);
          void 0 !== b && "gain" == a.name && (this.audionode.gain.value = this.properties.gain = b);
        }
      }
    }
  };
  q.prototype.onAction = function(c) {
    "Play" == c ? this.audionode.gain.value = this.properties.gain : "Stop" == c && (this.audionode.gain.value = 0);
  };
  q.prototype.onPropertyChanged = function(c, a) {
    "gain" == c && (this.audionode.gain.value = a);
  };
  q.prototype.onConnectionsChange = p.onConnectionsChange;
  q.prototype.onGetInputs = function() {
    return [["playbackRate", "number"], ["Play", n.ACTION], ["Stop", n.ACTION]];
  };
  q.title = "MediaSource";
  q.desc = "Plays microphone";
  n.registerNodeType("audio/media_source", q);
  m.prototype.onPropertyChanged = function(c, a) {
    this.audionode[c] = a;
  };
  m.prototype.onExecute = function() {
    if (this.isOutputConnected(0)) {
      var c = this.audionode.frequencyBinCount;
      this._freq_bin && this._freq_bin.length == c || (this._freq_bin = new Uint8Array(c));
      this.audionode.getByteFrequencyData(this._freq_bin);
      this.setOutputData(0, this._freq_bin);
    }
    this.isOutputConnected(1) && (c = this.audionode.frequencyBinCount, this._time_bin && this._time_bin.length == c || (this._time_bin = new Uint8Array(c)), this.audionode.getByteTimeDomainData(this._time_bin), this.setOutputData(1, this._time_bin));
    for (c = 1; c < this.inputs.length; ++c) {
      var a = this.inputs[c];
      if (null != a.link) {
        var b = this.getInputData(c);
        void 0 !== b && (this.audionode[a.name].value = b);
      }
    }
  };
  m.prototype.onGetInputs = function() {
    return [["minDecibels", "number"], ["maxDecibels", "number"], ["smoothingTimeConstant", "number"]];
  };
  m.prototype.onGetOutputs = function() {
    return [["freqs", "array"], ["samples", "array"]];
  };
  m.title = "Analyser";
  m.desc = "Audio Analyser";
  n.registerNodeType("audio/analyser", m);
  g.prototype.onExecute = function() {
    if (this.inputs && this.inputs.length) {
      for (var c = 1; c < this.inputs.length; ++c) {
        var a = this.inputs[c], b = this.getInputData(c);
        void 0 !== b && (this.audionode[a.name].value = b);
      }
    }
  };
  p.createAudioNodeWrapper(g);
  g.title = "Gain";
  g.desc = "Audio gain";
  n.registerNodeType("audio/gain", g);
  p.createAudioNodeWrapper(r);
  r.prototype.onRemove = function() {
    this._dropped_url && URL.revokeObjectURL(this._dropped_url);
  };
  r.prototype.onPropertyChanged = function(c, a) {
    "impulse_src" == c ? this.loadImpulse(a) : "normalize" == c && (this.audionode.normalize = a);
  };
  r.prototype.onDropFile = function(c) {
    this._dropped_url && URL.revokeObjectURL(this._dropped_url);
    this._dropped_url = URL.createObjectURL(c);
    this.properties.impulse_src = this._dropped_url;
    this.loadImpulse(this._dropped_url);
  };
  r.prototype.loadImpulse = function(c) {
    var a = this;
    this._request && (this._request.abort(), this._request = null);
    this._impulse_buffer = null;
    this._loading_impulse = !1;
    c && (this._request = p.loadSound(c, function(b) {
      a._impulse_buffer = b;
      a.audionode.buffer = b;
      console.log("Impulse signal set");
      a._loading_impulse = !1;
    }), this._loading_impulse = !0);
  };
  r.title = "Convolver";
  r.desc = "Convolves the signal (used for reverb)";
  n.registerNodeType("audio/convolver", r);
  p.createAudioNodeWrapper(l);
  l.prototype.onExecute = function() {
    if (this.inputs && this.inputs.length) {
      for (var c = 1; c < this.inputs.length; ++c) {
        var a = this.inputs[c];
        if (null != a.link) {
          var b = this.getInputData(c);
          void 0 !== b && (this.audionode[a.name].value = b);
        }
      }
    }
  };
  l.prototype.onGetInputs = function() {
    return [["threshold", "number"], ["knee", "number"], ["ratio", "number"], ["reduction", "number"], ["attack", "number"], ["release", "number"]];
  };
  l.title = "DynamicsCompressor";
  l.desc = "Dynamics Compressor";
  n.registerNodeType("audio/dynamicsCompressor", l);
  C.prototype.onExecute = function() {
    if (this.inputs && this.inputs.length) {
      var c = this.getInputData(1);
      void 0 !== c && (this.audionode.curve = c);
    }
  };
  C.prototype.setWaveShape = function(c) {
    this.audionode.curve = c;
  };
  p.createAudioNodeWrapper(C);
  y.prototype.getAudioNodeInInputSlot = function(c) {
    if (0 == c) {
      return this.audionode1;
    }
    if (2 == c) {
      return this.audionode2;
    }
  };
  y.prototype.onPropertyChanged = function(c, a) {
    "gain1" == c ? this.audionode1.gain.value = a : "gain2" == c && (this.audionode2.gain.value = a);
  };
  y.prototype.onExecute = function() {
    if (this.inputs && this.inputs.length) {
      for (var c = 1; c < this.inputs.length; ++c) {
        var a = this.inputs[c];
        null != a.link && "audio" != a.type && (a = this.getInputData(c), void 0 !== a && (1 == c ? this.audionode1.gain.value = a : 3 == c && (this.audionode2.gain.value = a)));
      }
    }
  };
  p.createAudioNodeWrapper(y);
  y.title = "Mixer";
  y.desc = "Audio mixer";
  n.registerNodeType("audio/mixer", y);
  w.prototype.onExecute = function() {
    var c = p.getAudioContext().currentTime, a = this.audionode.gain, b = this.getInputData(1), d = this.getInputOrProperty("A"), e = this.getInputOrProperty("D"), f = this.getInputOrProperty("S"), g = this.getInputOrProperty("R");
    !this.gate && b ? (a.cancelScheduledValues(0), a.setValueAtTime(0, c), a.linearRampToValueAtTime(1, c + d), a.linearRampToValueAtTime(f, c + d + e)) : this.gate && !b && (a.cancelScheduledValues(0), a.setValueAtTime(a.value, c), a.linearRampToValueAtTime(0, c + g));
    this.gate = b;
  };
  w.prototype.onGetInputs = function() {
    return [["A", "number"], ["D", "number"], ["S", "number"], ["R", "number"]];
  };
  p.createAudioNodeWrapper(w);
  w.title = "ADSR";
  w.desc = "Audio envelope";
  n.registerNodeType("audio/adsr", w);
  p.createAudioNodeWrapper(E);
  E.prototype.onExecute = function() {
    var c = this.getInputData(1);
    void 0 !== c && (this.audionode.delayTime.value = c);
  };
  E.title = "Delay";
  E.desc = "Audio delay";
  n.registerNodeType("audio/delay", E);
  z.prototype.onExecute = function() {
    if (this.inputs && this.inputs.length) {
      for (var c = 1; c < this.inputs.length; ++c) {
        var a = this.inputs[c];
        if (null != a.link) {
          var b = this.getInputData(c);
          void 0 !== b && (this.audionode[a.name].value = b);
        }
      }
    }
  };
  z.prototype.onGetInputs = function() {
    return [["frequency", "number"], ["detune", "number"], ["Q", "number"]];
  };
  p.createAudioNodeWrapper(z);
  z.title = "BiquadFilter";
  z.desc = "Audio filter";
  n.registerNodeType("audio/biquadfilter", z);
  e.prototype.onStart = function() {
    if (!this.audionode.started) {
      this.audionode.started = !0;
      try {
        this.audionode.start();
      } catch (k) {
      }
    }
  };
  e.prototype.onStop = function() {
    this.audionode.started && (this.audionode.started = !1, this.audionode.stop());
  };
  e.prototype.onPause = function() {
    this.onStop();
  };
  e.prototype.onUnpause = function() {
    this.onStart();
  };
  e.prototype.onExecute = function() {
    if (this.inputs && this.inputs.length) {
      for (var c = 0; c < this.inputs.length; ++c) {
        var a = this.inputs[c];
        if (null != a.link) {
          var b = this.getInputData(c);
          void 0 !== b && (this.audionode[a.name].value = b);
        }
      }
    }
  };
  e.prototype.onGetInputs = function() {
    return [["frequency", "number"], ["detune", "number"], ["type", "string"]];
  };
  p.createAudioNodeWrapper(e);
  e.title = "Oscillator";
  e.desc = "Oscillator";
  n.registerNodeType("audio/oscillator", e);
  B.prototype.onExecute = function() {
    this._last_buffer = this.getInputData(0);
    var c = this.getInputData(1);
    void 0 !== c && (this.properties.mark = c);
    this.setDirtyCanvas(!0, !1);
  };
  B.prototype.onDrawForeground = function(c) {
    if (this._last_buffer) {
      var a = this._last_buffer, b = a.length / this.size[0], d = this.size[1];
      c.fillStyle = "black";
      c.fillRect(0, 0, this.size[0], this.size[1]);
      c.strokeStyle = "white";
      c.beginPath();
      var e = 0;
      if (this.properties.continuous) {
        c.moveTo(e, d);
        for (var f = 0; f < a.length; f += b) {
          c.lineTo(e, d - a[f | 0] / 255 * d), e++;
        }
      } else {
        for (f = 0; f < a.length; f += b) {
          c.moveTo(e + 0.5, d), c.lineTo(e + 0.5, d - a[f | 0] / 255 * d), e++;
        }
      }
      c.stroke();
      0 <= this.properties.mark && (a = p.getAudioContext().sampleRate / a.length, e = this.properties.mark / a * 2 / b, e >= this.size[0] && (e = this.size[0] - 1), c.strokeStyle = "red", c.beginPath(), c.moveTo(e, d), c.lineTo(e, 0), c.stroke());
    }
  };
  B.title = "Visualization";
  B.desc = "Audio Visualization";
  n.registerNodeType("audio/visualization", B);
  D.prototype.onExecute = function() {
    if (this._freqs = this.getInputData(0)) {
      var c = this.properties.band, a = this.getInputData(1);
      void 0 !== a && (c = a);
      a = p.getAudioContext().sampleRate / this._freqs.length;
      a = c / a * 2;
      a >= this._freqs.length ? a = this._freqs[this._freqs.length - 1] : (c = a | 0, a -= c, a = this._freqs[c] * (1 - a) + this._freqs[c + 1] * a);
      this.setOutputData(0, a / 255 * this.properties.amplitude);
    }
  };
  D.prototype.onGetInputs = function() {
    return [["band", "number"]];
  };
  D.title = "Signal";
  D.desc = "extract the signal of some frequency";
  n.registerNodeType("audio/signal", D);
  u.prototype.onAdded = function(c) {
    c.status == LGraph.STATUS_RUNNING && (this.audionode.onaudioprocess = this._callback);
  };
  u["@code"] = {widget:"code", type:"code"};
  u.prototype.onStart = function() {
    this.audionode.onaudioprocess = this._callback;
  };
  u.prototype.onStop = function() {
    this.audionode.onaudioprocess = u._bypass_function;
  };
  u.prototype.onPause = function() {
    this.audionode.onaudioprocess = u._bypass_function;
  };
  u.prototype.onUnpause = function() {
    this.audionode.onaudioprocess = this._callback;
  };
  u.prototype.onExecute = function() {
  };
  u.prototype.onRemoved = function() {
    this.audionode.onaudioprocess = u._bypass_function;
  };
  u.prototype.processCode = function() {
    try {
      this._script = new (new Function("properties", this.properties.code))(this.properties), this._old_code = this.properties.code, this._callback = this._script.onaudioprocess;
    } catch (k) {
      console.error("Error in onaudioprocess code", k), this._callback = u._bypass_function, this.audionode.onaudioprocess = this._callback;
    }
  };
  u.prototype.onPropertyChanged = function(c, a) {
    "code" == c && (this.properties.code = a, this.processCode(), this.graph && this.graph.status == LGraph.STATUS_RUNNING && (this.audionode.onaudioprocess = this._callback));
  };
  u.default_function = function() {
    this.onaudioprocess = function(c) {
      var a = c.inputBuffer;
      c = c.outputBuffer;
      for (var b = 0; b < c.numberOfChannels; b++) {
        for (var d = a.getChannelData(b), e = c.getChannelData(b), f = 0; f < a.length; f++) {
          e[f] = d[f];
        }
      }
    };
  };
  p.createAudioNodeWrapper(u);
  u.title = "Script";
  u.desc = "apply script to signal";
  n.registerNodeType("audio/script", u);
  H.title = "Destination";
  H.desc = "Audio output";
  n.registerNodeType("audio/destination", H);
})(this);
(function(v) {
  function c() {
    this.size = [60, 20];
    this.addInput("send", m.ACTION);
    this.addOutput("received", m.EVENT);
    this.addInput("in", 0);
    this.addOutput("out", 0);
    this.properties = {url:"", room:"lgraph", only_send_changes:!0};
    this._ws = null;
    this._last_sent_data = [];
    this._last_received_data = [];
  }
  function q() {
    this.room_widget = this.addWidget("text", "Room", "lgraph", this.setRoom.bind(this));
    this.addWidget("button", "Reconnect", null, this.connectSocket.bind(this));
    this.addInput("send", m.ACTION);
    this.addOutput("received", m.EVENT);
    this.addInput("in", 0);
    this.addOutput("out", 0);
    this.properties = {url:"tamats.com:55000", room:"lgraph", only_send_changes:!0};
    this._server = null;
    this.connectSocket();
    this._last_sent_data = [];
    this._last_received_data = [];
    "undefined" == typeof SillyClient && console.warn("remember to add SillyClient.js to your project: https://tamats.com/projects/sillyserver/src/sillyclient.js");
  }
  var m = v.LiteGraph;
  c.title = "WebSocket";
  c.desc = "Send data through a websocket";
  c.prototype.onPropertyChanged = function(c, m) {
    "url" == c && this.connectSocket();
  };
  c.prototype.onExecute = function() {
    !this._ws && this.properties.url && this.connectSocket();
    if (this._ws && this._ws.readyState == WebSocket.OPEN) {
      for (var c = this.properties.room, m = this.properties.only_send_changes, l = 1; l < this.inputs.length; ++l) {
        var q = this.getInputData(l);
        if (null != q) {
          try {
            var v = JSON.stringify({type:0, room:c, channel:l, data:q});
          } catch (w) {
            continue;
          }
          m && this._last_sent_data[l] == v || (this._last_sent_data[l] = v, this._ws.send(v));
        }
      }
      for (l = 1; l < this.outputs.length; ++l) {
        this.setOutputData(l, this._last_received_data[l]);
      }
      "#AFA" == this.boxcolor && (this.boxcolor = "#6C6");
    }
  };
  c.prototype.connectSocket = function() {
    var c = this, r = this.properties.url;
    "ws" != r.substr(0, 2) && (r = "ws://" + r);
    this._ws = new WebSocket(r);
    this._ws.onopen = function() {
      console.log("ready");
      c.boxcolor = "#6C6";
    };
    this._ws.onmessage = function(g) {
      c.boxcolor = "#AFA";
      g = JSON.parse(g.data);
      if (!g.room || g.room == c.properties.room) {
        if (1 == g.type) {
          if (g.data.object_class && m[g.data.object_class]) {
            var l = null;
            try {
              l = new m[g.data.object_class](g.data), c.triggerSlot(0, l);
            } catch (y) {
            }
          } else {
            c.triggerSlot(0, g.data);
          }
        } else {
          c._last_received_data[g.channel || 0] = g.data;
        }
      }
    };
    this._ws.onerror = function(g) {
      console.log("couldnt connect to websocket");
      c.boxcolor = "#E88";
    };
    this._ws.onclose = function(g) {
      console.log("connection closed");
      c.boxcolor = "#000";
    };
  };
  c.prototype.send = function(c) {
    this._ws && this._ws.readyState == WebSocket.OPEN && this._ws.send(JSON.stringify({type:1, msg:c}));
  };
  c.prototype.onAction = function(c, m) {
    this._ws && this._ws.readyState == WebSocket.OPEN && this._ws.send({type:1, room:this.properties.room, action:c, data:m});
  };
  c.prototype.onGetInputs = function() {
    return [["in", 0]];
  };
  c.prototype.onGetOutputs = function() {
    return [["out", 0]];
  };
  m.registerNodeType("network/websocket", c);
  q.title = "SillyClient";
  q.desc = "Connects to SillyServer to broadcast messages";
  q.prototype.onPropertyChanged = function(c, m) {
    "room" == c && (this.room_widget.value = m);
    this.connectSocket();
  };
  q.prototype.setRoom = function(c) {
    this.properties.room = c;
    this.room_widget.value = c;
    this.connectSocket();
  };
  q.prototype.onDrawForeground = function() {
    for (var c = 1; c < this.inputs.length; ++c) {
      var m = this.inputs[c];
      m.label = "in_" + c;
    }
    for (c = 1; c < this.outputs.length; ++c) {
      m = this.outputs[c], m.label = "out_" + c;
    }
  };
  q.prototype.onExecute = function() {
    if (this._server && this._server.is_connected) {
      for (var c = this.properties.only_send_changes, m = 1; m < this.inputs.length; ++m) {
        var l = this.getInputData(m), q = this._last_sent_data[m];
        if (null != l) {
          if (c) {
            var v = !0;
            if (l && l.length && q && q.length == l.length && l.constructor !== String) {
              for (var w = 0; w < l.length; ++w) {
                if (q[w] != l[w]) {
                  v = !1;
                  break;
                }
              }
            } else {
              this._last_sent_data[m] != l && (v = !1);
            }
            if (v) {
              continue;
            }
          }
          this._server.sendMessage({type:0, channel:m, data:l});
          if (l.length && l.constructor !== String) {
            if (this._last_sent_data[m]) {
              for (this._last_sent_data[m].length = l.length, w = 0; w < l.length; ++w) {
                this._last_sent_data[m][w] = l[w];
              }
            } else {
              this._last_sent_data[m] = l.constructor === Array ? l.concat() : new l.constructor(l);
            }
          } else {
            this._last_sent_data[m] = l;
          }
        }
      }
      for (m = 1; m < this.outputs.length; ++m) {
        this.setOutputData(m, this._last_received_data[m]);
      }
      "#AFA" == this.boxcolor && (this.boxcolor = "#6C6");
    }
  };
  q.prototype.connectSocket = function() {
    var c = this;
    if ("undefined" == typeof SillyClient) {
      this._error || console.error("SillyClient node cannot be used, you must include SillyServer.js"), this._error = !0;
    } else {
      if (this._server = new SillyClient, this._server.on_ready = function() {
        console.log("ready");
        c.boxcolor = "#6C6";
      }, this._server.on_message = function(g, l) {
        g = null;
        try {
          g = JSON.parse(l);
        } catch (C) {
          return;
        }
        if (1 == g.type) {
          if (g.data.object_class && m[g.data.object_class]) {
            l = null;
            try {
              l = new m[g.data.object_class](g.data), c.triggerSlot(0, l);
            } catch (C) {
              return;
            }
          } else {
            c.triggerSlot(0, g.data);
          }
        } else {
          c._last_received_data[g.channel || 0] = g.data;
        }
        c.boxcolor = "#AFA";
      }, this._server.on_error = function(g) {
        console.log("couldnt connect to websocket");
        c.boxcolor = "#E88";
      }, this._server.on_close = function(g) {
        console.log("connection closed");
        c.boxcolor = "#000";
      }, this.properties.url && this.properties.room) {
        try {
          this._server.connect(this.properties.url, this.properties.room);
        } catch (r) {
          console.error("SillyServer error: " + r);
          this._server = null;
          return;
        }
        this._final_url = this.properties.url + "/" + this.properties.room;
      }
    }
  };
  q.prototype.send = function(c) {
    this._server && this._server.is_connected && this._server.sendMessage({type:1, data:c});
  };
  q.prototype.onAction = function(c, m) {
    this._server && this._server.is_connected && this._server.sendMessage({type:1, action:c, data:m});
  };
  q.prototype.onGetInputs = function() {
    return [["in", 0]];
  };
  q.prototype.onGetOutputs = function() {
    return [["out", 0]];
  };
  m.registerNodeType("network/sillyclient", q);
})(this);

