/*! wavedrom 3.1.0 2023-1-18 PDT */ ! function r(e, n, t) {
    function o(i, f) {
        if (!n[i]) {
            if (!e[i]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i, !0);
                if (u) return u(i, !0);
                var a = new Error("Cannot find module '" + i + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var p = n[i] = {
                exports: {}
            };
            e[i][0].call(p.exports, (function (r) {
                return o(e[i][1][r] || r)
            }), p, p.exports, r, e, n, t)
        }
        return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
}({
    1: [function (require, module, exports) {
        "use strict";
        module.exports = function (index, output) {
            let menu;
            
            function closeMenu(e) {
                const left = parseInt(menu.style.left, 10),
                top = parseInt(menu.style.top, 10);
                (e.x < left || e.x > left + menu.offsetWidth || e.y < top || e.y > top + menu.offsetHeight) && (menu.parentNode.removeChild(menu), document.body.removeEventListener("mousedown", closeMenu, !1))
            }
            const div = document.getElementById(output + index);
            div.childNodes[0].addEventListener("contextmenu", (function (e) {
                menu = document.createElement("div"), menu.className = "wavedromMenu", menu.style.top = e.y + "px", menu.style.left = e.x + "px";
                const list = document.createElement("ul"),
                savePng = document.createElement("li");
                savePng.innerHTML = "Save as PNG", list.appendChild(savePng);
                const saveSvg = document.createElement("li");
                saveSvg.innerHTML = "Save as SVG", list.appendChild(saveSvg), menu.appendChild(list), document.body.appendChild(menu), savePng.addEventListener("click", (function () {
                    let html = "";
                    if (0 !== index) {
                        const firstDiv = document.getElementById(output + 0);
                        html += firstDiv.innerHTML.substring(166, firstDiv.innerHTML.indexOf('<g id="waves_0">'))
                    }
                    html = [div.innerHTML.slice(0, 166), html, div.innerHTML.slice(166)].join("");
                    const svgdata = "data:image/svg+xml;base64," + btoa(html),
                    img = new Image;
                    img.src = svgdata;
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width, canvas.height = img.height;
                    canvas.getContext("2d").drawImage(img, 0, 0);
                    const pngdata = canvas.toDataURL("image/png"),
                    a = document.createElement("a");
                    a.href = pngdata, a.download = "wavedrom.png", a.click(), menu.parentNode.removeChild(menu), document.body.removeEventListener("mousedown", closeMenu, !1)
                }), !1), saveSvg.addEventListener("click", (function () {
                    let html = "";
                    if (0 !== index) {
                        const firstDiv = document.getElementById(output + 0);
                        html += firstDiv.innerHTML.substring(166, firstDiv.innerHTML.indexOf('<g id="waves_0">'))
                    }
                    html = [div.innerHTML.slice(0, 166), html, div.innerHTML.slice(166)].join("");
                    const svgdata = "data:image/svg+xml;base64," + btoa(html),
                    a = document.createElement("a");
                    a.href = svgdata, a.download = "wavedrom.svg", a.click(), menu.parentNode.removeChild(menu), document.body.removeEventListener("mousedown", closeMenu, !1)
                }), !1), menu.addEventListener("contextmenu", (function (ee) {
                    ee.preventDefault()
                }), !1), document.body.addEventListener("mousedown", closeMenu, !1), e.preventDefault()
            }), !1)
        }
    }, {}],
    2: [function (require, module, exports) {
        "use strict";
        module.exports = function (Edge, from, to) {
            const dx = to.x - from.x,
            dy = to.y - from.y;
            let lx = (from.x + to.x) / 2;
            const ly = (from.y + to.y) / 2;
            let d, style;
            switch (Edge.shape) {
                case "-":
                break;
                case "~":
                d = "M " + from.x + "," + from.y + " c " + .7 * dx + ", 0 " + .3 * dx + ", " + dy + " " + dx + ", " + dy;
                break;
                case "-~":
                d = "M " + from.x + "," + from.y + " c " + .7 * dx + ", 0 " + dx + ", " + dy + " " + dx + ", " + dy, Edge.label && (lx = from.x + .75 * (to.x - from.x));
                break;
                case "~-":
                d = "M " + from.x + "," + from.y + " c 0, 0 " + .3 * dx + ", " + dy + " " + dx + ", " + dy, Edge.label && (lx = from.x + .25 * (to.x - from.x));
                break;
                case "-|":
                d = "m " + from.x + "," + from.y + " " + dx + ",0 0," + dy, Edge.label && (lx = to.x);
                break;
                case "|-":
                d = "m " + from.x + "," + from.y + " 0," + dy + " " + dx + ",0", Edge.label && (lx = from.x);
                break;
                case "-|-":
                d = "m " + from.x + "," + from.y + " " + dx / 2 + ",0 0," + dy + " " + dx / 2 + ",0";
                break;
                case "->":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none";
                break;
                case "~>":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none", d = "M " + from.x + "," + from.y + " c " + .7 * dx + ", 0 " + .3 * dx + ", " + dy + " " + dx + ", " + dy;
                break;
                case "-~>":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none", d = "M " + from.x + "," + from.y + " c " + .7 * dx + ", 0 " + dx + ", " + dy + " " + dx + ", " + dy, Edge.label && (lx = from.x + .75 * (to.x - from.x));
                break;
                case "~->":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none", d = "M " + from.x + "," + from.y + " c 0, 0 " + .3 * dx + ", " + dy + " " + dx + ", " + dy, Edge.label && (lx = from.x + .25 * (to.x - from.x));
                break;
                case "-|>":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none", d = "m " + from.x + "," + from.y + " " + dx + ",0 0," + dy, Edge.label && (lx = to.x);
                break;
                case "|->":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none", d = "m " + from.x + "," + from.y + " 0," + dy + " " + dx + ",0", Edge.label && (lx = from.x);
                break;
                case "-|->":
                style = "marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none", d = "m " + from.x + "," + from.y + " " + dx / 2 + ",0 0," + dy + " " + dx / 2 + ",0";
                break;
                case "<->":
                style = "marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none";
                break;
                case "<~>":
                style = "marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none", d = "M " + from.x + "," + from.y + " c " + .7 * dx + ", 0 " + .3 * dx + ", " + dy + " " + dx + ", " + dy;
                break;
                case "<-~>":
                style = "marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none", d = "M " + from.x + "," + from.y + " c " + .7 * dx + ", 0 " + dx + ", " + dy + " " + dx + ", " + dy, Edge.label && (lx = from.x + .75 * (to.x - from.x));
                break;
                case "<-|>":
                style = "marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none", d = "m " + from.x + "," + from.y + " " + dx + ",0 0," + dy, Edge.label && (lx = to.x);
                break;
                case "<-|->":
                style = "marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none", d = "m " + from.x + "," + from.y + " " + dx / 2 + ",0 0," + dy + " " + dx / 2 + ",0";
                break;
                case "+":
                style = "marker-end:url(#tee);marker-start:url(#tee);fill:none;stroke:#00F;stroke-width:1";
                break;
                default:
                style = "fill:none;stroke:#F00;stroke-width:1"
            }
            return {
                lx: lx,
                ly: ly,
                d: d,
                style: style
            }
        }
    }, {}],
    3: [function (require, module, exports) {
        module.exports = {
            chars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 47, 74, 74, 118, 89, 25, 44, 44, 52, 78, 37, 44, 37, 37, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 37, 37, 78, 78, 78, 74, 135, 89, 89, 96, 96, 89, 81, 103, 96, 37, 67, 89, 74, 109, 96, 103, 89, 103, 96, 89, 81, 96, 89, 127, 89, 87, 81, 37, 37, 37, 61, 74, 44, 74, 74, 67, 74, 74, 37, 74, 74, 30, 30, 67, 30, 112, 74, 74, 74, 74, 44, 67, 37, 74, 67, 95, 66, 65, 67, 44, 34, 44, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 43, 74, 74, 74, 74, 34, 74, 44, 98, 49, 74, 78, 0, 98, 73, 53, 73, 44, 44, 44, 77, 71, 37, 44, 44, 49, 74, 111, 111, 111, 81, 89, 89, 89, 89, 89, 89, 133, 96, 89, 89, 89, 89, 37, 37, 37, 37, 96, 96, 103, 103, 103, 103, 103, 78, 103, 96, 96, 96, 96, 87, 89, 81, 74, 74, 74, 74, 74, 74, 118, 67, 74, 74, 74, 74, 36, 36, 36, 36, 74, 74, 74, 74, 74, 74, 74, 73, 81, 74, 74, 74, 74, 65, 74, 65, 89, 74, 89, 74, 89, 74, 96, 67, 96, 67, 96, 67, 96, 67, 96, 82, 96, 74, 89, 74, 89, 74, 89, 74, 89, 74, 89, 74, 103, 74, 103, 74, 103, 74, 103, 74, 96, 74, 96, 74, 37, 36, 37, 36, 37, 36, 37, 30, 37, 36, 98, 59, 67, 30, 89, 67, 67, 74, 30, 74, 30, 74, 39, 74, 44, 74, 30, 96, 74, 96, 74, 96, 74, 80, 96, 74, 103, 74, 103, 74, 103, 74, 133, 126, 96, 44, 96, 44, 96, 44, 89, 67, 89, 67, 89, 67, 89, 67, 81, 38, 81, 50, 81, 37, 96, 74, 96, 74, 96, 74, 96, 74, 96, 74, 96, 74, 127, 95, 87, 65, 87, 81, 67, 81, 67, 81, 67, 30, 84, 97, 91, 84, 91, 84, 94, 92, 73, 104, 109, 91, 84, 81, 84, 100, 82, 76, 74, 103, 91, 131, 47, 40, 99, 77, 37, 79, 130, 100, 84, 104, 114, 87, 126, 101, 87, 84, 93, 84, 69, 84, 46, 52, 82, 52, 82, 114, 89, 102, 96, 100, 98, 91, 70, 88, 88, 77, 70, 85, 89, 77, 67, 84, 39, 65, 61, 39, 189, 173, 153, 111, 105, 61, 123, 123, 106, 89, 74, 37, 30, 103, 74, 96, 74, 96, 74, 96, 74, 96, 74, 96, 74, 81, 91, 81, 91, 81, 130, 131, 102, 84, 103, 84, 87, 78, 104, 81, 104, 81, 88, 76, 37, 189, 173, 153, 103, 84, 148, 90, 100, 84, 89, 74, 133, 118, 103, 81],
            other: 114
        }
    }, {}],
    4: [function (require, module, exports) {
        "use strict";
        const stringify = require("onml/stringify.js"),
        w3 = require("./w3.js");
        module.exports = function (arr) {
            arr[1].xmlns = w3.svg, arr[1]["xmlns:xlink"] = w3.xlink;
            const s1 = stringify(arr);
            return (new DOMParser).parseFromString(s1, "image/svg+xml").firstChild
        }
    }, {
        "./w3.js": 33,
        "onml/stringify.js": 42
    }],
    5: [function (require, module, exports) {
        "use strict";
        const eva = require("./eva.js"),
        renderWaveForm = require("./render-wave-form.js");
        module.exports = function () {
            renderWaveForm(0, eva("InputJSON_0"), "WaveDrom_Display_")
        }
    }, {
        "./eva.js": 6,
        "./render-wave-form.js": 30
    }],
    6: [function (require, module, exports) {
        "use strict";
        
        function erra(e) {
            console.log("Error in WaveJS: ", e);
            const msg = ["tspan", ["tspan", {
                class: "error h5"
            }, "Error: "], e.message];
            return msg.textWidth = 1e3, {
                signal: [{
                    name: msg
                }]
            }
        }
        
        function eva(id) {
            const TheTextBox = document.getElementById(id);
            let source;
            if (TheTextBox.type && "textarea" === TheTextBox.type) try {
                source = eval("(" + TheTextBox.value + ")")
            } catch (e) {
                return erra(e)
            } else try {
                source = eval("(" + TheTextBox.innerHTML + ")")
            } catch (e) {
                return erra(e)
            }
            if ("[object Object]" !== Object.prototype.toString.call(source)) return erra({
                message: '[Semantic]: The root has to be an Object: "{signal:[...]}"'
            });
            if (source.signal) {
                if (!Array.isArray(source.signal)) return erra({
                    message: '[Semantic]: "signal" object has to be an Array "signal:[]"'
                })
            } else if (source.assign) {
                if (!Array.isArray(source.assign)) return erra({
                    message: '[Semantic]: "assign" object hasto be an Array "assign:[]"'
                })
            } else if (!source.reg) return erra({
                message: '[Semantic]: "signal:[...]" or "assign:[...]" property is missing inside the root Object'
            });
            return source
        }
        module.exports = eva
    }, {}],
    7: [function (require, module, exports) {
        "use strict";
        module.exports = function (lanetext) {
            let gcount = 0,
            lcount = 0;
            const ret = [];
            return lanetext.forEach((function (e) {
                "vvv-2" === e || "vvv-3" === e || "vvv-4" === e || "vvv-5" === e || "vvv-6" === e || "vvv-7" === e || "vvv-8" === e || "vvv-9" === e ? lcount += 1 : 0 !== lcount && (ret.push(gcount - (lcount + 1) / 2), lcount = 0), gcount += 1
            })), 0 !== lcount && ret.push(gcount - (lcount + 1) / 2), ret
        }
    }, {}],
    8: [function (require, module, exports) {
        "use strict";
        module.exports = (texts, extra, times) => {
            const R = [];
            if (Array.isArray(texts) || (texts = [texts]), 4 === texts.length) {
                for (let j = 0; j < times; j += 1) {
                    R.push(texts[0]);
                    for (let i = 0; i < extra; i += 1) R.push(texts[1]);
                    R.push(texts[2]);
                    for (let i = 0; i < extra; i += 1) R.push(texts[3])
                }
                return R
            }
            1 === texts.length && texts.push(texts[0]), R.push(texts[0]);
            for (let i = 0; i < times * (2 * (extra + 1)) - 1; i += 1) R.push(texts[1]);
            return R
        }
    }, {}],
    9: [function (require, module, exports) {
        "use strict";
        const genBrick = require("./gen-brick.js"),
        lookUpTable = {
            p: ["pclk", "111", "nclk", "000"],
            n: ["nclk", "000", "pclk", "111"],
            P: ["Pclk", "111", "nclk", "000"],
            N: ["Nclk", "000", "pclk", "111"],
            l: "000",
            L: "000",
            0: "000",
            h: "111",
            H: "111",
            1: "111",
            "=": "vvv-2",
            2: "vvv-2",
            3: "vvv-3",
            4: "vvv-4",
            5: "vvv-5",
            6: "vvv-6",
            7: "vvv-7",
            8: "vvv-8",
            9: "vvv-9",
            d: "ddd",
            u: "uuu",
            z: "zzz",
            default: "xxx"
        };
        module.exports = (text, extra, times) => genBrick(lookUpTable[text] || lookUpTable.default, extra, times)
    }, {
        "./gen-brick.js": 8
    }],
    10: [function (require, module, exports) {
        "use strict";
        const genBrick = require("./gen-brick.js");
        module.exports = function (text, extra, times) {
            const x2 = {
                0: "0",
                1: "1",
                x: "x",
                d: "d",
                u: "u",
                z: "z",
                "=": "v",
                2: "v",
                3: "v",
                4: "v",
                5: "v",
                6: "v",
                7: "v",
                8: "v",
                9: "v"
            },
            x3 = {
                0: "",
                1: "",
                x: "",
                d: "",
                u: "",
                z: "",
                "=": "-2",
                2: "-2",
                3: "-3",
                4: "-4",
                5: "-5",
                6: "-6",
                7: "-7",
                8: "-8",
                9: "-9"
            },
            y1 = {
                p: "0",
                n: "1",
                P: "0",
                N: "1",
                h: "1",
                l: "0",
                H: "1",
                L: "0",
                0: "0",
                1: "1",
                x: "x",
                d: "d",
                u: "u",
                z: "z",
                "=": "v",
                2: "v",
                3: "v",
                4: "v",
                5: "v",
                6: "v",
                7: "v",
                8: "v",
                9: "v"
            },
            y2 = {
                p: "",
                n: "",
                P: "",
                N: "",
                h: "",
                l: "",
                H: "",
                L: "",
                0: "",
                1: "",
                x: "",
                d: "",
                u: "",
                z: "",
                "=": "-2",
                2: "-2",
                3: "-3",
                4: "-4",
                5: "-5",
                6: "-6",
                7: "-7",
                8: "-8",
                9: "-9"
            },
            x5 = {
                p: "nclk",
                n: "pclk",
                P: "nclk",
                N: "pclk"
            },
            x6 = {
                p: "000",
                n: "111",
                P: "000",
                N: "111"
            },
            xclude = {
                hp: "111",
                Hp: "111",
                ln: "000",
                Ln: "000",
                nh: "111",
                Nh: "111",
                pl: "000",
                Pl: "000"
            },
            atext = text.split(""),
            tmp0 = {
                p: "111",
                n: "000",
                P: "111",
                N: "000",
                h: "111",
                l: "000",
                H: "111",
                L: "000",
                0: "000",
                1: "111",
                x: "xxx",
                d: "ddd",
                u: "uuu",
                z: "zzz",
                "=": "vvv-2",
                2: "vvv-2",
                3: "vvv-3",
                4: "vvv-4",
                5: "vvv-5",
                6: "vvv-6",
                7: "vvv-7",
                8: "vvv-8",
                9: "vvv-9"
            }[atext[1]];
            let tmp1 = {
                p: "pclk",
                n: "nclk",
                P: "Pclk",
                N: "Nclk",
                h: "pclk",
                l: "nclk",
                H: "Pclk",
                L: "Nclk"
            }[atext[1]];
            if (void 0 === tmp1) {
                const tmp2 = x2[atext[1]];
                if (void 0 === tmp2) return genBrick("xxx", extra, times); {
                    const tmp3 = y1[atext[0]];
                    return genBrick(void 0 === tmp3 ? "xxx" : [tmp3 + "m" + tmp2 + y2[atext[0]] + x3[atext[1]], tmp0], extra, times)
                }
            } {
                const tmp4 = xclude[text];
                void 0 !== tmp4 && (tmp1 = tmp4);
                const tmp5 = x5[atext[1]];
                return genBrick(void 0 === tmp5 ? [tmp1, tmp0] : [tmp1, tmp0, tmp5, x6[atext[1]]], extra, times)
            }
        }
    }, {
        "./gen-brick.js": 8
    }],
    11: [function (require, module, exports) {
        "use strict";
        const tt = require("onml/tt.js"),
        w3 = require("./w3.js");
        module.exports = function (index, source, lane, waveSkin, content, lanes, groups, notFirstSignal) {
            const waveSkinNames = Object.keys(waveSkin);
            let skin = waveSkin.default || waveSkin[waveSkinNames[0]];
            source && source.config && source.config.skin && waveSkin[source.config.skin] && (skin = waveSkin[source.config.skin]);
            const e = notFirstSignal ? ["svg", {
                id: "svg",
                xmlns: w3.svg,
                "xmlns:xlink": w3.xlink
            },
            ["g"]
        ] : skin,
        width = lane.xg + lane.xs * (lane.xmax + 1),
        height = content.length * lane.yo + lane.yh0 + lane.yh1 + lane.yf0 + lane.yf1,
        body = e[e.length - 1];
        body[1] = {
            id: "waves_" + index
        }, body[2] = ["g", tt(lane.xg + .5, lane.yh0 + lane.yh1 + .5, {
            id: "lanes_" + index
        })].concat(lanes), body[3] = ["g", {
            id: "groups_" + index
        }, groups];
        const head = e[1];
        return head.id = "svgcontent_" + index, head.height = height, head.width = width, head.viewBox = "0 0 " + width + " " + height, head.overflow = "hidden", e
    }
}, {
    "./w3.js": 33,
    "onml/tt.js": 43
}],
12: [function (require, module, exports) {
    "use strict";
    module.exports = {
        xs: 20,
        ys: 20,
        xg: 120,
        yh0: 0,
        yh1: 0,
        yf0: 0,
        yf1: 0,
        y0: 5,
        yo: 30,
        tgo: -10,
        ym: 15,
        xlabel: 6,
        xmax: 1,
        scale: 1,
        head: {},
        foot: {}
    }
}, {}],
13: [function (require, module, exports) {
    "use strict";
    module.exports = function (source, lane) {
        if (lane.hscale = 1, lane.hscale0 && (lane.hscale = lane.hscale0), source && source.config && source.config.hscale) {
            let hscale = Math.round((x = source.config.hscale) > 0 ? Math.round(x) : 1);
            hscale > 0 && (hscale > 100 && (hscale = 100), lane.hscale = hscale)
        }
        var x;
        lane.yh0 = 0, lane.yh1 = 0, lane.head = source.head, lane.xmin_cfg = 0, lane.xmax_cfg = 1e12, source && source.config && source.config.hbounds && 2 == source.config.hbounds.length && (source.config.hbounds[0] = Math.floor(source.config.hbounds[0]), source.config.hbounds[1] = Math.ceil(source.config.hbounds[1]), source.config.hbounds[0] < source.config.hbounds[1] && (lane.xmin_cfg = 2 * Math.floor(source.config.hbounds[0]), lane.xmax_cfg = 2 * Math.floor(source.config.hbounds[1]))), source && source.head && ((source.head.tick || 0 === source.head.tick || source.head.tock || 0 === source.head.tock) && (lane.yh0 = 20), (source.head.tick || 0 === source.head.tick) && (source.head.tick = source.head.tick + lane.xmin_cfg / 2), (source.head.tock || 0 === source.head.tock) && (source.head.tock = source.head.tock + lane.xmin_cfg / 2), source.head.text && (lane.yh1 = 46, lane.head.text = source.head.text)), lane.yf0 = 0, lane.yf1 = 0, lane.foot = source.foot, source && source.foot && ((source.foot.tick || 0 === source.foot.tick || source.foot.tock || 0 === source.foot.tock) && (lane.yf0 = 20), (source.foot.tick || 0 === source.foot.tick) && (source.foot.tick = source.foot.tick + lane.xmin_cfg / 2), (source.foot.tock || 0 === source.foot.tock) && (source.foot.tock = source.foot.tock + lane.xmin_cfg / 2), source.foot.text && (lane.yf1 = 46, lane.foot.text = source.foot.text))
    }
}, {}],
14: [function (require, module, exports) {
    "use strict";
    const genFirstWaveBrick = require("./gen-first-wave-brick.js"),
    genWaveBrick = require("./gen-wave-brick.js"),
    findLaneMarkers = require("./find-lane-markers.js");
    module.exports = function (src, extra, lane) {
        const Stack = src.split("");
        let Next = Stack.shift(),
        Repeats = 1;
        for (;
            "." === Stack[0] || "|" === Stack[0];) Stack.shift(), Repeats += 1;
            let Top, R = [];
            R = R.concat(genFirstWaveBrick(Next, extra, Repeats));
            let subCycle = !1;
            for (; Stack.length;) {
                for (Top = Next, Next = Stack.shift(), "<" === Next && (subCycle = !0, Next = Stack.shift()), ">" === Next && (subCycle = !1, Next = Stack.shift()), Repeats = 1;
                "." === Stack[0] || "|" === Stack[0];) Stack.shift(), Repeats += 1;
                R = subCycle ? R.concat(genWaveBrick(Top + Next, 0, Repeats - lane.period)) : R.concat(genWaveBrick(Top + Next, extra, Repeats))
            }
            const unseen_bricks = [];
            for (let i = 0; i < lane.phase; i += 1) unseen_bricks.push(R.shift());
            let num_unseen_markers;
            return unseen_bricks.length > 0 ? (num_unseen_markers = findLaneMarkers(unseen_bricks).length, 1 == findLaneMarkers([unseen_bricks[unseen_bricks.length - 1]]).length && 1 == findLaneMarkers([R[0]]).length && (num_unseen_markers -= 1)) : num_unseen_markers = 0, [R, num_unseen_markers]
        }
    }, {
        "./find-lane-markers.js": 7,
        "./gen-first-wave-brick.js": 9,
        "./gen-wave-brick.js": 10
    }],
    15: [function (require, module, exports) {
        "use strict";
        const parseWaveLane = require("./parse-wave-lane.js");
        module.exports = function (sig, lane) {
            const content = [],
            tmp0 = [];
            return sig.map((function (sigx) {
                const current = [];
                content.push(current), lane.period = sigx.period || 1, lane.phase = (sigx.phase ? 2 * sigx.phase : 0) + lane.xmin_cfg, tmp0[0] = sigx.name || " ", tmp0[1] = (sigx.phase || 0) + lane.xmin_cfg / 2;
                let num_unseen_markers, content_wave = null;
                if ("string" == typeof sigx.wave) {
                    const parsed_wave_lane = parseWaveLane(sigx.wave, lane.period * lane.hscale - 1, lane);
                    content_wave = parsed_wave_lane[0], num_unseen_markers = parsed_wave_lane[1]
                }
                current.push(tmp0.slice(0), content_wave, function (e, num_unseen_markers) {
                    let ret_data = e.data;
                    return void 0 === ret_data ? null : ("string" == typeof ret_data && (ret_data = ret_data.trim().split(/\s+/)), ret_data = ret_data.slice(num_unseen_markers), ret_data)
                }(sigx, num_unseen_markers), sigx)
            })), content
        }
    }, {
        "./parse-wave-lane.js": 14
    }],
    16: [function (require, module, exports) {
        "use strict";
        const eva = require("./eva.js"),
        appendSaveAsDialog = require("./append-save-as-dialog.js"),
        renderWaveForm = require("./render-wave-form.js");
        module.exports = function () {
            let index = 0;
            const points = document.querySelectorAll("*");
            for (let i = 0; i < points.length; i++)
            if (points.item(i).type && "wavedrom" === points.item(i).type.toLowerCase()) {
                points.item(i).setAttribute("id", "InputJSON_" + index);
                const node0 = document.createElement("div");
                node0.id = "WaveDrom_Display_" + index, points.item(i).parentNode.insertBefore(node0, points.item(i)), index += 1
            } let notFirstSignal = !1;
            for (let i = 0; i < index; i += 1) {
                const obj = eva("InputJSON_" + i);
                renderWaveForm(i, obj, "WaveDrom_Display_", notFirstSignal), obj && obj.signal && !notFirstSignal && (notFirstSignal = !0)//, appendSaveAsDialog(i, "WaveDrom_Display_")
            }
            // document.head.innerHTML += '<style type="text/css">div.wavedromMenu{position:fixed;border:solid 1pt#CCCCCC;background-color:white;box-shadow:0px 10px 20px #808080;cursor:default;margin:0px;padding:0px;}div.wavedromMenu>ul{margin:0px;padding:0px;}div.wavedromMenu>ul>li{padding:2px 10px;list-style:none;}div.wavedromMenu>ul>li:hover{background-color:#b5d5ff;}</style>'
        }
    }, {
        "./append-save-as-dialog.js": 1,
        "./eva.js": 6,
        "./render-wave-form.js": 30
    }],
    17: [function (require, module, exports) {
        "use strict";
        module.exports = function rec(tmp, state) {
            let name, deltaX = 10;
            "string" != typeof tmp[0] && "number" != typeof tmp[0] || (name = tmp[0], deltaX = 25), state.x += deltaX;
            for (let i = 0; i < tmp.length; i++)
            if ("object" == typeof tmp[i])
            if (Array.isArray(tmp[i])) {
                const oldY = state.y;
                (state = rec(tmp[i], state)).groups.push({
                    x: state.xx,
                    y: oldY,
                    height: state.y - oldY,
                    name: state.name
                })
            } else state.lanes.push(tmp[i]), state.width.push(state.x), state.y += 1;
            return state.xx = state.x, state.x -= deltaX, state.name = name, state
        }
    }, {}],
    18: [function (require, module, exports) {
        "use strict";
        const renderAssign = require("logidrom/lib/render-assign.js"),
        renderReg = require("./render-reg.js"),
        renderSignal = require("./render-signal.js");
        module.exports = function (index, source, waveSkin, notFirstSignal) {
            const res = source.signal ? renderSignal(index, source, waveSkin, notFirstSignal) : source.assign ? renderAssign(index, source) : source.reg ? renderReg(index, source) : ["div", {}];
            return res[1].class = "WaveDrom", res
        }
    }, {
        "./render-reg.js": 27,
        "./render-signal.js": 28,
        "logidrom/lib/render-assign.js": 40
    }],
    19: [function (require, module, exports) {
        "use strict";
        const arcShape = require("./arc-shape.js"),
        renderLabel = require("./render-label.js");
        module.exports = function (lanes, index, source, lane) {
            const arcFontSize = source && source.config && source.config.arcFontSize ? source.config.arcFontSize : 11,
            res = ["g", {
                id: "wavearcs_" + index
            }],
            Events = {};
            return Array.isArray(lanes) && (lanes.map(((lane, Events) => (element, i) => {
                const text = element.node;
                if (lane.period = element.period ? element.period : 1, lane.phase = (element.phase ? 2 * element.phase : 0) + lane.xmin_cfg, text) {
                    const stack = text.split("");
                    let pos = 0;
                    for (; stack.length;) {
                        const eventname = stack.shift();
                        "." !== eventname && (Events[eventname] = {
                            x: lane.xs * (2 * pos * lane.period * lane.hscale - lane.phase) + lane.xlabel,
                            y: i * lane.yo + lane.y0 + .5 * lane.ys
                        }), pos += 1
                    }
                }
            })(lane, Events)), Array.isArray(source.edge) && source.edge.map(((res, Events, arcFontSize) => element => {
                const words = element.trim().split(/\s+/),
                Edge = {
                    words: words,
                    label: element.substring(words[0].length).substring(1),
                    from: words[0].substr(0, 1),
                    to: words[0].substr(-1, 1),
                    shape: words[0].slice(1, -1)
                },
                from = Events[Edge.from],
                to = Events[Edge.to];
                if (from && to) {
                    const shapeProps = arcShape(Edge, from, to),
                    lx = shapeProps.lx,
                    ly = shapeProps.ly;
                    res.push(((Edge, from, to, shapeProps) => ["path", {
                        id: "gmark_" + Edge.from + "_" + Edge.to,
                        d: shapeProps.d || "M " + from.x + "," + from.y + " " + to.x + "," + to.y,
                        style: shapeProps.style || "fill:none;stroke:#00F;stroke-width:1"
                    }])(Edge, from, to, shapeProps)), Edge.label && res.push(renderLabel({
                        x: lx,
                        y: ly
                    }, Edge.label, arcFontSize))
                }
            })(res, Events, arcFontSize)), Object.keys(Events).map((function (k) {
                k === k.toLowerCase() && Events[k].x > 0 && res.push(renderLabel({
                    x: Events[k].x,
                    y: Events[k].y
                }, k + "", arcFontSize))
            }))), res
        }
    }, {
        "./arc-shape.js": 2,
        "./render-label.js": 22
    }],
    20: [function (require, module, exports) {
        "use strict";
        const tt = require("onml/tt.js");
        
        function renderGapUses(text, lane) {
            const res = [],
            Stack = (text || "").split("");
            let pos = 0,
            subCycle = !1;
            for (; Stack.length;) {
                let next = Stack.shift();
                "<" === next && (subCycle = !0, next = Stack.shift()), ">" === next && (subCycle = !1, next = Stack.shift()), pos += subCycle ? 1 : 2 * lane.period, "|" === next && res.push(["use", tt(lane.xs * ((pos - (subCycle ? 0 : lane.period)) * lane.hscale - lane.phase), 0, {
                    "xlink:href": "#gap"
                })])
            }
            return res
        }
        module.exports = function (lanes, index, source, lane) {
            let res = [];
            if (lanes) {
                const lanesLen = lanes.length,
                vline = x => ["line", {
                    x1: x,
                    x2: x,
                    y2: lanesLen * lane.yo,
                    style: "stroke:#000;stroke-width:1px"
                }],
                backDrop = ["rect", {
                    width: 4,
                    height: lanesLen * lane.yo,
                    style: "fill:#ffffffcc;stroke:none"
                }];
                if (source && "string" == typeof source.gaps) {
                    const scale = lane.hscale * lane.xs * 2;
                    for (let x = 0; x < source.gaps.length; x++) {
                        const c = source.gaps[x];
                        if (c.match(/^[.]$/)) continue;
                        const offset = c === c.toLowerCase() ? .5 : 0;
                        let marks = [];
                        switch (c) {
                            case "0":
                            marks = [backDrop];
                            break;
                            case "1":
                            marks = [backDrop, vline(2)];
                            break;
                            case "2":
                            marks = [backDrop, vline(0), vline(4)];
                            break;
                            case "3":
                            marks = [backDrop, vline(0), vline(2), vline(4)];
                            break;
                            case "s":
                            for (let idx = 0; idx < lanesLen; idx++) lanes[idx] && lanes[idx].wave && lanes[idx].wave.length > x && marks.push(["use", tt(2, 5 + lane.yo * idx, {
                                "xlink:href": "#gap"
                            })])
                        }
                        res.push(["g", tt(scale * (x + offset) - 2)].concat(marks))
                    }
                }
                for (let idx = 0; idx < lanesLen; idx++) {
                    const val = lanes[idx];
                    if (lane.period = val.period ? val.period : 1, lane.phase = (val.phase ? 2 * val.phase : 0) + lane.xmin_cfg, "string" == typeof val.wave) {
                        const gaps = renderGapUses(val.wave, lane);
                        res = res.concat([
                            ["g", tt(0, lane.y0 + idx * lane.yo, {
                                id: "wavegap_" + idx + "_" + index
                            })].concat(gaps)
                        ])
                    }
                }
            }
            return ["g", {
                id: "wavegaps_" + index
            }].concat(res)
        }
    }, {
        "onml/tt.js": 43
    }],
    21: [function (require, module, exports) {
        "use strict";
        const tspan = require("tspan"),
        tt = require("onml/tt.js");
        module.exports = function (groups, index, lane) {
            const res = ["g"];
            return groups.map(((e, i) => {
                if (res.push(["path", {
                    id: "group_" + i + "_" + index,
                    d: "m " + (e.x + .5) + "," + (e.y * lane.yo + 3.5 + lane.yh0 + lane.yh1) + " c -3,0 -5,2 -5,5 l 0," + (e.height * lane.yo - 16) + " c 0,3 2,5 5,5",
                    style: "stroke:#0041c4;stroke-width:1;fill:none"
                }]), void 0 === e.name) return;
                const x = e.x - 10,
                y = lane.yo * (e.y + e.height / 2) + lane.yh0 + lane.yh1,
                ts = tspan.parse(e.name);
                res.push(["g", tt(x, y), ["g", {
                    transform: "rotate(270)"
                },
                ["text", {
                    "text-anchor": "middle",
                    class: "info",
                    "xml:space": "preserve"
                }].concat(ts)
            ]])
        })), res
    }
}, {
    "onml/tt.js": 43,
    tspan: 44
}],
22: [function (require, module, exports) {
    "use strict";
    const tspan = require("tspan"),
    tt = require("onml/tt.js"),
    textWidth = require("./text-width.js");
    module.exports = function (p, text, fontSize) {
        const w = textWidth(text, fontSize = fontSize || 11) + 2;
        return ["g", tt(p.x, p.y), ["rect", {
            x: -(w >> 1),
            y: -(fontSize >> 1),
            width: w,
            height: fontSize,
            style: "fill:var(--pst-color-background);"
        }],
        ["text", {
            "text-anchor": "middle",
            y: Math.round(.3 * fontSize),
            style: "font-size:" + fontSize + "px;"
        }].concat(tspan.parse(text))
    ]
}
}, {
    "./text-width.js": 32,
    "onml/tt.js": 43,
    tspan: 44
}],
23: [function (require, module, exports) {
    "use strict";
    const renderMarks = require("./render-marks.js"),
    renderArcs = require("./render-arcs.js"),
    renderGaps = require("./render-gaps.js"),
    renderPieceWise = require("./render-piece-wise.js");
    module.exports = function (index, content, waveLanes, ret, source, lane) {
        return [renderMarks(content, index, lane, source)].concat(waveLanes.res, [renderArcs(ret.lanes, index, source, lane), renderGaps(ret.lanes, index, source, lane), renderPieceWise(ret.lanes, index, lane)])
    }
}, {
    "./render-arcs.js": 19,
    "./render-gaps.js": 20,
    "./render-marks.js": 24,
    "./render-piece-wise.js": 26
}],
24: [function (require, module, exports) {
    "use strict";
    const tspan = require("tspan");
    
    function captext(cxt, anchor, y) {
        return cxt[anchor] && cxt[anchor].text ? [
            ["text", {
                x: cxt.xmax * cxt.xs / 2,
                y: y,
                fill: "#000",
                "text-anchor": "middle",
                "xml:space": "preserve"
            }].concat(tspan.parse(cxt[anchor].text))
        ] : []
    }
    
    function ticktock(cxt, ref1, ref2, x, dx, y, len) {
        let offset, L = [];
        if (void 0 === cxt[ref1] || void 0 === cxt[ref1][ref2]) return [];
        let val = cxt[ref1][ref2];
        if ("string" == typeof val) val = val.trim().split(/\s+/);
        else if ("number" == typeof val || "boolean" == typeof val) {
            const offset = Number(val);
            val = [];
            for (let i = 0; i < len; i += 1) val.push(i + offset)
        }
        if (!Array.isArray(val)) return [];
        if (0 === val.length) return [];
        if (1 === val.length)
        if (offset = Number(val[0]), isNaN(offset)) L = val;
        else
        for (let i = 0; i < len; i += 1) L[i] = i + offset;
        else if (2 === val.length) {
            offset = Number(val[0]);
            const step = Number(val[1]),
            tmp = val[1].split(".");
            let dp = 0;
            if (2 === tmp.length && (dp = tmp[1].length), isNaN(offset) || isNaN(step)) L = val;
            else {
                offset *= step;
                for (let i = 0; i < len; i += 1) L[i] = (step * i + offset).toFixed(dp)
            }
        } else L = val;
        const res = ["g", {
            class: "muted",
            "text-anchor": "middle",
            "xml:space": "preserve"
        }];
        for (let i = 0; i < len; i += 1) cxt[ref1] && cxt[ref1].every && (i + offset) % cxt[ref1].every != 0 || res.push(["text", {
            x: i * dx + x,
            y: y
        }].concat(tspan.parse(L[i])));
        return [res]
    }
    module.exports = function (content, index, lane, source) {
        const mstep = 2 * lane.hscale,
        mmstep = mstep * lane.xs,
        marks = lane.xmax / mstep,
        gy = content.length * lane.yo,
        res = ["g", {
            id: "gmarks_" + index
        }],
        gmarkLines = ["g", {
            style: "stroke:#888;stroke-width:0.5;stroke-dasharray:1,3"
        }];
        if (!source || !source.config || !1 !== source.config.marks) {
            for (let i = 0; i < marks + 1; i += 1) gmarkLines.push(["line", {
                id: "gmark_" + i + "_" + index,
                x1: i * mmstep,
                y1: 0,
                x2: i * mmstep,
                y2: gy
            }]);
            res.push(gmarkLines)
        }
        return res.concat(captext(lane, "head", lane.yh0 ? -33 : -13), captext(lane, "foot", gy + (lane.yf0 ? 45 : 25)), ticktock(lane, "head", "tick", 0, mmstep, -5, marks + 1), ticktock(lane, "head", "tock", mmstep / 2, mmstep, -5, marks), ticktock(lane, "foot", "tick", 0, mmstep, gy + 15, marks + 1), ticktock(lane, "foot", "tock", mmstep / 2, mmstep, gy + 15, marks))
    }
}, {
    tspan: 44
}],
25: [function (require, module, exports) {
    "use strict";
    const tt = require("onml/tt.js"),
    colors = {
        1: "#000000",
        2: "#e90000",
        3: "#3edd00",
        4: "#0074cd",
        5: "#ff15db",
        6: "#af9800",
        7: "#00864f",
        8: "#a076ff"
    };
    module.exports = function (el, key, lane) {
        const xs = lane.xs,
        ys = lane.ys,
        period = 2 * (el.period || 1) * xs,
        xoffset = 2 * -(el.phase || 0) * xs;
        let color;
        const y = "under" === key ? ys : 0;
        let start;
        
        function line(x) {
            return void 0 === start ? [] : [
                ["line", {
                    style: "stroke:" + color,
                    x1: period * start + 12,
                    x2: period * x
                }]
            ]
        }
        if (el[key]) {
            let res = ["g", tt(xoffset, y, {
                style: "stroke-width:3"
            })];
            const arr = el[key].split("");
            return arr.map((function (dot, i) {
                "." !== dot && void 0 !== start && (res = res.concat(line(i)), "over" === key && res.push(["path", {
                    style: "stroke:none;fill:" + color,
                    d: "m" + (period * i - 7) + " 0 l7 7 v-7 z"
                }])), "0" === dot ? start = void 0 : "." !== dot && (start = i, color = colors[dot] || colors[1])
            })), void 0 !== start && (res = res.concat(line(arr.length))), [res]
        }
        return []
    }
}, {
    "onml/tt.js": 43
}],
26: [function (require, module, exports) {
    "use strict";
    const tt = require("onml/tt.js");
    
    function scale(d, cfg) {
        if ("string" == typeof d && (d = d.trim().split(/[\s,]+/)), Array.isArray(d)) return ((d, sx, sy) => {
            void 0 === sy && (sy = sx);
            let i = 0;
            for (; i < d.length;) {
                switch (d[i].toLowerCase()) {
                    case "h":
                    for (; i < d.length && !isNaN(d[i + 1]);) d[i + 1] *= sx, i++;
                    break;
                    case "v":
                    for (; i < d.length && !isNaN(d[i + 1]);) d[i + 1] *= sy, i++;
                    break;
                    case "m":
                    case "l":
                    case "t":
                    for (; i + 1 < d.length && !isNaN(d[i + 1]);) d[i + 1] *= sx, d[i + 2] *= sy, i += 2;
                    break;
                    case "q":
                    for (; i + 3 < d.length && !isNaN(d[i + 1]);) d[i + 1] *= sx, d[i + 2] *= sy, d[i + 3] *= sx, d[i + 4] *= sy, i += 4;
                    break;
                    case "a":
                    for (; i + 6 < d.length && !isNaN(d[i + 1]);) d[i + 1] *= sx, d[i + 2] *= sy, d[i + 6] *= sx, d[i + 7] *= sy, i += 7
                }
                i++
            }
            return d
        })(d, 2 * cfg.xs, -cfg.ys)
    }
    module.exports = function (lanes, index, cfg) {
        let res = ["g"];
        return lanes.map(((row, idx) => {
            const wave = row.wave;
            Array.isArray(wave) && res.push(function (wave, idx, cfg) {
                if (Array.isArray(wave)) {
                    const tag = wave[0],
                    attr = wave[1];
                    if ("pw" === tag && "object" == typeof attr) {
                        const d = scale(attr.d, cfg);
                        return ["g", tt(0, cfg.yo * idx + cfg.ys + cfg.y0), ["path", {
                            style: "fill:none;stroke:#000;stroke-width:1px;",
                            d: d
                        }]]
                    }
                }
            }(wave, idx, cfg))
        })), res
    }
}, {
    "onml/tt.js": 43
}],
27: [function (require, module, exports) {
    "use strict";
    const render = require("bit-field/lib/render.js");
    module.exports = function (index, source) {
        return render(source.reg, source.config)
    }
}, {
    "bit-field/lib/render.js": 35
}],
28: [function (require, module, exports) {
    "use strict";
    const rec = require("./rec.js"),
    lane = require("./lane.js"),
    parseConfig = require("./parse-config.js"),
    parseWaveLanes = require("./parse-wave-lanes.js"),
    renderGroups = require("./render-groups.js"),
    renderLanes = require("./render-lanes.js"),
    renderWaveLane = require("./render-wave-lane.js"),
    insertSVGTemplate = require("./insert-svg-template.js");
    module.exports = function (index, source, waveSkin, notFirstSignal) {
        ! function (index, source, lane, waveSkin) {
            if (0 !== index) return;
            const waveSkinNames = Object.keys(waveSkin);
            if (0 === waveSkinNames.length) throw new Error("no skins found");
            let skin = waveSkin.default || waveSkin[waveSkinNames[0]];
            source && source.config && source.config.skin && waveSkin[source.config.skin] && (skin = waveSkin[source.config.skin]);
            const socket = skin[3][1][2][1];
            lane.xs = Number(socket.width), lane.ys = Number(socket.height), lane.xlabel = Number(socket.x), lane.ym = Number(socket.y)
        }(index, source, lane, waveSkin), parseConfig(source, lane);
        const ret = rec(source.signal, {
            x: 0,
            y: 0,
            xmax: 0,
            width: [],
            lanes: [],
            groups: []
        }),
        content = parseWaveLanes(ret.lanes, lane),
        waveLanes = renderWaveLane(content, index, lane),
        waveGroups = renderGroups(ret.groups, index, lane),
        xmax = waveLanes.glengths.reduce(((res, len, i) => Math.max(res, len + ret.width[i])), 0);
        return lane.xg = Math.ceil((xmax - lane.tgo) / lane.xs) * lane.xs, insertSVGTemplate(index, source, lane, waveSkin, content, renderLanes(index, content, waveLanes, ret, source, lane), waveGroups, notFirstSignal)
    }
}, {
    "./insert-svg-template.js": 11,
    "./lane.js": 12,
    "./parse-config.js": 13,
    "./parse-wave-lanes.js": 15,
    "./rec.js": 17,
    "./render-groups.js": 21,
    "./render-lanes.js": 23,
    "./render-wave-lane.js": 31
}],
29: [function (require, module, exports) {
    "use strict";
    const renderAny = require("./render-any.js"),
    createElement = require("./create-element.js");
    module.exports = function (index, source, outputElement, waveSkin, notFirstSignal) {
        for (; outputElement.childNodes.length;) outputElement.removeChild(outputElement.childNodes[0]);
        outputElement.insertBefore(createElement(renderAny(index, source, waveSkin, notFirstSignal)), null)
    }
}, {
    "./create-element.js": 4,
    "./render-any.js": 18
}],
30: [function (require, module, exports) {
    "use strict";
    const renderWaveElement = require("./render-wave-element.js");
    module.exports = function (index, source, output, notFirstSignal) {
        renderWaveElement(index, source, document.getElementById(output + index), window.WaveSkin, notFirstSignal)
    }
}, {
    "./render-wave-element.js": 29
}],
31: [function (require, module, exports) {
    "use strict";
    const tt = require("onml/tt.js"),
    tspan = require("tspan"),
    textWidth = require("./text-width.js"),
    findLaneMarkers = require("./find-lane-markers.js"),
    renderOverUnder = require("./render-over-under.js");
    
    function renderLaneUses(cont, lane) {
        const res = [];
        if (cont[1] && (cont[1].map((function (ref, i) {
            res.push(["use", tt(i * lane.xs, 0, {
                "xlink:href": "#" + ref
            })])
        })), cont[2] && cont[2].length)) {
            const labels = findLaneMarkers(cont[1]);
            labels.length && labels.map((function (label, i) {
                cont[2] && void 0 !== cont[2][i] && res.push(["text", {
                    x: label * lane.xs + lane.xlabel,
                    y: lane.ym,
                    "text-anchor": "middle",
                    "xml:space": "preserve"
                }].concat(tspan.parse(cont[2][i])))
            }))
        }
        return res
    }
    module.exports = function (content, index, lane) {
        let xmax = 0;
        const glengths = [],
        res = [];
        return content.map((function (el, j) {
            const name = el[0][0];
            if (name) {
                let xoffset = el[0][1];
                xoffset = xoffset > 0 ? Math.ceil(2 * xoffset) - 2 * xoffset : -2 * xoffset, res.push(["g", tt(0, lane.y0 + j * lane.yo, {
                    id: "wavelane_" + j + "_" + index
                })].concat([
                    ["text", {
                        x: lane.tgo,
                        y: lane.ym,
                        class: "info",
                        "text-anchor": "end",
                        "xml:space": "preserve"
                    }].concat(tspan.parse(name))
                ]).concat([
                    ["g", tt(xoffset * lane.xs, 0, {
                        id: "wavelane_draw_" + j + "_" + index
                    })].concat(renderLaneUses(el, lane))
                ]).concat(renderOverUnder(el[3], "over", lane), renderOverUnder(el[3], "under", lane))), xmax = Math.max(xmax, (el[1] || []).length), glengths.push(name.textWidth ? name.textWidth : name.charCodeAt ? textWidth(name, 11) : 0)
            }
        })), lane.xmax = Math.min(xmax, lane.xmax_cfg - lane.xmin_cfg), lane.xg = 20, {
            glengths: glengths,
            res: res
        }
    }
}, {
    "./find-lane-markers.js": 7,
    "./render-over-under.js": 25,
    "./text-width.js": 32,
    "onml/tt.js": 43,
    tspan: 44
}],
32: [function (require, module, exports) {
    "use strict";
    const charWidth = require("./char-width.json");
    module.exports = function (str, size) {
        size = size || 11;
        let width = 0;
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            let w = charWidth.chars[c];
            void 0 === w && (w = charWidth.other), width += w
        }
        return width * size / 100
    }
}, {
    "./char-width.json": 3
}],
33: [function (require, module, exports) {
    "use strict";
    module.exports = {
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xmlns: "http://www.w3.org/XML/1998/namespace"
    }
}, {}],
34: [function (require, module, exports) {
    "use strict";
    window.WaveDrom = window.WaveDrom || {};
    const pkg = require("../package.json"),
    processAll = require("./process-all.js"),
    eva = require("./eva.js"),
    renderWaveForm = require("./render-wave-form.js"),
    editorRefresh = require("./editor-refresh.js");
    window.WaveDrom.ProcessAll = processAll, window.WaveDrom.RenderWaveForm = renderWaveForm, window.WaveDrom.EditorRefresh = editorRefresh, window.WaveDrom.eva = eva, window.WaveDrom.version = pkg.version
}, {
    "../package.json": 47,
    "./editor-refresh.js": 5,
    "./eva.js": 6,
    "./process-all.js": 16,
    "./render-wave-form.js": 30
}],
35: [function (require, module, exports) {
    "use strict";
    const tspan = require("tspan"),
    round = Math.round,
    tt = (x, y, obj) => Object.assign({
        transform: "translate(" + x + (y ? "," + y : "") + ")"
    }, "object" == typeof obj ? obj : {}),
    colors = {
        2: 0,
        3: 80,
        4: 170,
        5: 45,
        6: 126,
        7: 215
    },
    typeStyle = t => void 0 !== colors[t] ? ";fill:hsl(" + colors[t] + ",100%,50%)" : "",
    norm = (obj, other) => Object.assign(Object.keys(obj).reduce(((prev, key) => {
        const val = Number(obj[key]),
        valInt = isNaN(val) ? 0 : Math.round(val);
        return 0 !== valInt && (prev[key] = valInt), prev
    }), {}), other),
    text = (body, x, y, rotate) => {
        const props = {
            y: 6
        };
        return void 0 !== rotate && (props.transform = "rotate(" + rotate + ")"), ["g", tt(round(x), round(y)), ["text", props].concat(tspan.parse(body))]
    },
    hline = (len, x, y) => ["line", norm({
        x1: x,
        x2: x + len,
        y1: y,
        y2: y
    })],
    vline = (len, x, y) => ["line", norm({
        x1: x,
        x2: x,
        y1: y,
        y2: y + len
    })],
    getLabel = (val, x, y, step, len, rotate) => {
        if ("number" != typeof val) return text(val, x, y, rotate);
        const res = ["g", {}];
        for (let i = 0; i < len; i++) res.push(text(val >> i & 1, x + step * (len / 2 - i - .5), y));
        return res
    },
    labelArr = (desc, opt) => {
        const {
            margin: margin,
            hspace: hspace,
            vspace: vspace,
            mod: mod,
            index: index,
            fontsize: fontsize,
            vflip: vflip,
            trim: trim,
            compact: compact
        } = opt, width = hspace - margin.left - margin.right - 1, height = vspace - margin.top - margin.bottom, step = width / mod, blanks = ["g"], bits = ["g", tt(round(step / 2), -round(.5 * fontsize + 4))], names = ["g", tt(round(step / 2), round(.5 * height + .4 * fontsize - 6))], attrs = ["g", tt(round(step / 2), round(height + .7 * fontsize - 2))];
        return desc.map((e => {
            let lsbm = 0,
            msbm = mod - 1,
            lsb = index * mod,
            msb = (index + 1) * mod - 1;
            if (e.lsb / mod >> 0 === index) lsbm = e.lsbm, lsb = e.lsb, e.msb / mod >> 0 === index && (msb = e.msb, msbm = e.msbm);
            else if (e.msb / mod >> 0 === index) msb = e.msb, msbm = e.msbm;
            else if (!(lsb > e.lsb && msb < e.msb)) return;
            compact || (bits.push(text(lsb, step * (vflip ? lsbm : mod - lsbm - 1))), lsbm !== msbm && bits.push(text(msb, step * (vflip ? msbm : mod - msbm - 1)))), void 0 !== e.name && names.push(getLabel(trim ? ((text, availableSpace, charWidth) => {
                if (!("string" == typeof text || text instanceof String)) return text;
                const textWidth = text.length * charWidth;
                if (textWidth <= availableSpace) return text;
                var end = text.length - (textWidth - availableSpace) / charWidth - 3;
                return end > 0 ? text.substring(0, end) + "..." : text.substring(0, 1) + "..."
            })(e.name, step * e.bits, trim) : e.name, step * (vflip ? (msbm + lsbm) / 2 : mod - (msbm + lsbm) / 2 - 1), 0, step, e.bits, e.rotate)), void 0 !== e.name && void 0 === e.type || opt.compact && void 0 === e.type || blanks.push(["rect", norm({
                x: step * (vflip ? lsbm : mod - msbm - 1),
                width: step * (msbm - lsbm + 1),
                height: height
            }, {
                field: e.name,
                style: "fill-opacity:0.1" + typeStyle(e.type)
            })]), void 0 !== e.attr && attrs.push(((e, opt, step, lsbm, msbm) => {
                const x = opt.vflip ? step * ((msbm + lsbm) / 2) : step * (opt.mod - (msbm + lsbm) / 2 - 1);
                return Array.isArray(e.attr) ? e.attr.reduce(((prev, a, i) => null == a ? prev : prev.concat([getLabel(a, x, opt.fontsize * i, step, e.bits)])), ["g", {}]) : getLabel(e.attr, x, 0, step, e.bits)
            })(e, opt, step, lsbm, msbm))
        })), ["g", blanks, bits, names, attrs]
    },
    skipDrawingEmptySpace = (desc, opt, laneIndex, laneLength, globalIndex) => {
        if (!opt.compact) return !1;
        const isEmptyBitfield = bitfield => void 0 === bitfield.name && void 0 === bitfield.type,
        bitfieldIndex = desc.findIndex((e => isEmptyBitfield(e) && globalIndex >= e.lsb && globalIndex <= e.msb + 1));
        return -1 !== bitfieldIndex && (globalIndex > desc[bitfieldIndex].lsb && globalIndex < desc[bitfieldIndex].msb + 1 || (!(globalIndex != desc[bitfieldIndex].lsb || !(0 === laneIndex || bitfieldIndex > 0 && isEmptyBitfield(desc[bitfieldIndex - 1]))) || !(globalIndex != desc[bitfieldIndex].msb + 1 || !(laneIndex === laneLength || bitfieldIndex < desc.length - 1 && isEmptyBitfield(desc[bitfieldIndex + 1])))))
    },
    cage = (desc, opt) => {
        const {
            hspace: hspace,
            vspace: vspace,
            mod: mod,
            margin: margin,
            index: index,
            vflip: vflip
        } = opt, width = hspace - margin.left - margin.right - 1, height = vspace - margin.top - margin.bottom, res = ["g", {
            stroke: "black",
            "stroke-width": 1,
            "stroke-linecap": "round"
        }];
        opt.uneven && opt.bits % 2 == 1 && index === opt.lanes - 1 ? vflip ? (res.push(hline(width - width / mod, 0, 0)), res.push(hline(width - width / mod, 0, height))) : (res.push(hline(width - width / mod, width / mod, 0)), res.push(hline(width - width / mod, width / mod, height))) : opt.compact || (res.push(hline(width, 0, 0)), res.push(hline(width, 0, height)), res.push(vline(height, vflip ? width : 0, 0)));
        let i = index * mod;
        const delta = vflip ? 1 : -1;
        let j = vflip ? 0 : mod;
        for (let k = 0; k <= mod; k++) {
            if (skipDrawingEmptySpace(desc, opt, k, mod, i)) {
                i++, j += delta;
                continue
            }
            const xj = j * (width / mod);
            0 === k || k === mod || desc.some((e => e.msb + 1 === i)) ? res.push(vline(height, xj, 0)) : (res.push(vline(height >>> 3, xj, 0)), res.push(vline(-(height >>> 3), xj, height))), opt.compact && 0 !== k && !skipDrawingEmptySpace(desc, opt, k - 1, mod, i - 1) && (res.push(hline(width / mod, xj, 0)), res.push(hline(width / mod, xj, height))), i++, j += delta
        }
        return res
    },
    lane = (desc, opt) => {
        const {
            index: index,
            vspace: vspace,
            hspace: hspace,
            margin: margin,
            hflip: hflip,
            lanes: lanes,
            compact: compact,
            label: label
        } = opt, height = vspace - margin.top - margin.bottom, width = hspace - margin.left - margin.right - 1;
        let tx = margin.left;
        const idx = hflip ? index : lanes - index - 1;
        let ty = round(idx * vspace + margin.top);
        compact && (ty = round(idx * height + margin.top));
        const res = ["g", tt(tx, ty), cage(desc, opt), labelArr(desc, opt)];
        if (label && void 0 !== label.left) {
            const lab = label.left;
            let txt = index;
            "string" == typeof lab ? txt = lab : "number" == typeof lab ? txt += lab : "object" == typeof lab && (txt = lab[index] || txt), res.push(["g", {
                "text-anchor": "end"
            }, text(txt, -4, round(height / 2))])
        }
        if (label && void 0 !== label.right) {
            const lab = label.right;
            let txt = index;
            "string" == typeof lab ? txt = lab : "number" == typeof lab ? txt += lab : "object" == typeof lab && (txt = lab[index] || txt), res.push(["g", {
                "text-anchor": "start"
            }, text(txt, width + 4, round(height / 2))])
        }
        return res
    },
    optDefaults = opt => ([
        ["hspace", 40, 800],
        ["lanes", 1, 1],
        ["bits", 1, void 0],
        ["fontsize", 6, 14]
    ].map((opt => row => {
        const [key, min, def] = row, val = Math.round(opt[key]);
        opt[key] = "number" == typeof val && val >= min ? val : def
    })(opt = "object" == typeof opt ? opt : {})), opt.fontfamily = opt.fontfamily || "sans-serif", opt.fontweight = opt.fontweight || "normal", opt.compact = opt.compact || !1, opt.hflip = opt.hflip || !1, opt.uneven = opt.uneven || !1, opt.margin = opt.margin || {}, opt);
    module.exports = (desc, opt) => {
        opt = optDefaults(opt);
        const maxAttributes = (desc => desc.reduce(((prev, field) => Math.max(prev, void 0 === field.attr ? 0 : Array.isArray(field.attr) ? field.attr.length : 1)), 0))(desc);
        opt.vspace = opt.vspace || (maxAttributes + 4) * opt.fontsize, void 0 === opt.bits && (opt.bits = (desc => desc.reduce(((prev, field) => prev + (void 0 === field.bits ? 0 : field.bits)), 0))(desc));
        const {
            hspace: hspace,
            vspace: vspace,
            lanes: lanes,
            margin: margin,
            compact: compact,
            fontsize: fontsize,
            bits: bits,
            label: label,
            legend: legend
        } = opt;
        void 0 === margin.right && (label && void 0 !== label.right ? margin.right = round(.1 * hspace) : margin.right = 4), void 0 === margin.left && (label && void 0 !== label.left ? margin.left = round(.1 * hspace) : margin.left = 4), void 0 === margin.top ? (margin.top = 1.5 * fontsize, void 0 === margin.bottom && (margin.bottom = fontsize * maxAttributes + 4)) : void 0 === margin.bottom && (margin.bottom = 4);
        const width = hspace;
        let height = vspace * lanes;
        compact && (height -= (lanes - 1) * (margin.top + margin.bottom));
        const res = ["g", tt(.5, legend ? 12.5 : .5, {
            "text-anchor": "middle",
            "font-size": opt.fontsize,
            "font-family": opt.fontfamily,
            "font-weight": opt.fontweight
        })];
        let lsb = 0;
        const mod = Math.ceil(1 * bits / lanes);
        opt.mod = 0 | mod, desc.map((e => {
            e.lsb = lsb, e.lsbm = lsb % mod, lsb += e.bits, e.msb = lsb - 1, e.msbm = e.msb % mod
        }));
        for (let i = 0; i < lanes; i++) opt.index = i, res.push(lane(desc, opt));
        return compact && res.push(((desc, opt) => {
            const {
                hspace: hspace,
                margin: margin,
                mod: mod,
                fontsize: fontsize,
                vflip: vflip,
                legend: legend
            } = opt, step = (hspace - margin.left - margin.right - 1) / mod, labels = ["g", tt(margin.left, legend ? 0 : -3)], mask = ((desc, mod) => {
                const mask = [];
                let idx = 0;
                return desc.map((e => {
                    mask[idx % mod] = !0, idx += e.bits, mask[(idx - 1) % mod] = !0
                })), mask
            })(desc, mod);
            for (let i = 0; i < mod; i++) {
                const idx = vflip ? i : mod - i - 1;
                mask[idx] && labels.push(text(idx, step * (i + .5), .5 * fontsize + 4))
            }
            return labels
        })(desc, opt)), legend && res.push((opt => {
            const {
                hspace: hspace,
                margin: margin,
                fontsize: fontsize,
                legend: legend
            } = opt, width = hspace - margin.left - margin.right - 1, items = ["g", tt(margin.left, -10)];
            let x = width / 2 - Object.keys(legend).length / 2 * 60;
            for (const key in legend) {
                const value = legend[key];
                items.push(["rect", norm({
                    x: x,
                    width: 12,
                    height: 12
                }, {
                    style: "fill-opacity:0.15; stroke: #000; stroke-width: 1.2;" + typeStyle(value)
                })]), x += 36, items.push(text(key, x, .1 * fontsize + 4)), x += 24
            }
            return items
        })(opt)), (w = width, h = height, ["svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: w,
            height: h,
            viewBox: [0, 0, w, h].join(" ")
        }]).concat([res]);
        var w, h
    }
}, {
    tspan: 44
}],
36: [function (require, module, exports) {
    "use strict";
    const tspan = require("tspan"),
    circle = "M 4,0 C 4,1.1 3.1,2 2,2 0.9,2 0,1.1 0,0 c 0,-1.1 0.9,-2 2,-2 1.1,0 2,0.9 2,2 z",
    buf1 = "M -11,-6 -11,6 0,0 z m -5,6 5,0",
    and2 = "m -16,-10 5,0 c 6,0 11,4 11,10 0,6 -5,10 -11,10 l -5,0 z",
    or2 = "m -18,-10 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 2.5,-5 2.5,-15 0,-20 z",
    xor2 = "m -21,-10 c 1,3 2,6 2,10 m 0,0 c 0,4 -1,7 -2,10 m 3,-20 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 1,-3 2,-6 2,-10 0,-4 -1,-7 -2,-10 z",
    circle2 = "c 0,4.418278 -3.581722,8 -8,8 -4.418278,0 -8,-3.581722 -8,-8 0,-4.418278 3.581722,-8 8,-8 4.418278,0 8,3.581722 8,8 z",
    gates = {
        "=": buf1,
        "~": buf1 + circle,
        "&": and2,
        "~&": and2 + circle,
        "|": or2,
        "~|": or2 + circle,
        "^": xor2,
        "~^": xor2 + circle,
        "+": "m -8,5 0,-10 m -5,5 10,0 m 3,0" + circle2,
        "*": "m -4,4 -8,-8 m 0,8 8,-8  m 4,4" + circle2,
        "-": "m -3,0 -10,0 m 13,0" + circle2
    },
    aliasGates = {
        add: "+",
        mul: "*",
        sub: "-",
        and: "&",
        or: "|",
        xor: "^",
        andr: "&",
        orr: "|",
        xorr: "^",
        input: "="
    };
    Object.keys(aliasGates).reduce(((res, key) => (res[key] = gates[aliasGates[key]], res)), gates);
    const gater1_is = type => void 0 !== gates[type],
    gater1_render = type => ["path", {
        class: "gate",
        d: gates[type]
    }],
    iec = {
        eq: "==",
        ne: "!=",
        slt: "<",
        sle: "<=",
        sgt: ">",
        sge: ">=",
        ult: "<",
        ule: "<=",
        ugt: ">",
        uge: ">=",
        BUF: 1,
        INV: 1,
        AND: "&",
        NAND: "&",
        OR: "≥1",
        NOR: "≥1",
        XOR: "=1",
        XNOR: "=1",
        box: "",
        MUX: "M"
    },
    circled = {
        INV: 1,
        NAND: 1,
        NOR: 1,
        XNOR: 1
    },
    gater2_is = type => void 0 !== iec[type],
    gater2_render = (type, ymin, ymax) => (ymin === ymax && (ymin = -4, ymax = 4), ["g", ["path", {
        class: "gate",
        d: "m -16," + (ymin - 3) + " 16,0 0," + (ymax - ymin + 6) + " -16,0 z" + (circled[type] ? circle : "")
    }],
    ["text", {
        x: -14,
        y: 4,
        class: "wirename"
    }].concat(tspan.parse(iec[type]))
]);
module.exports = function (type, ymin, ymax) {
    return gater1_is(type) ? gater1_render(type) : gater2_is(type) ? gater2_render(type, ymin, ymax) : ["text", {
        x: -14,
        y: 4,
        class: "wirename"
    }].concat(tspan.parse(type))
}
}, {
    tspan: 44
}],
37: [function (require, module, exports) {
    "use strict";
    const tspan = require("tspan"),
    drawGate = require("./draw_gate.js");
    module.exports = function drawBoxes(tree, xmax) {
        const ret = ["g"],
        spec = [];
        if (Array.isArray(tree)) {
            spec.push(tree[0].name), spec.push([32 * (xmax - tree[0].x), 8 * tree[0].y]);
            for (let i = 1; i < tree.length; i++) {
                const branch = tree[i];
                Array.isArray(branch) ? spec.push([32 * (xmax - branch[0].x), 8 * branch[0].y]) : spec.push([32 * (xmax - branch.x), 8 * branch.y])
            }
            ret.push(drawGate(spec));
            for (let i = 1; i < tree.length; i++) {
                const branch = tree[i];
                ret.push(drawBoxes(branch, xmax))
            }
            return ret
        }
        const fname = tree.name,
        fx = 32 * (xmax - tree.x),
        fy = 8 * tree.y;
        return ret.push(["g", {
            transform: "translate(" + fx + "," + fy + ")"
        },
        ["title"].concat(tspan.parse(fname)), ["path", {
            d: "M 2,0 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z"
        }],
        ["text", {
            x: -4,
            y: 4,
            class: "pinname"
        }].concat(tspan.parse(fname))
    ]), ret
}
}, {
    "./draw_gate.js": 38,
    tspan: 44
}],
38: [function (require, module, exports) {
    "use strict";
    const tspan = require("tspan"),
    drawBody = require("./draw_body.js");
    module.exports = function (spec) {
        const ilen = spec.length,
        ys = [];
        for (let i = 2; i < ilen; i++) ys.push(spec[i][1]);
        const ret = ["g"],
        ymin = Math.min.apply(null, ys),
        ymax = Math.max.apply(null, ys);
        ret.push(["g", {
            transform: "translate(16,0)"
        },
        ["path", {
            d: "M" + spec[2][0] + "," + ymin + " " + spec[2][0] + "," + ymax,
            class: "wire"
        }]
    ]);
    for (let i = 2; i < ilen; i++) ret.push(["g", ["path", {
        d: "m" + spec[i][0] + "," + spec[i][1] + " 16,0",
        class: "wire"
    }]]);
    return ret.push(["g", {
        transform: "translate(" + spec[1][0] + "," + spec[1][1] + ")"
    },
    ["title"].concat(tspan.parse(spec[0])), drawBody(spec[0], ymin - spec[1][1], ymax - spec[1][1])
]), ret
}
}, {
    "./draw_body.js": 36,
    tspan: 44
}],
39: [function (require, module, exports) {
    "use strict";
    module.exports = function () {
        return ["style", ".pinname {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:end; font-family:Helvetica} .wirename {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:start; font-family:Helvetica} .wirename:hover {fill:blue} .gate {color:#000; fill:#ffc; fill-opacity: 1;stroke:#000; stroke-width:1; stroke-opacity:1} .gate:hover {fill:red !important; } .wire {fill:none; stroke:#000; stroke-width:1; stroke-opacity:1} .grid {fill:#fff; fill-opacity:1; stroke:none}"]
    }
}, {}],
40: [function (require, module, exports) {
    "use strict";
    const render = require("./render.js"),
    drawBoxes = require("./draw_boxes.js"),
    insertSVGTemplateAssign = require("./insert-svg-template-assign.js");
    module.exports = function (index, source) {
        let state = {
            x: 0,
            y: 2,
            xmax: 0
        };
        const tree = source.assign,
        ilen = tree.length;
        for (let i = 0; i < ilen; i++) state = render(tree[i], state), state.x++;
        const xmax = state.xmax + 3,
        svg = ["g"];
        for (let i = 0; i < ilen; i++) svg.push(drawBoxes(tree[i], xmax));
        const width = 32 * (xmax + 1) + 1,
        height = 8 * (state.y + 1) - 7;
        return ["svg", {
            id: "svgcontent_" + index,
            viewBox: "0 0 " + width + " " + height,
            width: width,
            height: height
        }, insertSVGTemplateAssign(), ["g", {
            transform: "translate(0.5, 0.5)"
        }, svg]]
    }
}, {
    "./draw_boxes.js": 37,
    "./insert-svg-template-assign.js": 39,
    "./render.js": 41
}],
41: [function (require, module, exports) {
    "use strict";
    module.exports = function render(tree, state) {
        state.xmax = Math.max(state.xmax, state.x);
        const y = state.y,
        ilen = tree.length;
        for (let i = 1; i < ilen; i++) {
            const branch = tree[i];
            Array.isArray(branch) ? state = render(branch, {
                x: state.x + 1,
                y: state.y,
                xmax: state.xmax
            }) : (tree[i] = {
                name: branch,
                x: state.x + 1,
                y: state.y
            }, state.y += 2)
        }
        return tree[0] = {
            name: tree[0],
            x: state.x,
            y: Math.round((y + (state.y - 2)) / 2)
        }, state.x--, state
    }
}, {}],
42: [function (require, module, exports) {
    "use strict";
    module.exports = function (a, indentation) {
        const cr = indentation > 0 ? "\n" : "",
        indent = function (indentation) {
            if (!(indentation > 0)) return txt => txt;
            var space = " ".repeat(indentation);
            return txt => {
                if ("string" != typeof txt) return txt;
                const arr = txt.split("\n");
                return 1 === arr.length ? space + txt : arr.map((e => "" === e.trim() ? e : space + e)).join("\n")
            }
        }(indentation);
        return function rec(a) {
            let res, body = "",
            isFlat = !0;
            return a.some(((e, i, arr) => {
                if (0 === i) return res = "<" + e, 1 === arr.length;
                if (1 === i) {
                    if ((o = e) && "[object Object]" === Object.prototype.toString.call(o)) return Object.keys(e).map((key => {
                        let val = e[key];
                        Array.isArray(val) && (val = val.join(" ")), res += " " + key + '="' + val + '"'
                    })), 2 === arr.length || void (res += ">");
                    res += ">"
                }
                var o;
                switch (typeof e) {
                    case "string":
                    case "number":
                    case "boolean":
                    case "undefined":
                    return void (body += e + cr)
                }
                isFlat = !1, body += rec(e)
            })) ? res + "/>" + cr : isFlat ? res + body.split("\n").filter((e => "" !== e.trim())).join("\n") + "</" + a[0] + ">" + cr : res + cr + indent(body) + "</" + a[0] + ">" + cr
        }(a)
    }
}, {}],
43: [function (require, module, exports) {
    "use strict";
    module.exports = (x, y, obj) => {
        let objt = {};
        if (x || y) {
            objt = {
                transform: "translate(" + [x || 0].concat(y ? [y] : []).join(",") + ")"
            }
        }
        return obj = "object" == typeof obj ? obj : {}, Object.assign(objt, obj)
    }
}, {}],
44: [function (require, module, exports) {
    "use strict";
    var parse = require("./parse"),
    reparse = require("./reparse");
    exports.parse = parse, exports.reparse = reparse
}, {
    "./parse": 45,
    "./reparse": 46
}],
45: [function (require, module, exports) {
    "use strict";
    var escapeMap = {
        "&": "&amp;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;"
    };
    
    function xscape(val) {
        return "string" != typeof val ? val : val.replace(/([&"<>])/g, (function (_, e) {
            return escapeMap[e]
        }))
    }
    var token = /<o>|<ins>|<s>|<sub>|<sup>|<b>|<i>|<tt>|<\/o>|<\/ins>|<\/s>|<\/sub>|<\/sup>|<\/b>|<\/i>|<\/tt>/;
    
    function update(s, cmd) {
        cmd.add && cmd.add.split(";").forEach((function (e) {
            var arr = e.split(" ");
            s[arr[0]][arr[1]] = !0
        })), cmd.del && cmd.del.split(";").forEach((function (e) {
            var arr = e.split(" ");
            delete s[arr[0]][arr[1]]
        }))
    }
    var trans = {
        "<o>": {
            add: "text-decoration overline"
        },
        "</o>": {
            del: "text-decoration overline"
        },
        "<ins>": {
            add: "text-decoration underline"
        },
        "</ins>": {
            del: "text-decoration underline"
        },
        "<s>": {
            add: "text-decoration line-through"
        },
        "</s>": {
            del: "text-decoration line-through"
        },
        "<b>": {
            add: "font-weight bold"
        },
        "</b>": {
            del: "font-weight bold"
        },
        "<i>": {
            add: "font-style italic"
        },
        "</i>": {
            del: "font-style italic"
        },
        "<sub>": {
            add: "baseline-shift sub;font-size .7em"
        },
        "</sub>": {
            del: "baseline-shift sub;font-size .7em"
        },
        "<sup>": {
            add: "baseline-shift super;font-size .7em"
        },
        "</sup>": {
            del: "baseline-shift super;font-size .7em"
        },
        "<tt>": {
            add: "font-family monospace"
        },
        "</tt>": {
            del: "font-family monospace"
        }
    };
    
    function dump(s) {
        return Object.keys(s).reduce((function (pre, cur) {
            var keys = Object.keys(s[cur]);
            return keys.length > 0 && (pre[cur] = keys.join(" ")), pre
        }), {})
    }
    module.exports = function (str) {
        var state, res, i, m, a;
        if (void 0 === str) return [];
        if ("number" == typeof str) return [str + ""];
        if ("string" != typeof str) return [str];
        for (res = [], state = {
            "text-decoration": {},
            "font-weight": {},
            "font-style": {},
            "baseline-shift": {},
            "font-size": {},
            "font-family": {}
        }; ;) {
            if (-1 === (i = str.search(token))) return res.push(["tspan", dump(state), xscape(str)]), res;
            if (i > 0 && (a = str.slice(0, i), res.push(["tspan", dump(state), xscape(a)])), m = str.match(token)[0], update(state, trans[m]), 0 === (str = str.slice(i + m.length)).length) return res
        }
    }
}, {}],
46: [function (require, module, exports) {
    "use strict";
    var parse = require("./parse");
    module.exports = function (React) {
        var $ = React.createElement;
        
        function reTspan(e, i) {
            var tag = e[0],
            attr = e[1],
            newAttr = Object.keys(attr).reduce((function (res, key) {
                var str, m;
                return res[null === (m = (str = key).match(/(\w+)-(\w)(\w+)/)) ? str : m[1] + m[2].toUpperCase() + m[3]] = attr[key], res
            }), {}),
            body = e[2];
            return newAttr.key = i, $(tag, newAttr, body)
        }
        return function (str) {
            return parse(str).map(reTspan)
        }
    }
}, {
    "./parse": 45
}],
47: [function (require, module, exports) {
    module.exports = {
        name: "wavedrom",
        version: "3.1.0",
        description: "Digital timing diagram in your browser",
        homepage: "http://wavedrom.com",
        author: "alex.drom@gmail.com",
        license: "MIT",
        repository: {
            type: "git",
            url: "https://github.com/wavedrom/wavedrom.git"
        },
        bugs: {
            url: "https://github.com/wavedrom/wavedrom/issues"
        },
        main: "./lib",
        unpkg: "wavedrom.unpkg.min.js",
        files: ["bin/cli.js", "wavedrom.js", "wavedrom.min.js", "wavedrom.unpkg.js", "wavedrom.unpkg.min.js", "LICENSE", "lib/**", "skins/**"],
        scripts: {
            test: "npm-run-all eslint nyc",
            eslint: "eslint lib/*.js",
            nyc: "nyc -r=lcov -r=text mocha test",
            dist: "browserify ./lib/wave-drom.js > wavedrom.js",
            "watch.dist": "watchify ./lib/wave-drom.js -o wavedrom.js -v",
            "dist.min": "terser --compress --mengle -- wavedrom.js | node ./bin/header.js > wavedrom.min.js",
            unpkg: "browserify --standalone wavedrom lib/index.js > wavedrom.unpkg.js",
            "unpkg.min": "terser --compress --mengle -- wavedrom.unpkg.js | node ./bin/header.js > wavedrom.unpkg.min.js",
            cli: "{ echo '#!/usr/bin/env node' ; browserify --node bin/cli.js ; } > bin/wavedrom.js ; chmod +x bin/wavedrom.js",
            prepare: "npm-run-all test dist dist.min unpkg unpkg.min",
            coverage: "nyc report -r=text-lcov | coveralls",
            clean: "rm -rf wavedrom.js wavedrom.*.js coverage .nyc_output",
            skins: "for S in default narrow dark lowkey ; do node bin/svg2js.js -i unpacked/skins/$S.svg > skins/$S.js ; done"
        },
        keywords: ["waveform", "verilog", "RTL"],
        devDependencies: {
            "@drom/eslint-config": "^0.10.0",
            browserify: "^17.0.0",
            chai: "^4.3",
            coveralls: "^3.1.1",
            eslint: "^8.31",
            "fs-extra": "^11.1",
            json5: "^2.2.3",
            mocha: "^10",
            "npm-run-all": "^4.1.5",
            nyc: "^15.1.0",
            terser: "^5.16",
            watchify: "^4.0.0",
            yargs: "^17.6"
        },
        dependencies: {
            "bit-field": "^1.7.0",
            logidrom: "^0.3.1",
            onml: "^2.1.0",
            tspan: "^0.4.0"
        },
        eslintConfig: {
            extends: "@drom/eslint-config/eslint4/node4",
            rules: {
                camelcase: 0
            }
        }
    }
}, {}]
}, {}, [34]);